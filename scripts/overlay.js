let pokemonList = [];
let currentIndex = 0;

function openOverlay(index) {
    let DETAILS = pokemonList[index];
    if (!DETAILS) {
        console.error("Fehler: Pokemon-Details sind nicht korrekt geladen");
        return;
    }
    currentDetails = DETAILS;
    currentIndex = index;
    document.getElementById('overlay').classList.remove('d-none');
    document.getElementById('overlay').classList.add('d-flex');
    document.body.classList.add('no-scroll');
    let primaryType = DETAILS.types[0].type.name;
    document.getElementById('overlay-content').style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue(`--${primaryType}`);
    document.getElementById('pokemon-name').innerText = `#${DETAILS.id} ${DETAILS.name.charAt(0).toUpperCase() + DETAILS.name.slice(1)}`;
    document.getElementById('pokemon-detail-image').src = DETAILS.sprites.other['official-artwork'].front_default;
    showAbout(DETAILS); 
    updateNavButtons();
}

function closeOverlay() {
    document.getElementById('overlay').classList.add('d-none');
    document.body.classList.remove('no-scroll');
    document.getElementById('overlay').classList.remove('d-flex');
}

function showAbout(DETAILS) {
    setActiveTab('aboutBtn');
    let aboutContent = getShowAboutTemplate(DETAILS);
    document.getElementById('detail-content').innerHTML = aboutContent;
}

function showStats(DETAILS) {
    setActiveTab('statsBtn');
    let statsContent = getShowStatsTemplate(DETAILS);
    document.getElementById('detail-content').innerHTML = statsContent;
}

async function showEvolution(DETAILS) {
    setActiveTab('evolutionBtn');
    const RESPONSE = await fetch(DETAILS.species.url);
    let speciesData = await RESPONSE.json();
    let evolutionResponse = await fetch(speciesData.evolution_chain.url);
    let evolutionData = await evolutionResponse.json();
    let evolutionChain = evolutionData.chain;

    const evolutionImages = await getEvolutionImg(evolutionChain);
    document.getElementById('detail-content').innerHTML = evolutionImages;
}

async function getEvolutionImg(evolutionChain) {
    let evolutionImages = '';
    while (evolutionChain) {
        let evoDetails = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolutionChain.species.name}`);
        let evoData = await evoDetails.json();
        evolutionImages += getShowEvolutionTemplate(evoData, evolutionChain);
        evolutionChain = evolutionChain.evolves_to[0];
    }
    return evolutionImages;
}

async function evolutionData(evolutionChain){
    while (evolutionChain) {
        let evoDetails = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolutionChain.species.name}`);
        let evoData = await evoDetails.json();
        
        evolutionImages += getShowEvolutionTemplate(evoData, evolutionChain);
        evolutionChain = evolutionChain.evolves_to[0];
    }
}

function setActiveTab(activeId) {
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => {
        button.classList.remove('active');
    });
    document.getElementById(activeId).classList.add('active');
}

function prevPokemon() {
    if (currentIndex > 0) { 
        currentIndex--;
        openOverlay(currentIndex);
        updateNavButtons();
    }
}

function nextPokemon() {
    if (currentIndex < pokemonList.length - 1) {
        currentIndex++;
        openOverlay(currentIndex); 
        updateNavButtons(); 
    }
}

function updateNavButtons() {
    let prevBtn = document.getElementById('prevBtn');
    let nextBtn = document.getElementById('nextBtn');
    
    let atStart = (currentIndex === 0);
    let atEnd = (currentIndex === pokemonList.length - 1);

    prevBtn.disabled = atStart;
    nextBtn.disabled = atEnd;
    disableNavButtons(prevBtn, nextBtn, atEnd, atStart)
}

function disableNavButtons(prevBtn, nextBtn, atEnd, atStart){
    if (atStart) {
        prevBtn.classList.add('disabled');
    } else {
        prevBtn.classList.remove('disabled');
    }

    if (atEnd) {
        nextBtn.classList.add('disabled');
    } else {
        nextBtn.classList.remove('disabled');
    };
}