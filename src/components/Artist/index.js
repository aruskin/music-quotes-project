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

            if(artistResult){
                let quotesFrom = [];

                if(artistResult.quotesFrom.length > 0){
                    await Promise.all(artistResult.quotesFrom.map(async (item, index) => {
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
            artistType = <div><span className="fw-bold">Type:</span> {artist.type}</div>
        }
        if(artist.country){
            country = <div><span className="fw-bold">Country:</span> {artist.country}</div>
        }
        return(
            <div>
                {artistType}
                {country}
                <div>See more on <a href={`https://musicbrainz.org/artist/${artist.id}`}>Musicbrainz</a></div>
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
                <br/>
                <h2>{quotes.quotesFrom.length} quote{quotes.quotesFrom.length===1 ? '' : 's'} from {artist.name}</h2>
                <ul className="list-group">
                {quotes.quotesFrom.map(quote => <Quote quote={quote} key={quote._id}/>)}
                </ul>
                <br/>
                <h2>{quotes.quotesAbout.length} quote{quotes.quotesAbout.length===1 ? '' : 's'} about {artist.name}</h2>
                <ul className="list-group">
                {quotes.quotesAbout.map(quote => <Quote quote={quote} key={quote._id}/>)}
                </ul>
            </div>
        </div>
    )
};

export default Artist;