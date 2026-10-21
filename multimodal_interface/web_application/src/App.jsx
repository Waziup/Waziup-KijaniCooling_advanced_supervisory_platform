import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';

// Page imports
import Dashboard from '../pages/dashboard';
import DeviceManagement from '../pages/deviceManagement';
import AddDevice from '../pages/addDevice';
import Settings from '../pages/settings';
import Help from '../pages/help';
import Notifications from '../pages/notifications';
import Troubleshooting from '../pages/troubleshooting';
import ReportsAndAnalytics from '../pages/reports';
import ReportsLogistics from '../pages/reportsLogistics';
import ReportsEnergy from '../pages/reportsEnergy';
import NotFound from '../pages/notFound';

function App() {
  return (
    <Router>
      <Routes>
        {/* Every page renders inside the shared header/sidebar/footer shell */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/devices" element={<DeviceManagement />} />
          <Route path="/add-device" element={<AddDevice />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<Help />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/troubleshooting" element={<Troubleshooting />} />
          <Route path="/reports" element={<ReportsAndAnalytics />} />
          <Route path="/reports/logistics" element={<ReportsLogistics />} />
          <Route path="/reports/energy" element={<ReportsEnergy />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
