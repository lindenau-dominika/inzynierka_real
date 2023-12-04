import React, { useEffect } from 'react';
import { Sidenav } from '../components/Sidenav';
import { Header } from '../components/Header';
import { Collage } from '../components/Collage';
import { useNavigate } from 'react-router-dom';

const Home = ({ authenticated, setAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) {
      navigate('/login');
    }else {
        navigate('/home')
    }
  }, [authenticated, navigate]);

  if (!authenticated) {
    // If not authenticated, the navigation will already be handled in useEffect.
    return null;
  }

  return (
    <>
      <div>
        <h1>Recently played</h1>
        <Collage />
      </div>
      <div>
        <Sidenav />
        <Header />
      </div>
    </>
  );
};

export default Home;