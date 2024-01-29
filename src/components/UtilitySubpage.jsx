import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TableTemplate from './TableTemplate';
import Navigation from './Navbar';
import MatchHeader from './MatchHeader';
import '../styles/matchDetails.css'
import StackedChart from './StackedChart';
import GrenadeProgressBar from './GrenadeProgressBar';

export const MatchUtility = () => {
    const {matchId} = useParams();
    const [info, setInfo] = useState([]);
    const [teams, setTeams] = useState([]);
    const [users, setUsers] = useState({});
    const [stats, setStats] = useState(null);
    const [selectedStats, setSelectedStats] = useState('overall');
    const [sortOrder, setSortOrder] = useState({column: null, ascending: true});
    
    useEffect(() => {
        const handleUtilityData = async () => {
          const response = await fetch(`https://art.garnuchy.pl/matches/${matchId}/utility`);
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
    
        handleUtilityData();
      }, []);
    
      if (!stats) {
          return <div>Loading...</div>;
        }
      const teamsUtilityStats = teams.map((players, i) => {
        const data = players
            .filter((playerId) => stats[selectedStats].hasOwnProperty(playerId))
            .filter((playerId) => users[playerId].is_bot === false)
            .map((playerId) => [playerId, stats[selectedStats][playerId]])
            .map(([id, player]) => ({
            username: users[id].username,
            avatar: users[id].avatar,
            flash_assists: player.flash.flash_assists,
            enemies_flashed: player.flash.enemies_flashed,
            friends_flashed: player.flash.friends_flashed,
            self_flashed: player.flash.self_flashed,
            avg_blind_time: player.flash.avg_blind_time,
            HE_damage: player.he.damage,
            molotov_damage: player.molo.damage,
            avg_unused_util_value: player.avg_unused_util_value,
            }));
            return data;
        })
        const teamsGrenadeStats = teams.map((players, i) => {
            const data = players
              .filter((playerId) => stats[selectedStats].hasOwnProperty(playerId))
              .filter((playerId) => users[playerId].is_bot === false)
              .map((playerId) => [playerId, stats[selectedStats][playerId]])
              .map(([id, player]) => ({
                username: users[id].username,
                avatar: users[id].avatar,
                HEs_thrown: player.he.thrown,
                flashes_thrown: player.flash.thrown,
                smokes_thrown: player.smokes_thrown,
                molos_thrown: player.molo.thrown,
                decoys_thrown: player.decoys_thrown,
              }));
              return data;
          })
        const UtilityTable = ({ teamsStats }) => {
            return (
              <div>
                {teamsStats.map((data, i) => {
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
                      case 'flash_assists':
                          return multiplier * (a.flash_assists - b.flash_assists);
                      case 'enemies_flashed':
                          return multiplier * (a.enemies_flashed - b.enemies_flashed);
                      case 'friends_flashed':
                          return multiplier * (a.friends_flashed - b.friends_flashed);
                      case 'self_flashed':
                          return multiplier * (a.self_flashed - b.self_flashed);
                      case 'avg_blind_time':
                          return multiplier * (a.avg_blind_time - b.avg_blind_time);
                      case 'HE_damage':
                          return multiplier * (a.HE_damage - b.HE_damage);
                      case 'molotov_damage':
                          return multiplier * (a.molotov_damage - b.molotov_damage);
                      case 'avg_unused_util_value':
                          return multiplier * (a.avg_unused_util_value - b.avg_unused_util_value);
                      default:
                        return 0;
                    }
                  });
                  const columns = [
                    { accessor: 'username', label: 'Nickname' },
                    { accessor: 'flash_assists', label: 'Flash Assists' },
                    { accessor: 'enemies_flashed', label: 'Enemies Flashed' },
                    { accessor: 'friends_flashed', label: 'Friends Flashed' },
                    { accessor: 'self_flashed', label: 'Self Flashes' },
                    { accessor: 'avg_blind_time', label: 'AVG Blind Time' },
                    { accessor: 'HE_damage', label: 'HE Damage' },
                    { accessor: 'molotov_damage', label: 'Molo Damage' },
                    { accessor: 'avg_unused_util_value', label: 'AVG Unused Util' },
                  ];
                  return <div key={i} className='mb-3'>
                  <TableTemplate tableData={sortedTeamStats} colNames={columns} onSort={handleSort} />
                  </div>;
                })}
              </div>
            );
          };
          function calculateGrenadeStats(teamGrenadeStats) {
            const grenadeTypes = ['HEs_thrown', 'flashes_thrown', 'smokes_thrown', 'molos_thrown', 'decoys_thrown'];
            const stats = {
              sumOfGrenades: 0,
              flashesThrown: 0,
              HEsThrown: 0,
              molosThrown: 0,
              decoysThrown: 0,
              smokesThrown: 0,
            };
            teamGrenadeStats.forEach(player => {
              grenadeTypes.forEach(grenade => {
                stats[grenade.replace('_thrown', 'Thrown')] += player[grenade];
                stats.sumOfGrenades += player[grenade];
              });
            });
            return stats;
          }
          const team1GrenadesThrown = calculateGrenadeStats(teamsGrenadeStats[0]);
          const team2GrenadesThrown = calculateGrenadeStats(teamsGrenadeStats[1]);
            
        const handleButtonClick = (selectedButton) => {
        setSelectedStats(selectedButton);
        teamsGrenadeStats.forEach(team => {
            team.forEach(player => {
            maxYValue = Math.max(maxYValue, player.flashes_thrown+player.smokes_thrown+player.HEs_thrown+player.molos_thrown+player.decoys_thrown);
        });});
        };

        function transformGrenadeStats(player) {
            return {
              username: player.username,
              HEs: player.HEs_thrown,
              Flashes: player.flashes_thrown,
              Smokes: player.smokes_thrown,
              Molotovs: player.molos_thrown,
              Decoys: player.decoys_thrown
            };
          }
          let chartDataTeam1 = teamsGrenadeStats[0].map(transformGrenadeStats);
          let chartDataTeam2 = teamsGrenadeStats[1].map(transformGrenadeStats);

          const chartDataColors = [
              { columnName: 'Flashes', columnColor: '#913892' },
              { columnName: 'Smokes', columnColor: '#534ea9' },
              { columnName: 'Molotovs', columnColor: '#0E79B2' },
              { columnName: 'Decoys', columnColor: '#309ac1' },
              { columnName: 'HEs', columnColor: '#bab3d5' },
          ];          
          let maxYValue = 0;
          teamsGrenadeStats.forEach(team => {
            team.forEach(player => {
              maxYValue = Math.max(maxYValue, player.flashes_thrown+player.smokes_thrown+player.HEs_thrown+player.molos_thrown+player.decoys_thrown);
          });});

    return (<>
    <div className='general'>
        <div className='details-container'>
        <Navigation />
        <MatchHeader matchInfo={info} selectedButton={"Utility"}></MatchHeader>
        <div>
        <button className={selectedStats === 'ct' ? 'sel-but-ct' : ''} onClick={() => handleButtonClick('ct')}>CT Side</button>
        <button className={selectedStats === 'overall' ? 'sel-but' : ''} onClick={() => handleButtonClick('overall')}>Overall</button>
        <button className={selectedStats === 'tt' ? 'sel-but-tt' : ''} onClick={() => handleButtonClick('tt')}>TT Side</button>
      </div>
      <UtilityTable teamsStats={teamsUtilityStats} />
      <h1 style={{fontSize: '40px', marginTop: '25px'}}>Overall Utility Usage</h1>
      <div className='row'>
        <div className='col'>
        <div className='row'>
            <GrenadeProgressBar name="Flashes" sumOfGrenades={team1GrenadesThrown.sumOfGrenades} grenadeThrown={team1GrenadesThrown.flashesThrown} index={'first'} bgColor={'#913892'}></GrenadeProgressBar>
            <GrenadeProgressBar name="Smokes" sumOfGrenades={team1GrenadesThrown.sumOfGrenades} grenadeThrown={team1GrenadesThrown.smokesThrown} index={''}bgColor={'#534ea9'}></GrenadeProgressBar>
            <GrenadeProgressBar name="Molotovs" sumOfGrenades={team1GrenadesThrown.sumOfGrenades} grenadeThrown={team1GrenadesThrown.molosThrown} index={''}bgColor={'#0E79B2'}></GrenadeProgressBar>
            <GrenadeProgressBar name="Decoys" sumOfGrenades={team1GrenadesThrown.sumOfGrenades} grenadeThrown={team1GrenadesThrown.decoysThrown}  index={''} bgColor={'#309ac1'}></GrenadeProgressBar>
            <GrenadeProgressBar name="HEs" sumOfGrenades={team1GrenadesThrown.sumOfGrenades} grenadeThrown={team1GrenadesThrown.HEsThrown} index={'last'}bgColor={'#bab3d5'}></GrenadeProgressBar>
          </div>
      <StackedChart myData={chartDataTeam1} myColumns={chartDataColors} myDataKey={'username'} myMaxYValue={maxYValue}></StackedChart>
        </div>
        <div className='col'>
      <div className='row'>
            <GrenadeProgressBar name="Flashes" sumOfGrenades={team2GrenadesThrown.sumOfGrenades} grenadeThrown={team2GrenadesThrown.flashesThrown}  index={'first'} bgColor={'#913892'}></GrenadeProgressBar>
            <GrenadeProgressBar name="Smokes" sumOfGrenades={team2GrenadesThrown.sumOfGrenades} grenadeThrown={team2GrenadesThrown.smokesThrown} index={''} bgColor={'#534ea9'}></GrenadeProgressBar>
            <GrenadeProgressBar name="Molotovs" sumOfGrenades={team2GrenadesThrown.sumOfGrenades} grenadeThrown={team2GrenadesThrown.molosThrown} index={''} bgColor={'#0E79B2'}></GrenadeProgressBar>
            <GrenadeProgressBar name="Decoys" sumOfGrenades={team2GrenadesThrown.sumOfGrenades} grenadeThrown={team2GrenadesThrown.decoysThrown}  index={''} bgColor={'#309ac1'}></GrenadeProgressBar>
            <GrenadeProgressBar name="HEs" sumOfGrenades={team2GrenadesThrown.sumOfGrenades} grenadeThrown={team2GrenadesThrown.HEsThrown} index={'last'} bgColor={'#bab3d5'}></GrenadeProgressBar>
          </div>
      <StackedChart myData={chartDataTeam2} myColumns={chartDataColors} myDataKey={'username'} myMaxYValue={maxYValue}></StackedChart>
        </div>
        </div>
        </div>
    </div>
    </>
    )
}

export default MatchUtility;