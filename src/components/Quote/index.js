import React from "react";
import {Link} from "react-router-dom";

function Quote({quote}){
    return(
        <li className="list-group-item" key={quote._id}>
            <div><Link to={`/details/${quote.speaker.mbid}`}>{quote.speaker.name}</Link> on&nbsp;
                {quote.subject.map((item, index) => <span>{index > 0 ? `, `: ``}<Link to={`/details/${item.mbid}`}>{item.name}</Link></span>)}:</div>
            <div>{quote.text}</div>
            <div>Submitted by: <Link to={`/profile/${quote.admin.submittedBy.username}`}>{quote.admin.submittedBy.username}</Link></div>
            <div>Submission date: {quote.admin.submissionDate}</div>
        </li>
    )
}

export default Quote;