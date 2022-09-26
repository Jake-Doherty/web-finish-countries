/* Imports */
// > Part A: Import `getCountries` from fetch-utils.js
// > Part B: Import `getContinents` from fetch-utils.js
import { getCountries, getContinents } from './fetch-utils.js';
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

let filter = {
    name: '',
    continent: '',
};

let paging = {
    page: 1,
    pageSize: 100,
};

/* Events */
window.addEventListener('load', async () => {
    // > Part A: call findCountries (with no arguments)
    findCountries();
    // > Part B: await the call to get continents to get the response
    const response = await getContinents();
    // > Part B: Assign to state the:
    //      - error,
    error = response.error;
    //      - data (to the continents variable)
    continents = response.data;

    if (!error) {
        displayContinentOptions();
    }
});

const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
        if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            // do magic here
            getMoreCountries();
        }
    }
});

async function getMoreCountries() {
    paging.page++;
    const response = await getCountries(filter, paging);

    error = response.error;
    continents = response.data;
    count = response.count;
    const moreCountries = response.data;
    countries = countries.concat(moreCountries);

    displayNotifications();
    displayMoreCountries(moreCountries);
}

async function findCountries() {
    // > Part A: Call the service function that gets the countries
    // > Part C: Add the name and continent arguments to getCountries
    const response = await getCountries(filter, paging);

    // > Part A: Assign to state the :
    //      - error,
    error = response.error;
    //      - data (to the countries variable)
    countries = response.data;

    // > Part D: Assign to state the:
    //      - count (of db records)
    count = response.count;

    displayNotifications();
    if (!error) {
        displayCountries();
    }
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(searchForm);
    // > Part C: Call findCountries with name and continent from formData

    filter.name = formData.get('name');
    filter.continent = formData.get('continent');

    paging.page = 1;

    findCountries(formData.get('name'), formData.get('continent'));
});

/* Display Functions */
function displayCountries() {
    countryList.innerHTML = '';

    displayMoreCountries(countries);
}

function displayMoreCountries(moreCountries) {
    let lastEl = null;
    for (const country of moreCountries) {
        const countryElement = renderCountry(country);
        countryList.append(countryElement);
        lastEl = countryElement;
    }

    if (countries.length < count) {
        observer.observe(lastEl);
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
        notificationDisplay.textContent = `displaying ${countries.length} of ${count} countries`;
        //      - how many total matching countries were in the db
    }
}

function displayContinentOptions() {
    for (const continent of continents) {
        // > Part B: render and append options to select
        const continentOption = renderContinentOption(continent);
        continentSelect.append(continentOption);
    }
}
