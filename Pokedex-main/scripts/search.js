const SEARCH_URL = 'https://pokeapi.co/api/v2/pokemon?limit=1000';  
let allPokemon = [];

async function loadAllPokemon() {
    try {
        const RESPONSE = await fetch(SEARCH_URL);
        const DATA = await RESPONSE.json();
        allPokemon = DATA.results;
    } catch (error) {
        console.error('Fehler beim Laden der Pokémon-Liste:', error);
        openNotification("Fehler beim Laden der Pokémon-Liste.");
    }
}
loadAllPokemon();

document.getElementById('search-input').addEventListener('input', async function() {
    const query = this.value.toLowerCase();
    if (query.length >= 3) {
        let filteredPokemon = allPokemon.filter(pokemon => pokemon.name.includes(query));
        showSuggestions(filteredPokemon)} 
        else {
        closeSuggestions();
    }}
)

function showSuggestions(filteredPokemon){
    let suggestionHTML = '';
        filteredPokemon.forEach(pokemon => {
            suggestionHTML += `<div onclick="selectPokemon('${pokemon.name}')">${pokemon.name}</div>`;
        });

        let suggestions = document.getElementById('suggestions');
        suggestions.innerHTML = suggestionHTML;
        suggestions.classList.remove('d-none');
    }

async function selectPokemon(name) {
    document.getElementById('search-input').value = '';
    document.getElementById('suggestions').classList.add('d-none');
    searchPokemonDetails(name); 
    try {
        const RESPONSE = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const DETAILS = await RESPONSE.json();

        pokemonList = [DETAILS];
        currentIndex = 0;
        openOverlay(currentIndex);
        document.getElementById('prevBtn').disabled = true;
        document.getElementById('nextBtn').disabled = true;
    } catch (error) {
        console.error('Fehler beim Laden der Pokémon-Details:', error);
        openNotification("Fehler beim Laden der Pokémon-Details.");
    }
}

async function searchPokemon(QUERY) {
    const SUGGESTIONS = [];
    for (let i = 0; i < allPokemon.length; i++) {
        const POKEMONNAME = allPokemon[i].name.toLowerCase();
        if (POKEMONNAME.startsWith(QUERY)) {
            SUGGESTIONS.push(allPokemon[i]);
        }};
        searchPokemonWays(SUGGESTIONS)
    }

function searchPokemonWays(SUGGESTIONS){
    if (SUGGESTIONS.length > 0) {
        displaySuggestions(SUGGESTIONS);
        
    } else {
        closeSuggestions();
        openNotification('Kein Pokémon gefunden.');
    }
    document.getElementById('search-input').value = '';
}

async function searchPokemonDetails(POKEMONNAME) {
    try {
        const RESPONSE = await fetch(`https://pokeapi.co/api/v2/pokemon/${POKEMONNAME}`);
        const DETAILS = await RESPONSE.json();
        openOverlay(DETAILS, DETAILS.id); 
    } catch (error) {
        console.error('Fehler beim Laden der Pokémon-Details:', error);
        openNotification("Fehler beim Laden der Pokémon-Details.");
    }
}

function displaySuggestions(SUGGESTIONS) {
    const SUGGESTIONSCONTAINER = document.getElementById('suggestions');
    SUGGESTIONSCONTAINER.innerHTML = '';

    SUGGESTIONS.forEach(pokemon => {
        const SUGGESTIONITEM = document.getElementById('suggestion-item');
        SUGGESTIONITEM.innerText = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        SUGGESTIONITEM.onclick = () => {
            searchPokemonDetails(pokemon.name);
            closeSuggestions();
        };
    });
    toggleSuggestions(SUGGESTIONS, SUGGESTIONSCONTAINER)
}

function toggleSuggestions(SUGGESTIONS, SUGGESTIONSCONTAINER){
    if (SUGGESTIONS.length > 0) {
        SUGGESTIONSCONTAINER.classList.remove('d-none');
    } else {
        SUGGESTIONSCONTAINER.classList.add('d-none');
    }
}

function closeSuggestions() {
    const SUGGESTIONSCONTAINER = document.getElementById('suggestions');
    SUGGESTIONSCONTAINER.classList.add('d-none');
    SUGGESTIONSCONTAINER.innerHTML = '';
}

function openNotification(message) {
    let notification = document.getElementById('notification-overlay');
    document.getElementById('notification-message').innerText = message;
    notification.classList.remove('d-none');}

function closeNotification() {
    document.getElementById('notification-overlay').classList.add('d-none');
}
    
function getSearchbar(){
    document.getElementById('searchbar').classList.toggle('d-none');
}
    
document.addEventListener('click', function(event) {
    const SEARCHCONTAINER = document.querySelector('.search-container');
    if (!SEARCHCONTAINER.contains(event.target)) {
        closeSuggestions();
    }}
);