let OFFSET = 0;
const LIMIT = 20;
const API_URL = 'https://pokeapi.co/api/v2/pokemon';
const CONTENTDIV = document.getElementById('content');
let currentDetails = null;

async function loadPokemon() {
    showSpinner();
    if (!document.getElementById('favorites-btn')) {
        createFavoritesButton();
    }
    try {
        const RESPONSE = await fetch(`${API_URL}?limit=${LIMIT}&offset=${OFFSET}`);
        const DATA = await RESPONSE.json();
        for (let index = 0; index < DATA.results.length; index++) {
            let pokemon = DATA.results[index];
            await renderPokemon(pokemon, index + 1 + OFFSET);
        }
    } catch (error) {
        console.error('Fehler beim Laden der Pokémon:', error);
    } finally {
        hideSpinner(); 
    }
}

async function renderPokemon(pokemon, id) {
    const RESPONSE = await fetch(pokemon.url);
    const DETAILS = await RESPONSE.json();
    pokemonList.push(DETAILS);
    let pokemonCard = document.getElementById('content')
    pokemonCard.innerHTML += getPokecardTemplate(id, pokemon, DETAILS);
}

function loadMorePokemon() {
    showSpinner();
    OFFSET += LIMIT;
    loadPokemon();
}