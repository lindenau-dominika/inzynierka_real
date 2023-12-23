import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TableTemplate from './Table';
import '../styles/gamestats.css';

export const MatchDetails = () => {
    const {matchId} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [isGeneral, setIsGeneral] = useState(true);
    const [Overall, setOverall] = useState(true);
    const [TTsided, setTTsided] = useState(false);
    const [CTsided, setCTsided] = useState(false);
    const [General, setGeneral] = useState([]);
    const [ctGeneral, setCtGeneral] = useState([]);
    const [ttGeneral, setTtGeneral] = useState([]);

    const [isClutches, setIsClutches] = useState(false);
    const [Clutches, setClutches] = useState([]); //Clutches
    const [ctClutches, setCtClutches] = useState([]);
    const [ttClutches, setTtClutches] = useState([]);
    const [isUtility, setIsUtility] = useState(false);
    const [Utility, setUtility] = useState(false);
    const [ctUtility, setCtUtility] = useState(false);
    const [ttUtility, setTtUtility] = useState(false);


    const generateGeneralData = (teamStats) => {
        return teamStats.map((user) => [
            {
                image: user.avatar,
                nickname: user.username,
            },
            user.rating,
            user.kills,
            user.deaths,
            user.kd,
            user.total_damage,
            user.hs_kill_percent,
            user.rounds_survived,
        ]);
      };

      const generateClutchesData = (teamStats) => {
        return teamStats.map((user) => [
            {
                image: user.avatar,
                nickname: user.username,
            },
            user.null,
            user._2k,
            user._3k,
            user._4k,
            user._5k,
            user._1v1,
            user._1v2,
            user._1v3,
            user._1v4,
            user._1v5,
            user._1v1_won,
            user._1v2_won,
            user._1v3_won,
            user._1v4_won,
            user._1v5_won,
        ]);
      };

      const generateUtilityData = (teamStats) => {
        return teamStats.map((user) => [
            {
                image: user.avatar,
                nickname: user.username,
            },
            user.null,
            user.enemies_flashed,
            user.flash_assists,
            user.friends_flashed,
            user.self_flashed,
            user.HE_damage,
            user.molotov_damage,
            user.avg_blind_time.toFixed(2),
            user.avg_unused_util_value,
            user.HEs_thrown,
            user.decoys_thrown,
            user.flashes_thrown,
            user.smokes_thrown,
            user.molos_thrown
        ]);
      }

    const GenColNames = [ 'Username','Rating', 'Kills', 'Deaths', 'K/D Ratio', 'Total Damage', 'Hs kill %', 'Rounds Survived'];
    
    const ClutchColNames = ['username', '','_2k', '_3k', '_4k', '_5k',
    '_1v1', '_1v2', '_1v3', '_1v4', '_1v5', '_1v1_won', '_1v2_won', '_1v3_won', '_1v4_won', '_1v5_won']

    const UtilityColNames = ['Username','', 'Enemies flashed', 'Flash assists', 'Friends flashed', 'Self-flashed', 'HE Damage', 'Molotov damage',
        'AVG Blind Time', 'AVG unused Util Value', 'HE\'s thrown', 'Decoys thrown', 'Flashes Thrown', 'Smokes Thrown', 'Molos Thrown']
    
    const handleMatchDetailsGeneral = async () => {
        try {
            const response = await fetch(`/xd/matches/${matchId}/details/general`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                const generalStats = data.match_details_general_stats || [];
                const generalCtStats = data.match_details_general_ct_stats || [];
                const generalTtStats = data.match_details_general_tt_stats || [];
                setGeneral(generalStats);
                setCtGeneral(generalCtStats);
                setTtGeneral(generalTtStats);
                setIsLoading(false);
            } else {
                console.error('Error during fetching details stats')
            }
        } catch(error) {
            console.error(error);
        }
    } 

    const handleMatchDetailsClutches = async () => {
        try {
            const response = await fetch(`/xd/matches/${matchId}/details/clutches`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        });
        
        if (response.ok) {
            const data = await response.json()
            const clutches = data.match_details_clutches_stats || [];
            const ct_clutches = data.match_details_clutches_ct_stats || [];
            const tt_clutches = data.match_details_clutches_tt_stats || [];
            // console.log(data)
            setClutches(clutches);
            setCtClutches(ct_clutches);
            setTtClutches(tt_clutches);
        } else {
            console.error('Error during fetching clutches')
        }
        
    } catch(error) {
        error(error);
    }
}

    const handleMatchDetailsUtility = async () => {
        try {
            const response = await fetch(`/xd/matches/${matchId}/details/utility`, {
                method: 'GET',
                headers: {'Content-Type' : 'application/json'},
            });
            if (response.ok) {
                const data = await response.json();
                const utility = data.match_details_utility_stats || [];
                const utility_ct = data.match_details_utility_ct_stats || [];
                const utility_tt = data.match_details_utility_tt_stats || [];
                setUtility(utility);
                setCtUtility(utility_ct);
                setTtUtility(utility_tt);
                console.log(utility)
            }
        } catch(error) {
            console.error(error);
        }
    }

