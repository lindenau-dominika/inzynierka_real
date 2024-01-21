import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import TableTemplate from '../templates/Table';
import '../styles/gamestats.css';
import { PlayerUtUseChart, PlayerUtDmgChart, PlayerUtThrownChart} from '../templates/BarChart';

export const Utility = (props) => {
    const { isOverall, isCTsided, isTTsided } = props;
    const {matchId} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [Utility, setUtility] = useState([]);
    const [ctUtility, setCtUtility] = useState([]);
    const [ttUtility, setTtUtility] = useState([]);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);

    const generateData = (teamStats) => {
        return teamStats.map((user) => ({
          nickname: user.username,//
          enemies_flashed: user.enemies_flashed, //
          flash_assists: user.flash_assists, //
          friends_flashed: user.friends_flashed, //
          self_flashed: user.self_flashed, //
          HE_damage: user.HE_damage, //
          molotov_damage: user.molotov_damage, //
          avg_blind_time: user.avg_blind_time.toFixed(2), //
          avg_unused_util_value: user.avg_unused_util_value,
          HEs_thrown: user.HEs_thrown, //
          decoys_thrown: user.decoys_thrown, //
          flashes_thrown: user.flashes_thrown, // 
          smokes_thrown: user.smokes_thrown, //
          molos_thrown: user.molos_thrown, //
        }));
      };

    const ColNames = ['Username','', 'Enemies flashed', 'Flash assists', 'Friends flashed', 'Self-flashed', 'HE Damage', 'Molotov damage',
    'AVG Blind Time', 'AVG unused Util Value', 'HE\'s thrown', 'Decoys thrown', 'Flashes Thrown', 'Smokes Thrown', 'Molos Thrown']
    
    const handleStats = async () => {
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
                setIsLoading(false)
            } else {
                console.error('Error during fetching utility')
            }
        } catch(error) {
            console.error(error);
        }
    }

    useEffect(() => {
        handleStats();
    }, [matchId]);

    const t0 = useMemo(() => generateData(Utility.filter(user => user.team === 0)) || []);
    const t1 = useMemo(() => generateData(Utility.filter(user => user.team === 1)) || []);
    const t0Ct = useMemo(() => generateData(ctUtility.filter(user => user.team === 0)) || []);
    const t1Ct = useMemo(() => generateData(ctUtility.filter(user => user.team === 1)) || []);
    const t0Tt = useMemo(() => generateData(ttUtility.filter(user => user.team === 0)) || []);
    const t1Tt = useMemo(() => generateData(ttUtility.filter(user => user.team === 1)) || []);
    
    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            {isOverall ? (<>
            <h2>Flash stats</h2>
                    <div className='maps'>
                        <PlayerUtUseChart data={t0}/>
                        <PlayerUtUseChart data={t1}/>
                    </div>
                    <h2>Utility Thrown</h2>
                    <div className='maps'>
                        <PlayerUtThrownChart data={t0}/>
                        <PlayerUtThrownChart data={t1}/>
                    </div>
                    <h2>Utility Damage and usage</h2>
                    <div className='maps'>
                        <PlayerUtDmgChart data={t0}/>
                        <PlayerUtDmgChart data={t1}/>
                    </div>
                    </>
            ) : null}
            {isCTsided ? (<>
                <h2>Flash stats</h2>
                    <div className='maps'>
                        <PlayerUtUseChart data={t0Ct}/>
                        <PlayerUtUseChart data={t1Ct}/>
                    </div>
                    <h2>Utility Thrown</h2>
                    <div className='maps'>
                        <PlayerUtThrownChart data={t0Ct}/>
                        <PlayerUtThrownChart data={t1Ct}/>
                    </div>
                    <h2>Utility Damage and usage</h2>
                    <div className='maps'>
                        <PlayerUtDmgChart data={t0Ct}/>
                        <PlayerUtDmgChart data={t1Ct}/>
                    </div>
                    </>
            ) : null}
            {isTTsided ? (<>
                <h2>Flash stats</h2>
                    <div className='maps'>
                        <PlayerUtUseChart data={t0Tt}/>
                        <PlayerUtUseChart data={t1Tt}/>
                    </div>
                    <h2>Utility Thrown</h2>
                    <div className='maps'>
                        <PlayerUtThrownChart data={t0Tt}/>
                        <PlayerUtThrownChart data={t1Tt}/>
                    </div>
                    <h2>Utility Damage and usage</h2>
                    <div className='maps'>
                        <PlayerUtDmgChart data={t0Tt}/>
                        <PlayerUtDmgChart data={t1Tt}/>
                    </div>
                    </>
            ) : null}
        </>
    );
}

export default Utility;