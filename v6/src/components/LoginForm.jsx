import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login_form.css';
import { useAuth } from './AuthContext';

const LoginForm = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');

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

      if (response.ok) {
        const responseData = await response.text();
        if (responseData === 'Authentication successful') {
          login();
          alert('Logged in successfully!');
          navigate('/home');
        } else {
          alert('Error during logging in. Try again');
        }
      }
    } catch (error) {
      console.error('Error during logging proccess: ', error);
    }
  };

  return (
    <div className="main_container">
      <h1>Garnuchy</h1>
      <form onSubmit={handleLogin} className="login_container">
        <input
          type="text"
          placeholder="Username"
          id="usrname"
          value={usernameOrEmail}
          onChange={(e) => setUsernameOrEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          id="pswrd"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input className="buttons" type="submit" id="loginButton" />
        <div>
          Not registered yet? <Link to="/register">Sign up now!</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
