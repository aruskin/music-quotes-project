import React, {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import musicbrainzService from '../../services/musicbrainz-service';
import artistService from '../../services/artist-service';
import NavigationSidebar from "../NavigationSidebar";

function Results() {
    const [artists, setArtists] = useState([]);
    let params = useParams();

    useEffect(() => {
        async function getAndCombineArtists(keyword){
                let musicbrainzResults = await musicbrainzService.fetchArtistsByName(params.criteria);
                let combinedResults = [];

                await Promise.all(musicbrainzResults.map(async (item, index) => {
                    const artist = await artistService.fetchArtistByMBID(item.id);
                    combinedResults.push(
                        {...item,
                        quotesFrom: artist ? artist.quotesFrom.length : 0,
                        quotesAbout: artist ? artist.quotesAbout.length : 0})
                }));
                combinedResults = combinedResults.sort((a, b) => b.score - a.score);
                return(combinedResults)
        }
        getAndCombineArtists(params.criteria)
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
                   <tr key={index}>
                        <th scope="row" className="p-2 text-end">{index + 1}</th>
                        <th className="p-2">{item.name}</th>
                        <th className="p-2 fw-normal">{item.disambiguation}</th>
                        <th className="p-2 fw-normal">{item.country}</th>
                        <th className="p-2 fw-normal text-end">{item.quotesFrom}</th>
                        <th className="p-2 fw-normal text-end">{item.quotesAbout}</th>
                        <th><Link to={detailsURL} type="button" className="btn btn-link">See Details</Link></th>
                   </tr>)
                 });
          }
        return (
          <div>
          <div className="table-responsive-sm">
          <table className="table table-sm table-hover table-bordered">
              <caption>{numItems === 25 ? `Top 25 results from Musicbrainz` : `Found {numItems} results in MusicBrainz`}</caption>
              <thead className="thead-dark">
                  <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Disambiguation</th>
                      <th scope="col">Country</th>
                      <th scope="col">Quotes from</th>
                      <th scope="col">Quotes about</th>
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
                <NavigationSidebar active=""/>
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