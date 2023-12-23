import React from 'react';
import { Sidenav } from '../components/Sidenav';
import { Collage } from '../components/Collage';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import '../styles/home.css'
import MatchesHistory from '../components/MatchHistory';

const Home = () => {
  // const { isAuthenticated } = useAuth();

  // if (!isAuthenticated) {
  //   return <Navigate to='/login'/>
  // }

  return (
    <>
        <div className='col-3'>
          <Sidenav />
        </div>
      <div className='main-container col-21'>
        <div className='col-23'>
        <h1>Recently played</h1>
          <Collage/>
          {/* <OverviewStats/> */}
        </div>
        <div>
          {/* wykresy */}
        </div>
        <div className='col-23'>
          <MatchesHistory />
        </div>
      </div>
    </>
  );
};

export default Home;