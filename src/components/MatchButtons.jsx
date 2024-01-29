import React from 'react';
import { Link } from 'react-router-dom'
import '../styles/matchDetails.css'

const MatchButtons = (props) => {
    const { selectedDetailsButton , matchId } = props;

    return (
        <div className='but-con'>
            <Link to={`/matches/${matchId}/general`} style={{padding: '3px 9px'}} className={selectedDetailsButton === 'General'? 'details-selected' : 'not-selected'}>General</Link>
            <Link to={`/matches/${matchId}/utility`}  style={{padding: '3px 9px'}} className={selectedDetailsButton === 'Utility'? 'details-selected' : 'not-selected'}>Utility</Link>
            <Link to={`/matches/${matchId}/clutches`}  style={{padding: '3px 9px'}} className={selectedDetailsButton === 'Clutches' ? 'details-selected' : 'not-selected'}>Clutches</Link>
            <Link to={`/matches/${matchId}/impact`} style={{padding: '3px 9px'}}  className={selectedDetailsButton === 'Impact' ? 'details-selected' : 'not-selected'}>Impact</Link>
            <Link to={`/matches/${matchId}/aim`} style={{padding: '3px 9px'}}  className={selectedDetailsButton === 'Aim' ? 'details-selected' : 'not-selected'}>Aim</Link>
        </div>
    )
}

export default MatchButtons;