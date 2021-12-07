import React from "react";
import SearchArtists from "./SearchArtists";
import NavigationSidebar from "../NavigationSidebar";

function Search({loggedIn=false}){
    return(
        <div className="row mt-2">
            <div className="col-2">
                <NavigationSidebar active="search" loggedIn={loggedIn}/>
            </div>
            <div className="col-10">
                <h1>Search</h1>
                <h2>Project Requirements</h2>
                <ol>
                <li>Must provide a form to search a remote API, not your own API</li>
                <li>Must provide a summarized list of results matching the search criteria. Results must come from the remote API, not your local database</li>
                <li>Must provide a link/button to navigate to the details page (see below)</li>
                <li>Must be mapped to /search when no search has been executed and no results exist</li>
                <li>Must be mapped to /search/&123;search criteria&125; or /search?criteria=&123;search criteria&125; when a search has been executed and according results shown</li>
                <li  style={{background: 'yellow'}}>Can augment the results with related data in your local databases</li>
                <li>The search and results page can be implemented as either a single page or separate pages. In that case a separate route can be used such as /results/&#123;search criteria&#125; or /results?criteria=&#123;search criteria&#125;</li>
                </ol>
                <SearchArtists/>
            </div>
        </div>
    )
};

export default Search;