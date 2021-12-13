import React from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import Logout from '../User/Logout';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHome, faSearch, faSignInAlt, faUser, faAddressCard, faFeather, faUsersCog, faFileAlt} from '@fortawesome/free-solid-svg-icons';

function NavigationSidebar({active=''}){
    const loggedIn = useSelector((state) => state.loggedIn);
    const user = useSelector((state) => state.user);
    const isAdmin = user.role === 'ADMIN';
    return(
        <div>
            <div className="list-group">
                <Link to="/" className={`list-group-item ${active === 'home' ? 'active' : ''}`}>
                <FontAwesomeIcon icon={faHome}/><div className="d-none d-md-inline p-1">Home</div>
                </Link>
                <Link to="/search" className={`list-group-item ${active === 'search' ? 'active' : ''}`}>
                <FontAwesomeIcon icon={faSearch}/><div className="d-none d-md-inline p-1">Search</div>
                </Link>
                {!loggedIn &&
                    <Link to="/login" className={`list-group-item ${active === 'login' ? 'active' : ''}`}>
                    <FontAwesomeIcon icon={faSignInAlt}/><div className="d-none d-md-inline p-1">Login</div>
                    </Link>}
                {!loggedIn &&
                    <Link to="/register" className={`list-group-item ${active === 'register' ? 'active' : ''}`}>
                    <FontAwesomeIcon icon={faAddressCard}/><div className="d-none d-md-inline p-1">Register</div>
                    </Link>}
                {loggedIn &&
                    <Link to="/profile" className={`list-group-item ${active === 'profile' ? 'active' : ''}`}>
                    <FontAwesomeIcon icon={faUser}/><div className="d-none d-md-inline p-1">Profile</div>
                    </Link>}
                {loggedIn &&
                    <Link to="/submit" className={`list-group-item ${active === 'submit' ? 'active' : ''}`}>
                    <FontAwesomeIcon icon={faFeather}/><div className="d-none d-md-inline p-1">Submit Quote</div>
                    </Link>}
                {isAdmin &&
                    <Link to="/admin" className={`list-group-item ${active === 'admin' ? 'active' : ''}`}>
                    <FontAwesomeIcon icon={faUsersCog}/><div className="d-none d-md-inline p-1">Admin Interface</div>
                      </Link>}
                <Link to="/privacy" className={`list-group-item ${active === 'privacy' ? 'active' : ''}`}>
                    <FontAwesomeIcon icon={faFileAlt}/><div className="d-none d-md-inline p-1">Privacy Policy</div>
                </Link>
            </div>
            {loggedIn &&
                <Logout/>}
        </div>
    )
}

export default NavigationSidebar;