const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/api/nutrition/search', (req, res) => {
    const { query } = req.query;

    const mockFoods = [
        {
            id: 1,
            name: 'chicken',
            calories: 165,
            protein: 31,
            carbs: 0,
            fat: 3.6
        },
        {
            id: 2,
            name: 'rice',
            calories: 130,
            carbs: 28,
            fat: 3.6
        }
    ]

    const filteredFoods = mockFoods.filter((food) => {
        return food.name.toLowerCase().includes(query.toLowerCase());
    });

    res.json(filteredFoods);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})