import { Routes, Route, Navigate } from 'react-router-dom';
import IntroPage from './pages/IntroPage';
import TestPage from './pages/TestPage';
import TestResultPage from './pages/TestResultPage';
import './App.css';

function App() {

  return (
    <Routes>
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/" element={<IntroPage />} />
      <Route path="/test" element={<TestPage />} />
      <Route path="/test-result" element={<TestResultPage />} />
    </Routes>
  );
}

export default App;