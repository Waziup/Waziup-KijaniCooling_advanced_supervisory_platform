import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import your pages
import Dashboard from '../pages/dashboard.jsx'; 
import DeviceManagement from '../pages/DeviceManagement.jsx'; // Add this line

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to dashboard (or /devices if you prefer) */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Add the new route here */}
        <Route path="/devices" element={<DeviceManagement />} />
      </Routes>
    </Router>
  );
}

export default App;