import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TableTemplate from '../templates/Table';
import '../styles/gamestats.css';
import Clutches from '../subpages/Clutches';
import ElGeneral from '../subpages/General';
import Utility from '../subpages/Utility';
import Trades from '../subpages/Trades';
import Aim from '../subpages/Aim';


export const MatchDetails = () => {
    const {matchId} = useParams();
    const [selectedSteamId, setSelectedSteamId] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [Overall, setOverall] = useState(true);
    const [TTsided, setTTsided] = useState(false);
    const [CTsided, setCTsided] = useState(false);
    // const [General, setGeneral] = useState([]);
    
    const [isGeneral, setIsGeneral] = useState(true);
    const [isClutches, setIsClutches] = useState(false);
    const [isUtility, setIsUtility] = useState(false);
    const [isTradesOK, setIsTradesOK] = useState(false);
    const [isAim, setIsAim] = useState(false);

    const [isWeapons, setIsWeapons] = useState(false);

    
    // const generateSelectedPlayer = (playersWeapon) => {
    //     return playersWeapon.map((player) => [
    //         player.username,
    //         player.avatar,
    //         player.steam_id,
    //     ])
    // }

    useEffect(() => {
        setIsLoading(false);
    }, [matchId, selectedSteamId]);
    
if (isLoading) {
    return <p>Loading...</p>
}

// const selectedPlayer = generateSelectedPlayer(General); 

    return (<>
    <div className='match-buttons-container'>
        <button className={`side-buttons ${isGeneral ? 'ct-selected': ''}`} onClick={() => {setIsGeneral(true); setIsClutches(false); setIsUtility(false); setIsTradesOK(false); setIsAim(false)}} type='button'>General</button>
        <button className={`side-buttons ${isClutches ? 'ct-selected': ''}`} onClick={() => {setIsGeneral(false); setIsClutches(true); setIsUtility(false); setIsTradesOK(false); setIsAim(false)}} type='button'>Clutches</button>
        <button className={`side-buttons ${isUtility ? 'ct-selected': ''}`} onClick={() => {setIsGeneral(false); setIsClutches(false); setIsUtility(true); setIsTradesOK(false); setIsAim(false)}} type='button'>Utility</button>
        <button className={`side-buttons ${isTradesOK ? 'ct-selected': ''}`} onClick={() => {setIsGeneral(false); setIsClutches(false); setIsUtility(false); setIsTradesOK(true); setIsAim(false)}} type='button'>Trades & ok</button>
        <button className={`side-buttons ${isAim ? 'ct-selected': ''}`} onClick={() => {setIsGeneral(false); setIsClutches(false); setIsUtility(false); setIsTradesOK(false); setIsAim(true)}} type='button'>Aim</button>
    </div>
    <div className='side-buttons-container'>
            <button className={`side-buttons ${CTsided ? 'ct-selected': ''}`} onClick={() => {setCTsided(true); setOverall(false); setTTsided(false); setIsWeapons(false)}} type='button'>Counter-terrorists Side</button>
            <button className={`side-buttons ${Overall ? 'oall-selected': ''}`} onClick={() => {setCTsided(false); setOverall(true); setTTsided(false); setIsWeapons(false)}} type='button'>Overall</button>
            <button className={`side-buttons ${TTsided ? 'terro-selected': ''}`} onClick={() => {setCTsided(false); setOverall(false); setTTsided(true); setIsWeapons(false)}} type='button'>Terrorists Side</button>
            <>
            {isAim? (<button className={`side-buttons ${isWeapons ? 'oall-selected': ''}`} onClick={() => {setCTsided(false); setOverall(false); setTTsided(false); setIsWeapons(true)}}>Weapon Stats</button>) : null}
            </>
    </div>
        {isGeneral & Overall? (
            <ElGeneral isOverall={true}/>
        ) : null}
        {isGeneral & CTsided ? (
            <ElGeneral isCTsided={true}/>
        ) : null}
        {isGeneral & TTsided ? (
            <ElGeneral isTTsided={true}/>
        ) : null}
        {isClutches & Overall ? (
            <Clutches isOverall={true} />
        ) : null}        
        {isClutches & CTsided ? (
            <Clutches isCTsided={true} />
        ) : null}      
        {isClutches & TTsided ? (
            <Clutches isTTsided={true} />
        ) : null}
        {isUtility & Overall ? (
            <Utility isOverall={true}/>
        ) : null}
        {isUtility & CTsided ? (
            <Utility isCTsided={true}/>
        ) : null}
        {isUtility & TTsided ? (
            <Utility isTTsided={true}/>
        ) : null}
        {isTradesOK & Overall ? (
            <Trades isOverall={true}/>
        ) : null}
        {isTradesOK & CTsided ? (
            <Trades isCTsided={true}/>
        ) : null}
        {isTradesOK & TTsided ? (
            <Trades isTTsided={true}/>
        ) : null}
        {isAim & Overall ? (
            <Aim isOverall={true}/>
        ) : null}
        {isAim & CTsided ? (
            <Aim isCTsided={true}/>
        ) : null}
        {isAim & TTsided ? (
            <Aim isTTsided={true}/>
        ) : null}
        {isAim && isWeapons ? (
            <Aim isWeapons={true}/>
) : null}
    </>
    )
}

export default MatchDetails;