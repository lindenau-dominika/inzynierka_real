import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TableTemplate from './Table';
import '../styles/gamestats.css';

export const MatchDetails = () => {
    const {matchId} = useParams();
    const [selectedPlayerWeapons, setSelectedPlayerWeapons] = useState([]);
    const [selectedSteamId, setSelectedSteamId] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isGeneral, setIsGeneral] = useState(true);
    const [Overall, setOverall] = useState(true);
    const [TTsided, setTTsided] = useState(false);
    const [CTsided, setCTsided] = useState(false);
    const [General, setGeneral] = useState([]);
    const [ctGeneral, setCtGeneral] = useState([]);
    const [ttGeneral, setTtGeneral] = useState([]);
    const [chosenWeapons, setChosenWeapons] = useState([]);
    
    const [isClutches, setIsClutches] = useState(false);
    const [Clutches, setClutches] = useState([]); //Clutches
    const [ctClutches, setCtClutches] = useState([]);
    const [ttClutches, setTtClutches] = useState([]);
    
    const [isUtility, setIsUtility] = useState(false);
    const [Utility, setUtility] = useState([]);
    const [ctUtility, setCtUtility] = useState([]);
    const [ttUtility, setTtUtility] = useState([]);
    
    const [isTradesOK, setIsTradesOK] = useState(false);
    const [TradesOK, setTradesOK] = useState([]);
    const [ctTradesOK, setCtTradesOK] = useState([]);
    const [ttTradesOK, setTtTradesOK] = useState([]);
    
    const [isAim, setIsAim] = useState(false);
    const [isWeapons, setIsWeapons] = useState(false);
    const [Aim, setAim] = useState([]);
    const [ctAim, setCtAim] = useState([]);
    const [ttAim, setTtAim] = useState([]);
    const [Weapons, setWeapons] = useState([]);
    
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
    const GenColNames = [ 'Username','Rating', 'Kills', 'Deaths', 'K/D Ratio', 'Total Damage', 'Hs kill %', 'Rounds Survived'];
    
    const generateSelectedPlayer = (playersWeapon) => {
        return playersWeapon.map((player) => [
            player.username,
            player.avatar,
            player.steam_id,
        ])
    }

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
    const ClutchColNames = ['username', '','_2k', '_3k', '_4k', '_5k',
    '_1v1', '_1v2', '_1v3', '_1v4', '_1v5', '_1v1_won', '_1v2_won', '_1v3_won', '_1v4_won', '_1v5_won']

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
    const UtilityColNames = ['Username','', 'Enemies flashed', 'Flash assists', 'Friends flashed', 'Self-flashed', 'HE Damage', 'Molotov damage',
        'AVG Blind Time', 'AVG unused Util Value', 'HE\'s thrown', 'Decoys thrown', 'Flashes Thrown', 'Smokes Thrown', 'Molos Thrown']
    

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
    const TradesColNames = ['Username', '', 'Trade Kills Attempts', 'Trade Kills Success', 'Traded Death Attempts', 'Traded Death Success',
        'Opening attempts', 'Opening success', 'Openings traded'];

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
        const AimColNames = ['username', '','kills', 'total damage',
        'hs kill percent', 'accuracy percent', 'head hit percent', 'shots fired']

    const generateWeaponStats = (userWeapons) => {
        return userWeapons.map((weapon) => [
            weapon.null,
            weapon.null,
            weapon.item_name,
            weapon.hits,
            weapon.group_name
        ])
    }

    

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
                // const hit_group = data.match_details_aim_weapon_hit_groups || [];
                setAim(aim);
                setCtAim(aim_ct);
                setTtAim(aim_tt);
                // setHitGroup(hit_group);
            }
        } catch(error) {
            console.error(error);
        }
    }
    
    const handleWeapons = async (selectedSteamId) => {
        try {
            const response = await fetch(`/xd/matches/${matchId}/details/aim?steam_id=${selectedSteamId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },   
            }) 
            if (response.ok) {
                const data = await response.json();
                const weapon_details = data.match_details_aim_weapon_details || [];
                setWeapons(weapon_details);
                return [...weapon_details]
            }
        } catch(error)
        {
            console.error(error)
        }
    }

    useEffect(() => {
        handleClutchesStats(); 
        handleGeneralStats();
        handleUtilityStats();
        handleTradesOKStats();
        handleAimStats();
        const weapon = generateWeaponStats(Weapons.filter(weapon => weapon.steam_id === selectedSteamId)) || [];
        console.log(weapon)
        setChosenWeapons(weapon)
    }, [matchId, Weapons, selectedSteamId]);
    
    const t0General = generateGeneralData(General.filter(user => user.team === 0)) || [];
    const t1General = generateGeneralData(General.filter(user => user.team === 1)) || [];
    const t0CtGeneral = generateGeneralData(ctGeneral.filter(user => user.team === 0)) || [];
    const t1CtGeneral = generateGeneralData(ctGeneral.filter(user => user.team === 1)) || [];
    const t0TtGeneral = generateGeneralData(ttGeneral.filter(user => user.team === 0)) || [];
    const t1TtGeneral = generateGeneralData(ttGeneral.filter(user => user.team === 1)) || [];
    
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
if (isLoading) {
    return <p>Loading...</p>
}

const selectedPlayer = generateSelectedPlayer(General); 

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
            {isTradesOK & Overall ? (<>
            <div className='oall-container'>
                <TableTemplate tableData={t0Trades} colNames={TradesColNames}/>
            </div>
            <div className='oall-container'>
                <TableTemplate tableData={t1Trades} colNames={TradesColNames}/>
            </div></>
        ) : null}
                {isTradesOK & CTsided ? (<>
            <div className='ct-container'>
                <TableTemplate tableData={t0CtTrades} colNames={TradesColNames}/>
            </div>
            <div className='ct-container'>
                <TableTemplate tableData={t1CtTrades} colNames={TradesColNames}/>
            </div></>
        ) : null}
                {isTradesOK & TTsided ? (<>
            <div className='terro-container'>
                <TableTemplate tableData={t0TtTrades} colNames={TradesColNames}/>
            </div>
            <div className='terro-container'>
                <TableTemplate tableData={t1TtTrades} colNames={TradesColNames}/>
            </div></>
        ) : null}
                {isAim & Overall ? (<>
            <div className='oall-container'>
                <TableTemplate tableData={t0Aim} colNames={AimColNames}/>
            </div>
            <div className='oall-container'>
                <TableTemplate tableData={t1Aim} colNames={AimColNames}/>
            </div></>
        ) : null}
                {isAim & CTsided ? (<>
            <div className='ct-container'>
                <TableTemplate tableData={t0CtAim} colNames={AimColNames}/>
            </div>
            <div className='ct-container'>
                <TableTemplate tableData={t1CtAim} colNames={AimColNames}/>
            </div></>
        ) : null}
                {isAim & TTsided ? (<>
            <div className='terro-container'>
                <TableTemplate tableData={t0TtAim} colNames={AimColNames}/>
            </div>
            <div className='terro-container'>
                <TableTemplate tableData={t1TtAim} colNames={AimColNames}/>
            </div></>
        ) : null}
                {isAim && isWeapons ? (
    <>
        <select
            id='selectPlayer'
            value={selectedSteamId}
            onChange={(e) => setSelectedSteamId(e.target.value)}
        >
            <option value=''>Choose a player</option>
            {selectedPlayer.map((player) => (
                <option key={player.steam_id} value={player[2]}>
                    {player[0]}
                </option>
            ))}
        </select>
        <div className='terro-container'>
            <TableTemplate tableData={selectedPlayerWeapons} colNames={AimColNames}/>
        </div>
    </>
) : null}
    </>
    )
}

export default MatchDetails;