const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const input = document.querySelector('.input_search');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    try {
        const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        if (APIResponse.status === 200) {
            const data = await APIResponse.json();
            return data;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching Pokémon:', error);
        return null;
    }
};

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';
    pokemonImage.src = ''; 

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;

        const pokemonSprite = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        if (pokemonSprite) {
            pokemonImage.src = pokemonSprite;
            pokemonImage.style.display = 'block'; 
        } else {
            pokemonImage.src = './images/placeholder.png';
        }

        input.value = '';
        searchPokemon = data.id;
    } else {
        pokemonImage.style.display = 'none'; 
        pokemonName.innerHTML = 'No encontrado :(';
        pokemonNumber.innerHTML = '';
    }
};

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
