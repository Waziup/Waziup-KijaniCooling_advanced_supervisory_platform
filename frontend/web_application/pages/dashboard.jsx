import React, { useState, useEffect, useMemo } from "react";
import PerformanceCard from "../src/components/dashboard/PerformanceCard";
import PerformanceTrendGraphs from "../src/components/dashboard/PerformanceTrendGraphs"; 
import { usePageLayout } from "../src/components/layout/usePageLayout";

// The backend reads the values from WaziGate (it holds the WaziGate auth token).
// Same origin by default: nginx (and the Vite dev server) proxy /kijanicooling/api/ to the backend.
const DASHBOARD_API_URL = `${(import.meta.env.VITE_BACKEND_API_URL || "").replace(/\/+$/, "")}/kijanicooling/api/v1/dashboard-biodigester`;

const Dashboard = () => {
  const [data, setData] = useState({});

  // Weekly trends (daily averages of the last 7 days) and gas production target come from the API
  const historicalData = useMemo(() => {
    const trends = data.weekly_trends || [];
    const target = data.gas_production_target ?? null;
    return {
      energy: trends.map((d) => ({ timeLabel: d.day, output: d.ENERGY_OUTPUT })),
      gas: trends.map((d) => ({ timeLabel: d.day, actual: d.GAS_PRODUCTION, target }))
    };
  }, [data.weekly_trends, data.gas_production_target]);
  const weeklyChange = data.weekly_change || {};

  // Fetch live data from the backend every 2 seconds
  useEffect(() => {
    const fetchAllSensors = async () => {
      try {
        const res = await fetch(DASHBOARD_API_URL, { cache: "no-store" });
        if (!res.ok) {
          console.error(`Dashboard Sync Error: ${DASHBOARD_API_URL} returned ${res.status}`);
          return;
        }
        const values = await res.json();

        // API keys are uppercase (e.g. LIT_06), dashboard keys lowercase (e.g. lit_06).
        // Keep the last known value of sensors that have none yet
        const updates = Object.fromEntries(
          Object.entries(values)
            .filter(([, value]) => value !== null && value !== undefined)
            .map(([key, value]) => [key.toLowerCase(), value])
        );

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

  usePageLayout("Dashboard", "dashboard");

  return (
    <div className="flex-1 bg-gray-50 pt-0 pb-8 px-4 sm:pr-8 sm:pl-10">
      <h2 className="text-[32px] font-bold text-gray-900 mb-[22px] tracking-wide mt-5">
        System component
      </h2>
      <div className="flex flex-col xl:flex-row gap-8 xl:items-start">
        
        {/* Left Column: Fixed Width 428px from xl, full width (2-up on md) below */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-6 w-full xl:w-[428px] xl:flex-shrink-0">
          
          {/* Biodigester Card */}
          <div className="xl:h-[200px]">
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
          <div className="xl:h-[200px]">
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

        {/* Pump Status: Aligned Width 888px from xl, full width below */}
        <div className="w-full min-w-0 xl:flex-1 xl:max-w-[888px] xl:h-[424px]">
          <div className="w-full h-full bg-white rounded-xl border border-green-300 p-5 shadow-sm flex flex-col">
            <h3 className="text-[24px] font-bold text-gray-800 mb-4 tracking-tight flex-shrink-0">Pump status</h3>
            <div className="overflow-x-auto xl:overflow-hidden flex-grow flex flex-col">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 font-bold text-black text-[18px]">
                  <tr>
                    <th className="py-1 px-4 border border-gray-200">Component</th>
                    <th className="py-1 px-4 border border-gray-200 text-center">Status</th>
                    <th className="py-1 px-4 border border-gray-200 text-center">Alarm</th>
                  </tr>
                </thead>
                <tbody>
                  <StatusRow name="Slurry pump" status={data.si_02} alarm={data.al_02} />
                  <StatusRow name="St - pump stirrer" status={data.si_03} alarm={data.al_03} />
                  <StatusRow name="Feeding pump" status={data.si_02} alarm={data.al_02} />
                  <StatusRow name="Digestate pump" status={data.si_07} alarm={data.al_07} />
                  <StatusRow name="S-Recycle pump" status={data.si_06} alarm={data.al_06} />
                  <StatusRow name="Chiller pump 1" status={data.cc1} alarm={data.cc1} />
                  <StatusRow name="Chiller pump 2" status={data.cc2} alarm={data.cc2} />
                  <StatusRow name="Chiller pump 3" status={data.ch1} alarm={data.ch1} />
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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 w-full max-w-[1348px]">
          <PerformanceCard 
            label="Energy Output" 
            value={data.energy_output} 
            unit="kWh" 
            trend={weeklyChange.ENERGY_OUTPUT} 
            icon="energy" 
          />
          <PerformanceCard 
            label="Gas Production" 
            value={data.gas_production} 
            unit="m³/h" 
            trend={weeklyChange.GAS_PRODUCTION} 
            icon="production" 
          />
          <PerformanceCard 
            label="Substrate Feeding Rate" 
            value={data.substrate_feeding_rate ? Number(data.substrate_feeding_rate).toFixed(3) : undefined} 
            unit="tons/h" 
            trend={weeklyChange.SUBSTRATE_FEEDING_RATE} 
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
  const hasValue = (value) => value !== undefined && value !== null && value !== "";
  const isZero = (value) => value === 0 || value === "0";

  // Pump status: unchanged logic (0 -> OFF, non-zero -> ON)
  const pumpLabel = !hasValue(status) ? "--" : isZero(status) ? "OFF" : "ON";

  // Alarm indicator: prefer the alarm signal, fall back to the pump status
  // alarm = 0 -> normal (green), alarm != 0 -> alarm (red)
  // status = 0 -> OFF (red), status != 0 -> ON (green)
  const useAlarm = hasValue(alarm);
  const source = useAlarm ? alarm : status;
  const available = hasValue(source);
  const isOn = useAlarm ? isZero(source) : !isZero(source);

  const indicatorColor = !available ? "bg-gray-300" : isOn ? "bg-green-500" : "bg-red-500";

  return (
    <tr className="font-sans">
      <td className="py-1 px-4 border border-gray-200 text-gray-700 font-medium text-[18px]">{name}</td>
      <td className="py-1 px-4 border border-gray-200 font-bold text-center uppercase text-[18px]">
        {pumpLabel}
      </td>
      <td className="py-1 px-4 border border-gray-200">
        <div className={`w-3 h-3 rounded-full mx-auto flex-shrink-0 shadow-sm ${indicatorColor}`} />
      </td>
    </tr>
  );
};

export default Dashboard;
