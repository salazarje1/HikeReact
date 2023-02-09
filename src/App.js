import React, { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken'; 
import './App.css';

import UserApi from './UserApi';
import NavBar from './NavBar'; 
import Routes from './Routes'; 

import useLocalStorage from './hooks/useLocalStorage';
import UserContext from './context/UserContext';

function App() {

  const [token, setToken] = useLocalStorage('token', null); 
  const [currUser, setCurrUser] = useState(null); 

  const addToken = async ({ token }) => {
    setToken(token); 
  }

  useEffect(() => {
    async function getCurrUser() {
      if(token) {
        try {
          let { username } = jwt.decode(token);
          UserApi.token = token;
          let currUser = await UserApi.getUser(username);
          setCurrUser(currUser.user); 
        } catch(err) {
          console.error(err);
          setCurrUser(null); 
        }
      }
    }

    getCurrUser();
  }, [token]); 

  const login = async (data) => {
    try {
      let token = await UserApi.login(data);
      addToken(token.data);
      return { success: true }; 
    } catch(err) {
      console.error(err);
      return err; 
    }
  }

  const signup = async (data) => {
    try {
      let token = await UserApi.signupUser(data);
      addToken(token.data); 
      return { success: true } 
    } catch(err) {
      console.error(err);
      return err; 
    }
  }

  const logout = () => {
    addToken({token: null});
    setCurrUser(null); 
  }

  const deleteUser = async(username) => {
    try {
      await UserApi.deleteUser(username);
      logout(); 
      return { success: true }; 
    } catch(err) {
      console.error(err); 
      return err; 
    }
  }

  return (
    <div className="App">
      <UserContext.Provider value={{currUser}}>
        <NavBar logout={logout} />
        <Routes login={login} signup={signup} setCurrUser={setCurrUser} deleteUser={deleteUser} />
      </UserContext.Provider>
    </div>
  );
}

export default App;
