import { React, useState, useEffect } from "react";
import { Sidenav } from "../components/Sidenav";
import '../styles/gamestats.css'
import OverviewStats from "../components/Overview";
import { useParams } from 'react-router-dom';
import { MatchDetails } from "../components/MatchDetails";

export const MatchPreview = (props) => {
    return (
        <div>
            <h3>{props.date}</h3>
            <h3>{props.mapName}</h3>
            <h2>{`${props.score}-${props.score2}`}</h2>
        </div>
    )
}

export const Gamestats = () => {
    // const [ Overview, setOverview] = useState(true);
    const [isOverview, setIsOverview] = useState(true);
    const [isMatchDetails, setIsMatchDetails] = useState(false);
    // const [MatchDetails, setMatchDetails] = useState();
    const [ matchInfo, setmatchInfo] = useState();
    const {matchId} = useParams();
    const [isLoading, setIsLoading] = useState(true);

    const handleSelectedMatch = async () => {
        try {
            const response = await fetch(`/xd/matches/${matchId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                const matches_info = data.match_info || [];
                setmatchInfo(matches_info);
                setIsLoading(false);
            } else {
                console.error('Error during fetching overall stats')
            }
        } catch(error) {
            console.error(error);
        }
    }

    useEffect(() => {
        handleSelectedMatch();
    },[matchId]);

     
    if (isLoading) {
        return <p>Loading...</p>; 
    }

    const match = matchInfo[0];

    return (
        <>
        <div className="col-3">
        <Sidenav />
        </div>
        <div className="col-21">
        <MatchPreview date={match.created_at} mapName={match.map} score={match.score} score2={match.score2}/>
        <div className="match-buttons-container">
        <button className={`match-buttons ${isOverview ? 'overview-selected': ''}`} onClick={() => {setIsOverview(true); setIsMatchDetails(false)}} type='button'>Overview</button>
        <button className={`match-buttons ${isMatchDetails ? 'overview-selected': ''}`} onClick={() => {setIsOverview(false); setIsMatchDetails(true)}} type='button'>Match Details</button>
        </div>
        {isOverview ? (
            <OverviewStats />
            ) : null}
            {isMatchDetails ? (
                <MatchDetails />
                ) : null}
        </div>
        </>
    )
}