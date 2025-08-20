// src/api.js
const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

export const fetchFirst150Pokemon = async () => {
  try {
    // Get first 150 pokemon
    const response = await fetch(`${BASE_URL}?limit=150`);
    const data = await response.json();

    // Fetch details for each pokemon (because the first call only gives names/urls)
    const pokemonDetails = await Promise.all(
      data.results.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        return res.json();
      })
    );

    return pokemonDetails;
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    return [];
  }
};
