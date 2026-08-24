import { useState } from 'react';
import { formatNumber } from '../utils/preferences';

function MacroCalculator({ preferences }) {
    const [userData, setUserData] = useState({
        age: '',
        weight: preferences.weight,
        heightFeet: '',
        heightInches: '',
        gender: 'male',
        activityLevel: 'moderate',
        goal: 'maintain'
    });

    const [results, setResults] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleGoalSelect = (goal) => {
        setUserData(prev => ({
            ...prev,
            goal
        }));
    };

    const isFormValid = () => {
        return (
            userData.age &&
            userData.weight &&
            userData.heightFeet &&
            userData.heightInches !== ''
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const age = Number(userData.age);
        const weightLbs = Number(userData.weight);
        const heightFeet = Number(userData.heightFeet);
        const heightInches = Number(userData.heightInches);

        const totalHeightInches = heightFeet * 12 + heightInches;

        const weightKg = weightLbs * 0.453592;
        const heightCm = totalHeightInches * 2.54;

        let bmr;

        if (userData.gender === 'male') {
            bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
        } else {
            bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
        }

        const activityMultipliers = {
            sedentary: 1.2,
            moderate: 1.55,
            active: 1.725
        };

        let calories = bmr * activityMultipliers[userData.activityLevel];

        if (userData.goal === 'cut') {
            calories -= 500;
        } else if (userData.goal === 'bulk') {
            calories += 300;
        }

        const protein = weightLbs * 0.8;
        const fat = (calories * 0.25) / 9;
        const carbs = (calories - protein * 4 - fat * 9) / 4;

        setResults({
            calories,
            protein,
            carbs,
            fat
        });
    };

    return (
        <div className='page-wrapper'>
            <div className='content-container'>

                <h1 className='page-title-center'>Macro Calculator</h1>

                <div className='card-panel'>
                    <form onSubmit={handleSubmit} className='form-spacing'>

                        <div className='grid-3-cols'>
                            <div>
                                <label className='field-label'>Age</label>
                                <input
                                    type='number'
                                    name='age'
                                    value={userData.age}
                                    onChange={handleInputChange}
                                    placeholder='e.g., 25'
                                    className='field-input'
                                />
                            </div>
                            <div>
                                <label className='field-label'>Weight (lbs)</label>
                                <input
                                    type='number'
                                    name='weight'
                                    value={userData.weight}
                                    onChange={handleInputChange}
                                    placeholder='e.g., 165'
                                    className='field-input'
                                />
                            </div>
                            <div>
                                <label className='field-label'>Height</label>
                                <div className='field-row'>
                                    <input
                                        type='number'
                                        name='heightFeet'
                                        value={userData.heightFeet || ''}
                                        onChange={handleInputChange}
                                        placeholder='ft'
                                        className='field-input-half'
                                    />
                                    <input
                                        type='number'
                                        name='heightInches'
                                        value={userData.heightInches || ''}
                                        onChange={handleInputChange}
                                        placeholder='in'
                                        className='field-input-half'
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='grid-2-cols'>
                            <div>
                                <label className='field-label'>Gender</label>
                                <select
                                    name='gender'
                                    value={userData.gender}
                                    onChange={handleInputChange}
                                    className='field-input'
                                >
                                    <option value='male'>Male</option>
                                    <option value='female'>Female</option>
                                </select>
                            </div>
                            <div>
                                <label className='field-label'>Activity Level</label>
                                <select
                                    name='activityLevel'
                                    value={userData.activityLevel}
                                    onChange={handleInputChange}
                                    className='field-input'
                                >
                                    <option value='sedentary'>Sedentary</option>
                                    <option value='moderate'>Moderate</option>
                                    <option value='active'>Active</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className='section-label'>Goal</label>
                            <div className='goal-row'>
                                <button
                                    type='button'
                                    onClick={() => handleGoalSelect('cut')}
                                    className={`goal-button ${userData.goal === 'cut'
                                        ? 'goal-button--active-cut'
                                        : 'goal-button--inactive'
                                        }`}
                                >
                                    Cut
                                </button>
                                <button
                                    type='button'
                                    onClick={() => handleGoalSelect('maintain')}
                                    className={`goal-button ${userData.goal === 'maintain'
                                        ? 'goal-button--active-maintain'
                                        : 'goal-button--inactive'
                                        }`}
                                >
                                    Maintain
                                </button>
                                <button
                                    type='button'
                                    onClick={() => handleGoalSelect('bulk')}
                                    className={`goal-button ${userData.goal === 'bulk'
                                        ? 'goal-button--active-bulk'
                                        : 'goal-button--inactive'
                                        }`}
                                >
                                    Bulk
                                </button>
                            </div>
                        </div>

                        <button
                            type='submit'
                            disabled={!isFormValid()}
                            className={isFormValid() ? 'submit-button' : 'submit-button--disabled'}
                        >
                            Calculate
                        </button>
                    </form>
                </div>

                <div className='card-panel'>
                    {results === null ? (
                        <p className='info-message'>Enter your details to calculate macros</p>
                    ) : (
                        <div className='results-grid'>
                            <div className='stats-card'>
                                <p className='stats-label'>Calories</p>
                                <p className='stats-value'>
                                    {formatNumber(results.calories, preferences.numberFormat)}
                                </p>
                            </div>
                            <div className='stats-card'>
                                <p className='stats-label'>Protein (g)</p>
                                <p className='stats-value'>
                                    {formatNumber(results.protein, preferences.numberFormat)}
                                </p>
                            </div>
                            <div className='stats-card'>
                                <p className='stats-label'>Carbs (g)</p>
                                <p className='stats-value'>
                                    {formatNumber(results.carbs, preferences.numberFormat)}
                                </p>
                            </div>
                            <div className='stats-card'>
                                <p className='stats-label'>Fat (g)</p>
                                <p className='stats-value'>
                                    {formatNumber(results.fat, preferences.numberFormat)}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MacroCalculator;
