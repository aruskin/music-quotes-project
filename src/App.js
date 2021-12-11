import './App.css';
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from './components/Home';
import Login from './components/User/Login';
import Register from './components/User/Register';
import Search from './components/Search';
import Profile from './components/Profile';
import Artist from './components/Artist';
import Results from './components/Results';
import PrivacyPolicy from './components/PrivacyPolicy';
import SubmitQuote from './components/SubmitQuote';
import AdminInterface from './components/AdminInterface';

import currentUser from './reducers/users';
import {createStore} from "redux";
import {Provider} from "react-redux";

function App() {
  //const initialState = {loggedIn: false, user: {}};
  const store = createStore(currentUser);
  //const [state, dispatch] = useReducer(loggedInReducer, initialState);
  return (
    <BrowserRouter>
        <Provider store={store}>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/profile/:userName" element={<Profile/>}/>
            <Route path="/search" element={<Search/>}/>
            <Route path="/results/:criteria" element={<Results/>}/>
            <Route path="/details/:mbid" element={<Artist/>}/>
            <Route path="/privacy" element={<PrivacyPolicy/>} />
            <Route path="/submit" element={<SubmitQuote/>} />
            <Route path="/admin" element={<AdminInterface/>} />
        </Routes>
        </Provider>
    </BrowserRouter>
  );
}

export default App;
