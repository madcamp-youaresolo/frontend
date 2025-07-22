import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import IntroPage from './pages/IntroPage';
import TestResultPage from './pages/TestResultPage';
import FemaleTestPage from './pages/FemaleTestPage';
import MaleTestPage from './pages/MaleTestPage';
import StatsPage from './pages/StatsPage';

function App() {
  const location = useLocation();

  return (
    <Routes>
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/" element={<IntroPage />} />
      <Route 
        path="/test-female" 
        element={<FemaleTestPage 
        key={location.key}/>} 
      />
      <Route 
        path="/test-male" 
        element={<MaleTestPage 
        key={location.key}/>} 
      />
      <Route path="/test-result" element={<TestResultPage />} />
      <Route path='/stats' element={<StatsPage />} />
    </Routes>
  );
}

export default App;