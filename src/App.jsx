import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import IntroPage from './pages/IntroPage';
import TestPage from './pages/TestPage';
import TestResultPage from './pages/TestResultPage';
import FemaleTestPage from './pages/FemaleTestPage';
import MaleTestPage from './pages/MaleTestPage';
import StatsPage from './pages/StatsPage';

// page for test
import PageForTest from './pages/PageForTest';

function App() {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/" element={<IntroPage />} />
      <Route path="/test" element={<TestPage />} />
      <Route path="/test-female" element={<FemaleTestPage />} />
      <Route path="/test-male" element={<MaleTestPage />} />
      <Route path="/test-result" element={<TestResultPage />} />
      <Route path='/stats' element={<StatsPage />} />

      {/* page for test */}
      <Route path="/page-for-test" element={<PageForTest />} />
    </Routes>
  );
}

export default App;