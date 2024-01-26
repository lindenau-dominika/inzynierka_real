import { React, useState, useEffect } from 'react';
import MatchTable from './Tables'
import MapNames from './MapOrganizer'
import ListTemplate from './List';



const MatchesPage = () => {
    const historyColNames = ['Date', 'Map', 'Score', 'Platform'];
    const [matchesHistory, setMatchesHistory] = useState([]);
    const [sortOrder, setSortOrder] = useState({ column: null, ascending: true });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = {
            weekday: 'long',
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    }

    useEffect(() => {
        const handleMatchData = async () => {
            try {
                const response = await fetch('/xd/matches?limit=20', {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                  })
                const data = await response.json();
                setMatchesHistory(data.matches);
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

    const MatchesHistoryList = matchesHistory.slice(0,20).map((match) => ({
        createdAt: formatDate(match.created_at),
        map: MapNames[match.map] || match.map,
        score: `${match.score}-${match.score2}`,
        platform: match.platform,
        matchId: match.match_id,
    }));


      return (<>
      <ListTemplate listData={MatchesHistoryList} colNames={historyColNames}/>
      </>
      )
}

export default MatchesPage;