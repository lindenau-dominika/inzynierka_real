import React, { useState, useEffect, useMemo } from 'react';
import { Carousel } from '@trendyol-js/react-carousel';
import { Link } from 'react-router-dom';
import '../styles/collage.css';
import { useMediaQuery } from 'react-responsive';
import { mapImages, mapNames } from '../templates/MapsOrganizer';
import SingleCard from '../templates/SingleCard';
import Arrow from '../assets/arrow.svg'

const CustomButton = ({ children, onClick, disabled, dir }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      background: 'none',
      border: 'none',
      padding: 0,
      margin: 0,
    }}
  >
    {dir === 'r' ? (
      <span className={'custom-butt'} style={{ transform: 'rotate(-90deg)', display: 'inline-block', marginLeft: '-120px' }}>
        {children}
      </span>
    ) : (
      <span className={'custom-butt'} style={{ transform: 'rotate(90deg)', display: 'inline-block', marginRight: '-100px' }}>
        {children}
      </span>
    )}
  </button>
);
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
<Carousel show={3} slide={3} swiping={false} transition={0.6} autoSwipe={0} leftArrow={<CustomButton dir={'l'}><img src={Arrow}/></CustomButton>} rightArrow={<CustomButton dir={'r'}><img src={Arrow}/></CustomButton>}>
      {recentMaps.slice(0, 50).map((maps) => (
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
