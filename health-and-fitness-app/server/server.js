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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})