const nutritionSearchCache = new Map();

function createNutritionCacheKey(food, quantity, unit) {
  const normalizedFood = food.trim().toLowerCase().replace(/\s+/g, ' ');
  const normalizedQuantity = quantity.trim();
  const normalizedUnit = unit.trim().toLowerCase();

  return `${normalizedQuantity}|${normalizedUnit}|${normalizedFood}`;
}

export { createNutritionCacheKey, nutritionSearchCache };
