const apiURL = "https://pokeapi.co/api/v2/pokemon?limit=200&offset=0";
const typesURL = "https://pokeapi.co/api/v2/type";

async function fetchPokemonTypes() {
  try {
    const response = await fetch(typesURL);
    const data = await response.json();

    return data.results.map((type) => ({
      label: type.name.charAt(0).toUpperCase() + type.name.slice(1),
      value: type.name,
    }));
  } catch (error) {
    console.error("Error fetching Pokémon types:", error);
    return [];
  }
}

async function fetchPokemons() {
  try {
    const [pokemonResponse, types] = await Promise.all([
      fetch(apiURL).then((res) => res.json()),
      fetchPokemonTypes(),
    ]);

    const pokemons = await Promise.all(
      pokemonResponse.results.map(async (pokemon) => {
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

    return { pokemons, types }; 
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    return { pokemons: [], types: [] };
  }
}

export default fetchPokemons;
