import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Added .jsx to bypass Vite's strict import analysis
import Dashboard from '../pages/dashboard.jsx'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;