const url = "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
const cities = [];

fetch(url)
    .then(blob => blob.json())
    .then(data => cities.push(...data));

function findMatch(wordToMatch, cities){
    const regex = new RegExp(wordToMatch, "gi");
    return cities.filter(place => {
        return place.city.match(regex) || place.state.match(regex);
    });
};

function numberWithComma(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/, ",");
}

function displayMatch(){
    const matchArray = findMatch(this.value, cities);
    const list = matchArray.map(place => {
        const regex = new RegExp(this.value, "gi");
        const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
        const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
        return `
            <li>
                <span class="name">${cityName}, ${stateName}</span>
                <span class="population">${numberWithComma(place.population)}</span>
            </li>
        `
    }).join("");
    suggestions.innerHTML = list;
};

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener("keyup", displayMatch);
