//selectors
const search = document.querySelector("[data-search]");
const resultList = document.querySelector("[data-match-results]");

//Event Listeners
search.addEventListener('input', () => searchStates(search.value));

//Functions
//Search states.json and filter it
const searchStates = async searchText => {

    const res = await fetch('../StateCapitalLookup/data/states.json');
    const states = await res.json();

    //get matches to current search input
    let matches = states.filter(state => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return state.name.match(regex) || state.abbr.match(regex);
    });

    if(searchText.length === 0) {
        matches = [];
        resultList.innerHTML = '';
    }
    
    outputResult(matches);
}

const outputResult = (matches) => {
    if(matches.length > 0) {
        const html = matches.map(match => `
        <section class="card card-body mb-1">
            <h4>${match.name} (${match.abbr}) <span class="text-primary">${match.capital}</span></h4>
            <small>Lat: ${match.lat} / Long: ${match.long}</small>
        </section>
        `
        )
        .join('');

        resultList.innerHTML = html;
    }
}