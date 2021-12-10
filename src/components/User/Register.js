import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import userService from '../../services/user-service'
import NavigationSidebar from "../NavigationSidebar";

function RegistrationForm({dispatch}){
    const [credentials, setCredentials] = useState({username: '', password: '', validatedPassword: ''})
    let navigate = useNavigate();
    function handleRegistration(event){
        event.preventDefault();
        if(credentials.password === '' || credentials.username === '') {
            alert("You must enter a username and password")
        } else if (credentials.password !== credentials.validatedPassword) {
            alert("Your passwords do not match")
        } else {
            userService.register(credentials)
                    .then((user) => {
                        if(user === 0) {
                            alert("That username is already taken");
                        } else {
                            dispatch({type: 'login'});
                            navigate("/profile");
                        }
                    })
        }
    }
    return(
        <form>
            <div className="form-group">
                <label htmlFor="registerUsername">Username</label>
                <input
                    value={credentials.username}
                    onChange={(e) => {setCredentials({...credentials, username: e.target.value})}}
                    className="form-control"
                    placeholder="username"
                    id="registerUsername"/>
            </div>
            <div className="form-group">
                <label htmlFor="registerPassword1">Password</label>
                <input
                    value={credentials.password}
                    onChange={(e) => {setCredentials({...credentials, password: e.target.value})}}
                    className="form-control"
                    placeholder="password"
                    type="password"
                    id="registerPassword1"/>
                <label htmlFor="registerPassword2">Validate password</label>
                <input
                    value={credentials.validatedPassword}
                    onChange={(e) => {setCredentials({...credentials, validatedPassword: e.target.value})}}
                    className="form-control"
                    placeholder="password"
                    type="password"
                    id="registerPassword2"/>
            </div>
            <button onClick={handleRegistration} className="btn btn-primary mt-2">
                Register
            </button>
            <Link to="/login">
                        Login
            </Link>
        </form>

    )
}

function Register({loggedIn, dispatch}){
    return(
        <div className="row mt-2">
            <div className="col-2">
                <NavigationSidebar active="login" loggedIn={loggedIn} dispatch={dispatch}/>
             </div>
            <div className="col-10">
                <h1>Register</h1>
                    {!loggedIn && <RegistrationForm dispatch={dispatch}/>}
                    {loggedIn && <p>You have already registered</p>}
            </div>
        </div>
    )
}

export default Register;