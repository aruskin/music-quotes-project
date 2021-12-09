const ARTIST_API = "http://localhost:4000/api/artists";


function fetchArtistByMBID(mbid) {
    return fetch(`${ARTIST_API}/${mbid}`)
        .then(response => response.json())
}

export default {
    fetchArtistByMBID
}