import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom"; // Ensure react-router-dom is installed
import Sidebar from "../src/components/layout/Sidebar";
import Header from "../src/components/layout/Header";
import Footer from "../src/components/layout/Footer";
import { SENSOR_CONFIG } from "../src/utils/sensorMapping";
import DeleteConfirm from "../src/components/devices/DeleteConfirm";

// Helper component for the Status Badge colors
const StatusBadge = ({ status }) => {
  let colorClasses = "bg-gray-100 text-gray-600"; // Default (Offline)
  if (status === "Active") colorClasses = "bg-indigo-50 text-indigo-600";
  else if (status === "Inactive") colorClasses = "bg-red-50 text-red-500";

  return (
    <span className={`px-2.5 py-1 rounded-full text-[12px] font-bold ${colorClasses}`}>
      {status}
    </span>
  );
};

const DeviceManagement = () => {
  const [devices, setDevices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modal State for Deletion
  const [deviceToDelete, setDeviceToDelete] = useState(null);
  
  // Popover & Filter States
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("All");
  const [sortOrder, setSortOrder] = useState("none"); // none, asc, desc
  const filterRef = useRef(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Transform SENSOR_CONFIG into table rows
  useEffect(() => {
    const tableData = Object.entries(SENSOR_CONFIG).map(([hexId, config], index) => {
      const idSuffix = hexId.slice(-3);
      const keyStr = config.key || "";
      
      const getDeviceDetails = (key) => {
        const lowerKey = key.toLowerCase();
        
        // CC and CH are circulator pumps
        if (lowerKey.startsWith('cc') || lowerKey.startsWith('ch') || lowerKey.startsWith('vc')) {
          return { name: `Circulator Pump (${key})`, type: 'Pump' };
        }
        if (lowerKey.startsWith('si')) {
          return { name: `Pump/Motor (${key})`, type: 'Pump' };
        }
        if (lowerKey.startsWith('al')) {
          return { name: `Alarm Indicator (${key})`, type: 'Alarm' };
        }
        if (lowerKey.startsWith('vg')) {
          return { name: `Gas Valve (${key})`, type: 'Valve' };
        }
        // T starts are Temperature Sensors
        if (lowerKey.startsWith('t')) {
          return { name: `Temperature Sensor (${key})`, type: 'Sensor' };
        }
        // P starts are Pressure Sensors
        if (lowerKey.startsWith('p')) {
          return { name: `Pressure Sensor (${key})`, type: 'Sensor' };
        }
        if (lowerKey.startsWith('fit')) return { name: `Flowrate Sensor (${key})`, type: 'Sensor' };
        if (lowerKey.startsWith('lit')) return { name: `Level Sensor (${key})`, type: 'Sensor' };
        
        return { name: `Device Component (${key})`, type: 'Device' };
      };

      const details = getDeviceDetails(keyStr);
      const statusList = ["Active", "Active", "Inactive", "Active", "Offline"];
      
      return {
        id: hexId,
        deviceId: `DEV-${idSuffix}`,
        name: details.name,
        type: details.type,
        location: 'KYEYO Farm',
        status: statusList[index % statusList.length],
        installDate: `2026-0${(index % 9) + 1}-15` 
      };
    });

    setDevices(tableData);
  }, []);

  // Handle actual deletion
  const handleDeleteConfirm = () => {
    if (deviceToDelete) {
      setDevices(prevDevices => prevDevices.filter(d => d.id !== deviceToDelete.id));
      setDeviceToDelete(null); // Close the modal
    }
  };

  // MASTER FILTERING & SORTING
  const filteredDevices = devices
    .filter(device => {
      const matchesSearch = device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            device.deviceId.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === "All" || device.type === selectedType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") return a.name.localeCompare(b.name);
      if (sortOrder === "desc") return b.name.localeCompare(a.name);
      return 0;
    });

  // Reset pagination on filter change
  useEffect(() => { setCurrentPage(1); }, [searchQuery, selectedType, sortOrder]);

  const totalPages = Math.ceil(filteredDevices.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDevices = filteredDevices.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="flex flex-col h-screen overflow-hidden text-gray-900 font-sans">
      <header className="h-16 min-h-[64px] max-h-[64px] w-full flex-shrink-0 border-b border-gray-200 z-10">
        <Header title="Device Management" />
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-[256px] flex-shrink-0 bg-white border-r border-gray-200 overflow-y-auto">
          <Sidebar activePage="Device Management" />
        </aside>
        
        <main className="flex-1 overflow-y-auto bg-[#E5E7EB] pt-0 px-8 pb-8 relative">
          
          <div className="w-full">
            <h2 className="text-[32px] font-bold text-gray-900 mt-0 mb-1 tracking-wide">Device Management</h2>
            <p className="text-gray-600 mb-6 text-[15px]">Manage and monitor all registered devices within your infrastructure.</p>

            {/* Action Bar */}
            <div className="flex w-full justify-between items-center gap-4 mb-4">
              
              {/* Search bar */}
              <div className="relative flex-1 bg-white rounded-md shadow-sm">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </span>
                <input
                  type="text" 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search devices by name, ID, or type..."
                  className="w-full pl-10 pr-28 py-2 border border-[#7CBE83] rounded-md outline-none focus:ring-1 focus:ring-[#7CBE83] bg-transparent text-[15px]"
                />
                {searchQuery.trim() !== "" && (
                  <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-[12px] font-bold bg-[#F8D300] text-black shadow-sm">
                      {filteredDevices.length} devices found
                    </span>
                  </div>
                )}
              </div>

              {/* Right Group: Filters and Add Device */}
              <div className="flex items-center gap-3 flex-shrink-0">
                
                {/* Filter Popover Container */}
                <div className="relative" ref={filterRef}>
                  <button 
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex items-center gap-2 px-5 py-2 bg-[#F8D300] hover:bg-yellow-400 text-black text-[14px] font-bold rounded-md shadow-sm transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
                    Filters
                  </button>

                  {isFilterOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-50 py-2 origin-top-right">
                      <div className="px-4 py-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Device Type</div>
                      {['All', 'Sensor', 'Pump', 'Valve', 'Alarm'].map((type) => (
                        <button 
                          key={type} onClick={() => { setSelectedType(type); setIsFilterOpen(false); }}
                          className={`w-full text-left px-4 py-2 text-[14px] hover:bg-gray-50 flex items-center justify-between ${selectedType === type ? 'text-indigo-600 font-semibold' : 'text-gray-700'}`}
                        >
                          {type}s {selectedType === type && <div className="w-2 h-2 bg-[#F8D300] rounded-full"></div>}
                        </button>
                      ))}
                      <div className="my-1 border-t border-gray-100"></div>
                      <div className="px-4 py-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Sort Order</div>
                      <button onClick={() => { setSortOrder('asc'); setIsFilterOpen(false); }} className={`w-full text-left px-4 py-2 text-[14px] hover:bg-gray-50 flex items-center justify-between ${sortOrder === 'asc' ? 'text-indigo-600 font-semibold' : 'text-gray-700'}`}>
                        Name (A-Z) {sortOrder === 'asc' && <div className="w-2 h-2 bg-[#F8D300] rounded-full"></div>}
                      </button>
                      <button onClick={() => { setSortOrder('desc'); setIsFilterOpen(false); }} className={`w-full text-left px-4 py-2 text-[14px] hover:bg-gray-50 flex items-center justify-between ${sortOrder === 'desc' ? 'text-indigo-600 font-semibold' : 'text-gray-700'}`}>
                        Name (Z-A) {sortOrder === 'desc' && <div className="w-2 h-2 bg-[#F8D300] rounded-full"></div>}
                      </button>
                    </div>
                  )}
                </div>

                {/* Add Device Button - Connected to React Router */}
                <Link to="/add-device" className="flex items-center gap-2 px-5 py-2 bg-[#F8D300] hover:bg-yellow-400 text-black text-[14px] font-bold rounded-md shadow-sm transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Add Device
                </Link>
                
              </div>
            </div>

            {/* Table Container */}
            <div className="w-full bg-white rounded-xl border border-gray-300 shadow-sm overflow-hidden flex flex-col">
              <div className="overflow-x-auto min-h-[400px]">
                <table className="w-full text-left border-collapse table-fixed">
                  <thead className="bg-gray-50/50">
                    <tr className="text-gray-900 font-['Inter'] font-medium text-[20px] border-b border-gray-300">
                      <th className="py-3 px-4 pl-6 w-[28%]">Device Name</th>
                      <th className="py-3 px-2 w-[12%]">Device ID</th>
                      <th className="py-3 px-2 w-[12%]">Type</th>
                      <th className="py-3 px-2 w-[15%]">Location</th>
                      <th className="py-3 px-2 w-[10%]">Status</th>
                      <th className="py-3 px-2 w-[12%]">Installation Date</th>
                      <th className="py-3 px-4 pr-6 w-[11%] text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentDevices.length > 0 ? currentDevices.map((device, index) => (
                      <tr key={device.id} className={`hover:bg-gray-50 transition-colors ${index !== currentDevices.length - 1 ? 'border-b border-gray-100' : ''}`}>
                        <td className="py-3 px-4 pl-6 font-medium text-[#7A71E6] text-[16px] truncate pr-4">{device.name}</td>
                        <td className="py-3 px-2 text-gray-700 text-[16px] truncate">{device.deviceId}</td>
                        <td className="py-3 px-2 text-gray-700 text-[16px] truncate">{device.type}</td>
                        <td className="py-3 px-2 text-gray-700 text-[16px] truncate pr-2">{device.location}</td>
                        <td className="py-3 px-2"><StatusBadge status={device.status} /></td>
                        <td className="py-3 px-2 text-gray-700 text-[16px] truncate">{device.installDate}</td>
                        <td className="py-3 px-4 pr-6">
                          <div className="flex items-center justify-center gap-[16px]">
                            <button className="p-1.5 hover:bg-indigo-50 rounded transition-colors group">
                              <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                            </button>
                            <button 
                              onClick={() => setDeviceToDelete(device)}
                              className="p-1.5 hover:bg-red-50 rounded transition-colors group"
                            >
                              <svg className="w-4 h-4 text-gray-600 group-hover:text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="7" className="py-8 text-center text-gray-500 text-[16px]">No devices found matching your search.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {filteredDevices.length > itemsPerPage && (
                <div className="px-6 py-3 border-t border-gray-200 bg-gray-50/50 flex items-center justify-between">
                  <span className="text-[13px] text-gray-600">Showing <span className="font-semibold text-gray-900">{indexOfFirstItem + 1}</span> to <span className="font-semibold text-gray-900">{Math.min(indexOfLastItem, filteredDevices.length)}</span> of <span className="font-semibold text-gray-900">{filteredDevices.length}</span> devices</span>
                  
                  <div className="flex items-center border border-blue-400 rounded-sm bg-white overflow-hidden shadow-sm">
                    <button 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                      disabled={currentPage === 1} 
                      className={`px-3 py-1.5 flex items-center justify-center transition-colors ${currentPage === 1 ? 'opacity-50 cursor-not-allowed bg-gray-50 text-gray-400' : 'text-blue-500 hover:bg-blue-50 cursor-pointer'}`}
                      aria-label="Previous page"
                    >
                      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    
                    <div className="px-4 py-1.5 border-x border-blue-400 text-[14px] font-semibold text-gray-700 flex items-center justify-center min-w-[40px]">
                      {currentPage}
                    </div>

                    <button 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                      disabled={currentPage === totalPages} 
                      className={`px-3 py-1.5 flex items-center justify-center transition-colors ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed bg-gray-50 text-gray-400' : 'text-blue-500 hover:bg-blue-50 cursor-pointer'}`}
                      aria-label="Next page"
                    >
                      <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <footer className="flex-shrink-0"><Footer /></footer>

      <DeleteConfirm 
        device={deviceToDelete}
        onCancel={() => setDeviceToDelete(null)}
        onConfirm={handleDeleteConfirm}
      />
      
    </div>
  );
};

export default DeviceManagement;