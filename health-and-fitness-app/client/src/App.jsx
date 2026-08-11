import { useLayoutEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import NavBar from './components/NavBar';
import NutritionLookup from './pages/NutritionLookup/NutritionLookup';
import MacroCalculator from './pages/MacroCalculator/MacroCalculator';
import MealBuilder from './pages/MealBuilder/MealBuilder';
import Account from './pages/Account/Account';
import CaloriesBurned from './pages/CaloriesBurned/CaloriesBurned';

const themes = ['light', 'dark', 'emerald', 'sunset', 'violet'];

function App() {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem('theme');

    return themes.includes(storedTheme) ? storedTheme : 'dark';
  });

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className='app-shell'>
      <NavBar theme={theme} onThemeChange={setTheme} />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/nutrition' element={<NutritionLookup />} />
        <Route path='/macros' element={<MacroCalculator />} />
        <Route path='/meal-builder' element={<MealBuilder />} />
        <Route path='/calories-burned' element={<CaloriesBurned />} />
        <Route path='/account' element={<Account />} />
      </Routes>
    </div>

  );
}

export default App;
