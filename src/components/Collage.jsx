import React, { useState, useEffect } from 'react';
import { Carousel } from '@trendyol-js/react-carousel';
import { Link } from 'react-router-dom';
import '../styles/collage.css';
import { useMediaQuery } from 'react-responsive';
import {mapImages, mapNames} from './MapsOrganizer';



export const Collage = () => {
  const [recentMaps, setRecentMaps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const isSmallScreen = useMediaQuery({ maxWidth: 1200 });
  const isMediumScreen = useMediaQuery({ maxWidth: 1500 });

  const showItems = isSmallScreen ? 2 : isMediumScreen ? 3 : 4;

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
    return <div>
    <p className='loading col-12'>Loading...</p>; 
    </div>
  }

  return (
    <Carousel show={showItems} slide={showItems} swiping={false} transition={1} autoSwipe={0}>
      {recentMaps.map((maps) => (
        <Link to={`/statistics/${maps.match_id}`} key={maps.match_id}>
          <SingleCard
            key={maps.match_id}
            image={mapImages[maps.map]}
            map_name={mapNames[maps.map]}
            score={`${maps.score}-${maps.score2}`}
            matchId={maps.match_id}
          />
        </Link>
      ))}
    </Carousel>
  );
};

export const SingleCard = (props) => {
  return (
    <div className='map-container'>
      <div>
        <img src={props.image} alt='ok' />
        <h4>{props.map_name}</h4>
        <h4 className='text'>{props.score}</h4>
      </div>
    </div>
  );
};

export default Collage;