useEffect(() => {
    handleMatchDetailsClutches(); 
    handleMatchDetailsGeneral();
    handleMatchDetailsUtility();
}, [matchId]);

if (isLoading) {
    return <p>Loading...</p>
}
const t0General = generateGeneralData(General.filter(user => user.team === 0)) || [];
const t1General = generateGeneralData(General.filter(user => user.team === 1)) || [];
const t0CtGeneral = generateGeneralData(ctGeneral.filter(user => user.team === 0)) || [];
const t1CtGeneral = generateGeneralData(ctGeneral.filter(user => user.team === 1)) || [];
const t0TtGeneral = generateGeneralData(ttGeneral.filter(user => user.team === 0));
const t1TtGeneral = generateGeneralData(ttGeneral.filter(user => user.team === 1));

const t0Clutches = generateClutchesData(Clutches.filter(user => user.team === 0)) || [];
const t1Clutches = generateClutchesData(Clutches.filter(user => user.team === 1)) || [];
const t0CtClutches = generateClutchesData(ctClutches.filter(user => user.team === 0));
const t1CtClutches = generateClutchesData(ctClutches.filter(user => user.team === 1));
const t0TtClutches = generateClutchesData(ttClutches.filter(user => user.team === 0));
const t1TtClutches = generateClutchesData(ttClutches.filter(user => user.team === 1));

