import React from 'react';
import { Thermometer, CalendarDays, Droplet, Gauge, Package, Scale, Recycle, Snowflake } from 'lucide-react';

const ICONS = {
  thermometer: Thermometer,
  calendar: CalendarDays,
  droplet: Droplet,
  package: Package,
  scale: Scale,
  recycle: Recycle,
  snowflake: Snowflake,
};

const formatValue = (value, unit) => {
  if (value === undefined || value === null || value === '') return '--';
  return `${value}${unit || ''}`;
};

// Current / historical metric tile. valueClassName optionally colours the
// headline value (e.g. green / purple emphasis) without changing the layout.
const KpiCard = ({ label, value, unit, icon, valueClassName = 'text-gray-900' }) => {
  const Icon = ICONS[icon] || Gauge;

  return (
    <div className="bg-white rounded-xl border border-green-300 shadow-sm p-4 sm:p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-[15px] sm:text-[16px] font-semibold text-gray-900 leading-tight">
          {label}
        </h3>
        <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-green-50 text-green-600 flex-shrink-0">
          <Icon size={20} aria-hidden="true" />
        </span>
      </div>
      <p className={`text-[30px] sm:text-[32px] font-bold leading-none ${valueClassName}`}>
        {formatValue(value, unit)}
      </p>
    </div>
  );
};

export default KpiCard;
