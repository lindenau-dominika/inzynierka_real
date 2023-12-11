import React, { useEffect, useState } from 'react';
import { TableTemplate } from '../components/Table';
import '../styles/gamestats.css';
import { useParams, useLocation, Link } from 'react-router-dom';

const MatchStats = () => {
  const { matchId} = useParams();
  const { scoreValue, mapName } = useLocation().state;
  const [team1t, setTeam1t] = useState([]);
  const [team2ct, setTeam2ct] = useState([]);
  const [team1ct, setTeam1ct] = useState([]);
  const [team2t, setTeam2t] = useState([]);
  const [users1, setUsers1] = useState([]);
  const [users2, setUsers2] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const colNames = [ 'Username','Rating', 'Kills', 'Deaths', 'Assists', 'K/D Ratio', 'Total Damage'];
  
  const handleMatch = async () => {
    try {
      const response = await fetch(`/xd/matches/${matchId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const match = data.match_stats || [];
        const users = data.users_data || [];
        const uniqueUsers = users.filter((value, index, self) =>
          index === self.findIndex((v) => (
            v.steam_ID === value.steam_ID && v.username === value.username
          ))
        );
        setUsers1(uniqueUsers.slice(0,5));
        setUsers2(uniqueUsers.slice(5, 10));
        setTeam1t(match.slice(0, 5));
        setTeam2ct(match.slice(5, 10));
        setTeam1ct(match.slice(10, 15))
        setTeam2t(match.slice(15));
      } else {
        console.error('Error during fetching');
      }
      setIsLoading(false); 
    } catch (error) {
      console.error(error);
    }
  }
  const team1 = team1t.map((user1t, index) => [
    {
        image: users1[index].avatar,
        username: user1t.player_ID,
        nickname: users1[index].username
    },
    {
        rating: user1t.rating
    },
    user1t.kills + team1ct[index].kills,
    user1t.deaths + team1ct[index].deaths,
    user1t.assists + team1ct[index].assists,
    user1t.deaths !== 0
        ? ((user1t.kills + team1ct[index].kills) / (user1t.deaths + team1ct[index].deaths)).toFixed(2)
        : ((user1t.kills + team1ct[index].kills) / 1).toFixed(2),
    user1t.total_damage + team1ct[index].total_damage
]);

const team2 = team2t.map((user2t, index) => [
    {
        image: users2[index].avatar,
        username: user2t.player_ID,
        nickname: users2[index].username
    },
    {
        rating: user2t.rating
    },
    user2t.kills + team2ct[index].kills,
    user2t.deaths + team2ct[index].deaths,
    user2t.assists + team2ct[index].assists,
    user2t.deaths !== 0
        ? ((user2t.kills + team2ct[index].kills) / (user2t.deaths + team2ct[index].deaths)).toFixed(2)
        : (user2t.kills / 1).toFixed(2),
    user2t.total_damage + team2ct[index].total_damage,
]);


  useEffect(() => {
    handleMatch();
  }, [matchId, scoreValue, mapName]);

  if (isLoading) {
    return <p>Loading...</p>; 
  }
  return ( <>
    <div className='col-3'></div>
    <div className='tables-container col-21'>
      <h2>{mapName} {scoreValue}</h2>
      <TableTemplate tableData={team1} colNames={colNames} />
      <TableTemplate tableData={team2} colNames={colNames} />
    </div>
  </>
  );
};
export default MatchStats;
