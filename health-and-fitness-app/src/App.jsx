import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import NavBar from './components/NavBar/NavBar';
import NutritionTool from './pages/NutritionTool/NutritionTool';
import MacroCalculator from './pages/MacroCalculator/MacroCalculator';

function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/nutrition' element={<NutritionTool />} />
        <Route path='/macros' element={<MacroCalculator />} />
      </Routes>
    </>

  );
}

export default App;