import React, { useState } from "react";
import Sidebar from "../src/components/layout/sidebar";
import Header from "../src/components/layout/header";
import Footer from "../src/components/layout/footer";

export default function Troubleshooting() {
  const [issues] = useState([
    { id: "ALERT-001", description: "Low biodigester pressure", action: "Check substrate level, temperature, pH by sampling substrat", owner: "John Doe", status: "Pending" },
    { id: "ALERT-002", description: "High chiller temperature", action: "Inspect coolant levels and compressor function", owner: "Jane Smith", status: "Investigating" },
    { id: "ALERT-003", description: "Pump efficiency drop", action: "Check for clogs in intake lines. Inspect motor performance", owner: "Mike Johnson", status: "Pending" },
    { id: "ALERT-004", description: "Low gas storage", action: "Check biomass feedrate", owner: "Sarah Davis", status: "Resolved" },
    { id: "ALERT-005", description: "Data Sync Error", action: "Verify connectivity and API keys", owner: "John Doe", status: "Investigating" },
    { id: "ALERT-006", description: "Low Battery Warning", action: "Replace or recharge battery", owner: "Jane Smith", status: "Resolved" },
    { id: "ALERT-007", description: "Temperature Exceeded", action: "Check the biodigestor activity", owner: "John Doe", status: "Pending" },
    { id: "ALERT-008", description: "Communication Timeout", action: "Check gateway connection and device status", owner: "Sarah Davis", status: "Investigating" },
  ]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return "bg-red-50 text-red-500 font-medium";
      case "Investigating":
        return "bg-orange-50 text-orange-500 font-medium";
      case "Resolved":
        return "bg-green-50 text-green-500 font-medium";
      default:
        return "bg-gray-100 text-gray-600 font-medium";
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden text-gray-900 font-sans">
      {/* Global Header */}
      <header className="h-16 min-h-[64px] max-h-[64px] w-full flex-shrink-0 border-b border-gray-200 z-10">
        <Header title="Troubleshooting and Diagnostics" />
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0 z-20">
          <Sidebar activePage="Troubleshooting" />
        </aside>

        {/* Main Scrolling Area */}
        <main className="flex-1 overflow-y-auto bg-[#E5E7EB] pt-6 px-8 pb-8 relative z-10">
          
          <div className="w-full flex flex-col">
            
            {/* Troubleshooting Guides Section */}
            <div className="mb-8 w-full">
              {/* Dashboard equivalent H2 */}
              <h2 className="text-[32px] font-bold text-gray-900 mb-[22px] tracking-wide">
                Troubleshooting Guides
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                
                {/* Guide Card 1 */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex flex-col w-full">
                  <svg className="w-8 h-8 text-gray-700 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                  </svg>
                  <h3 className="text-[24px] font-bold text-gray-900 mb-3 leading-none">Network Connectivity Issues</h3>
                  <p className="text-[18px] text-gray-600 mb-6 flex-1 leading-snug">Diagnose and resolve common network problems affecting device communication.</p>
                  <button className="w-fit px-6 py-2.5 bg-[#F8D300] hover:bg-yellow-400 text-black text-[18px] font-bold rounded shadow-sm transition-colors">
                    View Guide
                  </button>
                </div>

                {/* Guide Card 2 */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex flex-col w-full">
                  <svg className="w-8 h-8 text-gray-700 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                  <h3 className="text-[24px] font-bold text-gray-900 mb-3 leading-none">Device Performance Optimization</h3>
                  <p className="text-[18px] text-gray-600 mb-6 flex-1 leading-snug">Steps to improve the performance and efficiency of your IoT devices.</p>
                  <button className="w-fit px-6 py-2.5 bg-[#F8D300] hover:bg-yellow-400 text-black text-[18px] font-bold rounded shadow-sm transition-colors">
                    View Guide
                  </button>
                </div>

                {/* Guide Card 3 */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex flex-col w-full">
                  <svg className="w-8 h-8 text-gray-700 mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                  <h3 className="text-[24px] font-bold text-gray-900 mb-3 leading-none">Software Update Failures</h3>
                  <p className="text-[18px] text-gray-600 mb-6 flex-1 leading-snug">Troubleshoot failed software updates and ensure successful deployment.</p>
                  <button className="w-fit px-6 py-2.5 bg-[#F8D300] hover:bg-yellow-400 text-black text-[18px] font-bold rounded shadow-sm transition-colors">
                    View Guide
                  </button>
                </div>

              </div>
            </div>

            {/* Issue Status Section */}
            <div className="w-full">
              {/* Dashboard equivalent H2 */}
              <h2 className="text-[32px] font-bold text-gray-900 mb-[22px] tracking-wide">
                Issue Status
              </h2>
              
              <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse table-fixed">
                    <thead className="bg-white border-b border-gray-200">
                      {/* Dashboard equivalent text-[18px] */}
                      <tr className="font-bold text-gray-900 text-[18px]">
                        <th className="py-4 px-6 w-[15%]">Alert ID</th>
                        <th className="py-4 px-4 w-[25%]">Description</th>
                        <th className="py-4 px-4 w-[35%]">Recommended Action</th>
                        <th className="py-4 px-4 w-[15%]">Owner</th>
                        <th className="py-4 px-6 w-[10%] text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {issues.map((issue, index) => (
                        <tr key={index} className={`hover:bg-gray-50 transition-colors ${index !== issues.length - 1 ? 'border-b border-gray-100' : ''}`}>
                          {/* Dashboard equivalent text-[18px] */}
                          <td className="py-4 px-6 text-[#7A71E6] font-medium text-[18px] truncate">{issue.id}</td>
                          <td className="py-4 px-4 text-gray-800 text-[18px] truncate">{issue.description}</td>
                          <td className="py-4 px-4 text-gray-600 text-[18px] truncate" title={issue.action}>{issue.action}</td>
                          <td className="py-4 px-4 text-gray-600 text-[18px] truncate">{issue.owner}</td>
                          <td className="py-4 px-6 text-center">
                            {/* Bumped badge text slightly to match the larger overall scale */}
                            <span className={`inline-block px-3 py-1 rounded-full text-[14px] ${getStatusBadge(issue.status)}`}>
                              {issue.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>

      <footer className="flex-shrink-0"><Footer /></footer>
    </div>
  );
}
