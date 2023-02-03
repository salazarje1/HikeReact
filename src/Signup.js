import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './Signup.css'; 


const Signup = ({ signup }) => {
    const history = useHistory();

    const INITIALSTATE = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: ''
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

        const res = await signup(formData); 

        setFormData(INITIALSTATE);
        history.push('/profile')
    }

    return (
        <form className="Signup-form" onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <label htmlFor='username'>Username</label>
            <input type="text" name="username" id="username" value={formData.username} onChange={handleChange} />

            <label htmlFor='firstName'>First Name</label>
            <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} />

            <label htmlFor='lastName'>Last Name</label>
            <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange} />

            <label htmlFor='email'>Email</label>
            <input type="text" name="email" id="email" value={formData.email} onChange={handleChange} />

            <label htmlFor='password'>Password</label>
            <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} />

            <button className='btn'>Submit</button>
        </form>
    )
}

export default Signup; 