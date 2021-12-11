const QUOTE_API = "http://localhost:4000/api/quotes";

export const findAllQuotes = () =>
    fetch(QUOTE_API)
        .then(response => response.json());

export const submitQuote = (quote) =>
    fetch(QUOTE_API, {
        method: 'POST',
        body: JSON.stringify(quote),
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())

export const findQuoteByID = (id) =>
    fetch(`${QUOTE_API}/${id}`)
        .then(response => response.json())

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
    findAllQuotes, submitQuote, findQuoteByID
}