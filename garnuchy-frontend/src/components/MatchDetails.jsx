import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ListTemplate from './List';
import TableTemplate from './TableTemplate';
import Navigation from './Navbar';
import MatchHeader from './MatchHeader';

export const MatchDetails = () => {
    const {matchId} = useParams();
    const [info, setInfo] = useState([]);
    const [teams, setTeams] = useState([]);
    const [users, setUsers] = useState({});
    const [stats, setStats] = useState(null);
    const [selectedStats, setSelectedStats] = useState('overall');
    const [sortOrder, setSortOrder] = useState({column: null, ascending: true});
    
    useEffect(() => {
        const handleMatchesData = async () => {
          const response = await fetch(`https://art.garnuchy.pl/matches/${matchId}/general`);
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
    
        handleMatchesData();
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
            deaths: player.deaths,
            rating: player.rating,
            kdr: player.kdr.toFixed(2),
            headshot_percentage: (player.headshot_percentage * 100).toFixed(0),
            adr: player.adr.toFixed(1),
          }));
          return data;
        })

        const GeneralTable = ({ teamStats }) => {
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
                      case 'rating':
                        return multiplier * (a.rating - b.rating);
                      case 'kills':
                        return multiplier * (a.kills - b.kills);
                      case 'deaths':
                        return multiplier * (a.deaths - b.deaths);
                      case 'kdr':
                        return multiplier * (a.kdr - b.kdr);
                      case 'headshot_percentage':
                        return multiplier * (a.headshot_percentage - b.headshot_percentage);
                      case 'adr':
                        return multiplier * (a.adr - b.adr);
                      default:
                        return 0;
                    }
                  });
      
                  const columns = [
                    { label: "Nickname", accessor: "username" },
                    { label: "Rating", accessor: "rating" },
                    { label: "Kills", accessor: "kills" },
                    { label: "Deaths", accessor: "deaths" },
                    { label: "K/D", accessor: "kdr" },
                    { label: "HS Kill %", accessor: "headshot_percentage" },
                    { label: "ADR", accessor: "adr" },
                  ];
                  return <div key={i}>
                    <TableTemplate tableData={sortedTeamStats} colNames={columns} onSort={sortOrder}/>
                  </div>;
                })}
              </div>
            );
          };
      const handleButtonClick = (selected) => {
        setSelectedStats(selected);
      };
    return (<>
    <div>
        <Navigation />
        <MatchHeader matchInfo={info} active={"General"}></MatchHeader>
      <div>
        <button onClick={() => handleButtonClick('ct')}>CT Side</button>
        <button onClick={() => handleButtonClick('overall')}>Overall</button>
        <button onClick={() => handleButtonClick('tt')}>TT Side</button>
      </div>
      <div>
        <GeneralTable teamStats={teamStats}/>
      </div>
    </div>
    </>
    )
}

export default MatchDetails;