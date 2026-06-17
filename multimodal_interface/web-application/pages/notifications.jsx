import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../src/components/layout/Sidebar";
import Header from "../src/components/layout/Header";
import Footer from "../src/components/layout/Footer";

export default function Notifications() {
  const [notifications] = useState([
    { id: "A001", device: "D001", timestamp: "2023-10-26 10:30:00", severity: "Critical" },
    { id: "A002", device: "D005", timestamp: "2023-10-26 09:45:15", severity: "Critical" },
    { id: "A003", device: "D012", timestamp: "2023-10-26 08:20:30", severity: "Medium" },
    { id: "A004", device: "D003", timestamp: "2023-10-25 18:05:00", severity: "Low" },
    { id: "A005", device: "D007", timestamp: "2023-10-25 15:10:40", severity: "Critical" },
    { id: "A006", device: "D020", timestamp: "2023-10-25 12:00:00", severity: "Low" },
    { id: "A007", device: "D009", timestamp: "2023-10-25 11:30:00", severity: "Medium" },
    { id: "A008", device: "D015", timestamp: "2023-10-24 23:55:00", severity: "Low" },
    { id: "A009", device: "D002", timestamp: "2023-10-24 19:10:10", severity: "Critical" },
    { id: "A010", device: "D018", timestamp: "2023-10-24 14:00:00", severity: "Critical" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isSeverityOpen, setIsSeverityOpen] = useState(false);
  const [selectedSeverity, setSelectedSeverity] = useState("All");
  const [isTimestampOpen, setIsTimestampOpen] = useState(false);
  const [selectedTimestamp, setSelectedTimestamp] = useState("All Time");

  const severityRef = useRef(null);
  const timestampRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (severityRef.current && !severityRef.current.contains(event.target)) {
        setIsSeverityOpen(false);
      }
      if (timestampRef.current && !timestampRef.current.contains(event.target)) {
        setIsTimestampOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredNotifications = notifications.filter(alert => {
    const matchesSearch = 
      alert.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      alert.device.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = selectedSeverity === "All" || alert.severity === selectedSeverity;
    
    return matchesSearch && matchesSeverity;
  });

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case "Critical":
        return "bg-red-50 text-red-500 font-bold";
      case "Medium":
        return "bg-yellow-50 text-yellow-600 font-bold";
      case "Low":
        return "bg-green-50 text-green-500 font-bold";
      default:
        return "bg-gray-100 text-gray-600 font-bold";
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden text-gray-900 font-sans">
      <header className="h-16 min-h-[64px] max-h-[64px] w-full flex-shrink-0 border-b border-gray-200 z-10">
        <Header title="Notifications" />
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 flex-shrink-0 z-20">
          <Sidebar activePage="Notifications" />
        </aside>

        <main className="flex-1 flex flex-col overflow-hidden bg-[#E5E7EB] pt-6 px-8 pb-1 relative z-10">
          
          {/* Action Bar */}
          <div className="flex w-full justify-between items-center gap-4 mb-4 flex-shrink-0">
            
            <div className="relative flex-1 bg-white rounded-md shadow-sm border border-gray-300 h-11">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </span>
              <input
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search alerts by ID or device..."
                className="w-full h-full pl-10 pr-4 rounded-md outline-none focus:ring-1 focus:ring-green-400 bg-transparent text-[15px]"
              />
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              {/* Severity Dropdown */}
              <div className="relative" ref={severityRef}>
                <button 
                  onClick={() => { setIsSeverityOpen(!isSeverityOpen); setIsTimestampOpen(false); }}
                  className="flex items-center gap-2 px-5 h-11 bg-[#F8D300] hover:bg-yellow-400 text-black text-[14px] font-bold rounded-md shadow-sm transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 00-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
                  Severity{selectedSeverity !== "All" && `: ${selectedSeverity}`}
                </button>
                {isSeverityOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-50 py-2 origin-top-right">
                    {['All', 'Critical', 'Medium', 'Low'].map((level) => (
                      <button key={level} onClick={() => { setSelectedSeverity(level); setIsSeverityOpen(false); }} className={`w-full text-left px-4 py-2 text-[14px] hover:bg-gray-50 flex items-center justify-between ${selectedSeverity === level ? 'text-indigo-600 font-semibold' : 'text-gray-700'}`}>
                        {level} {selectedSeverity === level && <div className="w-2 h-2 bg-[#F8D300] rounded-full"></div>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Timestamp Dropdown */}
              <div className="relative" ref={timestampRef}>
                <button 
                  onClick={() => { setIsTimestampOpen(!isTimestampOpen); setIsSeverityOpen(false); }}
                  className="flex items-center gap-2 px-5 h-11 bg-[#F8D300] hover:bg-yellow-400 text-black text-[14px] font-bold rounded-md shadow-sm transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  Timestamp{selectedTimestamp !== "All Time" && `: ${selectedTimestamp}`}
                </button>
                {isTimestampOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-50 py-2 origin-top-right">
                    {['All Time', 'Last 24 Hours', 'Last 7 Days', 'Last 30 Days'].map((time) => (
                      <button key={time} onClick={() => { setSelectedTimestamp(time); setIsTimestampOpen(false); }} className={`w-full text-left px-4 py-2 text-[14px] hover:bg-gray-50 flex items-center justify-between ${selectedTimestamp === time ? 'text-indigo-600 font-semibold' : 'text-gray-700'}`}>
                        {time} {selectedTimestamp === time && <div className="w-2 h-2 bg-[#F8D300] rounded-full"></div>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div> 

          {/* Table Container */}
          <div className="w-full bg-white rounded-xl border border-gray-300 shadow-sm overflow-hidden flex flex-col flex-1">
            
            <div className="overflow-auto flex-1">
              {/* ADDED h-full to the table element to evenly distribute vertical space to the rows */}
              <table className="w-full h-full text-left border-collapse table-fixed">
                <thead className="bg-white border-b border-gray-200 sticky top-0 z-10">
                  <tr className="font-bold text-gray-900 text-[16px]">
                    <th className="py-4 px-4 pl-6 w-[20%]">Alert ID</th>
                    <th className="py-4 px-2 w-[20%]">Device ID</th>
                    <th className="py-4 px-2 w-[25%]">Timestamp</th>
                    <th className="py-4 px-2 w-[20%] text-center">Severity</th>
                    <th className="py-4 px-4 pr-6 w-[15%] text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredNotifications.length > 0 ? filteredNotifications.map((alert, index) => (
                    <tr key={index} className={`hover:bg-gray-50 transition-colors ${index !== filteredNotifications.length - 1 ? 'border-b border-gray-100' : ''}`}>
                      {/* Changed py-3 to py-4 to increase baseline breathing room in the columns */}
                      <td className="py-4 px-4 pl-6 text-[#7A71E6] font-medium text-[15px] truncate">{alert.id}</td>
                      <td className="py-4 px-2 text-gray-700 text-[15px] truncate">{alert.device}</td>
                      <td className="py-4 px-2 text-gray-700 text-[15px] truncate">{alert.timestamp}</td>
                      <td className="py-4 px-2 text-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-[12px] ${getSeverityBadge(alert.severity)}`}>
                          {alert.severity}
                        </span>
                      </td>
                      <td className="py-4 px-4 pr-6">
                        <div className="flex items-center justify-center gap-3">
                          <button className="p-1 hover:bg-indigo-50 rounded transition-colors group">
                            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-gray-500 text-[15px]">
                        No alerts found matching "{searchQuery}" or selected severity.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            {filteredNotifications.length > 0 && (
              <div className="px-6 py-3 border-t border-gray-200 bg-white flex items-center justify-between flex-shrink-0">
                <span className="text-[13px] text-gray-600">
                  Showing <strong className="font-semibold text-gray-900">1</strong> to <strong className="font-semibold text-gray-900">{Math.min(10, filteredNotifications.length)}</strong> of <strong className="font-semibold text-gray-900">{notifications.length}</strong> alerts
                </span>
                
                <div className="flex items-center border border-blue-400 rounded-sm bg-white overflow-hidden shadow-sm">
                  <button className="px-3 py-1.5 flex items-center justify-center transition-colors opacity-50 cursor-not-allowed bg-gray-50 text-gray-400">
                    <svg className="w-[16px] h-[16px]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  
                  <div className="px-4 py-1.5 border-x border-blue-400 text-[14px] font-semibold text-gray-700 flex items-center justify-center min-w-[40px]">
                    1
                  </div>

                  <button className="px-3 py-1.5 flex items-center justify-center transition-colors text-blue-500 hover:bg-blue-50 cursor-pointer">
                    <svg className="w-[16px] h-[16px]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>

      <footer className="flex-shrink-0"><Footer /></footer>
    </div>
  );
}