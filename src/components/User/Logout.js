import React from 'react';
import userService from '../../services/user-service'

function Logout({dispatch}){
    return(
        <div className='btn btn-primary'
            onClick={(event) => {
                userService.logout();
                dispatch({type: 'logout'});
                }}>
             Logout
        </div>
    )
}

export default Logout;