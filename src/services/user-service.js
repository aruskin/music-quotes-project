//Code initially copied from https://github.com/jannunzi/wbdv-sp21-02-jannunzi-prototype-react/blob/main/src/services/user-service.js
const USER_API = "http://localhost:4000/api/users";

const profile = () => {
    return fetch(`${USER_API}/profile`, {
        method: "POST",
        credentials: "include"
    }).then(response => response.json())
}

const login = (credentials) => {
    return fetch(`${USER_API}/login`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(credentials),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
}

const register = (credentials) => {
    return fetch(`${USER_API}/register`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({username: credentials.username, password: credentials.password}),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
}

const logout = () => {
    return fetch(`${USER_API}/logout`, {
        method: "POST",
        credentials: "include"
    }).then(() => {})
}

const findUserByName = (username) => {
    return fetch(`${USER_API}/${username}`).then(response => response.json())
}

export default {
    register, login, logout, profile, findUserByName
}