const CONSTANTS = require('../consts');
const USER_API = CONSTANTS.API_BASE_URL + "users";

const profile = () => {
    return fetch(`${USER_API}/profile`, {
        method: "POST",
        credentials: "include"
    }).then(response => response.json())
}

const login = (dispatch, credentials) => {
    return fetch(`${USER_API}/login`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(credentials),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
      .then(user => {
        if(user.username){
            dispatch({type: 'login', payload: {username: user.username, role: user.role}})
        }else{
           return(user)
        }
      })
}

const register = (dispatch, credentials) => {
    return fetch(`${USER_API}/register`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({username: credentials.username, password: credentials.password}),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
       .then(user => dispatch({type: 'login', payload: {username: user.username, role: user.role}}))
}

const logout = (dispatch) => {
    return fetch(`${USER_API}/logout`, {
        method: "POST",
        credentials: "include"
    }).then(() => dispatch({type: 'logout'}))
}

const findUserByName = (username) => {
    return fetch(`${USER_API}/${username}`).then(response => response.json())
}

const resetPassword = (newPassword) => {
    return fetch(`${USER_API}/reset`, {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify({newPassword: newPassword}),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
}

const findAllUsers = () =>
    fetch(USER_API)
        .then(response => response.json())

const updateUserRole = (body) => {
    return fetch(`${USER_API}/update-role`, {
            method: "PUT",
            credentials: "include",
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json())
}
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
    register, login, logout, profile, findUserByName, resetPassword, findAllUsers, updateUserRole
}