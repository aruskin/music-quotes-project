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
               return(
                   <tr>
                        <th scope="row">{index + 1}</th>
                        <th>{item.name}</th>
                        <th>{item.disambiguation}</th>
                        <th>{item.country}</th>
                        <th></th>
                        <th></th>
                        <th><Link to={detailsURL} type="button" className="btn btn-link">See Details</Link></th>
                   </tr>)
                 });
          }
        return (
          <div>
          Found {numItems} results in Musicbrainz
          <div class="table-responsive-sm">
          <table className="table table-striped table-sm">
              <thead className="thead-dark">
                  <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Disambiguation</th>
                      <th scope="col">Country</th>
                      <th scope="col">Quotes From</th>
                      <th scope="col">Quotes About</th>
                      <th scope="col"></th>
                  </tr>
              </thead>
              <tbody>
              {items}
              </tbody>
          </table>
          </div>
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