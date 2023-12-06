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
import '../styles/collage.css'

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

export const Collage = () => {
  const [recentMaps, setRecentMaps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleMaps = async () => {
    try {
      const storedMaps = JSON.parse(localStorage.getItem('recentMaps')) || [];

      if (storedMaps.length > 0) {
        setRecentMaps(storedMaps);
      } else {
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
          localStorage.setItem('recentMaps', JSON.stringify(matchesArray));
        } else {
          console.error('Error during fetching');
        }
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
        <Link to={`/statistics/${maps.match_ID}`} key={maps.match_ID}>
          <SingleCard
            key={maps.match_ID}
            image={mapImages[maps.map]}
            map_name={maps.map}
            score={`${maps.score}-${maps.score2}`}
            matchId={maps.match_ID} // Dodaj ten parametr
          />
        </Link>
      ))}
    </Carousel>
  );
};
// console.log(image
export const SingleCard = (props) => {
  const { matchId } = props;

  return (
    <div className='map-container'>
      <div >
        <img src={props.image} alt='ok' />
        <h4>{props.map_name}</h4>
        <h4 className='text'>{props.score}</h4>
        {/* <Link to={`/statistics/${matchId}`}></Link> */}
      </div>
    </div>
  );
};

export default Collage;
