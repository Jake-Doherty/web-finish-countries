/* Imports */
// > Part A: Import `getCountries` from fetch-utils.js
// > Part B: Import `getContinents` from fetch-utils.js
import { renderContinentOption, renderCountry } from './render-utils.js';

/* Get DOM Elements */
const notificationDisplay = document.getElementById('notification-display');
const searchForm = document.getElementById('search-form');
const continentSelect = document.getElementById('continent-select');
const countryList = document.getElementById('country-list');

/* State */
let error = null;
let count = 0;
let continents = [];
let countries = [];

/* Events */
window.addEventListener('load', async () => {
    // > Part A: call findCountries (with no arguments)

    // > Part B: await the call to get continents to get the response

    // > Part B: Assign to state the:
    //      - error,
    //      - data (to the continents variable)

    if (!error) {
        displayContinentOptions();
    }
});

async function findCountries(name, continent) {
    // > Part A: Call the service function that gets the countries

    // > Part C: Add the name and continent arguments to getCountries

    // > Part A: Assign to state the :
    //      - error,
    //      - data (to the countries variable)

    // > Part D: Assign to state the:
    //      - count (of db records)

    displayNotifications();
    if (!error) {
        displayCountries();
    }
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(searchForm);
    // > Part C: Call findCountries with name and continent from formData
});

/* Display Functions */
function displayCountries() {
    countryList.innerHTML = '';

    for (const country of countries) {
        // > Part A: render and append to list
    }
}

function displayNotifications() {
    if (error) {
        notificationDisplay.classList.add('error');
        notificationDisplay.textContent = error.message;
    } else {
        notificationDisplay.classList.remove('error');
        // > Part D: Display a message with
        //      - how many items were returned in countries array
        //      - how many total matching countries were in the db
    }
}

function displayContinentOptions() {
    for (const continent of continents) {
        // > Part B: render and append options to select
    }
}
