import React from "react";
import SearchArtists from "./SearchArtists";
import NavigationSidebar from "../NavigationSidebar";

function Search(){
    return(
        <div className="row mt-2">
            <div className="col-2">
                <NavigationSidebar active="search"/>
            </div>
            <div className="col-10">
                <h1>Search Artists</h1>
                <p>Look up a musician or band name to see if there any quotes from or about them in the database.</p>
                <SearchArtists/>
            </div>
        </div>
    )
};

export default Search;