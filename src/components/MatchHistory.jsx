import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import ListTemplate from './List';

export const MatchesHistory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [matchesHistory, setMatchesHistory] = useState([]);
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

  const handleMatchHistory = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/xd/matches`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const matchesArray = data.matches.reverse() || [];
        setMatchesHistory(matchesArray);
        setIsLoading(false);
      } else {
        console.error('Error during fetching overall stats');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const historyColNames = ['Date', 'Map', 'Score', 'Platform'];

  useEffect(() => {
    handleMatchHistory();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const MatchesHistoryList = matchesHistory.slice(0,50).map((match) => ({
      createdAt: match.created_at,
      map: mapNames[match.map],
      score: `${match.score}-${match.score2}`,
      platform: match.platform,
      matchId: match.match_id,
  }));

  console.log(MatchesHistoryList);
  return (
    <ListTemplate listData={MatchesHistoryList} colNames={historyColNames} />
  );
};

export default MatchesHistory;
