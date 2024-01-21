import { Sidenav } from '../components/Sidenav';
import { Collage } from '../components/Collage';
import '../styles/home.css'
import MatchesHistory from '../components/MatchHistory';
import { SimpleBarChart} from '../templates/BarChart';
import Speedometer from '../templates/PieChart';
import React, { useState, useEffect } from 'react';
// import { useAuth } from '../components/AuthContext';


const Home = () => {
  // const { isAuthenticated } = useAuth();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  // if (!isAuthenticated) {
  //   return <Navigate to='/login'/>
  // }

  useEffect(() => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    });


  const pieChartData = [
    { name: 'Reszta', value: 100 - 57 },
    { name: 'Rating', value: - 2 },
  ];

  const data = [
    { map: 'Dust2', winratio: 55.5 },
    { map: 'Mirage', winratio: 70 },
    { map: 'Inferno', winratio: 50 },
    { map: 'Nuke', winratio: 32 },
    { map: 'Overpass', winratio: 62 },
    { map: 'Train', winratio: 53 },
    { map: 'Vertigo', winratio: 57 },
  ];
  return (
    <>
          <Sidenav />
        <div className='col-21 home-box'>
        <h1>Recently played</h1>
          <div className='coll'>
            <Collage className='coll'/> 
            </div>
          <div className='maps'>
            <div className='sis'> 
            <SimpleBarChart height={screenHeight*0.2}width={screenWidth*0.5} data={data}/>
              <div className='speed-container'> 
              <h2>Recent Month Stats</h2>
                <div className='smol'>
                <Speedometer value={ -0.61} percent={false} title={'Rating'}/>
                <Speedometer value={ 36.12} percent={true} title={'Winrate'}/>
                </div>
              </div>
            </div>
            <MatchesHistory />
          </div>
      </div>
    </>
  );
};

export default Home;