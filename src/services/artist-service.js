const CONSTANTS = require('../consts');
const ARTIST_API = CONSTANTS.API_BASE_URL + "artists";

function fetchArtistByMBID(mbid) {
    return fetch(`${ARTIST_API}/${mbid}`)
        .then(response => response.json())
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
    fetchArtistByMBID
}