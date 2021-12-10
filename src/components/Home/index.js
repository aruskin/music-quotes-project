import React, {useEffect, useState} from "react";
import NavigationSidebar from "../NavigationSidebar";
import quoteService from "../../services/quote-service";
import Quote from "../Quote";

function Home({user={}, loggedIn=false, dispatch}){
    const [quotes, setQuotes] = useState([]);
    const NQUOTES = 5;
    useEffect(() => quoteService.findAllQuotes()
        .then(quotes => {
            if (quotes.length > NQUOTES) {
                console.log(quotes.length);
                quotes = quotes.slice(0, NQUOTES);
            }
            setQuotes(quotes);
        }))
    return(
        <div className="row mt-2">
            <div className="col-2">
                        <NavigationSidebar active="home" user={user} loggedIn={loggedIn} dispatch={dispatch}/>
            </div>
            <div className="col-10">
            <h1>Home</h1>
            <h2>Project requirements</h2>
            <ol>
                <li>Must be mapped to either the root context ("/") or ("/home").</li>
                <li>Must be the first page when visiting the website</li>
                <li style={{background: 'yellow'}}>Must display generic content for anonymous users. The content must be dynamic based on the latest data. For instance, you might display snippets and links to the most recent post, review, or member who recently joined</li>
                <li style={{background: 'yellow'}}>Must display specific content for the logged in user. The content must be dynamic based on the most recent data entered by the logged in user. For instance, you might display snippets and links to the most recent post or review created by the logged in user</li>
                <li style={{background: 'yellow'}}>Must be clear to what the Web site is about and must look polished and finished</li>
            </ol>
            <h2>Most recently submitted quotes</h2>
                <ul className="list-group">
                    {
                        quotes.map(quote =>
                            <Quote quote={quote}/>
                        )
                    }
                </ul>
            </div>
        </div>
    )
};

export default Home;