import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import musicbrainzService from '../../services/musicbrainz-service';
import artistService from '../../services/artist-service';
import quoteService from "../../services/quote-service";
import NavigationSidebar from "../NavigationSidebar";
import Quote from "../Quote";

function Artist({loggedIn, dispatch}){
    let params = useParams();
    const [artist, setArtist] = useState({name: ''});
    const [quotes, setQuotes] = useState({quotesFrom: [], quotesAbout: []})

    useEffect(() => {
        async function fetchArtist(mbid) {
            musicbrainzService.fetchArtistByMBID(mbid)
                .then(json => setArtist(json));
        }

        async function fetchArtistQuotes(mbid){
            let artistResult = await artistService.fetchArtistByMBID(mbid);

            let quotesFrom = [];
            if(artistResult.quotesFrom.length > 0){
                console.log(artistResult.quotesFrom);
                await Promise.all(artistResult.quotesFrom.map(async (item, index) => {
                    console.log(item);
                    const quote = await quoteService.findQuoteByID(item);
                    quotesFrom.push(quote)
                }))
            }
            let quotesAbout = [];

            if(artistResult.quotesAbout.length > 0){
                await Promise.all(artistResult.quotesAbout.map(async (item, index) => {
                    const quote = await quoteService.findQuoteByID(item);
                    quotesAbout.push(quote)
                }))
            }

            setQuotes({quotesFrom: quotesFrom, quotesAbout: quotesAbout})
        }

        fetchArtist(params.mbid);
        fetchArtistQuotes(params.mbid);
        return () => {
            setArtist({name: ''});
            setQuotes({quotesFrom: [], quotesAbout: []})
        };
    }, [params.mbid])

    function displayArtistDetails(){
        let artistType;
        let country;
        if(artist.type){
            artistType = <div>Type: {artist.type}</div>
        }
        if(artist.country){
            country = <div>Country: {artist.country}</div>
        }
        return(
            <div>
                {artistType}
                {country}
            </div>
        )
    }

    return(
        <div className="row mt-2">
            <div className="col-2">
                <NavigationSidebar active="" loggedIn={loggedIn} dispatch={dispatch}/>
            </div>
            <div className="col-10">
                <h1>{artist.name} {artist.disambiguation && <span>({artist.disambiguation})</span>}</h1>
                {displayArtistDetails()}
                <h2>Quotes from {artist.name}</h2>
                <ul className="list-group">
                {quotes.quotesFrom.map(quote => <Quote quote={quote}/>)}
                </ul>
                <h2>Quotes about {artist.name}</h2>
                <ul className="list-group">
                {quotes.quotesAbout.map(quote => <Quote quote={quote}/>)}
                </ul>
                <h2>Project requirements</h2>
                <ol>
                   <li>Must retrieve details from the remote API based on some unique identifier provided as a parameter from the search/results page</li>
                   <li>Must display additional related data from the local database. For instance, if you are displaying the details of a movie, some other folks might have reviewed the movie. All reviews related to the movie must be shown in all or partial form</li>
                   <li style={{background: 'yellow'}}>Must provide links to related data/users. For instance, if you are displaying the details of a movie, and below you are displaying a list of reviews for that movie, provide links to the profile pages of folks who wrote the reviews for the movie</li>
                   <li>Must be mapped to /details/unique identifier or /details?identifier=unique identifier where unique identifier uniquely identies the item being displayed</li>
                </ol>
            </div>
        </div>
    )
};

export default Artist;