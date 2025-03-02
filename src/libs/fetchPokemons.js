const apiURL = "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0";

async function fetchPokemons() {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();

    const pokemons = await Promise.all(
      data.results.map(async (pokemon) => {
        const pokemonDetails = await fetch(pokemon.url).then((res) => res.json());
        return {
          name: pokemonDetails.name,
          number: pokemonDetails.id.toString().padStart(4, "0"),
          type: pokemonDetails.types.map((type) => type.type.name),
          weight: pokemonDetails.weight,
          height: pokemonDetails.height,
          frontImageNormal: pokemonDetails.sprites.front_default,
          backImageNormal: pokemonDetails.sprites.back_default,
          frontImageShiny: pokemonDetails.sprites.front_shiny,
          backImageShiny: pokemonDetails.sprites.back_shiny,
        };
      })
    );

    return pokemons;
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    return [];
  }
}

export default fetchPokemons;
