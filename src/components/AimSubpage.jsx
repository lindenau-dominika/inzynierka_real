import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TableTemplate from './TableTemplate';
import Navigation from './Navbar';
import MatchHeader from './MatchHeader';
import '../styles/matchDetails.css'

export const AimSubpage = () => {
const { matchId } = useParams();
const [info, setInfo] = useState({});
const [users, setUsers] = useState({});
const [teams, setTeams] = useState([]);
const [stats, setStats] = useState(null);
const [selectedStats, setSelectedStats] = useState("overall");
const [sortOrder, setSortOrder] = useState({ column: null, ascending: true });
useEffect(() => {
  const fetchData = async () => {
    const response = await fetch(`https://art.garnuchy.pl/matches/${matchId}/aim`);
    const data = await response.json();
    setUsers(data.users);
    setTeams(data.teams);
    setInfo(data.info);
    setStats({
      overall: data.overall_stats,
      tt: data.tt_stats,
      ct: data.ct_stats,
    });
  };

  fetchData();
}, []);

if (!stats) {
    return <div>Loading...</div>;
  }

  const teamStats = teams.map((players, i) => {
    const data = players
      .filter((playerId) => stats[selectedStats].hasOwnProperty(playerId))
      .filter((playerId) => users[playerId].is_bot === false)
      .map((playerId) => [playerId, stats[selectedStats][playerId]])
      .map(([id, player]) => ({
        username: users[id].username,
        avatar: users[id].avatar,
        kills: player.kills,
        hs_kills_ratio: (player.hs_kills_ratio*100).toFixed(0),
        head_hit_ratio: (player.head_hit_ratio*100).toFixed(0),
        accuracy: (player.accuracy*100).toFixed(0),
        shots_fired: player.shots_fired,
        total_damage: player.total_damage,
      }));
      return data;
    })

    const AimTable = ({ teamStats }) => {
        return (
          <div>
            {teamStats.map((data, i) => {
              const handleSort = (column) => {
                setSortOrder((prevSortOrder) => ({
                  column,
                  ascending: column === prevSortOrder.column ? !prevSortOrder.ascending : true,
                }));
              };
  
              const sortedTeamStats = data.slice().sort((a, b) => {
                const multiplier = sortOrder.ascending ? 1 : -1;
            
                switch (sortOrder.column) {
                  case 'username':
                    return multiplier * a.username.localeCompare(b.username);
                  case 'kills':
                    return multiplier * (a.kills - b.kills);
                  case 'hs_kills_ratio':
                    return multiplier * (a.hs_kills_ratio - b.hs_kills_ratio);
                  case 'head_hit_ratio':
                    return multiplier * (a.head_hit_ratio - b.head_hit_ratio);
                  case 'accuracy':
                    return multiplier * (a.accuracy - b.accuracy);
                  case 'shots_fired':
                    return multiplier * (a.shots_fired - b.shots_fired);
                  case 'total_damage':
                    return multiplier * (a.total_damage - b.total_damage);
                  default:
                    return 0;
                }
              });
  
              const columns = [
                { label: "Nickname", accessor: "username" },
                { label: "Kills", accessor: "kills" },
                { label: "HS Kills %", accessor: "hs_kills_ratio" },
                { label: "HS Hits %", accessor: "head_hit_ratio" },
                { label: "Accuracy", accessor: "accuracy" },
                { label: "Shots Fired", accessor: "shots_fired" },
                { label: "Total Damage", accessor: "total_damage" },
              ];
              return <div key={i} className='mb-3'>
              <TableTemplate tableData={sortedTeamStats} colNames={columns} onSort={handleSort} />
              </div>;
            })}
          </div>
        );
      };
      const handleButtonClick = (selectedButton) => {
        setSelectedStats(selectedButton);
      };

      return (<>
      <div className='general'>
        <div className='details-container'>

            <Navigation />
            <MatchHeader matchInfo={info} selectedButton={"Aim"}/>
            <div>
                <button className={selectedStats === 'ct' ? 'sel-but-ct' : ''} onClick={() => handleButtonClick('ct')}>CT Side</button>
                <button className={selectedStats === 'overall' ? 'sel-but' : ''} onClick={() => handleButtonClick('overall')}>Overall</button>
                <button className={selectedStats === 'tt' ? 'sel-but-tt' : ''} onClick={() => handleButtonClick('tt')}>TT Side</button>
            </div>
            <AimTable teamStats={teamStats} />
        </div>
      </div>
      </>
      )

    }

    export default AimSubpage;