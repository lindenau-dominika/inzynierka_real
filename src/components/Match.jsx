import React, { useEffect, useState } from 'react';
import { TableTemplate } from '../templates/Table';
import '../styles/gamestats.css';
import { useParams, useLocation, Link } from 'react-router-dom';

const Match = () => {
    const {matchId} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    // const [Overall, setOverall] = useState(true);
    const [matchDetails, setMatchDetails] = useState();
}