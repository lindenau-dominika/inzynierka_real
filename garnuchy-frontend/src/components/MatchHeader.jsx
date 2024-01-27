import { mapImages, mapNames } from "./MapOrganizer";
import React from 'react';
import '../styles/matchHeader.css'

const MatchHeader = ({ matchInfo, active }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
        weekday: 'long',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  return (
    <header>
    <div className="header-container">
        <div className="graddi" style={{ 
            backgroundImage: `linear-gradient(to top, #07070c 10%, rgba(0,0,0,0) 100%), url(${mapImages[matchInfo.map]})` 
            }}>
                <p className="map-name">{mapNames(matchInfo.map)}</p>
                <p className="score">{matchInfo.score[0]}-{matchInfo.score[1]}</p>
                <p className="score">{formatDate(matchInfo.created_at)}</p>
        </div>
    </div>
    </header>
  )

}

export default MatchHeader;