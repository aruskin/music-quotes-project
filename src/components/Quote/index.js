import React from "react";
import {Link} from "react-router-dom";

function Quote({quote}){
    function displayDate(datestring){
        let date=new Date(datestring);
        return(date.toDateString())
    }
    return(
        <li className="list-group-item" key={quote._id}>
            <div><h3><Link to={`/details/${quote.speaker.mbid}`}>{quote.speaker.name}</Link> on&nbsp;
                {quote.subject.map((item, index) => <span key={index}>{index > 0 ? `, `: ``}<Link to={`/details/${item.mbid}`}>{item.name}</Link></span>)}</h3></div>
            <div>{quote.text}</div>
            <br/>
            <div><span className="fw-bold">Source:</span> <a href={quote.sourceURL} target="_blank" rel="noreferrer">{quote.source}</a>
                {quote.sourceDate ? <> <span className="fw-bold">&middot; Source date:</span> {displayDate(quote.sourceDate)}</> : ''}</div>
            <div><span className="fw-bold">Submitted by:</span> <Link to={`/profile/${quote.admin.submittedBy.username}`}>{quote.admin.submittedBy.username}</Link></div>
            <div className="text-muted">Submission date: {quote.admin.submissionDate}</div>
        </li>
    )
}

export default Quote;