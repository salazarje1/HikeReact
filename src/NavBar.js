import React, { useContext } from 'react'; 
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, NavItem} from 'reactstrap'; 
import UserContext from './context/UserContext';

import './NavBar.css'; 

function NavBar({ logout }) {
    const { currUser } = useContext(UserContext); 
    let links; 

    if(currUser) {
        links = <NavItem>
            <NavLink to="/map">Map</NavLink>
            <NavLink to="/hikes">Hikes</NavLink>
            <NavLink to="/profile">Profile</NavLink>
            <a href="/" onClick={logout}>Logout</a>
        </NavItem>
    } else {
        links = <NavItem>
            <NavLink to="/map">Map</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
        </NavItem>
    }

    return (
        <div>
            <Navbar>
                <NavLink exact to="/" className={'navbar-logo'}>Hikers</NavLink>
                <Nav>
                    {links}
                </Nav>
            </Navbar>
        </div>
    )
}

export default NavBar; 