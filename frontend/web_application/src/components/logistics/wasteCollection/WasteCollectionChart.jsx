import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const StateMessage = ({ children, tone = 'muted' }) => (
  <div
    className={`h-full w-full flex items-center justify-center text-[14px] ${
      tone === 'error' ? 'text-red-600' : 'text-gray-500'
    }`}
  >
    {children}
  </div>
);

// Combined historical + predicted waste collection trend. Reuses the project's
// existing chart library (recharts).
const WasteCollectionChart = ({ data = [], status = 'success', error = null }) => {
  const hasData = Array.isArray(data) && data.length > 0;

  return (
    <section className="bg-white rounded-xl border border-green-300 shadow-sm p-5 flex flex-col">
      <h3 className="text-[24px] font-bold text-gray-900 leading-none mb-4">
        Waste Collected Trend Graphs
      </h3>

      <div
        className="h-[280px] w-full rounded-lg bg-gray-50 p-2"
        role="img"
        aria-label="Line chart comparing actual waste collected with predicted waste required over the week, in kilograms."
      >
        {status === 'loading' && <StateMessage>Loading trend data…</StateMessage>}

        {status === 'error' && (
          <StateMessage tone="error">
            {error || 'Unable to load trend data.'}
          </StateMessage>
        )}

        {(status === 'empty' || (status === 'success' && !hasData)) && (
          <StateMessage>No waste collection data available.</StateMessage>
        )}

        {status === 'success' && hasData && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 16, left: 8, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#d1d5db" />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6b7280' }}
                dy={8}
              />
              <YAxis
                width={64}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6b7280' }}
                tickFormatter={(value) => `${value} kg`}
              />
              <Tooltip formatter={(value, name) => [`${value} kg`, name]} />
              <Legend verticalAlign="bottom" height={36} iconType="plainline" />
              <Line
                type="monotone"
                name="Actual Waste Collected"
                dataKey="actual"
                stroke="#7A71E6"
                strokeWidth={2}
                dot={{ r: 3, fill: '#7A71E6' }}
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                name="Predicted Waste Required"
                dataKey="predicted"
                stroke="#f59e0b"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
};

export default WasteCollectionChart;
