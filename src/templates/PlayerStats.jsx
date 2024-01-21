// import React, { useState, useEffect, useMemo } from 'react';
// import { useParams } from 'react-router-dom';

// export const PlayerStats = (props) => {
//     const [ratingWinrate, setRatingWinrate] = useState();
//     const [mapWinrate, setMapWinrate] = useState();


//     const handlePlayerVal = async () => {
//         try {
//         const response = await fetch(`/xd/profile/${playerId}/${Days}`, {
//             method: 'GET',
//             headers: {'Content-Type' : 'application/json'},
//         });
//         if (response.ok) {
//             const data = await response.json();
//             const rating_winrate = data.player_rating_and_winrate || [];
//             const maps_winrate = data.player_maps_win_rate || [];
//             setRatingWinrate(rating_winrate)
//             setMapWinrate(maps_winrate)

//         } else {
//             console.error('Error during fetching utility')
//         }
//         } catch(error) {
//         console.error(error);
//         }
//     }
//     useEffect(() => {
//         handlePlayerVal();
//     }, [playerId, Days]);

// }