const t0Utility = generateUtilityData(Utility.filter(user => user.team === 0)) || [];
const t1Utility = generateUtilityData(Utility.filter(user => user.team === 1)) || [];
const t0CtUtility = generateUtilityData(ctUtility.filter(user => user.team === 0)) || [];
const t1CtUtility = generateUtilityData(ctUtility.filter(user => user.team === 1)) || [];
const t0TtUtility = generateUtilityData(ttUtility.filter(user => user.team === 0)) || [];
const t1TtUtility = generateUtilityData(ttUtility.filter(user => user.team === 1)) || [];


    
    return (<>
    <div className='match-buttons-container'>
        <button className={`side-buttons ${isGeneral ? 'ct-selected': ''}`} onClick={() => {setIsGeneral(true); setIsClutches(false); setIsUtility(false)}} type='button'>General</button>
        <button className={`side-buttons ${isClutches ? 'ct-selected': ''}`} onClick={() => {setIsGeneral(false); setIsClutches(true); setIsUtility(false)}} type='button'>Clutches</button>
        <button className={`side-buttons ${isUtility ? 'ct-selected': ''}`} onClick={() => {setIsGeneral(false); setIsClutches(false); setIsUtility(true)}} type='button'>Utility</button>
        {/* <button className={`side-buttons ${isUtility ? 'ct-selected': ''}`} onClick={() => {setIsGeneral(false); setIsClutches(false); setIsUtility(true)}} type='button'>Other</button> */}
        {/* <button className={`side-buttons ${isClutches ? 'ct-selected': ''}`} onClick={() => {isGeneral(false); isClutches(true); isUtility(false)}} type='button'>Trades and Opening Kills TODO</button>
        <button className={`side-buttons ${isClutches ? 'ct-selected': ''}`} onClick={() => {isGeneral(false); isClutches(true); isUtility(false)}} type='button'>Aim TODO</button>
    <button className={`side-buttons ${isClutches ? 'ct-selected': ''}`} onClick={() => {isGeneral(false); isClutches(true); isUtility(false)}} type='button'>Other TODO</button> */}

    </div>
    <div className='side-buttons-container'>
            <button className={`side-buttons ${CTsided ? 'ct-selected': ''}`} onClick={() => {setCTsided(true); setOverall(false); setTTsided(false)}} type='button'>Counter-terrorists Side</button>
            <button className={`side-buttons ${Overall ? 'oall-selected': ''}`} onClick={() => {setCTsided(false); setOverall(true); setTTsided(false)}} type='button'>Overall</button>
            <button className={`side-buttons ${TTsided ? 'terro-selected': ''}`} onClick={() => {setCTsided(false); setOverall(false); setTTsided(true);}} type='button'>Terrorists Side</button>
    </div>
        {isGeneral & Overall? (<>
            <div className='oall-container'>
                <TableTemplate tableData={t0General} colNames={GenColNames}/>
            </div>
            <div className='oall-container'>
                <TableTemplate tableData={t1General} colNames={GenColNames}/>
            </div>
                </>
        ) : null}
        {isGeneral & CTsided ? (
            <>
            <div className='ct-container'>
                <TableTemplate tableData={t0CtGeneral} colNames={GenColNames}/>
            </div>
            <div className='ct-container'>
                <TableTemplate tableData={t1CtGeneral} colNames={GenColNames}/>
            </div>
                </>
        ) : null}
                {isGeneral & TTsided ? (
                    <>
            <div className='terro-container'>
                <TableTemplate tableData={t0TtGeneral} colNames={GenColNames}/>
            </div>
            <div className='terro-container'>
                <TableTemplate tableData={t1TtGeneral} colNames={GenColNames}/>
            </div>
                </>
        ) : null}
        
                {isClutches & Overall ? (
                    <>
            <div className='oall-container'>
                <TableTemplate tableData={t0Clutches} colNames={ClutchColNames}/>
            </div>
            <div className='oall-container'>
                <TableTemplate tableData={t1Clutches} colNames={ClutchColNames}/>
            </div></>
        ) : null}        
                {isClutches & CTsided ? (
                    <>
            <div className='ct-container'>
                <TableTemplate tableData={t0CtClutches} colNames={ClutchColNames}/>
            </div>
            <div className='ct-container'>
                <TableTemplate tableData={t1CtClutches} colNames={ClutchColNames}/>
            </div></>
        ) : null}      
                {isClutches & TTsided ? (<>
            <div className='terro-container'>
                <TableTemplate tableData={t0TtClutches} colNames={ClutchColNames}/>
            </div>
            <div className='terro-container'>
                <TableTemplate tableData={t1TtClutches} colNames={ClutchColNames}/>
            </div></>
        ) : null}
                {isUtility & Overall ? (<>
            <div className='oall-container'>
                <TableTemplate tableData={t0Utility} colNames={UtilityColNames}/>
            </div>
            <div className='oall-container'>
                <TableTemplate tableData={t1Utility} colNames={UtilityColNames}/>
            </div></>
        ) : null}
                {isUtility & CTsided ? (<>
            <div className='ct-container'>
                <TableTemplate tableData={t0CtUtility} colNames={UtilityColNames}/>
            </div>
            <div className='ct-container'>
                <TableTemplate tableData={t1CtUtility} colNames={UtilityColNames}/>
            </div></>
        ) : null}
                {isUtility & TTsided ? (<>
            <div className='terro-container'>
                <TableTemplate tableData={t0TtUtility} colNames={UtilityColNames}/>
            </div>
            <div className='terro-container'>
                <TableTemplate tableData={t1TtUtility} colNames={UtilityColNames}/>
            </div></>
        ) : null}
                


    </>
    )
}

export default MatchDetails;