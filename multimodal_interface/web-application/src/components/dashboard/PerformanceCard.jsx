import React from 'react';
import { ArrowUpRight, ArrowDownRight, Zap, Leaf, Factory } from 'lucide-react';

/**
 * PerformanceCard Component
 * @param {string} label - The title of the metric (e.g., "Energy Output")
 * @param {number} value - The numeric data point
 * @param {string} unit - The unit of measurement (e.g., "kWh")
 * @param {number} trend - The percentage change (positive or negative)
 * @param {string} icon - The key for the icon to display
 */
const PerformanceCard = ({ label, value, unit, trend, icon }) => {
  // Logic to determine if the trend is positive or negative
  const isIncrease = trend >= 0;
  const trendColor = isIncrease ? 'text-green-600' : 'text-red-600';
  const TrendIcon = isIncrease ? ArrowUpRight : ArrowDownRight;

  // Map the icon prop to the specific Lucide component
  const renderIcon = () => {
    const iconSize = 24;
    switch (icon) {
      case 'energy':
        return <Zap size={iconSize} className="text-green-500" />;
      case 'production':
        return <Leaf size={iconSize} className="text-green-500" />;
      case 'feeding':
        return <Factory size={iconSize} className="text-green-500" />;
      default:
        return null;
    }
  };

  // Inside PerformanceCard.jsx
// Change the return div's class string:

return (
  <div className="bg-white p-5 rounded-xl border border-green-300 shadow-sm flex flex-col justify-between w-[428px] h-[200px]">
    {/* Header Section */}
    <div className="flex items-center justify-between">
      <h3 className="text-[20px] font-bold text-gray-900">{label}</h3>
      {renderIcon()}
    </div>

    {/* Body Section */}
    <div className="flex items-baseline gap-1">
      <span className="text-[42px] font-bold tracking-tight text-gray-900">
        {value.toLocaleString()}
      </span>
      <span className="text-[20px] text-gray-600 font-medium">{unit}</span>
    </div>

    {/* Footer Section */}
    <div className={`flex items-center gap-1.5 text-[18px] font-medium ${trendColor}`}>
      <TrendIcon size={20} />
      <span>
        {Math.abs(trend)}% {isIncrease ? 'increase' : 'decrease'}
      </span>
    </div>
  </div>
);
};

export default PerformanceCard;