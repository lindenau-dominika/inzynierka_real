import { Sidenav } from '../components/Sidenav';
import { Collage } from '../components/Collage';
import '../styles/home.css'
import MatchesHistory from '../components/MatchHistory';
import { useAuth } from '../components/AuthContext';


const Home = () => {
  // const { isAuthenticated } = useAuth();

  // if (!isAuthenticated) {
  //   return <Navigate to='/login'/>
  // }

  return (
    <>
          <Sidenav />
        <div className='col-21 home-box'>
        <h1>Recently played</h1>
          <Collage/>
          <MatchesHistory />
      </div>
    </>
  );
};

export default Home;