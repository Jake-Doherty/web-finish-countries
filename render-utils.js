export function renderContinentOption(continent) {
    const option = document.createElement('option');
    option.value = continent.name;
    option.textContent = continent.name;
    return option;
}

export function renderCountry(country) {
    const li = document.createElement('li');
    li.classList.add('card');

    const img = document.createElement('img');
    img.src = `https://flagcdn.com/72x54/${country.iso2.toLowerCase()}.png`;
    img.alt = country.name;

    const h2 = document.createElement('h2');
    h2.textContent = country.name;

    const p = document.createElement('p');
    p.textContent = country.continent;

    li.append(h2, img, p);

    return li;
}
