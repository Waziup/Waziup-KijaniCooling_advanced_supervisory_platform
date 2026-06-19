import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Page imports
import Dashboard from '../pages/dashboard';
import DeviceManagement from '../pages/deviceManagement';
import Settings from '../pages/settings'; 
import Help from '../pages/help'; 
import Notifications from '../pages/notifications';
import Troubleshooting from '../pages/troubleshooting';
import ReportsAndAnalytics from '../pages/reports'; // <-- 1. Imported the Reports page

// Component imports
import AddDevice from '../src/components/devices/AddDevice'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/devices" element={<DeviceManagement />} />
        <Route path="/add-device" element={<AddDevice />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help" element={<Help />} /> 
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/troubleshooting" element={<Troubleshooting />} /> 
        <Route path="/reports" element={<ReportsAndAnalytics />} /> {/* <-- 2. Added the Reports route here */}
      </Routes>
    </Router>
  );
}

export default App;