import React from 'react'; 
import { Route, Switch } from 'react-router-dom'; 

import Home from './Home'; 
import Map from './Map'; 
import Signup from './Signup'; 
import Login from './Login';
import Hikes from './Hikes'
import DisplayHike from './DisplayHike';
import Profile from './Profile';


const Routes = ({ signup, login, setCurrUser, deleteUser }) => {
    return (
        <Switch>
            <Route exact path="/map">
                <Map />
            </Route>
            <Route exact path="/hikes">
                <Hikes />
            </Route>
            <Route exact path="/hikes/:handle">
                <DisplayHike />
            </Route>
            <Route exact path="/signup">
                <Signup signup={signup} />
            </Route>
            <Route exact path="/login">
                <Login login={login}/>
            </Route>
            <Route exact path="/profile">
                <Profile setCurrUser={setCurrUser} deleteUser={deleteUser} />
            </Route>
            <Route exact path="/">
                <Home />
            </Route>
        </Switch>
    )
}

export default Routes; 