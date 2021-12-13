import React from 'react';
import userService from '../../services/user-service'
import {useDispatch} from "react-redux";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons';


function Logout(){
    let dispatch = useDispatch();

    function handleLogout(event){
        event.preventDefault();
        userService.logout(dispatch);
    }
    return(
        <div className='btn btn-primary mt-2 ms-2'
            onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt}/><div className="d-none d-md-inline p-1">Logout</div>
        </div>
    )
}

export default Logout;