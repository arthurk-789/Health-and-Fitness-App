import { useLayoutEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import NutritionLookup from './pages/NutritionLookup';
import MacroCalculator from './pages/MacroCalculator';
import MealBuilder from './pages/MealBuilder';
import Account from './pages/Account';
import CaloriesBurned from './pages/CaloriesBurned';
import Settings from './pages/Settings';
import { loadPreferences, savePreferences } from './utils/preferences';

function App() {
  const location = useLocation();
  const [preferences, setPreferences] = useState(loadPreferences);

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = preferences.theme;
    document.documentElement.dataset.reducedMotion = String(preferences.reduceMotion);
    savePreferences(preferences);
  }, [preferences]);

  function handleThemeChange(theme) {
    setPreferences((currentPreferences) => ({
      ...currentPreferences,
      theme,
    }));
  }

  return (
    <div className={`app-shell ${location.pathname === '/' ? 'app-shell--home' : ''}`}>
      <NavBar theme={preferences.theme} onThemeChange={handleThemeChange} />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/nutrition' element={<NutritionLookup preferences={preferences} />} />
        <Route path='/macros' element={<MacroCalculator preferences={preferences} />} />
        <Route path='/meal-builder' element={<MealBuilder preferences={preferences} />} />
        <Route path='/calories-burned' element={<CaloriesBurned preferences={preferences} />} />
        <Route
          path='/settings'
          element={<Settings preferences={preferences} onSave={setPreferences} />}
        />
        <Route path='/account' element={<Account />} />
      </Routes>
    </div>

  );
}

export default App;
