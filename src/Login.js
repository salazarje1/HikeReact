import React, { useState } from 'react'; 
import { useHistory } from 'react-router-dom'; 

import './Signup.css'; 


const Login = ({ login }) => {
    const history = useHistory(); 
    const INITIALSTATE = {
        username: '', 
        password: ''
    }

    const [formData, setFormData] = useState(INITIALSTATE); 
    const handleChange = (e) => {
        const { name, value } = e.target; 
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        const res = await login(formData); 
        if(res.success) {
            setFormData(INITIALSTATE); 
            history.push('/profile'); 
        }

    }

    return (
        <form className="Signup-form" onSubmit={handleSubmit}>
            <h1>Login</h1>

            <label htmlFor='username'>Username</label>
            <input type="text" name="username" id="username" value={formData.username} onChange={handleChange} />

            <label htmlFor='password'>Password</label>
            <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} />
            
            <button className="btn">Login</button>
        </form>
    )
}

export default Login; 