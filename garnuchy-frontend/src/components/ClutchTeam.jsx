import React, { useState } from 'react';
import '../styles/matchDetails.css'

const ClutchCard = ({ result, playersNumber, score, kills }) => {

    let Tclass;
    switch (result) {
    case 'Win':
        Tclass = 'won';
        break;
    case 'Saved':
        Tclass = 'clutch-card';
        break;
    case 'Lose':
        Tclass = 'lost';
        break;
    default:
        Tclass = 'clutch-card';
    }
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className={Tclass}
    // className={`flex justify-center items-center rounded-3xl w-16 h-16 mb-1 mt-1 ${isHovered ? `bg-${color}-500` : `bg-${color}-600`}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
      
        {isHovered ? (
          <div className='det'>
              <span>{score[0]}-{score[1]}</span>
              <span className=''>kills: {kills}</span>
          </div>
        ) : (
          <span>1v{playersNumber}</span>
        )}
      <div></div>
      </div>
    );
  };


const ClutchPlayer = ({ playerData }) => {
    return (<div>
        <div  className='player-con'>
      <img src={playerData.avatar} alt="Avatar" />
      <p className='nicknames'>{playerData.username}</p>
        </div>
        <div className='clutch-cards'>
      {playerData.clutches.map((player, index) => (
         <div>
          <ClutchCard
          key={index}
          result={player.round_result}
          playersNumber={player.players_number}
          score={player.score}
          kills={player.kills}
          ></ClutchCard>
          </div>
    ))}
    </div>
      </div>
      );
    };


const ClutchTeam = ({ teamData }) => {
  return (
    <div className='team-clutches'>
      {teamData.map((player, index) => (
      <ClutchPlayer key={index}
        playerData={player}
      ></ClutchPlayer>
    ))}
    </div>
    );
  };

export default ClutchTeam;