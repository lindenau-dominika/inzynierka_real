import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import TableTemplate from '../components/Table';
import '../styles/gamestats.css';

const Clutches = (props) => {
    const { isOverall, isCTsided, isTTsided } = props;
    const { matchId } = useParams();
    const [clutches, setClutches] = useState([]); // clutches
    const [ctClutches, setCtClutches] = useState([]);
    const [ttClutches, setTtClutches] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const generateData = (teamStats) => {
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

    const ColNames = [
        'username',
        '',
        '_2k',
        '_3k',
        '_4k',
        '_5k',
        '_1v1',
        '_1v2',
        '_1v3',
        '_1v4',
        '_1v5',
        '_1v1_won',
        '_1v2_won',
        '_1v3_won',
        '_1v4_won',
        '_1v5_won',
    ];

    const handleStats = async () => {
        try {
            const response = await fetch(`/xd/matches/${matchId}/details/clutches`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                const data = await response.json();
                const clutchesData = data.match_details_clutches_stats || [];
                const ctClutchesData = data.match_details_clutches_ct_stats || [];
                const ttClutchesData = data.match_details_clutches_tt_stats || [];
                setClutches(clutchesData);
                setCtClutches(ctClutchesData);
                setTtClutches(ttClutchesData);
                setIsLoading(false);
            } else {
                console.error('Error during fetching clutches');
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        handleStats();
    }, [matchId]);

    const t0 = useMemo(() => generateData(clutches.filter((user) => user.team === 0)) || [], [clutches]);
    const t1 = useMemo(() => generateData(clutches.filter((user) => user.team === 1)) || [], [clutches]);
    const t0Ct = useMemo(() => generateData(ctClutches.filter((user) => user.team === 0)), [ctClutches]);
    const t1Ct = useMemo(() => generateData(ctClutches.filter((user) => user.team === 1)), [ctClutches]);
    const t0Tt = useMemo(() => generateData(ttClutches.filter((user) => user.team === 0)), [ttClutches]);
    const t1Tt = useMemo(() => generateData(ttClutches.filter((user) => user.team === 1)), [ttClutches]);

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

export default Clutches;
