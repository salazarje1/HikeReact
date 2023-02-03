import React from 'react'; 
import { Link } from 'react-router-dom'; 
import './DisplayHike.css'

const DisplayHikes = ({ hike }) => { 
    return (
        <Link to={`/hikes/${hike.id}`} className='DisplayHike'>
            <h2 className='DisplayHike-title'>{hike.name}</h2>
            <p className='DisplayHike-description'>{hike.description}</p>
            <small>{hike.location.city} {hike.location.stateCode}</small>
        </Link>
    )
}

export default DisplayHikes; 