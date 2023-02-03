import React, { useContext } from 'react'; 
import UserApi from './UserApi';

import './Profile.css'; 
import UserContext from './context/UserContext';

const UserHike = ({hike, username}) => {
    const { currUser } = useContext(UserContext); 

    const deleteHike = async (e, username, hikeId) => {
        e.preventDefault(); 
        
        const idx = currUser.hikesArray.indexOf(hikeId); 
        currUser.hikesArray.splice(idx, 1); 
        await UserApi.deleteHikeToUser(username, hikeId); 

        e.target.parentElement.remove();
    }

    return <a className="UserHike-link" href={`/hikes/${hike.hike_id}`}>
        {hike.hike_name}
        <form onSubmit={(e) => deleteHike(e, username, hike.hike_id)}>
        <button className='UserHike-btn'>Delete</button>
        </form>
    </a>
}

export default UserHike; 

