import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TableTemplate from './TableTemplate';
import Navigation from './Navbar';
import MatchHeader from './MatchHeader';
import '../styles/matchDetails.css'
import ClutchTeam from './ClutchTeam';

export const MatchClutches = () => {
    const {matchId} = useParams();
    const [info, setInfo] = useState([]);
    const [teams, setTeams] = useState([]);
    const [users, setUsers] = useState({});
    const [stats, setStats] = useState(null);
    const [clutches, setClutches] = useState([]);
    const [selectedStats, setSelectedStats] = useState('overall');
    const [sortOrder, setSortOrder] = useState({column: null, ascending: true});

    useEffect(() => {
        const handleClutchesData = async () => {
            const response = await fetch(`https://art.garnuchy.pl/matches/${matchId}/clutches`);
            const data = await response.json();
            setUsers(data.users);
            setTeams(data.teams);
            setInfo(data.info);
            setClutches(data.clutches);
            setStats({
              overall: data.overall_stats,
              tt: data.tt_stats,
              ct: data.ct_stats,
            });
        };
    
        handleClutchesData();
    }, []);
    
    if (!stats) {
        return <div>Loading...</div>;
    }
    const teamsStats = teams.map((players, i) => {
        const data = players
          .filter((playerId) => stats[selectedStats].hasOwnProperty(playerId))
          .filter((playerId) => users[playerId].is_bot === false)
          .map((playerId) => [playerId, stats[selectedStats][playerId]])
          .map(([id, player]) => ({
            username: users[id].username,
            avatar: users[id].avatar,
            steam_id: users[id].id,
          }));
          return data;
      })
      const clutchDataTeam1 = teamsStats[0].map(player => {
        const matchingItems = clutches.filter(player2 => {
          return player2.player_id === player.steam_id;
        });
        return {
          steam_id: player.steam_id,
          username: player.username,
          avatar: player.avatar,
          clutches: matchingItems.map(({ kills, round_result, score, opponents, side }) => ({ kills, round_result, score, opponents, players_number:opponents.length, side }))
        };
      });
      const clutchDataTeam2 = teamsStats[1].map(player => {
        const matchingItems = clutches.filter(player2 => {
          return player2.player_id === player.steam_id;
        });
        return {
          steam_id: player.steam_id,
          username: player.username,
          avatar: player.avatar,
          clutches: matchingItems.map(({ kills, round_result, score, opponents, side }) => ({ kills, round_result, score, opponents, players_number:opponents.length, side }))
        };
      });
      const clutchesData = clutches.map(clutch => ({
        playerData: {username: users[clutch.player_id].username, avatar: users[clutch.player_id].avatar},
        result: clutch.round_result,
        opponents: clutch.opponents.map(opponent => ({username: users[opponent].username, avatar: users[opponent].avatar})),
        score: clutch.score,
        kills: clutch.kills,
        side: clutch.side}))
      
      const handleButtonClick = (selectedButton) => {
        setSelectedStats(selectedButton);
      };
    
      function filterSide(side, selectedStats) {
        if (selectedStats === 'ct') {
          return side === 3;
        } else if (selectedStats === 'tt') {
          return side === 2;
        }
        return true;
      } 
      
    return (<>
    <div className='general'>
        <div className='details-container'>
        <Navigation />
        <MatchHeader matchInfo={info} selectedButton={"Clutches"}></MatchHeader>
        <div>
        <button className={selectedStats === 'ct' ? 'sel-but-ct' : ''} onClick={() => handleButtonClick('ct')}>CT Side</button>
        <button className={selectedStats === 'overall' ? 'sel-but' : ''} onClick={() => handleButtonClick('overall')}>Overall</button>
        <button className={selectedStats === 'tt' ? 'sel-but-tt' : ''} onClick={() => handleButtonClick('tt')}>TT Side</button>
      </div>
      <div className='clutches-container'>
      <ClutchTeam teamData={clutchDataTeam1.map(player => ({
          ...player,
          clutches: player.clutches.filter(({side}) => filterSide(side, selectedStats)) 
        }))}></ClutchTeam>
      <ClutchTeam teamData={clutchDataTeam2.map(player => ({
          ...player,
          clutches: player.clutches.filter(({side}) => filterSide(side, selectedStats)) 
        }))}></ClutchTeam>
        </div>
      </div>
    </div>
    </>
    )
}

export default MatchClutches;