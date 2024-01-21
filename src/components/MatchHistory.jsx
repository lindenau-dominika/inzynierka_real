import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import ListTemplate from '../templates/List';
import { mapNames } from '../templates/MapsOrganizer';

export const MatchesHistory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [matchesHistory, setMatchesHistory] = useState([]);

  const memoizedMapNames = useMemo(() => mapNames, []);

  const handleMatchHistory = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/xd/matches?limit=30`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const matchesArray = data.matches.reverse() || [];
        setMatchesHistory(matchesArray);
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
    return <ListTemplate listData={['Loading']} colNames={['Loading']} />;
  }

  const MatchesHistoryList = matchesHistory.slice(0, 30).map((match) => ({
    
    createdAt: match.created_at,
    map: memoizedMapNames[match.map] || match.map,
    score: `${match.score}-${match.score2}`,
    platform: match.platform,
    matchId: match.match_id,
  }));

  return <ListTemplate listData={MatchesHistoryList} colNames={historyColNames} />;
};

export default MatchesHistory;
