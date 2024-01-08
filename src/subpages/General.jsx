import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import TableTemplate from '../templates/Table';
import '../styles/gamestats.css';

export const ElGeneral = (props) => {
    const { isOverall, isCTsided, isTTsided } = props;
    const [isLoading, setIsLoading] = useState(true);
    const { matchId } = useParams();
    const [General, setGeneral] = useState([]);
    const [ctGeneral, setCtGeneral] = useState([]);
    const [ttGeneral, setTtGeneral] = useState([]);

    const generateData = (teamStats) => {
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
    const ColNames = [ 'Username','Rating', 'Kills', 'Deaths', 'K/D Ratio', 'Total Damage', 'Hs kill %', 'Rounds Survived'];

    const handleStats = async () => {
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

    useEffect(() => {
        handleStats();
    }, [matchId]);

    const t0 = generateData(General.filter(user => user.team === 0)) || [];
    const t1 = generateData(General.filter(user => user.team === 1)) || [];
    const t0Ct = generateData(ctGeneral.filter(user => user.team === 0)) || [];
    const t1Ct = generateData(ctGeneral.filter(user => user.team === 1)) || [];
    const t0Tt = generateData(ttGeneral.filter(user => user.team === 0)) || [];
    const t1Tt = generateData(ttGeneral.filter(user => user.team === 1)) || [];

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

export default ElGeneral;