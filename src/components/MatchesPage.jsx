import { React, useState, useEffect } from 'react';
import ListTemplate from './List';
import Navigation from './Navbar';
import '../styles/matchDetails.css'



const MatchesPage = () => {
    const historyColNames = ['Map', 'Score', 'Platform', 'Date'];
    const [matchesHistory, setMatchesHistory] = useState([]);
    const [sortOrder, setSortOrder] = useState({ column: null, ascending: true });

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
      const handleSort = (column) => {
        setSortOrder((prevSortOrder) => ({
          column,
          ascending: column === prevSortOrder.column ? !prevSortOrder.ascending : true,
        }));
      };
      
      const handleButtonClick = async () => {
          try {
            const matchMaxID = matchesHistory[matchesHistory.length-1].match_id;
            const response = await fetch(`https://art.garnuchy.pl/matches?limit=20&after=${matchMaxID}`);
            const data = await response.json();
            setMatchesHistory([... matchesHistory, ... data]);
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

      return (<>
      <Navigation />
      <div className='general col' style={{margin: '-40px'}}>
        <h1>
          Overall Match History
        </h1>
        <div style={{width: '50vw'}}>

      <ListTemplate listData={sortedMatches} colNames={historyColNames} title={null} onSort={handleSort}/>
      <button onClick={() => handleButtonClick()}>Next 20 matches</button>
        </div>
      </div>
      </>
      )
}

export default MatchesPage;