const express = require('express');
const cors = require('cors');
const axios = require('axios');

require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


async function fetchNutrition(food, quantity) {
    const response = await axios.get(
        `https://api.api-ninjas.com/v1/nutritionitem?query=${food}&quantity=${quantity}`,
        {
            headers: {
                'X-Api-Key': process.env.API_KEY
            }
        }
    );

    return response.data;
}

async function fetchCaloriesBurned(activity, weight, duration) {
    const params = { activity };

    if (weight !== undefined) {
        params.weight = weight;
    }

    if (duration !== undefined) {
        params.duration = duration;
    }

    const response = await axios.get(
        'https://api.api-ninjas.com/v1/caloriesburned',
        {
            params,
            headers: {
                'X-Api-Key': process.env.API_KEY
            }
        }
    );

    return response.data;
}

app.get('/api/nutrition/search', async (req, res) => {
    try {
        const {food, quantity} = req.query;

        const nutritionData = await fetchNutrition(food, quantity);

        res.json(nutritionData);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: 'API Call Failed.'
        });
    }
});

app.get('/api/calories-burned/search', async (req, res) => {
    const activity = typeof req.query.activity === 'string'
        ? req.query.activity.trim()
        : '';
    const weight = req.query.weight;
    const duration = req.query.duration;

    if (!activity) {
        return res.status(400).json({
            error: 'Activity is required.'
        });
    }

    if (weight !== undefined && (weight === '' || !Number.isFinite(Number(weight)) || Number(weight) <= 0)) {
        return res.status(400).json({
            error: 'Weight must be a positive number.'
        });
    }

    if (duration !== undefined && (duration === '' || !Number.isFinite(Number(duration)) || Number(duration) <= 0)) {
        return res.status(400).json({
            error: 'Duration must be a positive number.'
        });
    }

    try {
        const caloriesBurnedData = await fetchCaloriesBurned(
            activity,
            weight === undefined ? undefined : Number(weight),
            duration === undefined ? undefined : Number(duration)
        );

        return res.json(Array.isArray(caloriesBurnedData) ? caloriesBurnedData : []);
    } catch (error) {
        console.error('Calories Burned API request failed:', error.message);

        const upstreamMessage = error.response?.data?.error;

        return res.status(502).json({
            error: upstreamMessage || 'Unable to fetch calories burned data.'
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
