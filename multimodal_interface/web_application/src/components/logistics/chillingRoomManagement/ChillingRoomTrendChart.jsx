import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';

// Chilling room temperature trend: actual (solid) vs predicted (dashed) over
// a 24-hour time axis, with horizontal threshold lines marking the safe band.
const ChillingRoomTrendChart = ({
  title,
  data = [],
  yDomain = [-2, 10],
  thresholds = [],
  ariaLabel,
}) => (
  <section className="bg-white rounded-xl border border-green-300 shadow-sm p-5 flex flex-col">
    <h3 className="text-[24px] font-bold text-gray-900 leading-none mb-4">{title}</h3>

    <div
      className="h-[300px] w-full rounded-lg bg-gray-50 p-2"
      role="img"
      aria-label={ariaLabel || 'Line chart of actual versus predicted chilling room temperature over 24 hours, in degrees Celsius.'}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 16, left: 8, bottom: 0 }}>
          <CartesianGrid horizontal={true} vertical={false} stroke="#d1d5db" />
          <XAxis
            dataKey="hour"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: '#6b7280' }}
            interval={2}
            dy={8}
            label={{ value: 'Hour of day', position: 'insideBottom', offset: -6, fontSize: 12, fill: '#6b7280' }}
          />
          <YAxis
            width={64}
            domain={yDomain}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6b7280' }}
            tickFormatter={(value) => `${value}°C`}
            label={{
              value: 'Temperature (°C)',
              angle: -90,
              position: 'insideLeft',
              fontSize: 12,
              fill: '#6b7280',
              offset: 8,
            }}
          />
          <Tooltip formatter={(value) => [`${value}°C`]} />
          <Legend verticalAlign="bottom" height={36} iconType="circle" />

          {thresholds.map((threshold) => (
            <ReferenceLine
              key={`threshold-${threshold.value}`}
              y={threshold.value}
              stroke={threshold.stroke}
              strokeDasharray="6 4"
              label={{
                value: threshold.label,
                position: 'insideTopRight',
                fontSize: 11,
                fill: threshold.stroke,
              }}
            />
          ))}

          <Line
            type="monotone"
            name="Actual Temperature"
            dataKey="actual"
            stroke="#111827"
            strokeWidth={2}
            connectNulls={false}
            dot={{ r: 2, fill: '#111827' }}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            name="Predicted Temperature"
            dataKey="predicted"
            stroke="#111827"
            strokeWidth={2}
            strokeDasharray="5 5"
            connectNulls={false}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </section>
);

export default ChillingRoomTrendChart;
