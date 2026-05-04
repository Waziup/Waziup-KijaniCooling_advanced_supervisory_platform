import React, { useState, useEffect } from "react";
import Sidebar from "../src/components/layout/Sidebar";
import Header from "../src/components/layout/Header";
import Footer from "../src/components/layout/Footer";
import DashboardCard from "../src/components/dashboard/DashboardCard";
import { SENSOR_CONFIG } from "../src/utils/sensorMapping";

const WAZIGATE_IP = "127.0.0.1";

const Dashboard = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchAllSensors = async () => {
      const sensorEntries = Object.entries(SENSOR_CONFIG);
      const updates = {};
      const timestamp = new Date().getTime();

      await Promise.all(
        sensorEntries.map(async ([id, config]) => {
          try {
            const url = `http://${WAZIGATE_IP}/devices/${config.dev}/sensors/${id}/value?t=${timestamp}`;
            const res = await fetch(url, { cache: "no-store" });
            if (res.ok) {
              const text = await res.text();
              updates[config.key] = text.trim();
            }
          } catch (e) { /* Fail silently */ }
        })
      );

      if (Object.keys(updates).length > 0) {
        setData(prev => ({ ...prev, ...updates }));
      }
    };

    fetchAllSensors();
    const interval = setInterval(fetchAllSensors, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden text-gray-900 font-sans">
      <Sidebar activePage="dashboard" />
      
      <div className="flex flex-col flex-1 overflow-y-auto bg-gray-50">
        
        {/* Header: Strict 64px */}
        <div className="h-16 min-h-[64px] flex-shrink-0 border-b border-gray-200">
          <Header title="Dashboard" />
        </div>

        {/* Main Content Area */}
        <main className="flex-grow pt-[20px] pb-8 pr-8 pl-[278px] min-h-[calc(100vh-64px)]">
          
          <h2 className="text-[32px] font-bold text-gray-900 mb-[22px] tracking-wide ml-[10px]">
            System component
          </h2>

          <div className="flex gap-8 items-start">
            
            {/* Left Column: Fixed Width 428px, Total Height 424px (200 + 24 gap + 200) */}
            <div className="flex flex-col gap-6 w-[428px]">
              
              {/* Biodigester: Height 200px */}
              <div className="h-[200px]">
                <div className="w-full h-full bg-white rounded-xl border border-green-300 p-5 shadow-sm flex flex-col">
                  <div className="flex justify-between items-start mb-0">
                    <h3 className="text-[24px] font-bold text-gray-900 leading-none">Biodigester</h3>
                    <div className="w-[120px] flex justify-center mt-[-4px]">
                      <div className="p-1 rounded-full border border-green-200 shadow-sm">
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="m12 12 3-3"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col flex-grow justify-start gap-1 mt-2.5">
                    <MetricRow label="Biogas pressure" value={data.pi_06_3} unit="mbar" />
                    <MetricRow label="Substrate Temp" value={data.ti_06_1} unit="°C" />
                    <MetricRow label="Biogas Temp" value={data.ti_06_4} unit="°C" />
                    <MetricRow label="Biomass level" value={data.lit_06} unit="% full" />
                    <MetricRow label="Substrate flowrate" value={data.fit_04} unit="Kg/h" />
                  </div>
                </div>
              </div>

              {/* Chiller: Height 200px */}
              <div className="h-[200px]">
                <div className="w-full h-full bg-white rounded-xl border border-green-300 p-5 shadow-sm flex flex-col">
                  <div className="flex justify-between items-start mb-0">
                    <h3 className="text-[24px] font-bold text-gray-900 leading-none">Chiller</h3>
                    <div className="w-[120px] flex justify-center mt-[-2px]">
                      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="flex flex-col flex-grow justify-start gap-1 mt-2.5">
                    <MetricRow label="Biogas flowrate" value={data.vg1} unit="Kg/h" />
                    <MetricRow label="Outlet temperature" value={data.th1} unit="°C" />
                    <MetricRow label="Inlet temperature" value={data.th2} unit="°C" />
                    <MetricRow label="Flow Rate" value={data.vc1} unit="L/min" />
                    <MetricRow label="Pressure" value={data.pg1} unit="bar" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Width 940px, Forced Height 424px */}
            <div className="w-[940px] h-[424px]">
              <div className="w-full h-full bg-white rounded-xl border border-green-300 p-5 shadow-sm flex flex-col">
                <h3 className="text-[24px] font-bold text-gray-800 mb-4 tracking-tight flex-shrink-0">Electrical components</h3>
                <div className="overflow-hidden flex-grow flex flex-col">
                  <table className="w-full text-left border-collapse border border-gray-200">
                    <thead className="bg-gray-50 font-bold text-black text-[20px]">
                      <tr>
                        <th className="py-1.5 px-6 border border-gray-200">Component</th>
                        <th className="py-1.5 px-6 border border-gray-200 text-center">Status</th>
                        <th className="py-1.5 px-6 border border-gray-200 text-center">Alarm</th>
                        <th className="py-1.5 px-6 border border-gray-200 text-center">Indicator</th>
                      </tr>
                    </thead>
                    <tbody>
                      <StatusRow name="Slurry pump" status={data.si_02} alarm={data.al_02} />
                      <StatusRow name="St - pump stirrer" status={data.si_03} alarm={data.al_03} />
                      <StatusRow name="Feeding pump" status={data.si_02} alarm={data.al_02} />
                      <StatusRow name="Digestate pump" status={data.si_07} alarm={data.al_07} />
                      <StatusRow name="S-Recycle pump" status={data.si_06} alarm={data.al_06} />
                      <StatusRow name="Chiller pump 1" status={data.vc1} alarm={data.cc1} />
                      <StatusRow name="Chiller pump 2" status={data.vc2} alarm={data.cc2} />
                      <StatusRow name="Chiller pump 3" status={data.vc3} alarm={data.cc3} />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

// --- Reusable Component Helpers ---

const MetricRow = ({ label, value, unit }) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-800 text-[18px] leading-tight">{label}</span>
    {/* Removed global font-bold from the wrapper span */}
    <span className="text-gray-900 text-[18px] leading-tight w-[120px] text-center">
      {/* Explicitly targeted font weights for value vs unit */}
      <span className="font-bold">{value ?? "--"}</span> <span className="font-normal">{unit}</span>
    </span>
  </div>
);

const StatusRow = ({ name, status, alarm }) => {
  const isOff = status === "0" || status === 0;
  const isNormal = alarm === "0" || alarm === 0;

  const indicatorColor = isNormal ? "bg-green-500" : "bg-red-500";

  return (
    <tr className="font-sans">
      <td className="py-1.5 px-6 border border-gray-200 text-gray-700 font-medium text-[18px]">{name}</td>
      <td className="py-1.5 px-6 border border-gray-200 font-bold text-center uppercase text-[18px]">
        {status !== undefined ? (isOff ? "OFF" : "ON") : "--"}
      </td>
      <td className={`py-1.5 px-6 border border-gray-200 text-center text-[18px] ${isNormal ? "text-black" : "text-red-600"}`}>
        {alarm !== undefined ? (isNormal ? "Normal" : "Warning") : "--"}
      </td>
      <td className="py-1.5 px-6 border border-gray-200">
        <div className={`w-3 h-3 rounded-full mx-auto ${indicatorColor} shadow-sm`} />
      </td>
    </tr>
  );
};

export default Dashboard;