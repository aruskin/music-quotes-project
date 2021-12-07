const QUOTE_API = "http://localhost:4000/api/quotes";

const findAllQuotes = (dispatch) =>
    fetch(QUOTE_API)
        .then(response => response.json());

export default {
    findAllQuotes
}