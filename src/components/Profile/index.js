import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import userService from '../../services/user-service';
import quoteService from "../../services/quote-service";
import NavigationSidebar from "../NavigationSidebar";
import Quote from "../Quote";
import MyProfile from "./MyProfile"

function Profile(){
    const {userName} = useParams();
    const [whoseProfile, setWhoseProfile] = useState({});
    const [submittedQuotes, setSubmittedQuotes] = useState([]);
    const user = useSelector((state) => state.user);
    const loggedIn = useSelector((state) => state.loggedIn);

    function getProfile(username){
        if(loggedIn && !username){
            username = user.username;
        }
        return(userService.findUserByName(username))
    }

    async function fetchUserQuotes(user){
        let quotes = [];
        if(user.submittedQuotes){
            if(user.submittedQuotes.length > 0){
                await Promise.all(user.submittedQuotes.map(async (item, index) => {
                    const quote = await quoteService.findQuoteByID(item);
                    quotes[index] = quote;
                }));
            }
        }
        setSubmittedQuotes(quotes);
    }

    useEffect(() => {
        if(userName || loggedIn){
            getProfile(userName)
                .then((whoseProfile) => {
                    fetchUserQuotes(whoseProfile);
                    setWhoseProfile(whoseProfile)
                });
        }
    }, []);

    function displayUserInfo(){
        let accountCreationDate=new Date(whoseProfile.accountCreationDate);
        accountCreationDate=accountCreationDate.toDateString();

        return(
            <div>
                <div><span className="fw-bold">Account created:</span> {accountCreationDate}</div>
                <div><span className="fw-bold">User status:</span> {whoseProfile.role}</div>
            </div>
        )
    }

    return(
        <div className="row mt-2">
            <div className="col-2">
                <NavigationSidebar active="profile"/>
            </div>
            <div className="col-10">
                {!loggedIn && !userName ?
                    <div>
                        <h1>Profile</h1>
                        <p>Log in to see your profile page</p>
                    </div>
                : ''}

                {userName && !whoseProfile.username ?
                    <div><h1>Invalid user</h1>
                        <p>No such user exists</p>
                    </div>
                : ''}

                {whoseProfile.username ?
                 (whoseProfile.username === user.username ?<h1>My Profile</h1> : <h1>User: {whoseProfile.username}</h1>)
                 : ''}

                {whoseProfile.username ?
                    <div>
                        {displayUserInfo()}
                        <h2 className="mt-2">Submitted Quotes</h2>
                        <ul className="list-group">
                            {submittedQuotes.map(quote => <Quote quote={quote} key={quote._id}/>)}
                        </ul>
                    </div>
                : ''}

                {whoseProfile.username === user.username ? <MyProfile user={whoseProfile}/>: ''}
            </div>
        </div>
    )
};

export default Profile;