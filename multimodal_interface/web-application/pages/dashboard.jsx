import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../src/components/layout/Sidebar";
import Header from "../src/components/layout/Header";
import Footer from "../src/components/layout/Footer";
import PerformanceCard from "../src/components/dashboard/PerformanceCard";
import PerformanceTrendGraphs from "../src/components/dashboard/PerformanceTrendGraphs"; 
import { SYSTEM_CONFIG } from "../src/utils/sensorMapping";

const WAZIGATE_IP = "127.0.0.1";

const Dashboard = () => {
  const [data, setData] = useState({});
  const dataRef = useRef(data); 
  
  // STATE: For real-time rolling chart data (last 7 readings)
  const [historicalData, setHistoricalData] = useState({
    energy: [],
    gas: []
  });

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  // EFFECT 1: Fetch live instantaneous data from WaziGate every 2 seconds
  useEffect(() => {
    const fetchAllSensors = async () => {
      try {
        const devicesRes = await fetch(`http://${WAZIGATE_IP}/devices`, { cache: "no-store" });
        if (!devicesRes.ok) return;
        const devicesList = await devicesRes.json();

        const waziMap = {};
        devicesList.forEach((device) => {
          const sensorNameMap = {};
          if (Array.isArray(device.sensors)) {
            device.sensors.forEach((sensor) => {
              sensorNameMap[sensor.name] = sensor.id; 
            });
          }
          waziMap[device.name] = { 
            id: device.id, 
            sensors: sensorNameMap 
          };
        });

        const updates = {};
        const timestamp = new Date().getTime();
        const fetchPromises = [];

        for (const [sysDevName, sysDevConfig] of Object.entries(SYSTEM_CONFIG)) {
          const waziDevice = waziMap[sysDevName];
          if (waziDevice) {
            sysDevConfig.sensors.forEach((sensorKeyName) => {
              const actualSensorId = waziDevice.sensors[sensorKeyName];
              if (actualSensorId) {
                const url = `http://${WAZIGATE_IP}/devices/${waziDevice.id}/sensors/${actualSensorId}/value?t=${timestamp}`;
                
                fetchPromises.push(
                  fetch(url, { cache: "no-store" })
                    .then((res) => (res.ok ? res.text() : null))
                    .then((text) => {
                      if (text !== null) {
                        updates[sensorKeyName] = text.trim();
                      }
                    })
                    .catch(() => { /* Fail silently */ })
                );
              }
            });
          }
        }

        await Promise.all(fetchPromises);

        if (Object.keys(updates).length > 0) {
          setData((prev) => ({ ...prev, ...updates }));
        }
      } catch (e) {
        console.error("Dashboard Sync Error: Failed to fetch sensor data mapping.", e);
      }
    };

    fetchAllSensors();
    const interval = setInterval(fetchAllSensors, 2000); 
    return () => clearInterval(interval);
  }, []);

  // EFFECT 2: Rolling Window for Graph Data (Updates every 20 seconds)
  useEffect(() => {
    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    let dayIndex = 0; 

    const updateGraph = () => {
      setHistoricalData((prev) => {
        const latestData = dataRef.current;
        
        // Use raw values so empty data passes cleanly into charts (avoiding static fallbacks)
        const currentEnergy = Number(latestData.energy_output) || 0; 
        const currentGas = Number(latestData.gas_production) || 0;
        
        const currentDay = daysOfWeek[dayIndex % 7];
        dayIndex++;

        return {
          energy: [...prev.energy, { timeLabel: currentDay, output: currentEnergy }].slice(-7),
          gas: [...prev.gas, { timeLabel: currentDay, actual: currentGas, target: 75 }].slice(-7)
        };
      });
    };

    updateGraph();
    const interval = setInterval(updateGraph, 20000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-screen overflow-hidden text-gray-900 font-sans">
      <header className="h-16 min-h-[64px] max-h-[64px] w-full flex-shrink-0 border-b border-gray-200 z-10">
        <Header title="Dashboard" />
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-[278px] flex-shrink-0 bg-white border-r border-gray-200 overflow-y-auto">
          <Sidebar activePage="dashboard" />
        </aside>

        <main className="flex-1 overflow-y-auto bg-gray-50 pt-0 pb-8 pr-8 pl-10">
          <h2 className="text-[32px] font-bold text-gray-900 mb-[22px] tracking-wide mt-5">
            System component
          </h2>
          <div className="flex gap-8 items-start">
            
            {/* Left Column: Fixed Width 428px */}
            <div className="flex flex-col gap-6 w-[428px]">
              
              {/* Biodigester Card */}
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

              {/* Chiller Card */}
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
                    <MetricRow label="Biogas flowrate" value={data.vg1} unit="m³/h" />
                    <MetricRow label="Outlet temperature" value={data.th1} unit="°C" />
                    <MetricRow label="Inlet temperature" value={data.th2} unit="°C" />
                    <MetricRow label="Flow Rate" value={data.vc1} unit="L/min" />
                    <MetricRow label="Pressure" value={data.pg1} unit="bar" />
                  </div>
                </div>
              </div>

            </div>

            {/* Electrical Components: Aligned Width 888px */}
            <div className="w-[888px] h-[424px]">
              <div className="w-full h-full bg-white rounded-xl border border-green-300 p-5 shadow-sm flex flex-col">
                <h3 className="text-[24px] font-bold text-gray-800 mb-4 tracking-tight flex-shrink-0">Electrical components</h3>
                <div className="overflow-hidden flex-grow flex flex-col">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 font-bold text-black text-[18px]">
                      <tr>
                        <th className="py-1.5 px-4 border border-gray-200">Component</th>
                        <th className="py-1.5 px-4 border border-gray-200 text-center">Status</th>
                        <th className="py-1.5 px-4 border border-gray-200 text-center">Alarm</th>
                        <th className="py-1.5 px-4 border border-gray-200 text-center">Indicator</th>
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

          {/* Performance Section */}
          <div className="mt-[20px]">
            <h2 className="text-[32px] font-bold text-gray-900 mb-[22px] tracking-wide">
              Weekly Performance Metrics
            </h2>
            
            {/* 3-column grid structure perfectly matches the top row width */}
            <div className="grid grid-cols-3 gap-8 w-[1348px]">
              <PerformanceCard 
                label="Energy Output" 
                value={data.energy_output} 
                unit="kWh" 
                trend={3.2} 
                icon="energy" 
              />
              <PerformanceCard 
                label="Gas Production" 
                value={data.gas_production} 
                unit="m³/h" 
                trend={-1.5} 
                icon="production" 
              />
              <PerformanceCard 
                label="Substrate Feeding Rate" 
                value={data.substrate_feeding_rate ? Number(data.substrate_feeding_rate).toFixed(3) : undefined} 
                unit="tons/h" 
                trend={0.8} 
                icon="feeding" 
              />
            </div>
            
            {/* Performance Trend Graphs Section */}
            <div className="mt-10">
              <h2 className="text-[32px] font-bold text-gray-900 mb-[22px] tracking-wide">
                Weekly Performance Trends
              </h2>
              <PerformanceTrendGraphs 
                energyData={historicalData.energy} 
                gasData={historicalData.gas} 
              />
            </div>
            
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

// Reusable Helpers
const MetricRow = ({ label, value, unit }) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-800 text-[18px] leading-tight">{label}</span>
    <span className="text-gray-900 text-[18px] leading-tight w-[120px] text-center">
      <span className="font-bold">{value ?? "--"}</span> <span className="font-normal ml-1">{unit}</span>
    </span>
  </div>
);

const StatusRow = ({ name, status, alarm }) => {
  const isOff = status === "0" || status === 0;
  const isNormal = alarm === "0" || alarm === 0;
  
  // Set default state as red if data is missing
  const indicatorColor = (status === undefined || alarm === undefined) ? "bg-red-500" : (isNormal ? "bg-green-500" : "bg-red-500");
  
  return (
    <tr className="font-sans">
      <td className="py-1.5 px-4 border border-gray-200 text-gray-700 font-medium text-[18px]">{name}</td>
      <td className="py-1.5 px-4 border border-gray-200 font-bold text-center uppercase text-[18px]">
        {status !== undefined ? (isOff ? "OFF" : "ON") : "--"}
      </td>
      <td className={`py-1.5 px-4 border border-gray-200 text-center text-[18px] ${alarm !== undefined ? (isNormal ? "text-black" : "text-red-600") : "text-red-600"}`}>
        {alarm !== undefined ? (isNormal ? "Normal" : "Warning") : "--"}
      </td>
      <td className="py-1.5 px-4 border border-gray-200">
        <div className={`w-3 h-3 rounded-full mx-auto ${indicatorColor} shadow-sm`} />
      </td>
    </tr>
  );
};

export default Dashboard;