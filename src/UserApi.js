import axios from "axios";
import HikeApi from "./HikeApi";

const BASE_API_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001/";

class UserApi {

    static token; 
    
    static async getUser(username) {
        const res = await axios.get(`${BASE_API_URL}users/${username}`, { headers: { Authorization: UserApi.token }})
        return res.data;
    }

    static async signupUser(data) {
        let res = await axios.post(`${BASE_API_URL}users/register`, data, { headers: { Authorization: UserApi.token }})
        console.log(res); 
        return res; 
    }

    static async login(data) {
        let res = await axios.post(`${BASE_API_URL}users/login`, data, { headers: { Authorization: UserApi.token }});
        return res; 
    }

    static async updateUser(data, username) {
        let res = await axios.patch(`${BASE_API_URL}users/${username}`, data, { headers: { Authorization: UserApi.token }}); 
        return res; 
    }

    static async addHikeToUser(username, hikeId) {
        let hike = await HikeApi.getHike(hikeId); 
        if(!hike) return "Hike not found!"

        const res = await axios.post(`${BASE_API_URL}users/${username}/hikes`, hike.data, { headers: { Authorization: UserApi.token }});
        return res; 
    }

    static async deleteUser(username) {
        let res = await axios.delete(`${BASE_API_URL}users/${username}`, { headers: { Authorization: UserApi.token }});
        return res; 
    }

    static async deleteHikeToUser(username, hikeId) {
        const res = await axios.delete(`${BASE_API_URL}users/${username}/hikes/${hikeId}`, { headers: { Authorization: UserApi.token }})
        return res; 
    }
}

export default UserApi; 