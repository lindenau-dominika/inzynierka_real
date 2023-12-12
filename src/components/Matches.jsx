import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import ListTemplate from './List';

const MatchesHistory = () => {
  const [matchesList, setMatchesList] = useState([]);
  const [userStats, setUserStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const mapNames = {
    'de_ancient': 'Ancient',
    'de_anubis': 'Anubis',
    'de_mirage': 'Mirage',
    'de_vertigo': 'Vertigo',
    'de_nuke': 'Nuke',
    'de_overpass': 'Overpass',
    'de_dust2': 'Dust 2',
    'de_inferno': 'Inferno',
  };

  const handleUsersMatches = async () => {
    try {
      const response = await fetch('/xd/matches', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const matchesData = data.matches || [];
        setMatchesList(matchesData);

        const responseUser = await fetch('api/user', {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const userPromises = matchesData.map(async (matchesList) => {
          const response1 = await fetch(`/xd/matches/${matchesList.match_ID}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (response1.ok) {
            const data1 = await response1.json();
            const matchData = data1.match_stats || [];
            const userData = data1.users_data.find((userData) => userData.steam_ID === matchData.player_ID);
            return userData || {};
          } else {
            console.error('Error during fetching user');
            return {};
          }
        });

        setUserStats(await Promise.all(userPromises));
      } else {
        console.error('Error during fetching matches history');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const colNames = ['Map', 'Score', 'Rating', 'Kills', 'Deaths', 'KD'];

  const matchesHistory = matchesList.map((maps, index) => [
    mapNames[maps.map],
    `${maps.score}-${maps.score2}`,
    maps.created_at,
    userStats.kills
  ]);

  useEffect(() => {
    handleUsersMatches();
  }, []);

  if (isLoading) {
    return (
      <div>
        <p className='loading col-12'>Loading...</p>;
      </div>
    );
  }

  return <ListTemplate tableData={matchesHistory} colNames={colNames}></ListTemplate>;
};

export default MatchesHistory;
