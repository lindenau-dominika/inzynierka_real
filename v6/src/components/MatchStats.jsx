import React, { useEffect, useState } from 'react';
import { TableTemplate } from '../components/Table';
import '../styles/gamestats.css';
import { useParams, Link } from 'react-router-dom';
import player1 from '../assets/player1.jpg';
import player2 from '../assets/player2.jpg';
import player3 from '../assets/player3.jpg';
import player4 from '../assets/player4.jpg';
import player5 from '../assets/player5.jpg';
import player6 from '../assets/player6.jpg';
import player7 from '../assets/player7.jpg';
import player8 from '../assets/player8.jpg';
import player9 from '../assets/player9.jpg';
import player10 from '../assets/player10.jpg';

const MatchStats = () => {
  const { matchId } = useParams();
  const [team1t, setTeam1t] = useState([]);
  const [team2ct, setTeam2ct] = useState([]);
  const [team1ct, setTeam1ct] = useState([]);
  const [team2t, setTeam2t] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const colNames = [ 'Username', 'Kills', 'Deaths', 'Assists', 'K/D Ratio', 'Total Damage', 'head_accuracy'];
  
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
        const team1t = match.slice(0, 5);
        const team2ct = match.slice(5, 10);
        const team1ct = match.slice(10, 15);
        const team2t = match.slice(15);
        setTeam1t(team1t);
        setTeam2ct(team2ct);
        setTeam1ct(team1ct)
        setTeam2t(team2t);
        // console.log('team1', team1t)
      } else {
        console.error('Error during fetching');
      }
      setIsLoading(false); 
    } catch (error) {
      console.error(error);
    }
  }

  const tableData1 = team1t.map((user1t) => [
    user1t.kills,
    user1t.deaths,
    user1t.assists,
    user1t.deaths !== 0 ? (user1t.kills / user1t.deaths).toFixed(2) : (user1t.kills / 1).toFixed(2),
    user1t.total_damage,
    user1t.head_accuracy,
  ]);
  
  const tableData2 = team1ct.map((user1ct) => [
    user1ct.kills,
    user1ct.deaths,
    user1ct.assists,
    user1ct.deaths !== 0 ? (user1ct.kills / user1ct.deaths).toFixed(1) : (user1ct.kills / 1).toFixed(1),
    user1ct.total_damage,
    user1ct.head_accuracy,
  ]);

  const tableData3 = team2t.map((user2t) => [
    user2t.kills,
    user2t.deaths,
    user2t.assists,
    user2t.deaths !== 0 ? (user2t.kills / user2t.deaths).toFixed(2) : (user2t.kills / 1).toFixed(2),
    user2t.total_damage,
    user2t.head_accuracy,
  ]);
  
  const tableData4 = team2ct.map((user2ct) => [
    user2ct.kills,
    user2ct.deaths,
    user2ct.assists,
    user2ct.deaths !== 0 ? (user2ct.kills / user2ct.deaths).toFixed(2) : (user2ct.kills / 1).toFixed(2),
    user2ct.total_damage,
    user2ct.head_accuracy,
  ]);

  const playerImages = [
    player1,
    player2,
    player3,
    player4,
    player5,
    player6,
    player7,
    player8,
    player9,
    player10,

  ];
  const team1 = team1t.map((user1t, index) => [
    {image: playerImages[index], username: user1t.player_ID},
    user1t.kills + team1ct[index].kills,
    user1t.deaths + team1ct[index].deaths,
    user1t.assists + team1ct[index].assists,
    user1t.deaths !== 0
      ? ((user1t.kills + team1ct[index].kills) / (user1t.deaths + team1ct[index].deaths)).toFixed(2)
      : ((user1t.kills + team1ct[index].kills) / 1).toFixed(2),
    user1t.total_damage + team1ct[index].total_damage,
    user1t.head_accuracy + team1ct[index].head_accuracy + '%',
  ]);
  
  
  const team2 = team2t.map((user2t, index) => [
    {image: playerImages[index+5], username: user2t.player_ID},
    user2t.kills + team2ct[index].kills,
    user2t.deaths + team2ct[index].deaths,
    user2t.assists + team2ct[index].assists,
    user2t.deaths !== 0
      ? ((user2t.kills + team2ct[index].kills) / (user2t.deaths + team2ct[index].deaths)).toFixed(2)
      : (user2t.kills / 1).toFixed(2),
    user2t.total_damage + team2ct[index].total_damage,
    user2t.head_accuracy + team2ct[index].head_accuracy + '%',
  ]);
  

  
  
  

  useEffect(() => {
    handleMatch();
  }, [matchId]); // Dodaj matchId jako zależność useEffect

  if (isLoading) {
    return <p>Loading...</p>; 
  }
  return (
    <div className='tables-container'>
      <TableTemplate tableData={team1} colNames={colNames} />
      <TableTemplate tableData={team2} colNames={colNames} />
    </div>
  );
};

export default MatchStats;
