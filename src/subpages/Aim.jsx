import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import TableTemplate from '../templates/Table';
import '../styles/gamestats.css';
import { handleWeapons } from './Weapons';

export const Aim = (props) => {
    const { isOverall, isCTsided, isTTsided, isWeapons } = props;
    const { matchId } = useParams();
    const [Aim, setAim] = useState([]);
    const [ctAim, setCtAim] = useState([]);
    const [ttAim, setTtAim] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPlayerSteamId, setSelectedPlayerSteamId] = useState(null);
    const [Weapons, setWeapons] = useState([]);
    const [selectedPlayerWeapons, setSelectedPlayerWeapons] = useState([]);
    const [selected, setSelected] = useState('');

    const generateStats = (teamStats) => {
        return teamStats.map((user) => [
            {
                image: user.avatar,
                nickname: user.username,
            },
            user.null,
            user.kills,
            user.total_damage,
            (user.hs_kill_percent * 100).toFixed(0),
            user.accuracy_percent * 100,
            user.head_hit_percent * 100,
            user.shots_fired,
        ]);
    };

    const ColNames = ['username', '', 'kills', 'total damage', 'hs kill percent', 'accuracy percent', 'head hit percent', 'shots fired'];

    const handleStats = async () => {
        try {
            const response = await fetch(`/xd/matches/${matchId}/details/aim`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                const data = await response.json();
                const aim = data.match_details_aim_overall_stats || [];
                const aim_ct = data.match_details_aim_ct_overall_stats || [];
                const aim_tt = data.match_details_aim_tt_overall_stats || [];
                setAim(aim);
                setCtAim(aim_ct);
                setTtAim(aim_tt);
                setIsLoading(false);
            } else {
                console.error('Error during fetching aimStats');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        const selectedSteamId = e.target.value;
        console.log(selectedSteamId);
        setSelected(selectedSteamId);
        handleWeapons(selectedSteamId);
    }
    
    useEffect(() => {
        handleStats();
    }, [matchId]);
    
    useEffect(() => {
        if (selectedPlayerSteamId) {
            handleChange({ target: { value: selectedPlayerSteamId } }); // Wywołanie ręczne funkcji handleChange
        }
    }, [matchId, selectedPlayerSteamId]);

    const t0 = useMemo(() => generateStats(Aim.filter((user) => user.team === 0)) || []);
    const t1 = useMemo(() => generateStats(Aim.filter((user) => user.team === 1)) || []);
    const t0Ct = useMemo(() => generateStats(ctAim.filter((user) => user.team === 0)) || []);
    const t1Ct = useMemo(() => generateStats(ctAim.filter((user) => user.team === 1)) || []);
    const t0Tt = useMemo(() => generateStats(ttAim.filter((user) => user.team === 0)) || []);
    const t1Tt = useMemo(() => generateStats(ttAim.filter((user) => user.team === 1)) || []);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            {isWeapons ? (
                <>
                    <select value={selected}
                        onChange={(e) => handleChange(e)}>
                        <option value=''>select Player</option>
                        {Aim.map((player) => (
                            <option key={player.steam_id} value={player.steam_id}>
                                {player.username}
                            </option>
                        ))}
                    </select>
                    {selected == selectedPlayerSteamId?<TableTemplate tableData={t1Tt}/>:''}
                    {/* {selectedPlayerWeapons.length > 0 && (
                        <TableTemplate tableData={selectedPlayerWeapons} colNames={ColNames} />
                    )} */}
                </>
            ) : null}
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

export default Aim;
