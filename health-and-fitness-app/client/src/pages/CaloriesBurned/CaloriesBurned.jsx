import { useState } from 'react';
import EmptyState from '../../components/EmptyState';
import ErrorMessage from '../../components/ErrorMessage';
import LoadingSpinner from '../../components/LoadingSpinner';

function CaloriesBurned() {
  const [activity, setActivity] = useState('');
  const [weight, setWeight] = useState('');
  const [duration, setDuration] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  async function handleSearch(event) {
    event.preventDefault();

    const trimmedActivity = activity.trim();

    if (!trimmedActivity) {
      setError('Enter an activity to search.');
      return;
    }

    const params = new URLSearchParams({ activity: trimmedActivity });

    if (weight) {
      params.set('weight', weight);
    }

    if (duration) {
      params.set('duration', duration);
    }

    setLoading(true);
    setError('');
    setHasSearched(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/calories-burned/search?${params.toString()}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unable to fetch calories burned data.');
      }

      setResults(Array.isArray(data) ? data : []);
    } catch (requestError) {
      setResults([]);
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  function handleActivityChange(event) {
    setActivity(event.target.value);

    if (error === 'Enter an activity to search.') {
      setError('');
    }
  }

  return (
    <main className='page-shell calories-page'>
      <div className='tool-header'>
        <p className='tool-eyebrow'>Activity calculator</p>
        <h1 className='page-title calories-page-title'>Calories Burned</h1>
        <p className='tool-description'>
          Search an activity and optionally add your weight and workout duration
          for a more personalized estimate.
        </p>
      </div>

      <form onSubmit={handleSearch} className='card-panel calories-form'>
        <div className='calories-form-grid'>
          <div className='calories-activity-field'>
            <label htmlFor='activity' className='field-label'>
              Activity
            </label>
            <input
              id='activity'
              type='text'
              value={activity}
              onChange={handleActivityChange}
              onInvalid={() => setError('Enter an activity to search.')}
              placeholder='e.g., running'
              className='field-input'
              required
              aria-invalid={error === 'Enter an activity to search.'}
            />
          </div>

          <div>
            <label htmlFor='weight' className='field-label'>
              Weight (lbs)
            </label>
            <input
              id='weight'
              type='number'
              value={weight}
              onChange={(event) => setWeight(event.target.value)}
              placeholder='e.g., 165'
              className='field-input'
              min='1'
              step='any'
            />
          </div>

          <div>
            <label htmlFor='duration' className='field-label'>
              Duration (minutes)
            </label>
            <input
              id='duration'
              type='number'
              value={duration}
              onChange={(event) => setDuration(event.target.value)}
              placeholder='e.g., 30'
              className='field-input'
              min='1'
              step='any'
            />
          </div>
        </div>

        <button type='submit' className='submit-button'>
          Calculate Calories Burned
        </button>
      </form>

      <section className='results-panel calories-results' aria-live='polite'>
        {loading ? (
          <LoadingSpinner message='Calculating calories burned...' />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : hasSearched && results.length === 0 ? (
          <EmptyState
            title='No activities found'
            message='Try a broader activity name, such as running, cycling, or swimming.'
          />
        ) : results.length > 0 ? (
          <div className='calories-results-grid'>
            {results.map((result, index) => (
              <article
                key={`${result.name || 'activity'}-${index}`}
                className='calories-result-card'
              >
                <div className='calories-result-header'>
                  <p className='calories-result-label'>Activity</p>
                  <h2 className='calories-result-name'>
                    {result.name || result.activity || 'Activity estimate'}
                  </h2>
                </div>

                {result.total_calories !== undefined && (
                  <div className='calories-total'>
                    <span className='calories-total-value'>
                      {result.total_calories}
                    </span>
                    <span className='calories-total-label'>
                      total calories burned
                    </span>
                  </div>
                )}

                <div className='calories-stat-grid'>
                  {result.calories_per_hour !== undefined && (
                    <div className='calories-stat'>
                      <span className='stat-label'>Per hour</span>
                      <span className='calories-stat-value'>
                        {result.calories_per_hour} cal
                      </span>
                    </div>
                  )}

                  {result.duration_minutes !== undefined && (
                    <div className='calories-stat'>
                      <span className='stat-label'>Duration</span>
                      <span className='calories-stat-value'>
                        {result.duration_minutes} min
                      </span>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState
            title='Estimate calories burned'
            message='Enter an activity to see matching calorie estimates.'
          />
        )}
      </section>
    </main>
  );
}

export default CaloriesBurned;
