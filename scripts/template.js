function getPokecardTemplate(id, pokemon, DETAILS) {
  let primaryType = DETAILS.types[0].type.name;
  let isFavorite = favorites.includes(id);
  let starIcon = isFavorite ? '★' : '☆';
  let starClass = isFavorite ? 'fav-btn favorite' : 'fav-btn';
  
  return `
  <div id="pokemon-card-${id}" class="pokemon-card">  
      <div class="${primaryType}">
          <div id="pokecard-header">
              <p><b>#${id}</b></p>
              <h3>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
              <button id="fav-btn-${id}" class="${starClass}" onclick="event.stopPropagation(); toggleFavorite(${id})">${starIcon}</button>
          </div>  
          <img onclick="openOverlay(${id - 1})" src="${DETAILS.sprites.front_default}" alt="${pokemon.name}">
          <div id="pokecard-footer">
              <p>Typ: ${DETAILS.types.map(t => `<p>${t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)}</p>`).join('')}</p>
          </div>
      </div>
  </div>`;
}
 
function getShowAboutTemplate(DETAILS) {
  let heightInMeters = DETAILS.height / 10;
  let weightInKilograms = DETAILS.weight / 10;

  return `
  <div id="about-details">
      <p>Größe: ${heightInMeters} m</p>
      <p>Gewicht: ${weightInKilograms} kg</p>
      <p>Spezies: ${DETAILS.species.name}</p>
      <p>Fähigkeiten: ${DETAILS.abilities.map(a => a.ability.name).join(', ')}</p>
  </div>`;
}

function getShowStatsTemplate(DETAILS) {
  return `
  <ul>
      <li>HP: ${DETAILS.stats[0].base_stat}</li>
      <li>Attack: ${DETAILS.stats[1].base_stat}</li>
      <li>Defense: ${DETAILS.stats[2].base_stat}</li>
      <li>Speed: ${DETAILS.stats[5].base_stat}</li>
  </ul>`;
}

function getShowEvolutionTemplate(evoData) {
  return `
  <div id="evolution-details">
      <p>${evoData.name.charAt(0).toUpperCase() + evoData.name.slice(1)}</p>
      <img src="${evoData.sprites.front_default}" alt="${evoData.name}" title="${evoData.name}">
  </div>`;
}
