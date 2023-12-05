import React from 'react';
import { TableTemplate } from '../components/Table';
import '../styles/gamestats.css';
import AvatarImage from '../assets/najs.jpg'

const MatchStats = () => {
  const rounds = 20;

  const team_1 = [
    { id: 1, image: AvatarImage, username: 'Zira', kills: 18, deaths: 13, assists: 7, headshots: 13, total_damage: 2137 },
    { id: 2, image: AvatarImage,  username: 'Kolieks', kills: 13, deaths: 50, assists: 7, headshots: 13, total_damage: 2137 },
    { id: 3, image: AvatarImage,  username: 'Piku', kills: 20, deaths: 15, assists: 7, headshots: 13, total_damage: 2137 },
    { id: 4, image: AvatarImage,  username: 'Masterio', kills: 18, deaths: 12, assists: 7, headshots: 13, total_damage: 2137 },
    { id: 5, image: AvatarImage,  username: 'Lucyia', kills: 13, deaths: 50, assists: 7, headshots: 13, total_damage: 2137 },
  ];
  
  const team_2 = [
    { id: 6,  image: AvatarImage, username: 'Dedpullo', kills: 25, deaths: 10, assists: 8, headshots: 15, total_damage: 2500 },
    { id: 7,  image: AvatarImage, username: 'Kossus', kills: 15, deaths: 20, assists: 5, headshots: 10, total_damage: 1800 },
    { id: 8,  image: AvatarImage, username: 'Kubusss', kills: 22, deaths: 18, assists: 9, headshots: 12, total_damage: 2200 },
    { id: 9,  image: AvatarImage, username: 'Hromak', kills: 20, deaths: 15, assists: 7, headshots: 13, total_damage: 2100 },
    { id: 10,  image: AvatarImage,  username: 'Mhajkel', kills: 18, deaths: 12, assists: 7, headshots: 13, total_damage: 2000 },
  ];
  
  const colNames = [ 'Username', 'Kills', 'Deaths', 'Assists', 'K/D Ratio', 'Total Damage', 'Headshots'];
  
  const tableData1 = team_1.map((user) => [
    {image: user.image, username: user.username},
    user.kills,
    user.deaths,
    user.assists,
    user.deaths !== 0 ? (user.kills / user.deaths).toFixed(2) : (user.kills / 1).toFixed(2),
    user.total_damage,
    user.headshots,
  ]);
  
  const tableData2 = team_2.map((user) => [
    {image: user.image, username: user.username},
    user.kills,
    user.deaths,
    user.assists,
    user.deaths !== 0 ? (user.kills / user.deaths).toFixed(2) : (user.kills / 1).toFixed(2),
    user.total_damage,
    user.headshots,
  ]);
  
  return (
    <div className='tables-container'>
      <TableTemplate tableData={tableData1} colNames={colNames} />
      <TableTemplate tableData={tableData2} colNames={colNames} />
    </div>
  );
};

export default MatchStats;
// const handleUser = async () => {
//     try {
//         const response = await fetch('/api/$matchsts', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//         if (response.ok){
//             const data = await response.json();
//             setUserData(data)
//         } else {
//             console.error('Error during fetching');
//         }
//     } catch (error) {
//         console.error(error);
//     }; 
// }