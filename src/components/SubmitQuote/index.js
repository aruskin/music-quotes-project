import React, {useState} from "react";
import NavigationSidebar from "../NavigationSidebar";
//import userService from '../../services/user-service';
import musicbrainzService from '../../services/musicbrainz-service';
import {submitQuote} from '../../services/quote-service';


function QuoteForm(){
    const [speaker, setSpeaker] = useState({keyword: '', selectOptions: [], selected: null});
    const [subjects, setSubjects] = useState([{keyword: '', selectOptions: [], selected: null}]);
    let [quote, setQuote] = useState({
        text: '',
        source: '',
        sourceDate: null,
        sourceURL: null});

    function resetForm(event){
        setSpeaker({keyword: '', selectOptions: [], selected: null});
        setSubjects([{keyword: '', selectOptions: [], selected: null}]);
        setQuote({
                 text: '',
                 source: '',
                 sourceDate: null,
                 sourceURL: null});
    }

    function handleSpeakerChange(event){
        return(setSpeaker({keyword: event.target.value, selectOptions: [], selected: null}))
    }

    async function handleSpeakerSearch(event){
        event.preventDefault();
        const artistResults = await musicbrainzService.fetchArtistsByName(speaker.keyword);
        return(setSpeaker(oldValues => ({...oldValues, selectOptions: artistResults})))
    }

    function renderSelectOptions(myState, setMyState, selectId, index=null){
        var items;
        var artists;
        if(index !== null){
            artists = myState[index].selectOptions;
        } else{
            artists = myState.selectOptions;
        }
        if(artists){
            items = artists.map(function(item, index) {
                return (<option
                    key={index}
                    value={item.id}>
                    {item.name} {item.disambiguation ? `(${item.disambiguation})` : ``}
                </option>)
            });
        }
        return(
            <div className="form-group col">
                <select
                    className="form-control"
                    id={selectId}
                    required
                    value={index !== null ? myState[index].selected : myState.selected}
                    onChange={(event) => {
                        if(index !== null){
                            setMyState(oldValues =>
                                [...oldValues.slice(0, index),
                                {...oldValues[index], selected: event.target.value},
                                ...oldValues.slice(index+1)
                                ])
                        }
                        else{
                            setMyState(oldValues => ({...oldValues, selected: event.target.value}))
                        }
                    }}>
                    <option value="" disabled selected>Select the artist</option>
                    {items}
                </select>
            </div>
        );
    }

    function renderSubjectSelect(index){
        function handleSubjectChange(event){
            return(setSubjects(oldValues =>
                [...oldValues.slice(0, index),
                {keyword: event.target.value, selectOptions: [], selected: null},
                ...oldValues.slice(index+1)
                ]))
         }

        async function handleSubjectSearch(event){
            event.preventDefault();
            const artist = subjects[index].keyword;
            const artistResults = await musicbrainzService.fetchArtistsByName(artist);
            return(setSubjects(oldValues =>
                 [...oldValues.slice(0, index),
                 {keyword: artist, selectOptions: artistResults, selected: null},
                 ...oldValues.slice(index+1)
                 ]
            ))
        }
        return(
            <div className="row mt-2">
                <div className="form-group col">
                    <input className="form-control"
                        id={`subjectSearch${index}`}
                        placeholder="e.g., Damon Albarn"
                        value={subjects[index].keyword}
                        onChange={handleSubjectChange}/>
                </div>
                <button
                    className="btn btn-secondary col"
                    onClick={handleSubjectSearch}>Search
                </button>
                {renderSelectOptions(subjects, setSubjects, `subjectSelect`+index, index)}
            </div>
        )
    }

    function appendInput(event){
        return(setSubjects(oldValues => [...oldValues,
            {keyword: "", selectOptions: [], selected: null}]))
    }

    function handleSubmit(event){
        event.preventDefault();
        const body = {
            ...quote,
            speaker: speaker.selected,
            subject: subjects.map((item, index) => item.selected)
        };
        return(submitQuote(body));
    }

    return(
    <form onSubmit={handleSubmit} className="me-2">
        <div className="form-group">
            <label htmlFor="quoteText">Quote*</label>
            <textarea
                className="form-control"
                id="quoteText"
                rows="3"
                required
                value={quote.text}
                onChange={
                    (event) =>
                        setQuote(oldValues => ({...oldValues, text: event.target.value}))}>
            </textarea>
        </div>
        <div className="form-group">
            <label htmlFor="quoteSource">Source*</label>
            <input className="form-control"
                id="quoteSource"
                placeholder="e.g., NME"
                type="text"
                required
                value={quote.source}
                onChange={(event) =>
                    setQuote(oldValues => ({...oldValues, source: event.target.value}))}/>
        </div>
        <div className="form-group">
            <label htmlFor="quoteDate">Source Date</label>
            <input className="form-control"
                type="date"
                id="quoteDate"
                value={quote.sourceDate}
                onChange={(event) =>
                    setQuote(oldValues => ({...oldValues, sourceDate: event.target.value}))}/>
        </div>
        <div className="form-group">
            <label htmlFor="quoteURL">Source URL</label>
            <input className="form-control"
            type="url"
            id="quoteURL"
            placeholder="http://www.example.com/noel-gallagher-interview"
            value={quote.sourceURL}
            onChange={(event) =>
                setQuote(oldValues => ({...oldValues, sourceURL: event.target.value}))}/>
        </div>
        <label htmlFor="speakerGroup">Speaker*</label>
        <div className="row align-items-center" id="speakerGroup">
            <div className="form-group col">
                <input className="form-control"
                    id="speakerSearch"
                    placeholder="e.g., Noel Gallagher"
                    value={speaker.keyword}
                    onChange={handleSpeakerChange}
                    type="text"
                    required/>
            </div>
            <button
                className="btn btn-secondary col"
                onClick={handleSpeakerSearch}>Search</button>
            {renderSelectOptions(speaker, setSpeaker, `speakerSelect`)}
        </div>
        <label htmlFor="subjectGroup">Subject</label>
        <div className="row align-items-center" id="subjectGroup">
            {subjects.map((subject, index) => renderSubjectSelect(index))}
        </div>
        <div>
            <button
                className="btn btn-secondary"
                onClick={appendInput}>Add Subject</button>
        </div>
        <div className="mt-2">
            <button
                className="btn btn-primary"
                type="submit">Submit</button>
        </div>
        <div className="mt-2">
            <button
                className="btn btn-primary"
                type="reset"
                onClick={resetForm}>Reset Form</button>
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
