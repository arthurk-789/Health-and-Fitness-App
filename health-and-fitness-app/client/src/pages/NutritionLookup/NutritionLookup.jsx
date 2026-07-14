import { useState } from 'react';
import EmptyState from '../../components/EmptyState';
import ErrorMessage from '../../components/ErrorMessage';
import LoadingSpinner from '../../components/LoadingSpinner';

function NutritionLookup() {
  const [food, setFood] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('g');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  async function handleSearch(e) {
    e.preventDefault();

    setLoading(true);
    setError(false);
    setHasSearched(true);

    try {
      const response = await fetch(`http://localhost:5000/api/nutrition/search?food=${food}&quantity=${quantity}%20${unit}`);

      const data = await response.json();

      console.log(data);

      setResults(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  function isFormValid() {
    return (
      food.trim() !== '' &&
      quantity.trim() !== ''
    );
  }

  function hasNoResults() {
    return (
      hasSearched &&
      (
        results === null ||
        results === undefined ||
        (
          typeof results === 'object' &&
          Object.keys(results).length === 0
        )
      )
    );
  }

  function hasValidNutritionData() {
    return (
      results !== null &&
      results !== undefined &&
      results.name !== undefined &&
      results.serving_size_g !== undefined &&
      results.fat_total_g !== undefined &&
      results.carbohydrates_total_g !== undefined &&
      results.sodium_mg !== undefined &&
      results.potassium_mg !== undefined &&
      results.cholesterol_mg !== undefined
    );
  }

  function hasInvalidFoodResult() {
    return (
      hasSearched &&
      results !== null &&
      results !== undefined &&
      !hasValidNutritionData()
    );
  }

  return (
    <div className='page-shell'>

      <h1 className='page-title'>
        Nutrition Lookup
      </h1>

      <form onSubmit={handleSearch} className='form-row'>

        <input
          type='text'
          placeholder='Food Name'
          value={food}
          onChange={(e) => setFood(e.target.value)}
          className='text-input'
        />

        <input
          type='number'
          placeholder='Quantity'
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className='text-input'
        />

        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className='text-input'
        >
          <option value='g'>Grams (g)</option>
          <option value='oz'>Ounces (oz)</option>
          <option value='lbs'>Pounds (lbs)</option>
        </select>

        <button
          type='submit'
          disabled={!isFormValid()}
          className={isFormValid() ? 'button-primary' : 'button-disabled'}
        >
          Search
        </button>

      </form>

      <div className='results-panel'>

        {loading ? (
          <LoadingSpinner message='Searching nutrition data...' />
        ) : error ? (
          <ErrorMessage message='Failed to fetch nutrition data.' />
        ) : hasNoResults() ? (
          <EmptyState
            title='No nutrition data found'
            message='Try a different food name or adjust the serving size.'
          />
        ) : hasInvalidFoodResult() ? (
          <ErrorMessage message='Invalid food name.' />
        ) : results !== null ? (
          <div className='result-card result-dashboard-card'>

            <div className='food-image-placeholder'>
              Food Image Coming Soon
            </div>

            <div className='result-header'>
              <h2 className='result-name'>
                {results.name}
              </h2>

              <p className='result-serving-size'>
                Serving Size: {results.serving_size_g} g
              </p>
            </div>

            <div className='result-stats-grid'>
              <div className='stat-tile'>
                <span className='stat-label'>Fat</span>
                <span className='stat-value'>{results.fat_total_g} g</span>
              </div>

              <div className='stat-tile'>
                <span className='stat-label'>Carbohydrates</span>
                <span className='stat-value'>{results.carbohydrates_total_g} g</span>
              </div>

              <div className='stat-tile'>
                <span className='stat-label'>Sodium</span>
                <span className='stat-value'>{results.sodium_mg} mg</span>
              </div>

              <div className='stat-tile'>
                <span className='stat-label'>Potassium</span>
                <span className='stat-value'>{results.potassium_mg} mg</span>
              </div>
            </div>

            <div className='additional-nutrition'>
              <p className='additional-nutrition-title'>Additional Nutrition</p>
              <div className='stat-tile additional-nutrition-card'>
                <span className='stat-label'>Cholesterol</span>
                <span className='stat-value'>{results.cholesterol_mg} mg</span>
              </div>
            </div>

          </div>
        ) : (
          <EmptyState
            title='Search for a food'
            message='Enter a food and quantity to view nutrition information.'
          />
        )}

      </div>

    </div>
  );
}

export default NutritionLookup;
