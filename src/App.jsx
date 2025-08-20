// src/App.jsx
import './App.css'
import { useEffect, useState } from "react";
import { fetchFirst150Pokemon } from "./api";
import PokemonCard from "./components/PokemonCard";
import SearchBar from "./components/SearchBar";
import FilterDropdown from "./components/FilterDropdown";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  // Fetch Pokémon
  const loadPokemon = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchFirst150Pokemon();
      setPokemonList(data);
      setFilteredList(data);
    } catch (err) {
      setError("Failed to fetch Pokémon. Please try again.");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadPokemon();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = pokemonList;

    if (search.trim()) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (selectedType !== "all") {
      filtered = filtered.filter((p) =>
        p.types.some((t) => t.type.name === selectedType)
      );
    }
    setFilteredList(filtered);
  }, [search, selectedType, pokemonList]);

  const allTypes = [
    "all",
    ...new Set(pokemonList.flatMap((p) => p.types.map((t) => t.type.name))),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-200 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <header className="bg-blue-600 dark:bg-gray-900 text-white py-4 shadow-md sticky top-0 z-10 text-center">
        <h1 className="text-3xl font-bold">🎮 Poke Explorer</h1>
      </header>

      <main className="p-6 max-w-7xl mx-auto">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <SearchBar search={search} setSearch={setSearch} />
          <FilterDropdown
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            allTypes={allTypes}
          />
        </div>

        {/* Loading */}
        {loading && <Loader />}

        {/* Error */}
        {error && <ErrorMessage message={error} onRetry={loadPokemon} />}

        {/* No results */}
        {!loading && !error && filteredList.length === 0 && (
          <p className="text-center text-lg text-gray-500 dark:text-gray-400">
            No Pokémon found
          </p>
        )}

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {!loading &&
            !error &&
            filteredList.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
        </div>
      </main>
    </div>
  );
}

export default App;





