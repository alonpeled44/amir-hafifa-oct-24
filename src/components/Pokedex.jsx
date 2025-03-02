import { useState, useEffect } from "react";
import fetchPokemons from "../libs/fetchPokemons";
import FilterSortSelector from "./FilterSortSelector";
import css from "../styles/pokedex.module.css";

export default function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]); // Multiple selection
  const [sortType, setSortType] = useState("card-number"); // Single selection
  const [isDesktopMode, setIsDesktopMode] = useState(true);

  useEffect(() => {
    fetchPokemons().then((data) => {
      setPokemons(data);
      setFilteredPokemons(data);
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
    let updatedPokemons = pokemons.filter((pokemon) => {
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

  return (
    <main className={css.pokedex}>
      {/* Search and Controls */}
      <div className={css.controls}>
        {isDesktopMode && (
          <input
            type="text"
            placeholder="Search..."
            className={css.search}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        )}

        {/* Filter - Multiple Selection (Checkboxes) */}
        <FilterSortSelector
          label="Filter by"
          selectedFilter={selectedTypes}
          setSelectedFilter={handleTypeChange}
          options={[
            { label: "Bug", value: "bug" },
            { label: "Dark", value: "dark" },
            { label: "Dragon", value: "dragon" },
            { label: "Electric", value: "electric" },
            { label: "Fairy", value: "fairy" },
            { label: "Fighting", value: "fighting" },
            { label: "Fire", value: "fire" },
            { label: "Flying", value: "flying" },
            { label: "Ghost", value: "ghost" },
            { label: "Grass", value: "grass" },
            { label: "Ground", value: "ground" },
            { label: "Ice", value: "ice" },
            { label: "Normal", value: "normal" },
            { label: "Poison", value: "poison" },
            { label: "Psychic", value: "psychic" },
            { label: "Rock", value: "rock" },
            { label: "Steel", value: "steel" },
            { label: "Water", value: "water" },
          ]}
          isCheckbox={true} // Allows multiple selections
        />

        {/* Sort - Single Selection (Radio Buttons) */}
        <FilterSortSelector
          label="Sort by"
          selectedFilter={sortType}
          setSelectedFilter={setSortType}
          options={[
            { label: "Card Number", value: "card-number" },
            { label: "Alphabetical", value: "abc" },
            { label: "Weight", value: "sort-weight" },
            { label: "Height", value: "sort-height" },
          ]}
          isCheckbox={false} // Enables radio buttons
        />
      </div>

      {/* Pokémon Cards */}
      <section className={css.grid}>
        {filteredPokemons.length > 0 ? (
          filteredPokemons.map((pokemon) => (
            <div key={pokemon.number} className={css.card}>
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
    </main>
  );
}
