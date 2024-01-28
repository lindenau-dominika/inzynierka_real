import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ListTemplate from './List';
import RatingChart from './RatingChart'
import '../styles/profilePage.css'
import MapTile from './MapTiles';
import { mapImages } from './MapOrganizer';
import Navigation from './Navbar';

const ProfilePage = () => {
    const historyColNames = ['Map', 'Score', 'Platform', 'Date'];
    const { steamId } = useParams();
    const [matchesHistory, setMatchesHistory] = useState(null);
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState(null);
    const [sortOrder, setSortOrder] = useState({ column: null, ascending: true});

    useEffect(() => {
        const handleMatchData = async () => {
            try {
                const response = await fetch(`https://art.garnuchy.pl/players/${steamId}/matches?limit=10`);
                const data = await response.json();
                setMatchesHistory(data);
                const responseUser = await fetch(`https://art.garnuchy.pl/players/${steamId}`)
                const dataUser = await responseUser.json();
                setUser(dataUser);
                const responseStats = await fetch(`https://art.garnuchy.pl/players/${steamId}/stats`)
                const dataStats = await responseStats.json();
                setStats(dataStats);
            } catch (error) {
                console.error('Error fetching matches data', error);
            }
        };
        handleMatchData();
    },[])
    if (!matchesHistory || !user || !stats){
        return <div>Loading...</div>;
    }
    const handleSort = (column) => {
        setSortOrder((prevSortOrder) => ({
          column,
          ascending: column === prevSortOrder.column ? !prevSortOrder.ascending : true,
        }));
      };

      const handleButtonClick = async () => {
        try {
        const matchMaxID = matchesHistory[matchesHistory.length-1].match_id;
        const response = await fetch(`https://art.garnuchy.pl/players/${steamId}/matches?limit=10&after=${matchMaxID}`);
        const data = await response.json();
        setMatches([... matchesHistory, ... data]);
        } catch (error) {
        console.error('Error fetching match data:', error);
        }
    };

    const sortedMatches = matchesHistory.slice().sort((a, b) => {
        const multiplier = sortOrder.ascending ? 1 : -1;
    
        switch (sortOrder.column) {
        case 'map':
            return multiplier * a.map.localeCompare(b.map);
        case 'score':
            return multiplier * (a.score[0] - b.score[0]);
        case 'platform':
            return multiplier * a.platform.localeCompare(b.platform);
        case 'date':
            return multiplier * (new Date(a.created_at) - new Date(b.created_at));
        default:
            return 0;
        }
        
    });
    const ratingChart = [
        { name: 'Rating', x: stats.rating.toFixed(2), fill: "#ddfdff" },
        { name: 'CT Rating', x: -12.1, fill: "#8884d8" },
        { name: 'TT Rating', x: 0.96, fill: "#82ca9d" },
        ];
    const winrateChart = [
        { name: 'WinRate', x: (stats.win_rate*100).toFixed(2), fill: "#82ca9d" },
        ];
    const mapsWinrateChart = [
        {
            label: 'Mirage',
            value: (stats['maps']['de_mirage'].win_rate*100).toFixed(2),
            image: mapImages['de_mirage'],
            rating: (stats['maps']['de_mirage'].rating.toFixed(2))
        },
        {
            label: 'Inferno',
            value: (stats['maps']['de_inferno'].win_rate*100).toFixed(2),
            image: mapImages['de_inferno'],
            rating: (stats['maps']['de_inferno'].rating.toFixed(2))
        },
        {
            label: 'Vertigo',
            value: (stats['maps']['de_vertigo'].win_rate*100).toFixed(2),
            image: mapImages['de_vertigo'],
            rating: (stats['maps']['de_vertigo'].rating.toFixed(2))
        },
        {
            label: 'Overpass',
            value: (stats['maps']['de_overpass'].win_rate*100).toFixed(2),
            image: mapImages['de_overpass'],
            rating: (stats['maps']['de_overpass'].rating.toFixed(2))
        },
        {
            label: 'Anubis',
            value: (stats['maps']['de_anubis'].win_rate*100).toFixed(2),
            image: mapImages['de_anubis'],
            rating: (stats['maps']['de_anubis'].rating.toFixed(2))
        },
        {
            label: 'Ancient',
            value: (stats['maps']['de_ancient'].win_rate*100).toFixed(2),
            image: mapImages['de_ancient'],
            rating: (stats['maps']['de_ancient'].rating.toFixed(2))
        },
        {
            label: 'Nuke',
            value: (stats['maps']['de_nuke'].win_rate*100).toFixed(2),
            image: mapImages['de_nuke'],
            rating: (stats['maps']['de_nuke'].rating.toFixed(2))
        },
        ];


        return (<>
        <Navigation />
        <div className='page-con'>

            <div className='player-container'>
                <div className='profile'>
                    <img src={user.avatar} alt='avatar'/>
                    <p>{user.username}</p>
                </div>
                <div className='charts'>
                    <RatingChart data={ratingChart}  inner='20%' outer='100%' myBarSize={35} myWidth={200} myHeight={200} myMax={20}/>
                    <RatingChart data={winrateChart}  inner='60%' outer='100%' myBarSize={35} myWidth={200} myHeight={200} myMax={20}/>
                </div>
            </div>
                <div className="container"> 
                <ListTemplate listData={sortedMatches} colNames={historyColNames} onSort={handleSort}/>
                </div>
            </div>
            <div className='maps-container'>

            {mapsWinrateChart.map(mapData => (
                <MapTile key={mapData.label} data={mapData} />
                ))}
        </div>
        </>
        )
}

export default ProfilePage;