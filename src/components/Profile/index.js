import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import userService from '../../services/user-service';
import quoteService from "../../services/quote-service";
import NavigationSidebar from "../NavigationSidebar";
import Quote from "../Quote";
import MyProfile from "./MyProfile"

function Profile({user, loggedIn, dispatch}){
    const {userName} = useParams();
    const [whoseProfile, setWhoseProfile] = useState({});
    const [submittedQuotes, setSubmittedQuotes] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        async function fetchUserQuotes(user){
            let quotes = [];
            if(user.submittedQuotes){
                if(user.submittedQuotes.length > 0){
                    await Promise.all(user.submittedQuotes.map(async (item, index) => {
                        const quote = await quoteService.findQuoteByID(item);
                        quotes.push(quote)
                    }))
                }
            }

            setSubmittedQuotes(quotes);
        }

        let userNameVar = userName;
        if(userName === user.username){
            navigate("/profile");
            userNameVar=null;
        }
        if(userNameVar) {
            userService.findUserByName(userNameVar)
                .then(whoseProfile => {setWhoseProfile(whoseProfile)});
        } else if(loggedIn){
            userService.findUserByName(user.username)
                .then(whoseProfile => {setWhoseProfile(whoseProfile)});
        }
        if(whoseProfile){
            fetchUserQuotes(whoseProfile);
        }
//        return () => {
//            setWhoseProfile({});
//            setSubmittedQuotes([]);
//        };
    }, [userName, whoseProfile, loggedIn, user, navigate]);
    return(
        <div className="row mt-2">
            <div className="col-2">
                <NavigationSidebar active="profile"
                    user={user}
                    loggedIn={loggedIn}
                    dispatch={dispatch}/>
            </div>
            <div className="col-10">
                {!loggedIn && !userName ?
                    <div>
                        <h1>Profile</h1>
                        <p>Log in to see your profile page</p>
                    </div>
                : ''}

                {loggedIn && !userName ? <MyProfile user={user}/>: ''}

                {userName ? <h1>User: {whoseProfile.username}</h1> : ''}

                <h2>Submitted Quotes</h2>
                <ul className="list-group">
                    {submittedQuotes.map(quote => <Quote quote={quote} key={quote._id}/>)}
                </ul>

                <h2>Project Requirements</h2>
                <ol>
                <li style={{background: 'yellow'}}>Must allow users to change their personal information. If a user is logged in then they can see their profile including sensitive information such as email and phone</li>
                <li>Must be accessible to other users including anonymous users</li>
                <li style={{background: 'yellow'}}>Must hide personal/private information from others visiting the profile. If a user is visiting someone else's profile, then they can't see that other user's sensitive information</li>
                <li>Must be mapped to "/profile" for displaying the profile of the currently logged in user</li>
                <li>Must be mapped to "/profile/&#123;profileId&#125;" for displaying someone elses profile</li>
                <li>Must group similar/related data into distinguishable groups, e.g., Following, Followers, Review, Favorites, etc.</li>
                <li>Must display lists of snippets and links of all data related to a user. For instance, display a list of links to all the favorite movies, list of links of users they are following, etc. For instance:
                   <ol>
                   <li>If user is following other users, then those users must be listed in the profile and a link must navigate to that other users profile</li>
                   <li>If the user has bookmarked something, then it should be listed in the profile and a link must navigate to that something</li>
                   <li>If the user has commented, or reviewed, or created some content, then there must be a functionality to list a summary of that content and navigate to that content</li>
                   <li>You decide how to present, display, format the information</li>
                </ol>
                </li>
                <li>The profile page may be implemented as several pages</li>
                </ol>
            </div>
        </div>
    )
};

export default Profile;