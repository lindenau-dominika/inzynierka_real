import React, { useState, useEffect } from 'react';
import { Carousel } from '@trendyol-js/react-carousel';
import de_ancient from "../assets/de_ancient.png";
import de_anubis from '../assets/de_anubis.png';
import de_mirage from '../assets/de_mirage.png';
import de_vertigo from '../assets/de_vertigo.png';
import de_nuke from '../assets/de_nuke.png';
import de_overpass from '../assets/de_overpass.png';
import de_dust2 from '../assets/de_dust2.png' 
import de_inferno from '../assets/de_inferno.png' 
import { Link } from 'react-router-dom';
import '../styles/collage.css';
import { useMediaQuery } from 'react-responsive';

const mapImages = {
  'de_ancient': de_ancient,
  'de_anubis': de_anubis,
  'de_mirage': de_mirage,
  'de_vertigo': de_vertigo,
  'de_nuke': de_nuke,
  'de_overpass': de_overpass,
  'de_dust2': de_dust2,
  'de_inferno': de_inferno,
};

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
