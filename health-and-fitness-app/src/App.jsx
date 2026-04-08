import Home from './pages/Home/Home';
import {Routes, Route} from 'react-router-dom';
import NutritionTool from './pages/NutritionTool/NutritionTool';
import MacroCalculator from './pages/MacroCalculator/MacroCalculator';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/nutritiontool' element={<NutritionTool />} />
      <Route path='/macrocalculator' element={<MacroCalculator />} />
    </Routes>
  );
}

export default App;