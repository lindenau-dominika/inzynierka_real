// import React, { useState, useEffect } from 'react';
// import HLTV from 'hltv-api'; // Załóżmy, że HLTV jest prawidłowo zaimportowane z używanego pakietu

// const UpcomingEvents = () => {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     HLTV.getEvents().then(res => {
//       // Zakładamy, że odpowiedź zawiera listę wydarzeń
//       // Musisz przefiltrować te wydarzenia, aby znaleźć przyszłe eventy
//       const upcomingEvents = res.filter(event => {
//         // Przykładowe filtrowanie, zależy to od struktury obiektu event
//         const eventDate = new Date(event.dateStart); // lub event.date, zależnie od API
//         return eventDate > new Date(); // Sprawdza, czy data wydarzenia jest w przyszłości
//       });

//       setEvents(upcomingEvents);
//     });
//   }, []);

//   return (
//     <div>
//       <h1>Upcoming Events</h1>
//       <ul>
//         {events.map(event => (
//           <li key={event.id}>{event.name} - {new Date(event.dateStart).toLocaleDateString()}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UpcomingEvents;
