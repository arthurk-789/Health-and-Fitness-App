
import { useState } from 'react';
import EmptyState from '../components/EmptyState';
import ErrorMessage from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';
import SuccessMessage from '../components/SuccessMessage';

function MealBuilder() {
  const [food, setFood] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('g');
  const [mealItems, setMealItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function isFormValid() {
    return food.trim() !== '' && quantity.trim() !== '';
  }

  async function handleAddFood(e) {
    e.preventDefault();

    if (!isFormValid()) {
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(
        'http://localhost:5000/api/nutrition/search?food=' + food + '&quantity=' + quantity + '%20' + unit
      );

      if (!response.ok) {
        throw new Error('Failed to fetch nutrition data.');
      }

      const data = await response.json();

      setMealItems([...mealItems, data]);
      setFood('');
      setQuantity('');
      setSuccess('Food added to your meal.');
    } catch {
      setError('Failed to add food. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function handleRemoveItem(indexToRemove) {
    setMealItems(mealItems.filter((item, index) => index !== indexToRemove));
  }

  const mealTotals = mealItems.reduce(
    (totals, item) => {
      return {
        fat: totals.fat + (Number(item.fat_total_g) || 0),
        carbohydrates: totals.carbohydrates + (Number(item.carbohydrates_total_g) || 0),
        sodium: totals.sodium + (Number(item.sodium_mg) || 0),
        potassium: totals.potassium + (Number(item.potassium_mg) || 0)
      };
    },
    {
      fat: 0,
      carbohydrates: 0,
      sodium: 0,
      potassium: 0
    }
  );

  return (
    <div className='page-shell'>
      <h1 className='page-title'>
        Meal Builder
      </h1>

      <h2 className='section-label'>
        Add Food
      </h2>

      <form onSubmit={handleAddFood} className='form-row'>
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
          <option value='g'>g</option>
          <option value='oz'>oz</option>
          <option value='lbs'>lbs</option>
        </select>

        <button
          type='submit'
          disabled={!isFormValid() || loading}
          className={isFormValid() && !loading ? 'button-primary' : 'button-disabled'}
        >
          {loading ? 'Adding...' : 'Add to Meal'}
        </button>
      </form>

      {loading && (
        <LoadingSpinner message='Adding food to meal...' />
      )}

      {error !== '' && (
        <ErrorMessage message={error} />
      )}

      {success !== '' && (
        <SuccessMessage message={success} />
      )}

      <h2 className='section-label'>
        Meal Totals
      </h2>

      <div className='results-panel'>
        <div className='meal-totals-grid'>
          <div className='meal-total-card'>
            <p className='result-text'>Total Fat</p>
            <p className='result-name'>{Math.round(mealTotals.fat * 10) / 10} g</p>
          </div>

          <div className='meal-total-card'>
            <p className='result-text'>Total Carbohydrates</p>
            <p className='result-name'>{Math.round(mealTotals.carbohydrates * 10) / 10} g</p>
          </div>

          <div className='meal-total-card'>
            <p className='result-text'>Total Sodium</p>
            <p className='result-name'>{Math.round(mealTotals.sodium)} mg</p>
          </div>

          <div className='meal-total-card'>
            <p className='result-text'>Total Potassium</p>
            <p className='result-name'>{Math.round(mealTotals.potassium)} mg</p>
          </div>
        </div>
      </div>

      <h2 className='section-label'>
        Meal Items
      </h2>

      <div className='results-panel'>
        {mealItems.length === 0 ? (
          <EmptyState
            title='Your meal is empty'
            message='Add foods above to start building your meal.'
          />
        ) : (
          mealItems.map((item, index) => (
            <div key={item.name + '-' + index} className='result-card'>
              <h2 className='result-name'>
                {item.name}
              </h2>

              <p className='result-text'>
                Serving Size: {item.serving_size_g || 0} g
              </p>

              <p className='result-text'>
                Fat: {item.fat_total_g || 0} g
              </p>

              <p className='result-text'>
                Carbohydrates: {item.carbohydrates_total_g || 0} g
              </p>

              <p className='result-text'>
                Sodium: {item.sodium_mg || 0} mg
              </p>

              <p className='result-text'>
                Potassium: {item.potassium_mg || 0} mg
              </p>

              <button
                type='button'
                onClick={() => handleRemoveItem(index)}
                className='remove-button'
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MealBuilder;
