import { useState } from "react";

function NutritionLookup() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  async function handleSearch(e) {
    e.preventDefault();

    const response = await fetch(`http://localhost:5000/api/nutrition/search?query=${query}`);
    const data = await response.json();
    setResults(data);
  }

  function isQueryValid() {
    return query.trim() !== '';
  };

  return (
    <div className="page-shell">

      <h1 className="page-title">
        Nutrition Lookup
      </h1>

      <form onSubmit={handleSearch} className="form-row">
        <input
          type="text"
          placeholder="Search for a food..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="text-input"
        />

        <button
          type='submit'
          disabled={!isQueryValid()}
          className={isQueryValid() ? 'button-primary' : 'button-disabled'}
        >
          Search
        </button>
      </form>

      <div className="results-panel">
        {results.length > 0 ? (
          results.map((food) => (
            <div key={food.id} className='result-card'>
              <h2 className='result-name'>{food.name}</h2>
              <p className='result-text'>Calories: {food.calories}</p>
              <p className='result-text'>Protein: {food.protein}g</p>
              <p className='result-text'>Carbs: {food.carbs}g</p>
              <p className='result-text'>Fat: {food.fat}g</p>
            </div>
          ))
        ) : (
          <p className="info-text">
            Search for a food to see nutrition information
          </p>
        )}
      </div>

    </div>
  );
}

export default NutritionLookup;