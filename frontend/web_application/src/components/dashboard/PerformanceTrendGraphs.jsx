import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Data points are hourly, with an ISO "time" (UTC); the axis shows the local day, the tooltip the local hour
const dayTicks = (data = []) => {
  const midnights = data.filter((p) => new Date(p.time).getHours() === 0).map((p) => p.time);
  return midnights.length ? midnights : undefined; // e.g. half-hour time zones: let recharts pick ticks
};
const formatDay = (time) => new Date(time).toLocaleDateString(undefined, { weekday: 'short' });
const formatHour = (time) =>
  new Date(time).toLocaleString(undefined, { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

const GraphPlaceholder = ({ text }) => (
  <div className="h-full w-full flex items-center justify-center text-sm text-gray-400">{text}</div>
);

const hasValues = (data, key) => Array.isArray(data) && data.some((p) => p[key] !== null && p[key] !== undefined);

const PerformanceTrendGraphs = ({ energyData, gasData, loading }) => {
  return (
    <div className="w-full font-sans mt-[20px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Left Card: Energy Output, hourly over the last 7 days */}
        <div className="bg-white rounded-xl border border-green-400 p-6 shadow-sm flex flex-col">
          <div className="mb-6">
            <h3 className="text-[24px] font-bold text-gray-900 leading-none mb-2">Energy Output Trend</h3>
            <p className="text-sm text-gray-500">Hourly output energy over the last 7 days.</p>
          </div>
          <div className="h-[250px] w-full flex justify-center flex-grow">
            {loading ? <GraphPlaceholder text="Loading energy output history..." /> : !hasValues(energyData, 'output') ? <GraphPlaceholder text="No energy output data for the last 7 days" /> : (
            <ResponsiveContainer width="90%" height="100%">
              <LineChart data={energyData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#d1d5db" />
                <XAxis dataKey="time" ticks={dayTicks(energyData)} tickFormatter={formatDay} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} dy={10} />
                <YAxis
                  width={75}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  tickFormatter={(value) => `${value} kWh`}
                  domain={['dataMin - 50', 'dataMax + 50']}
                />
                <Tooltip labelFormatter={formatHour} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                <Line
                  type="monotone"
                  name="Energy Output"
                  dataKey="output"
                  stroke="#1d4ed8"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={true}
                  animationDuration={800}
                />
              </LineChart>
            </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Right Card: Actual vs Target Gas Production, hourly over the last 7 days */}
        <div className="bg-white rounded-xl border border-green-400 p-6 shadow-sm flex flex-col">
          <div className="mb-6">
            <h3 className="text-[24px] font-bold text-gray-900 leading-none mb-2">Actual vs Target Gas Production</h3>
            <p className="text-sm text-gray-500">Hourly gas production over the last 7 days compared to target.</p>
          </div>
          <div className="h-[250px] w-full flex justify-center flex-grow">
            {loading ? <GraphPlaceholder text="Loading gas production history..." /> : !hasValues(gasData, 'actual') ? <GraphPlaceholder text="No gas production data for the last 7 days" /> : (
            <ResponsiveContainer width="90%" height="100%">
              <LineChart data={gasData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#d1d5db" />
                <XAxis dataKey="time" ticks={dayTicks(gasData)} tickFormatter={formatDay} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} dy={10} />
                <YAxis
                  width={75}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  tickFormatter={(value) => `${value} m³/h`}
                  domain={['dataMin - 5', 'dataMax + 5']}
                />
                <Tooltip labelFormatter={formatHour} />
                <Legend verticalAlign="bottom" height={36} iconType="plainline" />
                <Line
                  type="monotone"
                  name="Actual Production"
                  dataKey="actual"
                  stroke="#1d4ed8"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={true}
                  animationDuration={800}
                />
                <Line
                  type="monotone"
                  name="Target Production"
                  dataKey="target"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                  isAnimationActive={true}
                  animationDuration={800}
                />
              </LineChart>
            </ResponsiveContainer>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default PerformanceTrendGraphs;
