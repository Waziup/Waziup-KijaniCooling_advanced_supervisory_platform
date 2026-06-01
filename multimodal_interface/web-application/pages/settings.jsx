import React, { useState } from 'react';
import { Cog, Bell, Users, ChevronDown, ArrowRight } from 'lucide-react';

// 1. Import Layout Components
import Sidebar from "../src/components/layout/Sidebar";
import Header from "../src/components/layout/Header";
import Footer from "../src/components/layout/Footer";

function SettingsPage() {
  // State for toggles
  const [toggleStates, setToggleStates] = useState({
    criticalAlerts: true,
    emailNotifications: true,
    playSoundAlerts: false,
    shareData: false,
  });

  // State for dropdowns
  const [deviceView, setDeviceView] = useState('Table View');
  const [refreshInterval, setRefreshInterval] = useState('30 seconds');
  const [theme, setTheme] = useState('Dark');

  const handleToggle = (name) => {
    setToggleStates((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="flex flex-col h-screen font-sans text-gray-800 bg-[#BDC1CA] overflow-hidden">
      {/* Imported Header */}
      <Header title="Settings" />

      <div className="flex flex-1 overflow-hidden relative">
        {/* Pass activePage="Settings" prop to highlight the active tab */}
        <Sidebar activePage="Settings" />

        <main className="flex-1 p-4 md:p-6 overflow-y-auto flex flex-col ml-[265px] pb-24">
          
          <div className="grid grid-cols-1 gap-4 flex-1">
            
            {/* General Preferences Section */}
            <div className="bg-[#FFFFFF] border border-gray-300 rounded-md p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                {/* CHANGED: text-gray-700 to text-black */}
                <Cog size={24} className="text-black" />
                {/* CHANGED: Added text-black to match dashboard styling */}
                <h2 className="text-lg font-semibold text-black m-0">General Preferences</h2>
              </div>
              <p className="text-gray-500 mb-12 ml-8 text-sm">
                Customize your device viewing experience and application behavior.
              </p>
              
              {/* Default Device View */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div className="flex flex-col mb-3 sm:mb-0">
                  <span className="font-semibold text-gray-800 mb-1">Default Device View</span>
                  <span className="text-gray-500 text-sm">Choose the default view mode for device lists.</span>
                </div>
                <div className="relative inline-block">
                  <select 
                    value={deviceView}
                    onChange={(e) => setDeviceView(e.target.value)}
                    className="appearance-none bg-[#F8D300] hover:brightness-95 transition-all rounded pl-4 pr-10 py-2 text-black font-semibold shadow-sm cursor-pointer outline-none w-full sm:w-auto"
                  >
                    <option value="Table View">Table View</option>
                    <option value="List View">List View</option>
                    <option value="Chart View">Chart View</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-black">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>

              {/* Data Refresh Interval */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div className="flex flex-col mb-3 sm:mb-0">
                  <span className="font-semibold text-gray-800 mb-1">Data Refresh Interval</span>
                  <span className="text-gray-500 text-sm">Set how often device data is refreshed.</span>
                </div>
                <div className="relative inline-block">
                  <select 
                    value={refreshInterval}
                    onChange={(e) => setRefreshInterval(e.target.value)}
                    className="appearance-none bg-[#F8D300] hover:brightness-95 transition-all rounded pl-4 pr-10 py-2 text-black font-semibold shadow-sm cursor-pointer outline-none w-full sm:w-auto"
                  >
                    <option value="30 seconds">30 seconds</option>
                    <option value="1 minute">1 minute</option>
                    <option value="5 minutes">5 minutes</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-black">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>

              {/* Theme Preference */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div className="flex flex-col mb-3 sm:mb-0">
                  <span className="font-semibold text-gray-800 mb-1">Theme Preference</span>
                  <span className="text-gray-500 text-sm">Switch between light and dark modes.</span>
                </div>
                <div className="relative inline-block">
                  <select 
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="appearance-none bg-[#F8D300] hover:brightness-95 transition-all rounded pl-4 pr-10 py-2 text-black font-semibold shadow-sm cursor-pointer outline-none w-full sm:w-auto"
                  >
                    <option value="Light">Light</option>
                    <option value="Dark">Dark</option>
                    <option value="System">System</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-black">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>
            </div>

            {/* Notification Settings Section */}
            <div className="bg-[#FFFFFF] border border-gray-300 rounded-md p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                {/* CHANGED: text-gray-700 to text-black */}
                <Bell size={24} className="text-black" />
                {/* CHANGED: Added text-black to match dashboard styling */}
                <h2 className="text-lg font-semibold text-black m-0">Notification Settings</h2>
              </div>
              <p className="text-gray-500 mb-12 ml-8 text-sm">
                Manage how and when you receive alerts and updates.
              </p>
              
              <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div className="flex flex-col pr-4">
                  <span className="font-semibold text-gray-800 mb-1">Receive Critical Alerts</span>
                  <span className="text-gray-500 text-sm">Get immediate notifications for critical device issues.</span>
                </div>
                <button 
                  onClick={() => handleToggle('criticalAlerts')}
                  className={`relative inline-flex h-6 w-12 flex-shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${toggleStates.criticalAlerts ? 'bg-[#F8D300]' : 'bg-gray-300'}`}
                >
                  <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${toggleStates.criticalAlerts ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div className="flex flex-col pr-4">
                  <span className="font-semibold text-gray-800 mb-1">Email Notifications</span>
                  <span className="text-gray-500 text-sm">Receive daily or weekly summaries.</span>
                </div>
                <button 
                  onClick={() => handleToggle('emailNotifications')}
                  className={`relative inline-flex h-6 w-12 flex-shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${toggleStates.emailNotifications ? 'bg-[#F8D300]' : 'bg-gray-300'}`}
                >
                  <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${toggleStates.emailNotifications ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div className="flex flex-col pr-4">
                  <span className="font-semibold text-gray-800 mb-1">Play Sound Alerts</span>
                  <span className="text-gray-500 text-sm">Enable audible alerts for new notifications.</span>
                </div>
                <button 
                  onClick={() => handleToggle('playSoundAlerts')}
                  className={`relative inline-flex h-6 w-12 flex-shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${toggleStates.playSoundAlerts ? 'bg-[#F8D300]' : 'bg-gray-300'}`}
                >
                  <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${toggleStates.playSoundAlerts ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>

            {/* Access & Permissions Section */}
            <div className="bg-[#FFFFFF] border border-gray-300 rounded-md p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                {/* CHANGED: text-gray-700 to text-black */}
                <Users size={24} className="text-black" />
                {/* CHANGED: Added text-black to match dashboard styling */}
                <h2 className="text-lg font-semibold text-black m-0">Access & Permissions</h2>
              </div>
              <p className="text-gray-500 mb-12 ml-8 text-sm">
                Control data sharing and manage user access.
              </p>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex flex-col pr-4">
                  <span className="font-semibold text-gray-800 mb-1">Share Data with Support</span>
                  <span className="text-gray-500 text-sm">Allow support team temporary access for troubleshooting.</span>
                </div>
                <button 
                  onClick={() => handleToggle('shareData')}
                  className={`relative inline-flex h-6 w-12 flex-shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${toggleStates.shareData ? 'bg-[#F8D300]' : 'bg-gray-300'}`}
                >
                  <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${toggleStates.shareData ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>

              <button className="bg-gray-50 border border-gray-300 rounded-md px-5 py-3 w-full text-left flex items-center gap-3 cursor-pointer text-gray-800 font-medium hover:bg-gray-100 transition-colors shadow-sm">
                <Users size={20} className="text-gray-600" />
                <span className="flex-1">Manage User Roles</span>
                <ArrowRight size={20} className="text-gray-500" />
              </button>
            </div>

          </div>
        </main>

        {/* Fixed Footer */}
        <div className="fixed bottom-0 left-[265px] right-0 z-30 bg-white border-t border-gray-200">
          <Footer />
        </div>

      </div>
    </div>
  );
}

export default SettingsPage;