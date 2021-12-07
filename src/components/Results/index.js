import React, {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import musicbrainzService from '../../services/musicbrainz-service';
import NavigationSidebar from "../NavigationSidebar";

function Results({loggedIn=false}) {
    const [artists, setArtists] = useState([]);
    let params = useParams();

    useEffect(() => {
        musicbrainzService.fetchArtistsByName(params.criteria)
            .then(artists => setArtists(artists));
        return () => {
            setArtists([])
        }
    }, [params.criteria])

    function renderArtists(){
        var items;
        var numItems = 0;
        if(artists){
           numItems = artists.length;
           items = artists
             .map(function(item, index) {
               var detailsURL = "/details/" + item.id
               return <li className="list-group-item"
                       key={index}>
                       <Link to={detailsURL}>{item.name}</Link> <i>{item.disambiguation}</i> {item.country}</li>;
             });
          }
        return (
          <div>
          Found {numItems} results in Musicbrainz
          <ul className="list-group">{items}</ul>
          </div>
       )
    }
    return(
        <div className="row mt-2">
            <div className="col-2">
                <NavigationSidebar active="" loggedIn={loggedIn}/>
            </div>
            <div className="col-10">
                <h2>Results</h2>
                {renderArtists()}
                <Link to="/search" className="btn btn-primary my-2">Back to Search</Link>
            </div>
        </div>
    )
}
export default Results;