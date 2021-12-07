import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import musicbrainzService from '../../services/musicbrainz-service';
import NavigationSidebar from "../NavigationSidebar";

function Artist({loggedIn=false}){
    let params = useParams();
    const [artist, setArtist] = useState({name: ''});

    useEffect(() => {
        async function fetchArtist(mbid) {
            musicbrainzService.fetchArtistByMBID(mbid)
                .then(json => setArtist(json));
        }
        fetchArtist(params.mbid);
        return () => {
            setArtist({name: ''});
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
                <NavigationSidebar active="" loggedIn={loggedIn}/>
            </div>
            <div className="col-10">
                <h1>{artist.name} {artist.disambiguation && <span>({artist.disambiguation})</span>}</h1>
                {displayArtistDetails()}
                <h2>Quotes from {artist.name}</h2>
                <h2>Quotes about {artist.name}</h2>
                <h2>Project requirements</h2>
                <ol>
                   <li>Must retrieve details from the remote API based on some unique identifier provided as a parameter from the search/results page</li>
                   <li style={{background: 'yellow'}}>Must display additional related data from the local database. For instance, if you are displaying the details of a movie, some other folks might have reviewed the movie. All reviews related to the movie must be shown in all or partial form</li>
                   <li style={{background: 'yellow'}}>Must provide links to related data/users. For instance, if you are displaying the details of a movie, and below you are displaying a list of reviews for that movie, provide links to the profile pages of folks who wrote the reviews for the movie</li>
                   <li>Must be mapped to /details/unique identifier or /details?identifier=unique identifier where unique identifier uniquely identies the item being displayed</li>
                </ol>
            </div>
        </div>
    )
};

export default Artist;