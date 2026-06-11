import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Add the two dots `../` to go up one level to find the `pages` folder
import Dashboard from '../pages/dashboard';
import DeviceManagement from '../pages/deviceManagement';
import Settings from '../pages/settings'; 
import Help from '../pages/help'; // <-- 1. Imported the new Help page here

// THIS STAYS THE SAME: Because `components` is already inside `src` next to App.jsx
import AddDevice from '../src/components/devices/AddDevice'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/devices" element={<DeviceManagement />} />
        <Route path="/add-device" element={<AddDevice />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help" element={<Help />} /> {/* <-- 2. Added the Help route here */}
      </Routes>
    </Router>
  );
}

export default App;