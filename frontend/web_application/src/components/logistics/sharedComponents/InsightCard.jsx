import React from 'react';

// Single insight entry. Supports either a headline value (e.g. "6 hours") or a
// recommendation string, plus optional supporting/reference text. The icon
// badge tone (green by default, or blue) is optional per insight.
const ICON_TONES = {
  green: 'text-green-600 border border-green-100',
  blue: 'text-blue-600 border border-blue-100',
  amber: 'text-amber-600 border border-amber-100',
};

const InsightCard = ({
  title,
  value,
  recommendation,
  description,
  reference,
  icon: Icon,
  tone = 'green',
}) => (
  <div className="flex gap-3 rounded-lg border border-green-100 bg-green-50/40 p-3">
    {Icon && (
      <span
        className={`flex items-center justify-center w-9 h-9 rounded-full bg-white flex-shrink-0 ${ICON_TONES[tone] || ICON_TONES.green}`}
      >
        <Icon size={18} aria-hidden="true" />
      </span>
    )}
    <div className="min-w-0">
      <h4 className="text-[14px] font-semibold text-gray-900">{title}</h4>

      {value && (
        <p className="text-[18px] font-bold text-gray-900 leading-tight mt-0.5">{value}</p>
      )}

      {recommendation && (
        <p className="text-[14px] font-semibold text-gray-800 mt-0.5">{recommendation}</p>
      )}

      {reference && <p className="text-[13px] text-gray-600 mt-1">{reference}</p>}
      {description && <p className="text-[13px] text-gray-600 mt-1">{description}</p>}
    </div>
  </div>
);

export default InsightCard;
