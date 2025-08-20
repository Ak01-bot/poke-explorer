export default function PokemonCard({ pokemon }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 flex flex-col items-center hover:scale-105 hover:shadow-2xl transition-transform">
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="w-24 h-24 mb-2"
        loading="lazy"
      />
      <h2 className="text-lg font-bold capitalize text-gray-900 dark:text-white">
        {pokemon.name}
      </h2>
      <p className="text-gray-600 dark:text-gray-400 text-sm">#{pokemon.id}</p>
      <div className="flex gap-2 mt-2">
        {pokemon.types.map((t) => (
          <span
            key={t.type.name}
            className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700 dark:bg-gray-700 dark:text-gray-200"
          >
            {t.type.name}
          </span>
        ))}
      </div>
    </div>
  );
}
