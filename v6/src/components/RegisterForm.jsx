import '../styles/login_form.css'
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

export const RegisterForm = () => {

    const navigate = useNavigate();
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [steamId, setSteamID] = useState('');
    const [faceitId, setFaceitID] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [email, setEmail] = useState('')
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== repeatPassword) {
            console.error('Passwords do not match');
            return;
        }
        const userData = {
            steamId,
            faceitId,
            username,
            email,
            password,
          };

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                console.log('User created successfully');
                navigate('/Login');
            }
            else {
                console.error('Failed to create user');
            }
        } catch (error) {
            console.error('Error during registration: ', error);
        }
    };


    return (
      <div>

        <div className="main_container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit} className="login_container">
                <input type="email" placeholder="E-mail" id="email" value={email} onChange={(e) =>setEmail(e.target.value)}/>
                <input type="text" placeholder="Username" id="usrname" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input type="password" placeholder="Password" id="pswrd" value={password} onChange={(e) =>setPassword(e.target.value)}/>
                <input type="password" placeholder="Repeat password" id="rpswrd" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)}/>
                <input type="text" placeholder="steamID" id="steam" value={steamId} onChange={(e) =>setSteamID(e.target.value)}/>
                <input type="text" placeholder="faceitID" id="faceit" value={faceitId} onChange={(e) =>setFaceitID(e.target.value)}/>
                <input className="buttons" type="submit" id="loginButton"/>
            </form>
        </div>
        </div>
    )
  }

  export default RegisterForm;