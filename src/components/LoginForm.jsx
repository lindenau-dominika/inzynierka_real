import React, { useState, useRef, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login_form.css';
import LogoImage from '../assets/logov2.svg'
import Arrow from '../assets/arrow.svg'
import myAxios from '../api/axios';

const LOGIN_URL = '/auth/signin';

const LoginForm = () => {
  const {setAuth} = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [usernameOrEmail, password]) 

  const userData = {
    usernameOrEmail,
    password,
  };
  

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await myAxios.post(LOGIN_URL, 
        JSON.stringify({username, password}),
        {
          headers: {'Content-Type': 'application/json'},
            withCredentials: true
        }
      );
      console.log(JSON.stringify(response?.data))
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ username, password, roles, accessToken});
      setUsername('');
      setPassword('');
      setSuccess(true);

    } catch(err) {
      if (!err?.response) {
        setErrMsg('No server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }


    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

    } catch (error) {
      console.error('Error during logging proccess: ', error);
    }
  };



  return (<div className='dif2 col-24'>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br/>
          <p>
          <Link to="/">asd</Link>
          </p>
        </section>
      ) : (

        <section className="main_container col-21" id='login'>
        <img src={LogoImage}  alt="Logo of omega" />
        <form onSubmit={handleLogin} className={`login_container`}>
          <h1>Garnuchy</h1>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
          <div className='extra'>
            <input className='login-input'
              type="text"
              placeholder="Username"
              id="usrname"
              ref={userRef}
              autoComplete='off'
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
              />
            <input className='login-input' 
              type="password"
              placeholder="Password"
              id="pswrd"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              />
            <input className="buttons" type="submit" id="loginButton" />
            <div>
              Not registered yet? <br></br> <Link to="/register">Sign up now!</Link>
            </div>
          </div>
        </form>
      </section>
    )}
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
