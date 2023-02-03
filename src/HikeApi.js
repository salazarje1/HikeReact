import axios from "axios"; 

const BASE_API_URL = "http://localhost:5000";

class HikeApi {

    static async getHikes() {
        const res = await axios.get('http://localhost:3002/hiketrails')
        return res.data; 
    }

    static async getHike(handle) {
        const res = await axios.get(`http://localhost:3002/hiketrails/${handle}`);

        return res.data;
    }

}

export default HikeApi; 