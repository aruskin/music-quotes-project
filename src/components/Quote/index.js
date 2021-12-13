import React from "react";
import {Link} from "react-router-dom";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faExternalLinkAlt} from '@fortawesome/free-solid-svg-icons';


function Quote({quote}){
    function displayDate(datestring){
        let date=new Date(datestring);
        return(date.toDateString())
    }
    return(
        <li className="list-group-item d-flex justify-content-between align-items-start" key={quote._id}>
            <div className="ms-2 me-auto">
            <div>
                <h3><Link to={`/details/${quote.speaker.mbid}`}>{quote.speaker.name}</Link> on&nbsp;
                {quote.subject.map((item, index) => <span key={index}>{index > 0 ? `, `: ``}<Link to={`/details/${item.mbid}`}>{item.name}</Link></span>)}</h3></div>
            <div>{quote.text}</div>
            <br/>
            <div><span className="fw-bold">Source:</span> <a href={quote.sourceURL} target="_blank" rel="noreferrer">{quote.source} <FontAwesomeIcon icon={faExternalLinkAlt}/></a>
                {quote.sourceDate ? <> <span className="fw-bold">&middot; Source date:</span> {displayDate(quote.sourceDate)}</> : ''}</div>
            <div><span className="fw-bold">Submitted by:</span> <Link to={`/profile/${quote.admin.submittedBy.username}`}>{quote.admin.submittedBy.username}</Link></div>
            <div className="text-muted">Submission date: {quote.admin.submissionDate}</div>
            </div>
            {quote.admin.verified ? <span className="badge bg-success rounded-pill ms-2 d-none d-md-block">Verified</span> : <span className="badge bg-warning rounded-pill ms-2 d-none d-md-block">Verification Pending</span>}
        </li>
    )
}

export default Quote;