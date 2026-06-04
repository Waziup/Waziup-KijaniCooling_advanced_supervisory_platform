import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PerformanceTrendGraphs = ({ energyData, gasData }) => {
  return (
    <div className="w-full font-sans mt-[20px]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Card: 4-Week Energy Output */}
        <div className="bg-white rounded-xl border border-green-400 p-6 shadow-sm flex flex-col">
          <div className="mb-6">
            <h3 className="text-[24px] font-bold text-gray-900 leading-none mb-2">Energy Output Trend</h3>
            <p className="text-sm text-gray-500">Output Energy over the last 4 weeks.</p>
          </div>
          <div className="h-[250px] w-full flex justify-center flex-grow">
            <ResponsiveContainer width="90%" height="100%">
              <LineChart data={energyData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#d1d5db" />
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} dy={10} />
                {/* Dynamically zoomed Y-Axis so animations are visible on large numbers */}
                <YAxis 
                  width={75} 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#6b7280' }} 
                  tickFormatter={(value) => `${value} kWh`} 
                  domain={['dataMin - 50', 'dataMax + 50']} 
                />
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                <Line 
                  type="monotone" 
                  name="Energy Output" 
                  dataKey="output" 
                  stroke="#1f2937" 
                  strokeWidth={2} 
                  dot={{ r: 3, fill: '#1f2937' }} 
                  isAnimationActive={true}
                  animationDuration={800}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Card: Actual vs Target Gas Production */}
        <div className="bg-white rounded-xl border border-green-400 p-6 shadow-sm flex flex-col">
          <div className="mb-6">
            <h3 className="text-[24px] font-bold text-gray-900 leading-none mb-2">Actual vs Target Gas Production</h3>
            <p className="text-sm text-gray-500">Weekly gas production compared to target over 4 weeks.</p>
          </div>
          <div className="h-[250px] w-full flex justify-center flex-grow">
            <ResponsiveContainer width="90%" height="100%">
              <LineChart data={gasData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#d1d5db" />
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} dy={10} />
                <YAxis 
                  width={75} 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#6b7280' }} 
                  tickFormatter={(value) => `${value} m³/h`} 
                  domain={['dataMin - 5', 'dataMax + 5']}
                />
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                <Line 
                  type="monotone" 
                  name="Actual Production" 
                  dataKey="actual" 
                  stroke="#1f2937" 
                  strokeWidth={2} 
                  dot={{ r: 3, fill: '#1f2937' }} 
                  isAnimationActive={true}
                  animationDuration={800}
                />
                <Line 
                  type="monotone" 
                  name="Target Production" 
                  dataKey="target" 
                  stroke="#4b5563" 
                  strokeWidth={2} 
                  dot={{ r: 3, fill: '#4b5563' }} 
                  isAnimationActive={true}
                  animationDuration={800}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PerformanceTrendGraphs;