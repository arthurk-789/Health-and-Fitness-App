import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import NavBar from './components/NavBar/NavBar';
import NutritionLookup from './pages/NutritionLookup/NutritionLookup';
import MacroCalculator from './pages/MacroCalculator/MacroCalculator';

function App() {
  return (
    <div className='bg-gray-900 min-h-screen text-white'>
      <NavBar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/nutrition' element={<NutritionLookup />} />
        <Route path='/macros' element={<MacroCalculator />} />
      </Routes>
    </div>

  );
}

export default App;