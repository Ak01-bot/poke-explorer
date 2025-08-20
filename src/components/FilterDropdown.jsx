export default function FilterDropdown({ selectedType, setSelectedType, allTypes }) {
  return (
    <select
      value={selectedType}
      onChange={(e) => setSelectedType(e.target.value)}
      className="p-3 border border-gray-400 rounded-xl w-full sm:w-48 shadow-sm 
        focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white dark:border-gray-600"
    >
      {allTypes.map((type) => (
        <option key={type} value={type}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </option>
      ))}
    </select>
  );
}
