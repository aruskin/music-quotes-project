import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import NavigationSidebar from "../NavigationSidebar";
import userService from '../../services/user-service';

function ManageRoleButton(targetUser, targetRole, actionName){
    function handleUpdate(event){
        event.preventDefault();
        userService.updateUserRole({username: targetUser, role: targetRole})
    }
    return(
        <button
            type="button"
            className="btn btn-warning"
            onClick={handleUpdate}>{actionName}</button>
    )
}

function ManageUsers(){
    const [users, setUsers] = useState([]);

    useEffect(() => {
        userService.findAllUsers()
            .then(users => setUsers(users));
        return () => {setUsers([])}
        }, [])

    function renderUsers(){
        var items;
        if(users){
            items = users
                .map(function(item, index){
                    var profileURL = "/profile/" + item.username;
                    return(
                        <tr key={index}>
                            <th><Link to={profileURL}>{item.username}</Link></th>
                            <th>{item.role}</th>
                            <th>{item.accountCreationDate}</th>
                            <th>{item.submittedQuotes.length + item.deletedQuotes}</th>
                            <th>{item.deletedQuotes}</th>
                            <th>
                                {item.role==='DEFAULT' && ManageRoleButton(item.username, 'BANNED', 'Ban')}
                                {item.role==='DEFAULT' && ManageRoleButton(item.username, 'ADMIN', 'Promote')}
                                {item.role==='BANNED' && ManageRoleButton(item.username, 'DEFAULT', 'Unban')}
                                {item.role==='ADMIN' && ManageRoleButton(item.username, 'DEFAULT', 'Demote')}
                            </th>
                        </tr>
                    )
                });
        }
        return(
            <div className="table-responsive-sm">
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th scope="col">Username</th>
                                <th scope="col">Role</th>
                                <th scope="col">Account creation date</th>
                                <th scope="col">Submitted quotes</th>
                                <th scope="col">Deleted quotes</th>
                                <th scope="col">Manage user</th>
                            </tr>
                        </thead>
                        <tbody>
                        {items}
                        </tbody>
                    </table>
                </div>
        )

    }
    return(
    <div>
    <h2>Manage Users</h2>
        {renderUsers()}
    </div>
    )
}

function VerifyQuotes(){

}

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
                {isAdmin ?
                    <ManageUsers/>
                    : <p>This interface is only available to admins.</p>}
            </div>
        </div>
    )
}

export default AdminInterface;