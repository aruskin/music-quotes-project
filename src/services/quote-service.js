const CONSTANTS = require('../consts');
const QUOTE_API = CONSTANTS.API_BASE_URL + "quotes";

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

export const deleteQuote = (id) =>
    fetch(`${QUOTE_API}/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())

export const verifyQuote = (id) =>
    fetch(`${QUOTE_API}/verify`, {
            method: 'PUT',
            body: JSON.stringify({id: id}),
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json())

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
    findAllQuotes, submitQuote, findQuoteByID, deleteQuote, verifyQuote
}