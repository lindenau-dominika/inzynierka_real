import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TableTemplate from './Table';
import '../styles/gamestats.css';
import Clutches from '../subpages/Clutches';
import ElGeneral from '../subpages/General';
import Utility from '../subpages/Utility';
import Trades from '../subpages/Trades';
import Aim from '../subpages/Aim';


export const MatchDetails = () => {
    const [selectedSteamId, setSelectedSteamId] = useState("");
    const {matchId} = useParams();
    const [selectedSteamId, setSelectedSteamId] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [Overall, setOverall] = useState(true);
    const [TTsided, setTTsided] = useState(false);
    const [CTsided, setCTsided] = useState(false);
    const [General, setGeneral] = useState([]);
    
    const [isGeneral, setIsGeneral] = useState(true);
    const [isClutches, setIsClutches] = useState(false);
    const [isUtility, setIsUtility] = useState(false);
    const [isTradesOK, setIsTradesOK] = useState(false);
    const [isAim, setIsAim] = useState(false);
<<<<<<< HEAD

    const [isWeapons, setIsWeapons] = useState(false);
=======
    const [isWeapons, setIsWeapons] = useState();
    const [Aim, setAim] = useState([]);
    const [Weapons, setWeapons] = useState([]);
    const [ctAim, setCtAim] = useState([]);
    const [ttAim, setTtAim] = useState([]);
    // const [hitGroup, setHitGroup] = useState([]);

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
    };

    const generateTradesOKData = (teamStats) => {
        return teamStats.map((user) => [
            {
                image: user.avatar,
                nickname: user.username,
            },
            user.null,
            user.trade_kill_attempts,
            user.trade_kill_success,
            user.traded_death_attempts,
            user.traded_death_success,
            user.opening_attempts,
            user.opening_success,
            user.opening_traded,
        ]);
    };

    const generateAimStats = (teamStats) => {
        return teamStats.map((user) => [
            {
                image: user.avatar,
                nickname: user.username,
            },
            user.null,
            user.kills,
            user.total_damage,
            user.hs_kill_percent,
            user.accuracy_percent,
            user.head_hit_percent, 
            user.shots_fired,
        ]);
    };

    const generateWeaponStats = (userWeapons) => {
        return userWeapons.map((weaponka) => [
            weaponka.null,
            weaponka.item_name,
            weaponka.kills,
            weaponka.damage,
            weaponka.accuracy_percent,
            weaponka.hs_kill_percent,
            weaponka.shots,
        ])
    }

    const GenColNames = [ 'Username','Rating', 'Kills', 'Deaths', 'K/D Ratio', 'Total Damage', 'Hs kill %', 'Rounds Survived'];
    
    const ClutchColNames = ['username', '','_2k', '_3k', '_4k', '_5k',
    '_1v1', '_1v2', '_1v3', '_1v4', '_1v5', '_1v1_won', '_1v2_won', '_1v3_won', '_1v4_won', '_1v5_won']
>>>>>>> 4910fe0f7cfa7fe9bc61bb81a8e18b79ab741c75

    
    // const generateSelectedPlayer = (playersWeapon) => {
    //     return playersWeapon.map((player) => [
    //         player.username,
    //         player.avatar,
    //         player.steam_id,
    //     ])
    // }

