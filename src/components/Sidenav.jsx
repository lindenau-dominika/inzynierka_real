import {Link} from 'react-router-dom'
import '../styles/sidenav.css'
// import Loop from '../assets/loop.svg'
import LogoImage from '../assets/logov2.svg'

export const Sidenav = () =>
{
    return (
            <div className='sidenav col-3'>
                            <Link to="/">
              {/* <div className='logo'> */}
                <img src={LogoImage} alt="Logo of omega" />
              {/* </div> */}
            </Link>
                <Link to="/demo"> 2D Replays </Link>
                <Link to="/statistics"> Stats </Link>
                <Link to="/"> jeszcze </Link>
            </div>
    )
}