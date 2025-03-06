import { Pokemon } from "./types";

type FetchedInfo = {name: string, url: string}

type FetchedPokemons = {
  pokemons: Pokemon[];
  types: string[]
}

const apiURL: string = "https://pokeapi.co/api/v2/pokemon?limit=200&offset=0";
const typesURL: string = "https://pokeapi.co/api/v2/type";

async function fetchPokemonTypes(): Promise<string[]> {
  try {
    const response = await fetch(typesURL);
    const data = await response.json();

    return data.results.map((type: FetchedInfo) => 
      type.name.charAt(0).toUpperCase() + type.name.slice(1) // you used this in anothr file so plz make it a function
);
  } catch (error) {
    console.error("Error fetching Pokémon types:", error);
    return [] as string[];
  }
}

const fetchPokemons = async (): Promise<FetchedPokemons> =>  {
  try {
    const [pokemonResponse, types]: [any, string[]] = await Promise.all([
      fetch(apiURL).then((res) => res.json()),
      fetchPokemonTypes(),
    ]);
    console.log(types); // remove this

    const pokemons: Pokemon[] = await Promise.all(
      pokemonResponse.results.map(async (pokemonInfo : FetchedInfo) => {
        const pokemon = await fetch(pokemonInfo.url).then((res) => res.json());

        return {
          name: pokemon.name,
          number: pokemon.id.toString().padStart(4, "0"),
          type: pokemon.types.map((type: {slot: number, type: FetchedInfo}) => type.type.name),
          weight: pokemon.weight,
          height: pokemon.height,
          frontImageNormal: pokemon.sprites.front_default,
          backImageNormal: pokemon.sprites.back_default,
          frontImageShiny: pokemon.sprites.front_shiny,
          backImageShiny: pokemon.sprites.back_shiny,
        } as Pokemon;
      })
    );

    return { pokemons, types }; 
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    return {pokemons: [], types: []}
  }
}

export default fetchPokemons;
