import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login_form.css';

const LoginForm = ({ setAuthenticated }) => {
  const navigate = useNavigate();
  const [usernameOrEmail, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const userData = {
      usernameOrEmail,
      password,
    };

    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log('Logged in successfully');
        setAuthenticated(true);
        navigate('/home');
      } else {
        console.error('Failed to log in');
      }
    } catch (error) {
      console.error('Failed during logging in: ', error);
    }
  };

  return (
    <div>
      <div className="main_container">
        <h1>Garnuchy</h1>
        <form onSubmit={handleLogin} className="login_container">
          <input
            type="text"
            placeholder="Username"
            id="usrname"
            value={usernameOrEmail}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <input
            type="password"
            placeholder="Password"
            id="pswrd"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <input className="buttons" type="submit" id="loginButton"></input>
          <div>
            Not registered yet? <Link to="/register">Sign up now!</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
