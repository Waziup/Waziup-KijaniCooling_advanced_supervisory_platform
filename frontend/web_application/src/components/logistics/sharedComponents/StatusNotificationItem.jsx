import React from 'react';
import { AlertTriangle, CheckCircle2, Info } from 'lucide-react';

// Severity is communicated with an icon AND a text label, never by colour alone.
const SEVERITY = {
  danger: { Icon: AlertTriangle, label: 'Warning', tone: 'text-red-600 bg-red-50' },
  success: { Icon: CheckCircle2, label: 'Success', tone: 'text-green-700 bg-green-50' },
  info: { Icon: Info, label: 'Information', tone: 'text-blue-700 bg-blue-50' },
};

// Compact notification row for the logistics tabs (Feedstock, Chilling Room):
// colored icon badge, bold title, gray description. No timestamp.
const StatusNotificationItem = ({ severity = 'info', title, message }) => {
  const { Icon, label, tone } = SEVERITY[severity] || SEVERITY.info;

  return (
    <li className="flex gap-3 rounded-lg border border-gray-100 p-3">
      <span
        className={`flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 ${tone}`}
      >
        <Icon size={16} aria-hidden="true" />
        <span className="sr-only">{label}</span>
      </span>

      <div className="min-w-0">
        <h4 className="text-[14px] font-semibold text-gray-900">{title}</h4>
        <p className="text-[13px] text-gray-600 mt-0.5">{message}</p>
      </div>
    </li>
  );
};

export default StatusNotificationItem;
