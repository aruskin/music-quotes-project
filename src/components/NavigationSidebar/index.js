import React from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import Logout from '../User/Logout';

function NavigationSidebar({active=''}){
    const loggedIn = useSelector((state) => state.loggedIn);
    const user = useSelector((state) => state.user);
    const isAdmin = user.role === 'ADMIN';
    return(
        <div>
            <div className="list-group">
                <Link to="/" className={`list-group-item ${active === 'home' ? 'active' : ''}`}>
                Home
                </Link>
                <Link to="/search" className={`list-group-item ${active === 'search' ? 'active' : ''}`}>
                Search
                </Link>
                {!loggedIn &&
                    <Link to="/login" className={`list-group-item ${active === 'login' ? 'active' : ''}`}>
                    Login
                    </Link>}
                {!loggedIn &&
                    <Link to="/register" className={`list-group-item ${active === 'register' ? 'active' : ''}`}>
                    Register
                    </Link>}
                {loggedIn &&
                    <Link to="/profile" className={`list-group-item ${active === 'profile' ? 'active' : ''}`}>
                    Profile
                    </Link>}
                {loggedIn &&
                    <Link to="/submit" className={`list-group-item ${active === 'submit' ? 'active' : ''}`}>
                    Submit Quote
                    </Link>}
                {isAdmin &&
                    <Link to="/admin" className={`list-group-item ${active === 'admin' ? 'active' : ''}`}>
                      Admin Interface
                      </Link>}
                <Link to="/privacy" className={`list-group-item ${active === 'privacy' ? 'active' : ''}`}>
                    Privacy Policy
                </Link>
            </div>
            {loggedIn &&
                <Logout/>}
        </div>
    )
}

export default NavigationSidebar;