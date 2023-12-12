import {Link} from 'react-router-dom'
import '../styles/sidenav.css'

export const Sidenav = () =>
{
    return (
            <div className='sidenav col-3'>
                <Link to="/demo"> 2D Replays </Link>
                <Link to="/statistics"> Stats </Link>
                <Link to="/"> jeszcze </Link>
            </div>
    )
}