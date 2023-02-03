import { useEffect, useState } from 'react'; 
import HikeApi from '../HikeApi';

const useFetch = () => {
    const [hikes, setHikes] = useState(null);
    const [isLoading, setIsLoading] = useState(true); 


    useEffect(() => {
        async function getData() {

            let res = await HikeApi.getHikes();
            
            let data = []; 
            for(const d of res.data){
                data.push({ "geometry": {"type": d.location.type, "coordinates": d.location.coordinates}, "properties": {"id": d._id, "name": d.name, "description": d.description}})
            }
            
            setHikes({features: data})
            setIsLoading(false);
        }
        getData()
    }, []);

    return { hikes, isLoading }
}

export default useFetch; 