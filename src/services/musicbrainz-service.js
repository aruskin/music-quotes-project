const MB_ARTIST_API = "https://musicbrainz.org/ws/2/artist"

function fetchArtistByMBID(mbid) {
    return fetch(`${MB_ARTIST_API}/${mbid}?fmt=json`)
        .then(response => response.json())
}

function fetchArtistsByName(name) {
    return fetch(`${MB_ARTIST_API}?query=${name}&fmt=json`)
        .then(response => response.json())
        .then(json => json.artists)
}
/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
    fetchArtistByMBID, fetchArtistsByName
}