import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from 'react-router-dom';
import userService from '../../services/user-service'
import NavigationSidebar from "../NavigationSidebar";

function LoginForm(){
    const [credentials, setCredentials] = useState({username: '', password: ''})
    let navigate = useNavigate();
    let dispatch = useDispatch();

    function handleLogin(event){
       event.preventDefault();
       userService.login(dispatch, credentials)
            .then((user) => {
                if(user === 0) {
                    alert("Login failed, please try again")
                } else {
                    //dispatch({type: 'login', payload: {username: user.username}});
                    navigate("/profile");
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
            <Link to="/register" className="btn btn-secondary mt-2 ms-2">
                        Register
                    </Link>
        </form>
    )
}

function Login(){
    const loggedIn = useSelector((state) => state.loggedIn);
    return(
         <div className="row mt-2">
            <div className="col-2">
                <NavigationSidebar active="login"/>
            </div>
            <div className="col-10">
                <h1>Login</h1>
                {loggedIn ?
                    <p>You are already logged in</p>
                    : <LoginForm/>}
            </div>
        </div>
    )
}

export default Login;