import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/playersPage.css'
import Navigation from './Navbar';


const PlayersPage = () => {
    const [inputVal, setInputVal] = useState('')
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState([]);
    const [topUsers, setTopUsers] = useState([]);
    const [active, setActive] = useState('Players')

    const handleInput = (event) => {
        setInputVal(event.target.value);
      };

      const handlePlayers = async (e) => {
        e.preventDefault();
        const response = await fetch(`https://art.garnuchy.pl/players/search/${inputVal}`);
        const data = await response.json();
        setUsers(data);
      };

      useEffect(() => {
        const fetchTopPlayers = async () => {
            const response = await fetch(`https://art.garnuchy.pl/players/search/${inputVal}`); // Załóżmy, że to jest poprawne API
            const data = await response.json();
            setTopUsers(data.slice(0, 3));
        };

        fetchTopPlayers();
    }, []);

      return (
        <div>
          <Navigation />
                <div>
                <label>Search for Players</label>
                    <form onSubmit={handlePlayers}>
                      <input onChange={handleInput} placeholder='nickname'></input>
                    </form>
                    <h2>Top players</h2>
                <div className='best-players'>
                  {topUsers.slice(0, 3).map((user, index) => {
                    let usernameClass = '';
                    if (index === 0) {
                      usernameClass = 'username-first';
                    } else if (index === 1) {
                      usernameClass = 'username-second';
                    } else if (index === 2) {
                      usernameClass = 'username-third';
                    }

                    return (
                      <Link key={index} to={`/profiles/${user.id}`}>
                        <img src={user.avatar} alt="Avatar" />
                        <p className={usernameClass}>{user.username}</p>
                        <p>{3.7}</p>
                      </Link>
                    );
                  })}
                  </div>
                </div>
                <div className="users-container">
                  {users.map((user, index) => (
                            <Link key={index} to={`/profiles/${user.id}`}>
                              <img src={user.avatar} alt="Avatar" />
                              <p>{user.username}</p>
                              <p>{user.rating}</p>
                          </Link>
                  ))}
                </div>
        </div>
      )
}

export default PlayersPage;