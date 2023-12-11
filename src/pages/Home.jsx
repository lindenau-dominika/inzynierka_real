import React from 'react';
import { Sidenav } from '../components/Sidenav';
import { Header } from '../components/Header';
import { Collage } from '../components/Collage';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import '../styles/home.css'


const Home = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to='/login'/>
  }

  return (
    <>
        <Header/>
      <div className='col-24'>
        <div className='col-3'>
          <Sidenav />
        </div>
        <div className='col-18'>
        <h1>Recently played</h1>
          <Collage/>
        </div>
      </div>
    </>
  );
};

export default Home;