import { useState } from "react";

function NutritionLookup() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({});

  function handleSearch(e) {
    e.preventDefault();
    fetchData();
  }

  async function fetchData() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    let data = await response.json();
    setResults(data);

  }

  return (
    <div className="p-6 max-w-4xl mx-auto text-white">

      <h1 className="text-2xl font-bold mb-6">
        Nutrition Lookup
      </h1>

      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Search for a food..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type='submit'
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>

      <div className="border border-gray-700 rounded-md p-6 min-h-[200px] flex flex-col items-center justify-center bg-gray-800">
        <p className="text-gray-400">
          Search for a food to see nutrition information
        </p>

        <p className='text-gray-400'>
        {results.title}
      </p>
      </div>
      
    </div>
  );
}

export default NutritionLookup;