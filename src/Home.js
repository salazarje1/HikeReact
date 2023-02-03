import React, { useContext } from 'react'; 
import { Link } from 'react-router-dom'; 
import UserContext from './context/UserContext';

import './Home.css'; 

const Home = () => {
    const { currUser } = useContext(UserContext); 

    return (
        <div className='Home'>
            <h1 className='Home-title'>What's Your Next Adventure</h1>
            {currUser ? null : 
                <div>
                    <Link to="/map" className="btn">Hike Map</Link>
                    <Link to="/signup" className='btn'>Sign Up</Link>
                </div>
            }
        </div>
    )
}

export default Home; 