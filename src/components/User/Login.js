//copied from https://github.com/jannunzi/wbdv-sp21-02-jannunzi-prototype-react/blob/main/src/components/users/login.js
//refactored to use useNavigate instead of useHistory (react-router-dom v6 compatibility)

import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import userService from '../../services/user-service'
import NavigationSidebar from "../NavigationSidebar";

const LoginForm = () => {
    const [credentials, setCredentials] = useState({username: '', password: ''})
    let navigate = useNavigate();
    function handleLogin(event){
       event.preventDefault();
       userService.login(credentials)
            .then((user) => {
                if(user === 0) {
                    alert("Login failed, please try again")
                } else {
                    navigate("/profile")
                }
            })
    }
    return(
        <form>
            <div className="form-group">
                <label htmlFor="loginUsername">Username</label>
                <input
                    value={credentials.username}
                    onChange={(e) => {setCredentials({...credentials, username: e.target.value})}}
                    className="form-control"
                    placeholder="username"
                    id="loginUsername"/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    value={credentials.password}
                    onChange={(e) => {setCredentials({...credentials, password: e.target.value})}}
                    className="form-control"
                    placeholder="password"
                    type="password"
                    label="password"/>
            </div>
            <button
                onClick={handleLogin}
                className="btn btn-primary mt-2">
                Login
            </button>
            <Link to="/register">
                        Register
                    </Link>
        </form>
    )
}

function Login({loggedIn=false}){
    return(
         <div className="row mt-2">
            <div className="col-2">
                <NavigationSidebar active="login" loggedIn={loggedIn}/>
            </div>
            <div className="col-10">
                <h1>Login</h1>
                {!loggedIn && <LoginForm/>}
                {loggedIn && <p>You are already logged in</p>}
                <h2>Project Requirements</h2>
                <ol>
                <li style={{background: 'yellow'}}>Must allow users to register and create a new account</li>
                <li style={{background: 'yellow'}}>Must allow choosing a role(s) for a user. For instance, when signing up you can provide a checkbox or radio button to select the role or roles. Alternatively provide an admin role and admin page that allows configuring user role(s)</li>
                <li style={{background: 'yellow'}}>Must allow login in and identifying themselves</li>
                <li style={{background: 'yellow'}}>Must disallow access to at least one Web page unless logged in</li>
                <li style={{background: 'yellow'}}>Must allow access to all other Web pages even when not logged in</li>
                <li style={{background: 'yellow'}}>Must adapt content based on whether user is logged in or not for at least the Home page and Profile page</li>
                <li style={{background: 'yellow'}}>Must force login only when identity is required. For instance, an anonymous user might search for movies and visit the details page for a particular movie without needing to login. But if they attempt to like the movie, or rate it, or comment on it, or write a review, or follow someone, the application must request the user to login. Most of the Web application must be available without login (see me if not)</li>
                <li>Must be mapped to /login if both login and register are implemented in the same page</li>
                <li>The login and register page can be implemented as a single page or as two separate pages. In that case the login page must be mapped to /login and the register page must be mapped to /register</li>
                </ol>
            </div>
        </div>
    )
}

export default Login;