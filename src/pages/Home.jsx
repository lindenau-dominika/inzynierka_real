import React from 'react';
import { Sidenav } from '../components/Sidenav';
import { Header } from '../components/Header';
import { Collage } from '../components/Collage';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';


const Home = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to='/login'/>
  }

  return (
    <>
      <div className='col-24'>
        <h1>Recently played</h1>
        <Collage />
        <Sidenav />
        <Header/>
      </div>
    </>
  );
};

export default Home;