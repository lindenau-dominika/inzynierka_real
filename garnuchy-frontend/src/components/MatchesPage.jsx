import { React, useState, useEffect } from 'react';
import MatchTable from './Tables'
// import MapNames from './MapOrganizer'
import ListTemplate from './List';
import Navigation from './Navbar';



const MatchesPage = () => {
    const historyColNames = ['Map', 'Score', 'Platform', 'Date'];
    const [matchesHistory, setMatchesHistory] = useState([]);
    const [sortOrder, setSortOrder] = useState({ column: null, ascending: true });

    // const mapNames = (originalMapName) => {
    //   const mapNamesMap = {
    //     'de_anubis': 'Anubis',
    //     'de_inferno': 'Inferno',
    //     'de_mirage': 'Mirage',
    //     'de_nuke': 'Nuke',
    //     'de_overpass': 'Overpass',
    //     'de_ancient': 'Ancient',
    //     'de_vertigo': 'Vertigo',
    //     'de_dust2': 'Dust 2',
    //     'cs_italy': 'Italy',
    //     'cs_office': 'Office',
    //   };
    //   return mapNamesMap[originalMapName] || originalMapName;
    // };


    useEffect(() => {
        const handleMatchData = async () => {
            try {
              const response = await fetch(`https://art.garnuchy.pl/matches?limit=20`);
              const data = await response.json();
                setMatchesHistory(data);
              } catch (error) {
                console.error('Error fetching match data:', error);
              }
            } 
        handleMatchData();
    },[]);
    if (!matchesHistory){
        return <div>Loading...</div>;
      }

    // const handleSort = (column) => {
    //     setSortOrder((prevSortOrder) => ({
    //       column,
    //       ascending: column === prevSortOrder.column ? !prevSortOrder.ascending : true,
    //     }));
    //   };

    if (!Array.isArray(matchesHistory)) {
        console.error('matchesHistory nie jest tablicą', matchesHistory);
        return null;
    }

    // const MatchesHistoryList = matchesHistory.slice(0,20).map((match) => ({
    //     createdAt: formatDate(match.created_at),
    //     map: mapNames(match.map) || match.map,
    //     score: `${match.score}-${match.score}`,
    //     platform: match.platform,
    //     matchId: match.match_id,
    // }));

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

      return (<>
      <Navigation />
      <ListTemplate listData={sortedMatches} colNames={historyColNames}/>
      </>
      )
}

export default MatchesPage;