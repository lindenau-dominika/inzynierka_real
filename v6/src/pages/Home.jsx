import React from 'react';
import { Sidenav } from '../components/Sidenav';
import { Header } from '../components/Header';
import { Collage } from '../components/Collage';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';


const Home = () => {
  // const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to='/login'/>
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