import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import NavigationSidebar from "../NavigationSidebar";
import userService from '../../services/user-service';
import quoteService from "../../services/quote-service";
import Quote from "../Quote";

function ManageUsers({user}){
    const [users, setUsers] = useState([]);

    function ManageRoleButton(targetUser, targetRole, actionName, index){
        function handleUpdate(event){
            event.preventDefault();
            userService.updateUserRole({username: targetUser, role: targetRole}).
                then(() =>
                    setUsers(oldValues => [...oldValues.slice(0, index),
                                            {...oldValues[index], role: targetRole},
                                            ...oldValues.slice(index+1)]));
        }
        return(
            <button
                type="button"
                className="btn btn-outline-primary"
                onClick={handleUpdate}>{actionName}</button>
        )
    }

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
                    var banReason = '';
                    return(
                        <tr key={index}>
                            <th><Link to={profileURL}>{item.username}</Link></th>
                            <th>{item.role}</th>
                            <th>{item.accountCreationDate}</th>
                            <th>{item.submittedQuotes.length + item.deletedQuotes}</th>
                            <th>{item.deletedQuotes}</th>
                            <th>
                                <div className='btn-group-vertical'>
                                {item.role==='DEFAULT' &&
                                    ManageRoleButton(item.username, 'BANNED', 'Ban', index)}
                                {item.role==='DEFAULT' &&
                                    ManageRoleButton(item.username, 'ADMIN', 'Promote', index)}
                                {item.role==='BANNED' &&
                                    ManageRoleButton(item.username, 'DEFAULT', 'Unban', index)}
                                {item.role==='ADMIN' && item.username !== user.username &&
                                    ManageRoleButton(item.username, 'DEFAULT', 'Demote', index)}
                                </div>
                            </th>
                        </tr>
                    )
                });
        }
        return(
            <div className="table-responsive-sm">
                    <table className="table table-sm table-hover">
                        <thead className="thead-dark">
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
        {renderUsers(user)}
    </div>
    )
}

function ManageQuotes(){
    const [quotes, setQuotes] = useState([]);

    useEffect(() => {
        quoteService.findAllQuotes()
            .then(quotes => quotes.filter(quote => !quote.admin.verified))
            .then(quotes => setQuotes(quotes));
         return () => {setQuotes([])}
    }, [])

    return(
        <div>
        <h2>Manage Quotes</h2>
        <ul className="list-group">
            {
                quotes.map(quote =>
                    <Quote quote={quote} manage={true} key={quote._id}/>
                )
            }
        </ul>
        </div>
    )
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
                    <>
                    <ManageUsers user={user}/>
                    <ManageQuotes />
                    </>
                    : <p>This interface is only available to admins.</p>}
            </div>
        </div>
    )
}

export default AdminInterface;