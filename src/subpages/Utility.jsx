import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import TableTemplate from '../templates/Table';
import '../styles/gamestats.css';

export const Utility = (props) => {
    const { isOverall, isCTsided, isTTsided } = props;
    const {matchId} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [Utility, setUtility] = useState([]);
    const [ctUtility, setCtUtility] = useState([]);
    const [ttUtility, setTtUtility] = useState([]);
    
    const generateData = (teamStats) => {
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
            {isOverall ? (
                    <div className='terro-container'>
                        <TableTemplate tableData={t0} colNames={ColNames} />
                        <TableTemplate tableData={t1} colNames={ColNames} />
                    </div>
            ) : null}
            {isCTsided ? (
                    <div className='terro-container'>
                        <TableTemplate tableData={t0Ct} colNames={ColNames} />
                        <TableTemplate tableData={t1Ct} colNames={ColNames} />
                    </div>
            ) : null}
            {isTTsided ? (
                    <div className='terro-container'>
                        <TableTemplate tableData={t0Tt} colNames={ColNames} />
                        <TableTemplate tableData={t1Tt} colNames={ColNames} />
                    </div>
            ) : null}
        </>
    );
}

export default Utility;