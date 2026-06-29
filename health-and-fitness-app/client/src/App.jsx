import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import NavBar from './components/NavBar';
import NutritionLookup from './pages/NutritionLookup/NutritionLookup';
import MacroCalculator from './pages/MacroCalculator/MacroCalculator';
import MealBuilder from './pages/MealBuilder/MealBuilder';

function App() {
  return (
    <div className='app-shell'>
      <NavBar />

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
