import React from 'react';

// Forecast tile. Visually distinguished from KpiCard (dashed border)
// so forecasts are not mistaken for live measurements.
// valueClassName optionally colours the headline value (e.g. green emphasis).
const PredictionCard = ({ label, value, unit, valueClassName = 'text-gray-900' }) => {
  const hasValue = value !== undefined && value !== null && value !== '';

  return (
    <div className="bg-white rounded-xl border border-dashed border-green-400 shadow-sm p-4 sm:p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-[15px] sm:text-[16px] font-semibold text-gray-900 leading-tight">
          {label}
        </h3>
      </div>
      <p className={`text-[30px] sm:text-[32px] font-bold leading-none ${hasValue ? valueClassName : ''}`}>
        {hasValue ? `${value}${unit || ''}` : '--'}
      </p>
    </div>
  );
};

export default PredictionCard;
