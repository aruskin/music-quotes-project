import React, {useState} from "react";
import {useSelector} from "react-redux";
import NavigationSidebar from "../NavigationSidebar";
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
                    value={JSON.stringify({mbid: item.id, name: item.name})}>
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
                    }}
                    disabled={items.length > 0 ? false: true}>
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
                <div className="input-group col mb-3 me-0">
                    <input className="form-control"
                        id={`subjectSearch${index}`}
                        placeholder="e.g., Damon Albarn"
                        value={subjects[index].keyword}
                        onChange={handleSubjectChange}/>
                    <button
                        className="btn btn-secondary"
                        onClick={handleSubjectSearch}>Search
                    </button>
                </div>
                {renderSelectOptions(subjects, setSubjects, `subjectSelect`+index, index)}
            </div>
        )
    }

    function appendInput(event){
        event.preventDefault();
        return(setSubjects(oldValues => [...oldValues,
            {keyword: "", selectOptions: [], selected: null}]))
    }

    function removeInput(event){
        event.preventDefault();
        return(setSubjects(oldValues => [...oldValues.slice(0, oldValues.length-1)]))
     }

    function handleSubmit(event){
        event.preventDefault();
        const body = {
            ...quote,
            speaker: {mbid: JSON.parse(speaker.selected).mbid, name: JSON.parse(speaker.selected).name},
            subject: subjects.map((item, index) => ({mbid: JSON.parse(item.selected).mbid, name: JSON.parse(item.selected).name}))
        };
        submitQuote(body)
            .then(() => alert('Quote submitted!'));
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
        <div className="row align-items-center me-3" id="speakerGroup">
            <div className="input-group col mb-3">
                <input className="form-control"
                    id="speakerSearch"
                    placeholder="e.g., Noel Gallagher"
                    value={speaker.keyword}
                    onChange={handleSpeakerChange}
                    type="text"
                    required/>
                <button
                    className="btn btn-secondary"
                    onClick={handleSpeakerSearch}>Search</button>
                </div>
            {renderSelectOptions(speaker, setSpeaker, `speakerSelect`)}
        </div>
        <label htmlFor="subjectGroup">Subject</label>
        <div className="row align-items-center" id="subjectGroup">
            {subjects.map((subject, index) => renderSubjectSelect(index))}
        </div>
        <div>
            <button
                className="btn btn-secondary"
                onClick={appendInput}>Add Subject
            </button>
            <button
                className="btn btn-secondary ms-2"
                onClick={removeInput}>Remove Subject
            </button>
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

function SubmitQuote(){
    const loggedIn = useSelector((state) => state.loggedIn);
    const user = useSelector((state) => state.user);
    return(
        <div className="row mt-2">
            <div className="col-2">
                <NavigationSidebar active="submit"/>
            </div>
            <div className="col-10">
                <h1>Submit Quote</h1>
                {loggedIn ?
                    (user.role === 'BANNED' ? <p>You have been banned and are no longer allowed to submit quotes</p>
                    : <QuoteForm/>)
                    : <p>You must be logged in to submit a quote</p>}
            </div>
        </div>
    )
};

export default SubmitQuote;
