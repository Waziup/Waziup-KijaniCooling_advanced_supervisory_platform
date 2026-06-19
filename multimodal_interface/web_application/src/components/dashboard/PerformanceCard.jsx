import React from 'react';
import { ArrowUpRight, ArrowDownRight, Zap, Leaf, Factory, Minus } from 'lucide-react';

const PerformanceCard = ({ label, value, unit, trend, icon }) => {
  // Check if data actually exists
  const hasValue = value !== undefined && value !== null && value !== "";
  const hasTrend = trend !== undefined && trend !== null && trend !== "";

  const isIncrease = hasTrend ? trend >= 0 : true;
  const trendColor = hasTrend ? (isIncrease ? 'text-green-600' : 'text-red-600') : 'text-gray-400';
  const TrendIcon = hasTrend ? (isIncrease ? ArrowUpRight : ArrowDownRight) : Minus;

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

  return (
    <div className="bg-white p-5 rounded-xl border border-green-300 shadow-sm flex flex-col justify-between w-full h-[200px]">
      <div className="flex items-center justify-between">
        <h3 className="text-[20px] font-bold text-gray-900">{label}</h3>
        {renderIcon()}
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-[42px] font-bold tracking-tight text-gray-900">
          {hasValue ? Number(value).toLocaleString() : '--'}
        </span>
        <span className="text-[20px] text-gray-600 font-medium">{unit}</span>
      </div>

      <div className={`flex items-center gap-1.5 text-[18px] font-medium ${trendColor}`}>
        <TrendIcon size={20} />
        <span>
          {hasTrend 
            ? `${Math.abs(trend)}% ${isIncrease ? 'increase' : 'decrease'}` 
            : '--'}
        </span>
      </div>
    </div>
  );
};

export default PerformanceCard;