import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import NavigationSidebar from "../NavigationSidebar";
import quoteService from "../../services/quote-service";
import userService from "../../services/user-service";
import Quote from "../Quote";

function SpecificHomeContent({user}){
    const [recentQuote, setRecentQuote] = useState({});

    async function findMyMostRecentSubmission(){
        let quote = {};
        if(user){
          let currentUser = await userService.findUserByName(user.username);
          if(currentUser.submittedQuotes){
            const numQuotes = currentUser.submittedQuotes.length;
            if(numQuotes > 0){
                quote = await quoteService.findQuoteByID(currentUser.submittedQuotes[numQuotes - 1]);
            }
          }
        }
        setRecentQuote(quote);
    }

    useEffect(() => findMyMostRecentSubmission(), []);

    return(
        <div className="mt-2">
        <h2>My most recent submission</h2>
        {recentQuote._id ?
            <Quote quote={recentQuote} key={recentQuote._id}/>
            : <p>You have not submitted any quotes.</p>}
        </div>
    )
}

function Home(){
    const user = useSelector((state) => state.user);
    const [quotes, setQuotes] = useState([]);
    const NQUOTES = 5;

    useEffect(() => {
        quoteService.findAllQuotes()
            .then(quotes => {
                if (quotes.length > NQUOTES) {
                    quotes = quotes.slice(0, NQUOTES);
                }
                setQuotes(quotes);
            });
     }, []);

    return(
        <div className="row mt-2">
            <div className="col-2">
                        <NavigationSidebar active="home"/>
            </div>
            <div className="col-10">
            <h1>Rock Insults</h1>
            <p>A crowdsourced database of musicians talking shit about each other</p>
            {user.username ? <SpecificHomeContent user={user} /> : ''}
            <h2>Most recently submitted quotes</h2>
            <ul className="list-group">
                {
                    quotes.map(quote =>
                        <Quote quote={quote} key={quote._id}/>
                    )
                }
            </ul>
            </div>
        </div>
    )
};

export default Home;