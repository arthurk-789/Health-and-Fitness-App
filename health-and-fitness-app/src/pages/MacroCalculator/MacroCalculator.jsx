import { useState } from 'react';

function MacroCalculator() {
    const [userData, setUserData] = useState({
        age: '',
        weight: '',
        height: '',
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

    const handleSubmit = (e) => {
        e.preventDefault();
        // To do: implement calculation logic
        console.log('Form submitted with:', userData);
    };

    return (
        <div className='min-h-screen bg-gray-900 flex items-center justify-center p-4'>
            <div className='w-full max-w-2xl'>

                <h1 className='text-4xl font-bold text-white mb-8 text-center'>Macro Calculator</h1>


                <div className='bg-gray-800 rounded-lg border border-gray-700 p-8 mb-8'>
                    <form onSubmit={handleSubmit} className='space-y-6'>

                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                            <div>
                                <label className='block text-white text-sm font-semibold mb-2'>Age</label>
                                <input
                                    type='number'
                                    name='age'
                                    value={userData.age}
                                    onChange={handleInputChange}
                                    placeholder='e.g., 25'
                                    className='w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                                />
                            </div>
                            <div>
                                <label className='block text-white text-sm font-semibold mb-2'>Weight (lbs)</label>
                                <input
                                    type='number'
                                    name='weight'
                                    value={userData.weight}
                                    onChange={handleInputChange}
                                    placeholder='e.g., 75'
                                    className='w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                                />
                            </div>
                            <div>
                                <label className='block text-white text-sm font-semibold mb-2'>Height</label>
                                <div className='flex gap-2'>
                                    <input
                                        type='number'
                                        name='heightFeet'
                                        value={userData.heightFeet || ''}
                                        onChange={handleInputChange}
                                        placeholder='ft'
                                        className='w-1/2 px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                                    />
                                    <input
                                        type='number'
                                        name='heightInches'
                                        value={userData.heightInches || ''}
                                        onChange={handleInputChange}
                                        placeholder='in'
                                        className='w-1/2 px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                                    />
                                </div>
                            </div>
                        </div>


                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div>
                                <label className='block text-white text-sm font-semibold mb-2'>Gender</label>
                                <select
                                    name='gender'
                                    value={userData.gender}
                                    onChange={handleInputChange}
                                    className='w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                                >
                                    <option value='male'>Male</option>
                                    <option value='female'>Female</option>
                                </select>
                            </div>
                            <div>
                                <label className='block text-white text-sm font-semibold mb-2'>Activity Level</label>
                                <select
                                    name='activityLevel'
                                    value={userData.activityLevel}
                                    onChange={handleInputChange}
                                    className='w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                                >
                                    <option value='sedentary'>Sedentary</option>
                                    <option value='moderate'>Moderate</option>
                                    <option value='active'>Active</option>
                                </select>
                            </div>
                        </div>


                        <div>
                            <label className='block text-white text-sm font-semibold mb-3'>Goal</label>
                            <div className='flex gap-3'>
                                <button
                                    type='button'
                                    onClick={() => handleGoalSelect('cut')}
                                    className={`flex-1 px-4 py-2 rounded font-semibold transition-all ${userData.goal === 'cut'
                                            ? 'bg-red-600 text-white border-2 border-red-500'
                                            : 'bg-gray-700 text-gray-300 border-2 border-gray-600 hover:border-red-500'
                                        }`}
                                >
                                    Cut
                                </button>
                                <button
                                    type='button'
                                    onClick={() => handleGoalSelect('maintain')}
                                    className={`flex-1 px-4 py-2 rounded font-semibold transition-all ${userData.goal === 'maintain'
                                            ? 'bg-blue-600 text-white border-2 border-blue-500'
                                            : 'bg-gray-700 text-gray-300 border-2 border-gray-600 hover:border-blue-500'
                                        }`}
                                >
                                    Maintain
                                </button>
                                <button
                                    type='button'
                                    onClick={() => handleGoalSelect('bulk')}
                                    className={`flex-1 px-4 py-2 rounded font-semibold transition-all ${userData.goal === 'bulk'
                                            ? 'bg-green-600 text-white border-2 border-green-500'
                                            : 'bg-gray-700 text-gray-300 border-2 border-gray-600 hover:border-green-500'
                                        }`}
                                >
                                    Bulk
                                </button>
                            </div>
                        </div>


                        <button
                            type='submit'
                            className='w-full px-6 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition-colors'
                        >
                            Calculate
                        </button>
                    </form>
                </div>


                <div className='bg-gray-800 rounded-lg border border-gray-700 p-8'>
                    {results === null ? (
                        <p className='text-gray-400 text-center text-lg'>Enter your details to calculate macros</p>
                    ) : (
                        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                            <div className='bg-gray-700 rounded p-4 text-center'>
                                <p className='text-gray-400 text-sm font-semibold mb-2'>Calories</p>
                                <p className='text-white text-2xl font-bold'>{results.calories}</p>
                            </div>
                            <div className='bg-gray-700 rounded p-4 text-center'>
                                <p className='text-gray-400 text-sm font-semibold mb-2'>Protein (g)</p>
                                <p className='text-white text-2xl font-bold'>{results.protein}</p>
                            </div>
                            <div className='bg-gray-700 rounded p-4 text-center'>
                                <p className='text-gray-400 text-sm font-semibold mb-2'>Carbs (g)</p>
                                <p className='text-white text-2xl font-bold'>{results.carbs}</p>
                            </div>
                            <div className='bg-gray-700 rounded p-4 text-center'>
                                <p className='text-gray-400 text-sm font-semibold mb-2'>Fat (g)</p>
                                <p className='text-white text-2xl font-bold'>{results.fat}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MacroCalculator;