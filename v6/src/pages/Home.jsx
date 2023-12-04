import React, { useEffect } from 'react';
import { Sidenav } from '../components/Sidenav';
import { Header } from '../components/Header';
import { Collage } from '../components/Collage';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  // const navigate = useNavigate();

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