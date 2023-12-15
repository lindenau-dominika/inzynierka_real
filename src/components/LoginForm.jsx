import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login_form.css';
import { useAuth } from './AuthContext';
import LogoImage from '../assets/logov2.svg'
import Arrow from '../assets/arrow.svg'

const LoginForm = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [progress, setProgress] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const userData = {
    usernameOrEmail,
    password,
  };
  

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      console.log(userInfo)
      if (response.ok) {
        setProgress(true);
        const responseData = await response.text();
        if (responseData === 'Authentication successful') {
          login();
          setProgress(false);
          alert('Logged in successfully!');
          navigate(`/`);
          // console.log(responseData)
        } else {
          alert('Error during logging in. Try again');
        }
      }
    } catch (error) {
      setProgress(true);
      console.error('Error during logging proccess: ', error);
    }
  };

  return (<div className='dif2 col-24'>
      <section className="main_container col-21" id='login'>
        <img src={LogoImage}  alt="Logo of omega" />
        <form onSubmit={handleLogin} className={`login_container ${progress ? 'progress' : ''}`}>
          <h1>Garnuchy</h1>
          <div className='extra'>
            <input className='login-input'
              type="text"
              placeholder="Username"
              id="usrname"
              value={usernameOrEmail}
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              />
            <input className='login-input' 
              type="password"
              placeholder="Password"
              id="pswrd"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
            <input className="buttons" type="submit" id="loginButton" />
            <div>
              Not registered yet? <br></br> <Link to="/register">Sign up now!</Link>
            </div>
          </div>
        </form>
      </section>
      <section className='extra col-21' id='instruction'>
        <div className='extra'>
          <h2>Check all the opportunities</h2>
          <div className='arrow'><img src={Arrow}/></div>
        </div>
          <div className='instr'>
          <div className='col-8'>
          <h3>Check all the opportunities</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </p>
          </div>
          <div className='col-8'>
          <h3>Check all the opportunities</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </p>            
          </div>
          <div className='col-8'>
          <h3>Check all the opportunities</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </p>
          </div>
        </div>
      </section>
    </div>

  );
};

export default LoginForm;
