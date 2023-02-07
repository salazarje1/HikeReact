import React, {useContext, useState} from 'react'; 
import { Redirect, useHistory } from 'react-router-dom';
import UserContext from './context/UserContext';
import UserApi from './UserApi';
import UserHike from './UserHike';


const Profile = ({ setCurrUser, deleteUser }) => {
    const history = useHistory();
    const { currUser } = useContext(UserContext);
    
    const INITIALSTATE = {
        firstName: "",
        lastName: "",
        email: ""
    }
    const [formData, setFormData] = useState(INITIALSTATE);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!formData.firstName) formData.firstName = currUser.firstName; 
        if(!formData.lastName) formData.lastName = currUser.lastName; 
        if(!formData.email) formData.email = currUser.email; 

        const res = await UserApi.updateUser(formData, currUser.username);
        setCurrUser(res);

        setFormData(INITIALSTATE);

        history.push(`/`);
    }

    if(!currUser) {
        history.push('/'); 
    } 


    return (currUser) ? (
        <div className='Profile-div'>
            <div>
                <h1>Hello {currUser.firstName}</h1>
                <form className='Signup-form' onSubmit={handleSubmit}>
                    <h3 className='Signup-form-user'>Username: {currUser.username}</h3>
                    <label htmlFor='first_name'>First Name</label>
                    <input type='text' name='firstName' id='first_name' placeholder={currUser.firstName} value={formData.firstName} onChange={handleChange} />
                    <label htmlFor='last_name'>Last Name</label>
                    <input type='text' name='lastName' id='last_name' placeholder={currUser.lastName} value={formData.lastName} onChange={handleChange} />
                    <label htmlFor='email'>Email</label>
                    <input type='email' name='email' id='email' placeholder={currUser.email} value={formData.email} onChange={handleChange} />
                    <button className='DisplayHike-btn'>Edit</button>
                </form>
                <hr></hr>
                <h3>Delete Account: </h3>
                <button onClick={() => deleteUser(currUser.username)}>Delete</button>
            </div>

            <div>
                <h2 className='Profile-h2'>Your Saved Hikes</h2>
                <hr className='Profile-hr'></hr>
                {currUser.hikes.map((hike) => {
                    return <UserHike key={hike.id} hike={hike} username={currUser.username} />
                })}
            </div>

        </div>
    ) : <Redirect to="/" />
}

export default Profile; 