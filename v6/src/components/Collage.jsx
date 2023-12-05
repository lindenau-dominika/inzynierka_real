import React from 'react'
import { Carousel } from '@trendyol-js/react-carousel'
import Ancient from "../assets/Ancient.png"
import '../styles/collage.css'
import Mirage from '../assets/Mirage_CS2.png'
import Dust from '../assets/najs.jpg'
import Vertigo from '../assets/Vertigo.png'
import Nuke from '../assets/Nuke_map.png'
import Overpass from '../assets/overpass.png'
import {Link} from 'react-router-dom'

export const SingleCard = (props) =>
{
  return (
    <div className='map-container'>
      <div className='single-map'>
        <img src={props.image} alt='ok'/>
        <h4>{props.map_name}</h4>
        <h4 className='text'>{props.score} </h4>
      </div>
   </div>
  )
}

export const Collage = () => {
  const recent_maps = [
    { map_image: Nuke, map_name: 'Nuke', map_score: '13-2' },
    { map_image: Overpass, map_name: 'Overpass', map_score: '13-5' },
    { map_image: Vertigo, map_name: 'Vertigo', map_score: '13-2' },
    { map_image: Mirage, map_name: 'Mirage', map_score: '13-2' },
    { map_image: Ancient, map_name: 'Ancient', map_score: '13-2' },
    { map_image: Ancient, map_name: 'Ancient', map_score: '13-2' },
  ];

  return (
    <Carousel show={3} slide={3} swiping={false} transition={1} autoSwipe={0}>
      {recent_maps.map((map, key) => (
        // <Link to={`/statistics/${map_name}`}>
        <SingleCard image={map.map_image} map_name={map.map_name} score={map.map_score} key={key} />
        // </Link>
      ))}
    </Carousel>
  )
}

export default Collage;