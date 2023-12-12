import React from 'react';
import { Sidenav } from '../components/Sidenav';
import { Header } from '../components/Header';
import { Collage } from '../components/Collage';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import '../styles/home.css'
import MatchesHistory from '../components/Matches';


const Home = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to='/login'/>
  }

  return (
    <>
        <Header/>
        <div className='col-3'>
          <Sidenav />
        </div>
      <div className='main-container col-21'>
        <div className='col-23'>
        <h1>Recently played</h1>
          <Collage/>
        </div>
        <div>
          {/* wykresy */}
        </div>
        <div className='col-23'>
          <MatchesHistory></MatchesHistory>
        </div>
      </div>
    </>
  );
};

export default Home;