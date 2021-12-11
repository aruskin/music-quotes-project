const ARTIST_API = "http://localhost:4000/api/artists";


function fetchArtistByMBID(mbid) {
    return fetch(`${ARTIST_API}/${mbid}`)
        .then(response => response.json())
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
    fetchArtistByMBID
}