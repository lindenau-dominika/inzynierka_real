import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import TableTemplate from '../templates/Table';
import '../styles/gamestats.css';


export const Trades = (props) => {
    const { isOverall, isCTsided, isTTsided } = props;
    const { matchId } = useParams();
    const [TradesOK, setTradesOK] = useState([]);
    const [ctTradesOK, setCtTradesOK] = useState([]);
    const [ttTradesOK, setTtTradesOK] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const generateData = (teamStats) => {
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
    const ColNames = ['Username', '', 'Trade Kills Attempts', 'Trade Kills Success', 'Traded Death Attempts', 'Traded Death Success',
        'Opening attempts', 'Opening success', 'Openings traded'];
    
    const handleStats = async () => {
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
                setIsLoading(false);
            } else {
                console.error('Error during fetching trades')
            }
        } catch(error) {
            console.error(error);
        }
    }

    useEffect(() => {
        handleStats();
    }, [matchId]);
        
    const t0 = useMemo(() => generateData(TradesOK.filter(user => user.team === 0)) || []);
    const t1 = useMemo(() => generateData(TradesOK.filter(user => user.team === 1)) || []);
    const t0Ct = useMemo(() => generateData(ctTradesOK.filter(user => user.team === 0)) || []);
    const t1Ct = useMemo(() => generateData(ctTradesOK.filter(user => user.team === 1)) || []);
    const t0Tt = useMemo(() => generateData(ttTradesOK.filter(user => user.team === 0)) || []);
    const t1Tt = useMemo(() => generateData(ttTradesOK.filter(user => user.team === 1)) || [])

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
};

export default Trades;