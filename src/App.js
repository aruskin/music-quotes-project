import './App.css';
import React, {useEffect, useState, useReducer} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from './components/Home'
import Login from './components/User/Login'
import Register from './components/User/Register'
import Search from './components/Search'
import Profile from './components/Profile'
import Artist from './components/Artist'
import Results from './components/Results'
import PrivacyPolicy from './components/PrivacyPolicy'
import SubmitQuote from './components/SubmitQuote'

import userService from './services/user-service'

function loggedInReducer(state, action){
    switch (action.type){
        case 'login':
            return true;
        case 'logout':
            return false;
        default:
            return false;
    }
}

function App() {
  const [user, setUser] = useState({});
  useEffect(() =>
      userService.profile()
          .catch(error => {console.log(error);})
          .then(currentUser => setUser(currentUser))
  ,[]);

  const [loggedIn, loggedInDispatch] = useReducer(loggedInReducer, false);
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home user={user} loggedIn={loggedIn} />} />
            <Route path="/login" element={<Login loggedIn={loggedIn} dispatch={loggedInDispatch}/>} />
            <Route path="/register" element={<Register loggedIn={loggedIn} dispatch={loggedInDispatch}/>}/>
            <Route path="/profile" element={<Profile user={user} loggedIn={loggedIn} dispatch={loggedInDispatch}/>}/>
            <Route path="/profile/:userName" element={<Profile user={user} loggedIn={loggedIn} dispatch={loggedInDispatch}/>}/>
            <Route path="/search" element={<Search loggedIn={loggedIn} dispatch={loggedInDispatch}/>}/>
            <Route path="/results/:criteria" element={<Results loggedIn={loggedIn} dispatch={loggedInDispatch}/>}/>
            <Route path="/details/:mbid" element={<Artist loggedIn={loggedIn} dispatch={loggedInDispatch}/>}/>
            <Route path="/privacy" element={<PrivacyPolicy loggedIn={loggedIn} dispatch={loggedInDispatch}/>} />
            <Route path="/submit" element={<SubmitQuote user={user} loggedIn={loggedIn} dispatch={loggedInDispatch}/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
