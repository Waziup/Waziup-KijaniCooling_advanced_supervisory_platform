import React, { useState } from 'react';
import { Cog, Bell, Users, ChevronDown, ArrowRight } from 'lucide-react';

// 1. Import Layout Components
import Sidebar from "../src/components/layout/sidebar";
import Header from "../src/components/layout/header";
import Footer from "../src/components/layout/footer";

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
    <div className="flex flex-col h-screen font-sans text-gray-800 bg-[#E5E7EB] overflow-hidden">
      {/* Imported Header */}
      <header className="h-16 min-h-[64px] max-h-[64px] w-full flex-shrink-0 z-10 bg-white border-b border-gray-200">
        <Header title="Settings" />
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Pass activePage="Settings" prop to highlight the active tab */}
        <Sidebar activePage="Settings" />

        {/* Main Content Area - CHANGED pb-24 to pb-12 to remove unnecessary empty space */}
        <main className="flex-1 pt-6 pb-12 pr-12 pl-12 overflow-y-auto flex flex-col ml-[265px]">
          
          <div className="flex flex-col gap-6 w-full flex-1">
            
            {/* General Preferences Section */}
            <div className="bg-[#FFFFFF] border border-gray-200 rounded-xl p-6 shadow-sm w-full">
              <div className="flex items-center gap-2 mb-1">
                <Cog size={28} className="text-gray-900" />
                <h2 className="text-[24px] font-bold text-gray-900 m-0 leading-none">General Preferences</h2>
              </div>
              <p className="text-gray-600 mb-5 ml-9 text-[16px]">
                Customize your device viewing experience and application behavior.
              </p>
              
              {/* Default Device View */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2.5 border-b border-gray-100 last:border-0">
                <div className="flex flex-col mb-2 sm:mb-0">
                  <span className="text-[18px] font-bold text-gray-800 mb-0.5 leading-tight">Default Device View</span>
                  <span className="text-gray-500 text-[16px]">Choose the default view mode for device lists.</span>
                </div>
                <div className="relative inline-block">
                  {/* CHANGED: Replaced bg-[#F8D300] with bg-white border-2 border-[#F8D300] */}
                  <select 
                    value={deviceView}
                    onChange={(e) => setDeviceView(e.target.value)}
                    className="appearance-none bg-white border-2 border-[#F8D300] hover:bg-gray-50 transition-all rounded pl-4 pr-10 py-1.5 text-[16px] text-gray-900 font-bold shadow-sm cursor-pointer outline-none w-full sm:w-auto"
                  >
                    <option value="Table View">Table View</option>
                    <option value="List View">List View</option>
                    <option value="Chart View">Chart View</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-900">
                    <ChevronDown size={18} />
                  </div>
                </div>
              </div>

              {/* Data Refresh Interval */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2.5 border-b border-gray-100 last:border-0">
                <div className="flex flex-col mb-2 sm:mb-0">
                  <span className="text-[18px] font-bold text-gray-800 mb-0.5 leading-tight">Data Refresh Interval</span>
                  <span className="text-gray-500 text-[16px]">Set how often device data is refreshed.</span>
                </div>
                <div className="relative inline-block">
                  {/* CHANGED: Replaced bg-[#F8D300] with bg-white border-2 border-[#F8D300] */}
                  <select 
                    value={refreshInterval}
                    onChange={(e) => setRefreshInterval(e.target.value)}
                    className="appearance-none bg-white border-2 border-[#F8D300] hover:bg-gray-50 transition-all rounded pl-4 pr-10 py-1.5 text-[16px] text-gray-900 font-bold shadow-sm cursor-pointer outline-none w-full sm:w-auto"
                  >
                    <option value="30 seconds">30 seconds</option>
                    <option value="1 minute">1 minute</option>
                    <option value="5 minutes">5 minutes</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-900">
                    <ChevronDown size={18} />
                  </div>
                </div>
              </div>

              {/* Theme Preference */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2.5 border-b border-gray-100 last:border-0">
                <div className="flex flex-col mb-2 sm:mb-0">
                  <span className="text-[18px] font-bold text-gray-800 mb-0.5 leading-tight">Theme Preference</span>
                  <span className="text-gray-500 text-[16px]">Switch between light and dark modes.</span>
                </div>
                <div className="relative inline-block">
                  {/* CHANGED: Replaced bg-[#F8D300] with bg-white border-2 border-[#F8D300] */}
                  <select 
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="appearance-none bg-white border-2 border-[#F8D300] hover:bg-gray-50 transition-all rounded pl-4 pr-10 py-1.5 text-[16px] text-gray-900 font-bold shadow-sm cursor-pointer outline-none w-full sm:w-auto"
                  >
                    <option value="Light">Light</option>
                    <option value="Dark">Dark</option>
                    <option value="System">System</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-900">
                    <ChevronDown size={18} />
                  </div>
                </div>
              </div>
            </div>

            {/* Notification Settings Section */}
            <div className="bg-[#FFFFFF] border border-gray-200 rounded-xl p-6 shadow-sm w-full">
              <div className="flex items-center gap-2 mb-1">
                <Bell size={28} className="text-gray-900" />
                <h2 className="text-[24px] font-bold text-gray-900 m-0 leading-none">Notification Settings</h2>
              </div>
              <p className="text-gray-600 mb-5 ml-9 text-[16px]">
                Manage how and when you receive alerts and updates.
              </p>
              
              <div className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0">
                <div className="flex flex-col pr-4">
                  <span className="text-[18px] font-bold text-gray-800 mb-0.5 leading-tight">Receive Critical Alerts</span>
                  <span className="text-gray-500 text-[16px]">Get immediate notifications for critical device issues.</span>
                </div>
                <button 
                  onClick={() => handleToggle('criticalAlerts')}
                  className={`relative inline-flex h-7 w-14 flex-shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${toggleStates.criticalAlerts ? 'bg-[#F8D300]' : 'bg-gray-300'}`}
                >
                  <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${toggleStates.criticalAlerts ? 'translate-x-7' : 'translate-x-1'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0">
                <div className="flex flex-col pr-4">
                  <span className="text-[18px] font-bold text-gray-800 mb-0.5 leading-tight">Email Notifications</span>
                  <span className="text-gray-500 text-[16px]">Receive daily or weekly summaries.</span>
                </div>
                <button 
                  onClick={() => handleToggle('emailNotifications')}
                  className={`relative inline-flex h-7 w-14 flex-shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${toggleStates.emailNotifications ? 'bg-[#F8D300]' : 'bg-gray-300'}`}
                >
                  <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${toggleStates.emailNotifications ? 'translate-x-7' : 'translate-x-1'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0">
                <div className="flex flex-col pr-4">
                  <span className="text-[18px] font-bold text-gray-800 mb-0.5 leading-tight">Play Sound Alerts</span>
                  <span className="text-gray-500 text-[16px]">Enable audible alerts for new notifications.</span>
                </div>
                <button 
                  onClick={() => handleToggle('playSoundAlerts')}
                  className={`relative inline-flex h-7 w-14 flex-shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${toggleStates.playSoundAlerts ? 'bg-[#F8D300]' : 'bg-gray-300'}`}
                >
                  <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${toggleStates.playSoundAlerts ? 'translate-x-7' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>

            {/* Access & Permissions Section */}
            <div className="bg-[#FFFFFF] border border-gray-200 rounded-xl p-6 shadow-sm w-full">
              <div className="flex items-center gap-2 mb-1">
                <Users size={28} className="text-gray-900" />
                <h2 className="text-[24px] font-bold text-gray-900 m-0 leading-none">Access & Permissions</h2>
              </div>
              <p className="text-gray-600 mb-5 ml-9 text-[16px]">
                Control data sharing and manage user access.
              </p>
              
              <div className="flex items-center justify-between mb-5">
                <div className="flex flex-col pr-4">
                  <span className="text-[18px] font-bold text-gray-800 mb-0.5 leading-tight">Share Data with Support</span>
                  <span className="text-gray-500 text-[16px]">Allow support team temporary access for troubleshooting.</span>
                </div>
                <button 
                  onClick={() => handleToggle('shareData')}
                  className={`relative inline-flex h-7 w-14 flex-shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${toggleStates.shareData ? 'bg-[#F8D300]' : 'bg-gray-300'}`}
                >
                  <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${toggleStates.shareData ? 'translate-x-7' : 'translate-x-1'}`} />
                </button>
              </div>

              <button className="bg-gray-50 border border-gray-300 rounded-lg px-5 py-3 w-full text-left flex items-center gap-3 cursor-pointer text-gray-900 hover:bg-gray-100 transition-colors shadow-sm">
                <Users size={22} className="text-gray-600" />
                <span className="flex-1 text-[18px] font-bold">Manage User Roles</span>
                <ArrowRight size={22} className="text-gray-500" />
              </button>
            </div>

          </div>
        </main>

        {/* Fixed Footer */}
        <div className="fixed bottom-0 left-[265px] right-0 z-30 bg-[#8bc389] border-t border-green-600 h-8 flex items-center justify-center">
          <span className="text-sm text-gray-800 font-medium">© 2026 Device Manager. All rights reserved.</span>
        </div>

      </div>
    </div>
  );
}

export default SettingsPage;
