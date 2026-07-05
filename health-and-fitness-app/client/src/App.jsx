import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import NavBar from './components/NavBar';
import NutritionLookup from './pages/NutritionLookup/NutritionLookup';
import MacroCalculator from './pages/MacroCalculator/MacroCalculator';
import MealBuilder from './pages/MealBuilder/MealBuilder';

function App() {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem('theme');

    return storedTheme === 'light' ? 'light' : 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((currentTheme) => currentTheme === 'dark' ? 'light' : 'dark');
  }

  return (
    <div className={`app-shell theme-${theme}`}>
      <NavBar theme={theme} onToggleTheme={toggleTheme} />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/nutrition' element={<NutritionLookup />} />
        <Route path='/macros' element={<MacroCalculator />} />
        <Route path='/meal-builder' element={<MealBuilder />} />
      </Routes>
    </div>

  );
}

export default App;
