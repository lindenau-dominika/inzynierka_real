import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import '../styles/navigation.css'

const Navigation = () => {
    const [active, setActive] = useState('Home');

    const handleLinkClick =  (linkName) => {
        setActive(linkName);
    };
    return (
        <header>
            <nav className='bar'>
                <ul className='bar'>
                    <li>
                        <Link to="/" onClick={() => handleLinkClick('Home')}>Pro</Link>
                    </li>
                    <li>
                        <Link to="/matches" onClick={() => handleLinkClick('Matches')}>Matches</Link>
                    </li>
                    <li>
                    <Link to="/players" onClick={() => handleLinkClick('Players')} style={{padding: '15px 10px'}}>Players</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Navigation;