<<<<<<< HEAD
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
=======
    const handleGeneralStats = async () => {
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
                // setOverall(true);
            } else {
                console.error('Error during fetching details stats')
            }
        } catch(error) {
            console.error(error);
        }
    } 


    const handleClutchesStats = async () => {
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
            setClutches(clutches);
            setCtClutches(ct_clutches);
            setTtClutches(tt_clutches);
            } else {
            console.error('Error during fetching clutches')}
            } catch(error) {
        console.error(error);
        }
    }

    const handleUtilityStats = async () => {
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
            } else {
                console.error('Error during fetching utility')
            }
        } catch(error) {
            console.error(error);
        }
    }

    const handleTradesOKStats = async () => {
        try {
            const response = await fetch(`/xd/matches/${matchId}/details/openingkills`, {
                method: 'GET',
                headers: {'Content-Type' : 'application/json'},
            });
            if (response.ok) {
                const data = await response.json();
                const tradesok = data.match_details_openingkills_stats || [];
                const tradesok_ct = data.match_details_openingkills_ct_stats || [];
                const tradesok_tt = data.match_details_openingkills_tt_stats || [];
                setTradesOK(tradesok);
                setCtTradesOK(tradesok_ct);
                setTtTradesOK(tradesok_tt);
            } else {
                console.error('Error during fetching trades')
            }
        } catch(error) {
            console.error(error);
        }
    }

    const handleAimStats = async () => {
        try {
            const response = await fetch(`/xd/matches/${matchId}/details/aim`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            });
            if (response.ok) {
                const data = await response.json();
                const aim = data.match_details_aim_overall_stats || [];
                const aim_ct = data.match_details_aim_ct_overall_stats || [];
                const aim_tt = data.match_details_aim_tt_overall_stats || [];
                const weapon_details = data.match_details_aim_weapon_details_stats || [];
                // const hit_group = data.match_details_aim_weapon_hit_groups || [];
                setAim(aim);
                setCtAim(aim_ct);
                setTtAim(aim_tt);
                setWeapons(weapon_details);
                // setHitGroup(hit_group);
            }  else {
                console.error('Error during fetching AIM')
            }
        } catch(error) {
            console.error(error);
        }
    }
    
    useEffect(() => {
        handleAimStats();
        handleClutchesStats(); 
        handleGeneralStats();
        handleUtilityStats();
        handleTradesOKStats();
    }, [matchId]);
    
    const t0General = generateGeneralData(General.filter(user => user.team === 0)) || [];
    const t1General = generateGeneralData(General.filter(user => user.team === 1)) || [];
    const t0CtGeneral = generateGeneralData(ctGeneral.filter(user => user.team === 0)) || [];
    const t1CtGeneral = generateGeneralData(ctGeneral.filter(user => user.team === 1)) || [];
    const t0TtGeneral = generateGeneralData(ttGeneral.filter(user => user.team === 0));
    const t1TtGeneral = generateGeneralData(ttGeneral.filter(user => user.team === 1));
    const players = generateGeneralData(General) || [];
    
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

    const t0Trades = generateTradesOKData(TradesOK.filter(user => user.team === 0)) || [];
    const t1Trades = generateTradesOKData(TradesOK.filter(user => user.team === 1)) || [];
    const t0CtTrades = generateTradesOKData(ctTradesOK.filter(user => user.team === 0)) || [];
    const t1CtTrades = generateTradesOKData(ctTradesOK.filter(user => user.team === 1)) || [];
    const t0TtTrades = generateTradesOKData(ttTradesOK.filter(user => user.team === 0)) || [];
    const t1TtTrades = generateTradesOKData(ttTradesOK.filter(user => user.team === 1)) || [];

    const t0Aim = generateAimStats(Aim.filter(user => user.team === 0)) || [];
    const t1Aim = generateAimStats(Aim.filter(user => user.team === 1)) || [];
    const t0CtAim = generateAimStats(ctAim.filter(user => user.team === 0)) || [];
    const t1CtAim = generateAimStats(ctAim.filter(user => user.team === 1)) || [];
    const t0TtAim = generateAimStats(ttAim.filter(user => user.team === 0)) || [];
    const t1TtAim = generateAimStats(ttAim.filter(user => user.team === 1)) || [];
    // const weapons = generateWeaponStats(Weapons.filter(weaponka.steam_id === steam_id)) || [];
    // const groupedWeapons = []    
    
    if (isLoading) {
        return <p>Loading...</p>
    }
    
    return (<>
    <div className='match-buttons-container'>
        <button className={`side-buttons ${isGeneral ? 'ct-selected': ''}`} onClick={() => {setCTsided(false); setTTsided(false); setOverall(true); setIsGeneral(true); setIsClutches(false); setIsUtility(false); setIsTradesOK(false); setIsAim(false)}} type='button'>General</button>
        <button className={`side-buttons ${isClutches ? 'ct-selected': ''}`} onClick={() => {setCTsided(false); setTTsided(false); setOverall(true); setIsGeneral(false); setIsClutches(true); setIsUtility(false); setIsTradesOK(false); setIsAim(false)}} type='button'>Clutches</button>
        <button className={`side-buttons ${isUtility ? 'ct-selected': ''}`} onClick={() => {setCTsided(false); setTTsided(false); setOverall(true); setIsGeneral(false); setIsClutches(false); setIsUtility(true); setIsTradesOK(false); setIsAim(false)}} type='button'>Utility</button>
        <button className={`side-buttons ${isTradesOK ? 'ct-selected': ''}`} onClick={() => {setCTsided(false); setTTsided(false); setOverall(true); setIsGeneral(false); setIsClutches(false); setIsUtility(false); setIsTradesOK(true); setIsAim(false)}} type='button'>Trades & ok</button>
        <button className={`side-buttons ${isAim ? 'ct-selected': ''}`} onClick={() => {setCTsided(false); setTTsided(false); setOverall(true); setIsGeneral(false); setIsClutches(false); setIsUtility(false); setIsTradesOK(false); setIsAim(true)}} type='button'>Aim</button>
        
        {/* <button className={`side-buttons ${isClutches ? 'ct-selected': ''}`} onClick={() => {isGeneral(false); isClutches(true); isUtility(false)}} type='button'>Trades and Opening Kills TODO</button>
        <button className={`side-buttons ${isClutches ? 'ct-selected': ''}`} onClick={() => {isGeneral(false); isClutches(true); isUtility(false)}} type='button'>Aim TODO</button>
    <button className={`side-buttons ${isClutches ? 'ct-selected': ''}`} onClick={() => {isGeneral(false); isClutches(true); isUtility(false)}} type='button'>Other TODO</button> */}

>>>>>>> 4910fe0f7cfa7fe9bc61bb81a8e18b79ab741c75
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
<<<<<<< HEAD
        {isAim & TTsided ? (
            <Aim isTTsided={true}/>
=======
                {isAim & isWeapons ? (<>
                <select id='selectPlayer' value={selectedSteamId} onChange={(e) => setSelectedSteamId(e.target.value)}>
                    <option value='' disabled>Choose a player</option>
                    {t0General.map((player) => (
                        <option key={player.steam_id} value={player.steam_id}>`${player[1]}`
                        {console.log(player.nickname)}
                        </option>
                    ))}
                </select>
            <div className='terro-container'>
                {/* <TableTemplate tableData={groupedWeapons} colNames={AimColNames}/> */}
            </div></>
>>>>>>> 4910fe0f7cfa7fe9bc61bb81a8e18b79ab741c75
        ) : null}
        {/* {isAim && isWeapons ? (
            <Aim isWeapons={true}/>
) : null} */}
    </>
    )
}

export default MatchDetails;