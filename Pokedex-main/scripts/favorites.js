let favorites = JSON.parse(localStorage.getItem('pokemonFavorites')) || [];

function toggleFavorite(id) {
    let index = favorites.indexOf(id);
    let card = document.getElementById(`pokemon-card-${id}`);
    
    if (index === -1) {
        favorites.push(id);
        animateAddToFavorites(card);
    } else {
        favorites.splice(index, 1);
        animateRemoveFromFavorites(card);
    }
    
    updateFavoriteButtons();
    saveFavorites();
}

function saveFavorites() {
    localStorage.setItem('pokemonFavorites', JSON.stringify(favorites));
}

function updateFavoriteButtons() {
    pokemonList.forEach((pokemon, index) => {
        let id = pokemon.id;
        let isFavorite = favorites.includes(id);
        let btn = document.querySelector(`#fav-btn-${id}`);
        
        if (btn) {
            btn.innerHTML = isFavorite ? '★' : '☆';
            btn.className = isFavorite ? 'fav-btn favorite' : 'fav-btn';
        }
    });
}

function showFavoritesOnly() {
    let allCards = document.querySelectorAll('.pokemon-card');
    let filterActive = document.getElementById('favorites-btn').classList.contains('active');
    
    allCards.forEach(card => {
        let id = parseInt(card.id.replace('pokemon-card-', ''));
        let isFavorite = favorites.includes(id);
        
        if (filterActive && !isFavorite) {
            card.classList.add('d-none');
        } else {
            card.classList.remove('d-none');
        }
    });
}

function toggleFavoritesFilter() {
    let btn = document.getElementById('favorites-btn');
    btn.classList.toggle('active');
    showFavoritesOnly();
}

function animateAddToFavorites(element) {
    element.classList.add('favorite-animation');
    setTimeout(() => {
        element.classList.remove('favorite-animation');
    }, 1000);
}

function animateRemoveFromFavorites(element) {
    element.classList.add('unfavorite-animation');
    setTimeout(() => {
        element.classList.remove('unfavorite-animation');
    }, 1000);
}

function createFavoritesButton() {
    let button = document.createElement('button');
    button.id = 'favorites-btn';
    button.innerHTML = '★ Favorites';
    button.onclick = toggleFavoritesFilter;
    
    let container = document.createElement('div');
    container.className = 'favorites-container';
    container.appendChild(button);
    document.querySelector('header').appendChild(container);
}