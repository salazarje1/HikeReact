import axios from "axios"; 

const BASE_API_URL = "https://hike-trail.online";

class HikeApi {

    static async getHikes() {
        const res = await axios.get(`${BASE_API_URL}/hiketrails`)
        return res.data; 
    }

    static async getHike(handle) {
        const res = await axios.get(`${BASE_API_URL}/hiketrails/${handle}`);

        return res.data;
    }

}

export default HikeApi; 