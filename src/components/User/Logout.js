import React from 'react';
import userService from '../../services/user-service'
import {useDispatch} from "react-redux";

function Logout(){
    let dispatch = useDispatch();

    function handleLogout(event){
        event.preventDefault();
        userService.logout(dispatch);
    }
    return(
        <div className='btn btn-primary mt-2 ms-2'
            onClick={handleLogout}>
             Logout
        </div>
    )
}

export default Logout;