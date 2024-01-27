import Navigation from './Navbar'
import ReactTwitchEmbedVideo from 'react-twitch-embed-video'
import ListTemplate from './List';
import { useState } from 'react' 
import MatchesPage from './MatchesPage';
// import PlayersOfTheWeek from './PlayerStats'

const HomePage = () => {
  const [channel, setChannel] = useState('blastpremier');
  const [chatEnabled, setChatEnabled] = useState(true);


    return (
      <div className='lol'>
        <Navigation />
        <div className='twitch-container'>
        <div className='switch-holder'>
      <button
        onClick={() => {
          setChannel('blastpremier');
          changeChannel('blastpremier');
        }}
        className={channel === 'blastpremier' ? 'active' : ''}
      >
        BLASTPremier
      </button>
      <button
        onClick={() => {
          setChannel('eslcs');
          changeChannel('eslcs');
        }}
        className={channel === 'eslcs' ? 'active' : ''}
      >
        ESLCS
      </button>
      <button
        onClick={() => {
          setChannel('pashaBiceps');
          changeChannel('pashaBiceps');
        }}
        className={channel === 'pashaBiceps' ? 'active' : ''}
      >
        pashaBiceps
      </button>
    </div>
        <ReactTwitchEmbedVideo height={'400px'} width={'800px'} channel={channel} layout={chatEnabled ? 'video-with-chat' : 'video'}/>
    chat
    <label className='switch'>
        <input
          type="checkbox"
          checked={chatEnabled}
          onChange={() => setChatEnabled(!chatEnabled)}
        />
        <span className='slider round'></span>
      </label>
        <div className='hltv-test'>
        <h1>HLTV Future Events</h1> 
        <h1>  | </h1>
        <h1>HLTV Top 10 Teams</h1>
        </div>
        </div>
        <MatchesPage />
      </div>
    );
  };
  
  export default HomePage;
  