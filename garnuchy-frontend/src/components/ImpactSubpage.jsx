import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TableTemplate from './TableTemplate';
import Navigation from './Navbar';
import MatchHeader from './MatchHeader';
import '../styles/matchDetails.css'
import StackedChart from './StackedChart';

export const MatchImpact = () => {
    const {matchId} = useParams();
    const [info, setInfo] = useState([]);
    const [teams, setTeams] = useState([]);
    const [users, setUsers] = useState({});
    const [stats, setStats] = useState(null);
    const [selectedStats, setSelectedStats] = useState('overall');
    const [sortOrder, setSortOrder] = useState({column: null, ascending: true});

    useEffect(() => {
        const handleImpactData = async () => {
          const response = await fetch(`https://art.garnuchy.pl/matches/${matchId}/impact`);
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
    
        handleImpactData();
      }, []);
      if (!stats) {
        return <div>Loading...</div>;
      }

      const teamsTradeStats = teams.map((players, i) => {
        const data = players
          .filter((playerId) => stats[selectedStats].hasOwnProperty(playerId))
          .filter((playerId) => users[playerId].is_bot === false)
          .map((playerId) => [playerId, stats[selectedStats][playerId]])
          .map(([id, player]) => ({
            username: users[id].username,
            avatar: users[id].avatar,
            trade_kill_attempts: player.trades.kill_attempts,
            trade_kill_success: player.trades.kill_success,
            traded_death_attempts: player.trades.death_attempts,
            traded_death_success: player.trades.death_success,
            _2k: player.multikills._2k,
            _3k: player.multikills._3k,
            _4k: player.multikills._4k,
            _5k: player.multikills._5k,
          }));
          return data;
        })
        const teamsOpeningStats = teams.map((players, i) => {
            const data = players
              .filter((playerId) => stats[selectedStats].hasOwnProperty(playerId))
              .filter((playerId) => users[playerId].is_bot === false)
              .map((playerId) => [playerId, stats[selectedStats][playerId]])
              .map(([id, player]) => ({
                username: users[id].username,
                avatar: users[id].avatar,
                opening_attempts: player.openings.attempts,
                opening_success: player.openings.success,
                opening_traded: player.openings.traded,
                opening_deaths: player.openings.attempts - player.openings.success - player.openings.traded,
              }));
              return data;
            })

        const handleButtonClick = (selected) => {
            setSelectedStats(selected);
            teamsOpeningStats.forEach(team => {
              team.forEach(player => {
                maxYValue = Math.max(maxYValue, player.opening_attempts);
            });});
          };

          const ImpactTable = ({ teamStats }) => {
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
                      case 'trade_kill_attempts':
                        return multiplier * (a.trade_kill_attempts - b.trade_kill_attempts);
                      case 'trade_kill_success':
                        return multiplier * (a.trade_kill_success - b.trade_kill_success);
                      case 'traded_death_attempts':
                        return multiplier * (a.traded_death_attempts - b.traded_death_attempts);
                      case 'traded_death_success':
                        return multiplier * (a.traded_death_success - b.traded_death_success);
                      case '_2k':
                        return multiplier * (a._2k - b._2k);
                      case '_3k':
                        return multiplier * (a._3k - b._3k);
                      case '_4k':
                        return multiplier * (a._4k - b._4k);
                      case '_5k':
                        return multiplier * (a._5k - b._5k);
                      default:
                        return 0;
                    }
                  });
                  const columns = [
                    { accessor: 'username', label: 'Nickname' },
                    { accessor: '_2k', label: 'Double Kills' },
                    { accessor: '_3k', label: 'Triple Kills' },
                    { accessor: '_4k', label: 'Quadruple Kills' },
                    { accessor: '_5k', label: 'Aces' },
                    { accessor: 'trade_kill_success', label: 'Trade Kill Success' },
                    { accessor: 'traded_death_attempts', label: 'Traded Death Attempts' },
                    { accessor: 'traded_death_success', label: 'Traded Death Success' },
                  ];
                  return <div key={i} className='mb-3'>
                  <TableTemplate tableData={sortedTeamStats} colNames={columns} onSort={handleSort} />
                  </div>;
                })}
              </div>
            );
      };
      const chartDataColors = [
        { columnName: 'Deaths', columnColor: '#913892' },
        { columnName: 'Deaths', columnColor: '#534ea9' },
        { columnName: 'Deaths', columnColor: '#0E79B2' },
    ];     
    let maxYValue = 0;
    teamsOpeningStats.forEach(team => {
      team.forEach(player => {
        maxYValue = Math.max(maxYValue, player.flashes_thrown+player.smokes_thrown+player.HEs_thrown+player.molos_thrown+player.decoys_thrown);
    });});     
    let chartDataTeam1 = teamsOpeningStats[0].map((player) => ({ 
        username: player.username, 
        Kills: player.opening_success, 
        Deaths: player.opening_deaths, 
        Traded: player.opening_traded 
      }))
      let chartDataTeam2 = teamsOpeningStats[1].map((player) => ({ 
        username: player.username, 
        Kills: player.opening_success, 
        Deaths: player.opening_deaths, 
        Traded: player.opening_traded 
      }))

      return (
        <>
        <div className='general'>
            <div className='details-container'>

        <Navigation />
        <MatchHeader matchInfo={info} selectedButton={"Impact"}></MatchHeader>
        <div>
        <button className={selectedStats === 'ct' ? 'sel-but-ct' : ''} onClick={() => handleButtonClick('ct')}>CT Side</button>
        <button className={selectedStats === 'overall' ? 'sel-but' : ''} onClick={() => handleButtonClick('overall')}>Overall</button>
        <button className={selectedStats === 'tt' ? 'sel-but-tt' : ''} onClick={() => handleButtonClick('tt')}>TT Side</button>
      </div>
        <ImpactTable teamStats={teamsTradeStats}/> 
       <h1 style={{fontSize: '40px', marginTop: '20px'}}>Maps Winrate</h1>
       <div className='row'>
        <div className='col'>
        <h1 style={{fontSize: '25px'}}>Team 1</h1>
              <StackedChart myData={chartDataTeam1} myColumns={chartDataColors} myDataKey={'username'} myMaxYValue={maxYValue}/>
        </div>
        <div className='col'>
        <h1 style={{fontSize: '25px'}}>Team 2</h1>
              <StackedChart myData={chartDataTeam2} myColumns={chartDataColors} myDataKey={'username'} myMaxYValue={maxYValue}/>
        </div>
       </div>
            </div>
        </div>
        </>
      )
}

export default MatchImpact;