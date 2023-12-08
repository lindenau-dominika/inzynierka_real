import {React, useState} from 'react'
import { Carousel } from '@trendyol-js/react-carousel'
import Ancient from "../assets/Ancient.png"
import '../styles/collage.css'
import de_mirage from '../assets/Mirage_CS2.png'
import de_dust_2 from '../assets/najs.jpg'
import de_vertigo from '../assets/Vertigo.png'
import de_nuke from '../assets/Nuke_map.png'
import de_overpass from '../assets/overpass.png'
import de_ancient from '../assets/Ancient.png'
import de_inferno from '../assets/inferno.png'


export const SingleCard = (props) =>
{
  return (
    <div className='map-container'>
      <div className='single-map'>
        <img src={props.image} alt='map preview'/>
        <h4>{props.map_name}</h4>
        <h4 className='text'>{props.score} </h4>
      </div>
   </div>
  )
}

export const Collage = () => {
  const [recentMaps, setRecentMaps] = useState([]);

  const handleMaps = async () => {
    try {
      const response = await fetch('/api/matches', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setRecentMaps(data.matches);
      } else {
        console.error('Error during fetching');
      }
    } catch (error) {
      console.error(error);
    }
  };

useEffect(() => {
  handleMaps(); }, []);

  return (
    <Carousel show={3} slide={3} swiping={false} transition={1} autoSwipe={0}>
      {recentMaps.map((map, key) => (
        <SingleCard image={map.map_image} map_name={map.map_name} score={map.map_score} key={key} />
      ))}
    </Carousel>
  )
}

export default Collage;