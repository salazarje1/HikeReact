import React, { useContext, useEffect, useState } from 'react'; 
import { Link, Redirect, useParams } from 'react-router-dom';
import HikeApi from './HikeApi';
import UserApi from './UserApi';
import UserContext from './context/UserContext';


const DisplayHike = () => {
    const { currUser } = useContext(UserContext); 
    const { handle } = useParams(); 
    const [hike, setHike] = useState(false);  

    const addHike = async (e, username, hike) => {
        console.log(hike); 
        currUser.hikes.push({hike_id: hike.id, hike_name: hike.name}); 
        currUser.hikesArray.push(hike.id); 
        await UserApi.addHikeToUser(username, hike.id); 

        e.target.innerText = 'Hike Added'; 
        e.target.className = 'btn added'; 

    }

    useEffect(() => {   
        async function getData() {
            try {
                let res = await HikeApi.getHike(handle); 
                setHike(res.data); 
            } catch(err) {
                console.log(err); 
                setHike(null); 
            }
        }
        getData();
    }, []);


    if(!hike) {
        return <div>...Loading</div>
    }
    
    return (hike && currUser) ? (
        <div>
            <h1 className='DisplayHike-title'>{hike.name}</h1>
            <p>{hike.description}</p>
            <p>Length: {hike.hikeLength}</p>
            <p>Highest Point: {hike.highestPoint}</p>
            <p>Elevantion: {hike.elevationGain}</p>
            <p>Location: {hike.location.city} {hike.location.stateCode}</p>
            <p>Area: {hike.area}</p>
            <p>Entry Fee: {hike.entryFee ? "Yes" : "No"}</p>
            <p>Permit Required: {hike.permitRequired ? "Yes" : "No"}</p>
            <div>    
                <Link className='DisplayHike-btn' to={`/hikes`}>Back</Link>
                {currUser.hikesArray.includes(hike.id) ? 
                <button className='DisplayHike-btn added'>Hike Added</button> :
                <button className='DisplayHike-btn' onClick={(e) => addHike(e, currUser.username, hike)}>Add Hike</button> 
                }
            </div>
            
        </div>
    ) : <Redirect to="/hikes" />
}

export default DisplayHike; 