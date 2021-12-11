import React from "react";
import {useSelector} from "react-redux";
import NavigationSidebar from "../NavigationSidebar";

function AdminInterface(){
    const user = useSelector((state) => state.user);
    const isAdmin = user.role === 'ADMIN';
    return(
        <div className="row mt-2">
            <div className="col-2">
                <NavigationSidebar active="admin"/>
            </div>
            <div className="col-10">
                <h1>Admin Interface</h1>
                {isAdmin ? '' : <p>This interface is only available to admins.</p>}
            </div>
        </div>
    )
}

export default AdminInterface;