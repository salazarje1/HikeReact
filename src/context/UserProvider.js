import React, { useState } from 'react'; 
import UserContext from './UserContext';

const UserProvider = ({ children }) => {
    const [currUser, setCurrUser] = useState('');
    const getUser = (user) => {
        setCurrUser(user);
    }

    return(
        <UserContext.Provider value={{currUser, getUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider; 