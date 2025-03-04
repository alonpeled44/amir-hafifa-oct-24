import { useState, useEffect } from "react";
import fetchPokemons from "../libs/fetchPokemons";
import FilterSortSelector from "./FilterSortSelector";
import PokemonDialog from "./PokemonDialog";
import css from "../styles/pokedex.module.css";

export default function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonTypes, setPokemonTypes] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortType, setSortType] = useState("card-number");
  const [isDesktopMode, setIsDesktopMode] = useState(true);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const sortOptions = [
    { label: "Card Number", value: "card-number" },
    { label: "Alphabetical", value: "abc" },
    { label: "Weight", value: "sort-weight" },
    { label: "Height", value: "sort-height" },
  ];

  useEffect(() => {
    fetchPokemons().then(({ pokemons, types }) => {
      setPokemons({ pokemons, types });
      setFilteredPokemons(pokemons);
      setPokemonTypes(types);
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktopMode(window.innerWidth > 1200);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!pokemons || !pokemons.pokemons) return; // Ensure data is available

    let updatedPokemons = pokemons.pokemons.filter((pokemon) => {
      const matchesSearch =
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pokemon.number.includes(searchTerm);

      const matchesType =
        selectedTypes.length === 0 ||
        pokemon.type.some((type) => selectedTypes.includes(type));

      return matchesSearch && matchesType;
    });

    updatedPokemons.sort((a, b) => {
      switch (sortType) {
        case "card-number":
          return a.number - b.number;
        case "abc":
          return a.name.localeCompare(b.name);
        case "sort-weight":
          return a.weight - b.weight;
        case "sort-height":
          return a.height - b.height;
        default:
          return 0;
      }
    });

    setFilteredPokemons(updatedPokemons);
  }, [searchTerm, selectedTypes, sortType, pokemons]);

  const handleTypeChange = (type) => {
    setSelectedTypes((prevTypes) =>
      prevTypes.includes(type)
        ? prevTypes.filter((t) => t !== type)
        : [...prevTypes, type]
    );
  };

  const openDialog = (pokemon) => {
    setSelectedPokemon(pokemon);
    setIsDialogOpen(true);
  };

  return (
    <div className={css.pokedex}>
      <div className={css.controls}>
        {isDesktopMode && (
          <input
            type="text"
            placeholder="Search..."
            className={css.search}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        )}

        <FilterSortSelector
          label="Filter by"
          selectedFilter={selectedTypes}
          setSelectedFilter={handleTypeChange}
          options={pokemonTypes}
          isCheckbox={true}
        />

        <FilterSortSelector
          label="Sort by"
          selectedFilter={sortType}
          setSelectedFilter={setSortType}
          options={sortOptions}
          isCheckbox={false}
        />
      </div>

      <section className={css.grid}>
        {filteredPokemons.length > 0 ? (
          filteredPokemons.map((pokemon) => (
            <div
              key={pokemon.number}
              className={css.card}
              onClick={() => openDialog(pokemon)}
            >
              <div className={css.header}>
                <h3>{pokemon.name}</h3>
                <p>#{pokemon.number}</p>
              </div>
              <img src={pokemon.frontImageNormal} alt={pokemon.name} />
              {isDesktopMode && (
                <div className={css.info}>
                  <p>Type: {pokemon.type.join(", ")}</p>
                  <p>Weight: {pokemon.weight}</p>
                  <p>Height: {pokemon.height}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No Pokémon found</p>
        )}
      </section>
      <PokemonDialog
        pokemon={selectedPokemon}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
    </div>
  );
}
