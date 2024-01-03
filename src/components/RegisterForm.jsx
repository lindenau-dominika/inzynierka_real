import '../styles/login_form.css'
import React, {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import LogoImage from '../assets/logov2.svg'

export const RegisterForm = () => {

    const navigate = useNavigate();
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [steamId, setSteamID] = useState('');
    const [faceitId, setFaceitID] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [email, setEmail] = useState('')
    const [progress, setProgress] = useState(false);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== repeatPassword) {
            alert('Password does not match');
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
                setProgress(true)
                alert('User created successfully');
                navigate('/Login');
            }
            else {
                alert('Failed to create user');
            }
        } catch (error) {
            console.error('Error during registration: ', error);
        }
    };


    return (
      <div class='dif2 col-24'>
        <section>
        <div className="main_container">
        <img src={LogoImage}/>
            <form onSubmit={handleSubmit} className={`login_container ${progress ? 'progress' : ''}`}>
            <h1>Register</h1>
            <div className='extra'>

                <input className='login-input' type="email" placeholder="E-mail" id="email" value={email} onChange={(e) =>setEmail(e.target.value)}/>
                <input className='login-input' type="text" placeholder="Username" id="usrname" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input className='login-input' type="password" placeholder="Password" id="pswrd" value={password} onChange={(e) =>setPassword(e.target.value)}/>
                <input className='login-input' type="password" placeholder="Repeat password" id="rpswrd" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)}/>
                <input className='login-input' type="text" placeholder="steamID" id="steam" value={steamId} onChange={(e) =>setSteamID(e.target.value)}/>
                <input className='login-input' type="text" placeholder="faceitID" id="faceit" value={faceitId} onChange={(e) =>setFaceitID(e.target.value)}/>
                <input  className="buttons" type="submit" id="loginButton" />
                    <div>
                        <Link to="/login">Back to login page</Link>
                    </div>
            </div>
            </form>
        </div>
        </section>
        <section>
            <h1>Why is it worth it?</h1>
            <h3>lol its not</h3>
        </section>
        </div>
    )
  }

  export default RegisterForm;