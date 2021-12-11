import './App.css';
import React, {useReducer} from "react";
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

function loggedInReducer(state, action){
    switch (action.type){
        case 'login':
            return {loggedIn: true, user: action.payload};
        case 'logout':
            return {loggedIn: false, user: {}};
        default:
            return state;
    }
}

function App() {

  const initialState = {loggedIn: false, user: {}};
  const [state, dispatch] = useReducer(loggedInReducer, initialState);
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home user={state.user} loggedIn={state.loggedIn} />} />
            <Route path="/login" element={<Login loggedIn={state.loggedIn} dispatch={dispatch}/>} />
            <Route path="/register" element={<Register loggedIn={state.loggedIn} dispatch={dispatch}/>}/>
            <Route path="/profile" element={<Profile user={state.user} loggedIn={state.loggedIn} dispatch={dispatch}/>}/>
            <Route path="/profile/:userName" element={<Profile user={state.user} loggedIn={state.loggedIn} dispatch={dispatch}/>}/>
            <Route path="/search" element={<Search loggedIn={state.loggedIn} dispatch={dispatch}/>}/>
            <Route path="/results/:criteria" element={<Results loggedIn={state.loggedIn} dispatch={dispatch}/>}/>
            <Route path="/details/:mbid" element={<Artist loggedIn={state.loggedIn} dispatch={dispatch}/>}/>
            <Route path="/privacy" element={<PrivacyPolicy loggedIn={state.loggedIn} dispatch={dispatch}/>} />
            <Route path="/submit" element={<SubmitQuote user={state.user} loggedIn={state.loggedIn} dispatch={dispatch}/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
