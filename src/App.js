import './App.css';
import React, {useEffect, useState} from "react";
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

function App() {
  const [user, setUser] = useState({});
  useEffect(() =>
      userService.profile()
          .catch(error => {console.log(error);})
          .then(currentUser => setUser(currentUser))
  ,[]);

  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => setLoggedIn(user.username ? true : false), [user])
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home user={user} loggedIn={loggedIn} />} />
            <Route path="/login" element={<Login loggedIn={loggedIn} />} />
            <Route path="/register" element={<Register loggedIn={loggedIn} />}/>
            <Route path="/profile" element={<Profile user={user} loggedIn={loggedIn}/>}/>
            <Route path="/profile/:userId" element={<Profile user={user} loggedIn={loggedIn}/>}/>
            <Route path="/search" element={<Search loggedIn={loggedIn}/>}/>
            <Route path="/results/:criteria" element={<Results loggedIn={loggedIn}/>}/>
            <Route path="/details/:mbid" element={<Artist loggedIn={loggedIn}/>}/>
            <Route path="/privacy" element={<PrivacyPolicy loggedIn={loggedIn} />} />
            <Route path="/submit" element={<SubmitQuote user={user} loggedIn={loggedIn}/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
