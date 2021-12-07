import React, {useEffect, useState} from "react";
import NavigationSidebar from "../NavigationSidebar";
import userService from '../../services/user-service';
import musicbrainzService from '../../services/musicbrainz-service';


function QuoteForm(){
    const [speaker, setSpeaker] = useState('')
    const [speakerOptions, setSpeakerOptions] = useState([])

    function handleChange(event){
        setSpeaker(event.target.value);
    }

    function handleSearch(event){
        event.preventDefault();
        musicbrainzService.fetchArtistsByName(speaker)
                    .then(artists => setSpeakerOptions(artists));
    }

    function renderSpeakerSelect(){
        var items;
        if(speakerOptions){
            items = speakerOptions.map(function(item, index) {
                return (<option key={index} value={item.id}>{item.name}</option>)
            });
        }
        return(
            <div className="form-group col">
                <select className="form-control" id="speakerSelect">
                    <option value="" disabled selected>Select the artist</option>
                    {items}
                </select>
            </div>
        );
    }

    let handleSubmit = (event) => {}

    return(
    <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="quoteText">Quote</label>
            <textarea className="form-control" id="quoteText" rows="3"></textarea>
        </div>
        <div className="form-group">
            <label htmlFor="quoteSource">Source</label>
            <input className="form-control" id="quoteSource" placeholder="e.g., NME"/>
        </div>
        <div className="form-group">
            <label htmlFor="quoteDate">Source Date</label>
            <input className="form-control" type="date" id="quoteDate"/>
        </div>
        <div className="form-group">
            <label htmlFor="quoteURL">Source URL</label>
            <input className="form-control" type="url" id="quoteURL" placeholder="http://www.example.com/noel-gallagher-interview"/>
        </div>
        <label htmlFor="speakerGroup">Speaker</label>
        <div className="row align-items-center" id="speakerGroup">
            <div className="form-group col">
                <input className="form-control"
                    id="speakerSearch"
                    placeholder="e.g., Noel Gallagher"
                    value={speaker}
                    onChange={handleChange}/>
            </div>
            <button
                className="btn btn-secondary col"
                onClick={handleSearch}>Search</button>
            {renderSpeakerSelect()}
        </div>
        <label htmlFor="subjectGroup">Subject</label>
        <div className="row align-items-center" id="subjectGroup">
            <div className="form-group col">
                <input className="form-control" id="subjectSearch" placeholder="e.g., Damon Albarn"/>
            </div>
            <button className="btn btn-secondary col">Search</button>
            <div className="form-group col">
                <select className="form-control" id="subjectSelect">
                    <option value="" disabled selected>Select the artist</option>
                </select>
            </div>
        </div>
        <div>
            <button className="btn btn-secondary">Add Subject</button>
        </div>
        <div className="mt-2">
            <button className="btn btn-primary">Submit</button>
        </div>
    </form>
    )
}

function SubmitQuote({user={}, loggedIn=false}){
    return(
        <div className="row mt-2">
            <div className="col-2">
                <NavigationSidebar active="submit" user={user} loggedIn={loggedIn}/>
            </div>
            <div className="col-10">
                <h1>Submit Quote</h1>
                {!loggedIn && <p>You must be logged in to submit a quote</p>}
                {loggedIn && <QuoteForm/>}
            </div>
        </div>
    )
};

export default SubmitQuote;
