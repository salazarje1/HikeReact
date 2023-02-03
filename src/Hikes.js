import React, { useContext, useEffect, useState } from 'react'; 
import { Redirect } from 'react-router-dom'; 
import UserContext from './context/UserContext';
import HikeApi from './HikeApi';
import DisplayHikes from './DisplayHikes';

import './Hikes.css'; 


const Hikes = () => {
    const { currUser } = useContext(UserContext); 
    const [hikes, setHikes] = useState([]); 

    useEffect(() => {
        async function getData() {
            let res = await HikeApi.getHikes();
            setHikes(res.data); 
        }

        getData(); 
    }, []) 

    return currUser ? (
        <div className='Hikes'>
            <h1 className='Hikes-title'>Hikes</h1>
            <div className='Hikes-div'>
                {hikes.map((hike) => {
                    return <DisplayHikes key={hike._id} hike={hike} />
                })}
            </div>
            
        </div>
    ) : <Redirect to="/" />
}

export default Hikes; 