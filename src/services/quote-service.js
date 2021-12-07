const QUOTE_API = "http://localhost:4000/api/quotes";

export const findAllQuotes = () =>
    fetch(QUOTE_API)
        .then(response => response.json());

export const submitQuote = (quote) =>
    fetch(QUOTE_API, {
        method: 'POST',
        body: JSON.stringify(quote),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())

export default {
    findAllQuotes, submitQuote
}