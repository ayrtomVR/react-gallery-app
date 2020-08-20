import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => (
    <nav className="main-nav">
        <ul>
            <li>
                <NavLink to="/motorcycle">Motorcycle</NavLink>
            </li>
            <li>
                <NavLink to="/lake">Lake</NavLink>
            </li>
            <li>
                <NavLink to="/bird">Bird</NavLink>
            </li>
        </ul>
    </nav>
);

export default Nav;
