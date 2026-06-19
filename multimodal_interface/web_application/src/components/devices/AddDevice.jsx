import React, { useState } from "react";
// Adjust these import paths depending on exactly where you place this file!
import Sidebar from "../layout/sidebar";
import Header from "../layout/header";
import Footer from "../layout/footer";

const AddDevice = () => {
  // Form State
  const [formData, setFormData] = useState({
    deviceName: "",
    deviceType: "Sensor",
    deviceId: "",
    location: "",
    installDate: "2026-03-15",
    isActive: true,
  });

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Device Data Submitted:", formData);
    // Add your API call or state update logic here
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden text-gray-900 font-sans">
      <header className="h-16 min-h-[64px] max-h-[64px] w-full flex-shrink-0 border-b border-gray-200 z-10">
        <Header title="Add Device" />
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-[256px] flex-shrink-0 bg-white border-r border-gray-200 overflow-y-auto">
          <Sidebar activePage="Device Management" />
        </aside>

        <main className="flex-1 overflow-y-auto bg-[#E5E7EB] p-8">
          <div className="w-full pr-8">
            
            {/* White Card Container */}
            <div className="bg-white rounded-lg border border-gray-300 shadow-sm p-8">
              <h2 className="text-[18px] font-semibold text-gray-800 mb-8">Device Information</h2>

              <form onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row gap-16 md:gap-24">
                  
                  {/* Left Column: Image Upload (Optional) */}
                  <div className="w-full md:w-[30%]">
                    {/* Size adjusted to max out at 360px by 360px while maintaining responsive grid */}
                    <div className="relative w-full max-w-[360px] aspect-square bg-gray-100 rounded-lg border-2 border-dashed border-gray-400 flex flex-col items-center justify-center cursor-pointer hover:border-[#7CBE83] transition-colors group overflow-hidden">
                      
                      {/* Image from public folder */}
                      <img 
                        src="/logo.png" 
                        alt="Device logo" 
                        className="w-full h-full object-cover" 
                      />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white text-[15px] font-medium">Upload image</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Form Fields */}
                  <div className="w-full md:w-[70%] grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
                    
                    {/* Device Name */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[13px] font-semibold text-gray-700">Device Name</label>
                      <input
                        type="text"
                        name="deviceName"
                        value={formData.deviceName}
                        onChange={handleInputChange}
                        placeholder="Pressure Sensor - PS101"
                        className="w-full bg-[#D1D5DB] px-4 py-2.5 rounded-md text-[14px] text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7CBE83]"
                      />
                    </div>

                    {/* Device Type */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[13px] font-semibold text-gray-700">Device Type</label>
                      <select
                        name="deviceType"
                        value={formData.deviceType}
                        onChange={handleInputChange}
                        className="w-full bg-[#D1D5DB] px-4 py-2.5 rounded-md text-[14px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#7CBE83] appearance-none"
                      >
                        <option value="Sensor">Sensor</option>
                        <option value="Pump">Pump</option>
                        <option value="Valve">Valve</option>
                        <option value="Alarm">Alarm</option>
                      </select>
                    </div>

                    {/* Device ID */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[13px] font-semibold text-gray-700">Device ID</label>
                      <input
                        type="text"
                        name="deviceId"
                        value={formData.deviceId}
                        onChange={handleInputChange}
                        placeholder="TS-1001"
                        className="w-full bg-[#D1D5DB] px-4 py-2.5 rounded-md text-[14px] text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7CBE83]"
                      />
                    </div>

                    {/* Location */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[13px] font-semibold text-gray-700">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="Kyeyo farm"
                        className="w-full bg-[#D1D5DB] px-4 py-2.5 rounded-md text-[14px] text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#7CBE83]"
                      />
                    </div>

                    {/* Installation Date */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[13px] font-semibold text-gray-700">Installation Date</label>
                      <input
                        type="date"
                        name="installDate"
                        value={formData.installDate}
                        onChange={handleInputChange}
                        className="w-full bg-[#D1D5DB] px-4 py-2.5 rounded-md text-[14px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#7CBE83]"
                      />
                    </div>

                    {/* Status Toggle */}
                    <div className="flex items-center mt-7">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, isActive: !prev.isActive }))}
                          className={`w-12 h-6 rounded-full relative transition-colors duration-200 focus:outline-none ${
                            formData.isActive ? "bg-[#F8D300]" : "bg-gray-400"
                          }`}
                        >
                          <div
                            className={`w-5 h-5 bg-black rounded-full absolute top-0.5 transition-transform duration-200 ${
                              formData.isActive ? "translate-x-6" : "translate-x-1"
                            }`}
                          ></div>
                        </button>
                        <span className="text-[14px] font-medium text-gray-800">
                          Status: {formData.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end mt-16">
                  <button
                    type="submit"
                    className="px-8 py-2.5 bg-[#F8D300] hover:bg-yellow-400 text-black text-[14px] font-bold rounded-md shadow-sm transition-colors"
                  >
                    Add Device
                  </button>
                </div>

              </form>
            </div>
            
          </div>
        </main>
      </div>

      <footer className="flex-shrink-0"><Footer /></footer>
    </div>
  );
};

export default AddDevice;