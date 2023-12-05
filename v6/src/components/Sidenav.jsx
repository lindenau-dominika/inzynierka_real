import {Link} from 'react-router-dom'
import '../styles/sidenav.css'
import LogoImage from '../assets/logo.svg'

export const Sidenav = () =>
{
    return (
            <div className='sidenav'>
                <Link to="/home">
                    <div className='logo'>
                        <img src={LogoImage}  alt="Logo of omega" />
                    </div>
                </Link>
                <Link to="/demo"> 2D Replays </Link>
                <Link to="/statistics"> Stats </Link>
                <Link to="/home"> jeszcze </Link>
            </div>
    )
}