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

// Single actual-vs-predicted trend chart for the Feedstock Management tab.
// Actual is a solid dark line with small points; predicted is a dotted line,
// mirroring the Waste Collection tab's recharts setup.
const FeedstockTrendChart = ({
  title,
  data = [],
  yDomain = ['auto', 'auto'],
  unit = ' kg',
  actualName = 'Actual',
  predictedName = 'Predicted',
  ariaLabel,
}) => (
  <section className="bg-white rounded-xl border border-green-300 shadow-sm p-5 flex flex-col">
    <h4 className="text-[16px] font-bold text-gray-900 leading-none mb-4">{title}</h4>

    <div
      className="h-[260px] w-full rounded-lg bg-gray-50 p-2"
      role="img"
      aria-label={ariaLabel || `${title} trend chart.`}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 16, left: 8, bottom: 0 }}>
          <CartesianGrid horizontal={true} vertical={false} stroke="#d1d5db" />
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6b7280' }}
            dy={8}
          />
          <YAxis
            width={64}
            domain={yDomain}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6b7280' }}
            tickFormatter={(value) => `${value}${unit}`}
          />
          <Tooltip formatter={(value, name) => [`${value}${unit}`, name]} />
          <Legend verticalAlign="bottom" height={36} iconType="circle" />
          <Line
            type="monotone"
            name={actualName}
            dataKey="actual"
            stroke="#111827"
            strokeWidth={2}
            dot={{ r: 2, fill: '#111827' }}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            name={predictedName}
            dataKey="predicted"
            stroke="#111827"
            strokeWidth={2}
            strokeDasharray="2 4"
            dot={{ r: 2, fill: '#111827', strokeDasharray: '0' }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </section>
);

export default FeedstockTrendChart;
