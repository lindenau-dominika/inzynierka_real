import React, { useEffect, useState } from 'react';
import { TableTemplate } from '../components/Table';
import '../styles/gamestats.css';
import { useParams, useLocation, Link } from 'react-router-dom';


export const MatchPreview = (props) => {
    return (
        <div>
            <h3>{props.date}</h3>
            <h3>{props.mapName}</h3>
            <h2>{`${props.score}-${props.score2}`}</h2>
        </div>
    )
}

const OverviewStats = () => {
    const {matchId} = useParams();
    const [ overallStats, setOverallStats ] = useState();
    const [ ctStats, setctStats ] = useState();
    const [ ttStats, setttStats ] = useState();
    const [ matchInfo, setmatchInfo] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [TTsided, setTTsided] = useState(false);
    const [CTsided, setCTsided] = useState(false);
    const [Overall, setOverall] = useState(true);

    const generateTeamData = (teamStats) => {
        return teamStats.map((user) => [

            {
                image: user.avatar,
                nickname: user.username
            },
            user.rating,
            user.kills,
            user.deaths,
            user.kd,
            user.total_damage,
        ]);
        }
        const overallColNames = [ 'Username','Rating', 'Kills', 'Deaths', 'K/D Ratio', 'Total Damage'];

    const handleMatchOveriew = async () => {
        try {
            const response = await fetch(`/xd/matches/${matchId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                const overall_stats = data.match_overall_stats || [];
                const ct_stats = data.match_ct_stats || [];
                const tt_stats = data.match_tt_stats || [];
                const matches_info = data.match_info || [];
                setOverallStats(overall_stats);
                setctStats(ct_stats);
                setttStats(tt_stats);
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
        handleMatchOveriew();
    }, [matchId]);
    
    if (isLoading) {
        return <p>Loading...</p>; 
    }

    const team0_draft = overallStats.filter(user => user.team === 0);
    const team1_draft = overallStats.filter(user => user.team === 1);
    const team0ct_draft = ctStats.filter(user => user.team ===0);
    const team1tt_draft = ttStats.filter(user => user.team === 1);
    const team1ct_draft = ctStats.filter(user => user.team ===1);
    const team0tt_draft = ttStats.filter(user => user.team === 0);
    const team0 = generateTeamData(team0_draft);
    const team1 = generateTeamData(team1_draft);
    const team0ct = generateTeamData(team0ct_draft);
    const team1ct = generateTeamData(team1ct_draft);
    const team0tt = generateTeamData(team0tt_draft);
    const team1tt = generateTeamData(team1tt_draft);
    const match = matchInfo[0];

    return (<>
    <MatchPreview date={match.created_at} mapName={match.map} score={match.score} score2={match.score2}/>
    <div className='side_buttons_container'>
            <button className={`side_buttons ${CTsided ? 'ct_selected': ''}`} onClick={() => {setCTsided(true); setOverall(false); setTTsided(false)}} type='button'>Counter-terrorists Side</button>
            <button className={`side_buttons ${Overall ? 'oall_selected': ''}`} onClick={() => {setCTsided(false); setOverall(true); setTTsided(false)}} type='button'>Overall</button>
            <button className={`side_buttons ${TTsided ? 'terro_selected': ''}`} onClick={() => {setCTsided(false); setOverall(false); setTTsided(true);}} type='button'>Terrorists Side</button>
    </div>
            {CTsided ? ( <div>
                <div className='ct-container'>
                <TableTemplate tableData={team0ct} colNames={overallColNames}></TableTemplate>
                </div>
                <div className='ct-container'>
                <TableTemplate tableData={team1ct} colNames={overallColNames}></TableTemplate>
                </div>
            </div>
            ) : null}
            {TTsided ? ( <>
                <div className='terro-container'>
                    <TableTemplate tableData={team0tt} colNames={overallColNames}></TableTemplate>
                </div>
                <div className='terro-container'>
                    <TableTemplate tableData={team1tt} colNames={overallColNames}></TableTemplate>
                    </div>
            </>
            ) : null}
            {Overall ? (
                <div>
                    <div className='oall-container'>
                    <TableTemplate tableData={team0} colNames={overallColNames}></TableTemplate>
                    </div>
                    <div className='oall-container'>
                    <TableTemplate tableData={team1} colNames={overallColNames}></TableTemplate>
                    </div>
                </div>
            ) : null}
    </>
    )
}

export default OverviewStats; 
