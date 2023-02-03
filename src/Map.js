import React, { useContext } from 'react'; 
import DisplayMap from './DisplayMap';
import useFetch from './hooks/useFetch';
import UserContext from './context/UserContext';

import './Map.css';


const Map = () => {
    const { currUser } = useContext(UserContext); 
    const data = useFetch()

    if(data.isLoading) {
        return <div>Loading...</div>
    } 

    let hikes = data.hikes; 

    return (
        <div>
            <h1>Map</h1>
            <DisplayMap hikes={hikes} />
        </div>
    )
}

export default Map; 