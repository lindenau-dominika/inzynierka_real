import React, { useState, useEffect, useMemo } from 'react';
import { Carousel } from '@trendyol-js/react-carousel';
import { Link } from 'react-router-dom';
import '../styles/collage.css';
import { useMediaQuery } from 'react-responsive';
import { mapImages, mapNames } from './MapsOrganizer';
import SingleCard from './SingleCard';

export const Collage = () => {
  const [recentMaps, setRecentMaps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const memoizedMapImages = useMemo(() => mapImages, []);
  const memoizedMapNames = useMemo(() => mapNames, []);

  const handleMaps = async () => {
    try {
      const response = await fetch('/xd/matches', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const matchesArray = data.matches.reverse() || [];
        setRecentMaps(matchesArray);
      } else {
        console.error('Error during fetching');
      }

      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleMaps();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Carousel show={3} slide={3} swiping={false} transition={1} autoSwipe={0}>
      {recentMaps.map((maps) => (
        <Link to={`/statistics/${maps.match_id}`} key={maps.match_id}>
          <SingleCard
            key={maps.match_id}
            image={memoizedMapImages[maps.map]}
            map_name={memoizedMapNames[maps.map]}
            score={`${maps.score}-${maps.score2}`}
            matchId={maps.match_id}
          />
        </Link>
      ))}
    </Carousel>
  );
};

export default Collage;
