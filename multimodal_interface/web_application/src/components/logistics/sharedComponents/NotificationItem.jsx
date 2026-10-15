import React from 'react';
import { AlertTriangle, CheckCircle2, Info } from 'lucide-react';

// Severity is communicated with an icon AND a text label, never by colour alone.
const SEVERITY = {
  warning: { Icon: AlertTriangle, label: 'Warning', tone: 'text-amber-700 bg-amber-50' },
  success: { Icon: CheckCircle2, label: 'Success', tone: 'text-green-700 bg-green-50' },
  info: { Icon: Info, label: 'Information', tone: 'text-blue-700 bg-blue-50' },
};

const NotificationItem = ({ severity = 'info', title, message, timestamp }) => {
  const { Icon, label, tone } = SEVERITY[severity] || SEVERITY.info;

  return (
    <li className="flex gap-3 rounded-lg border border-gray-100 p-3">
      <span
        className={`flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 ${tone}`}
      >
        <Icon size={16} aria-hidden="true" />
      </span>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
          <span className="text-[11px] font-bold uppercase tracking-wide text-gray-500">
            {label}
          </span>
          <h4 className="text-[14px] font-semibold text-gray-900">{title}</h4>
        </div>

        <p className="text-[13px] text-gray-600 mt-0.5">{message}</p>
        <p className="text-[12px] text-gray-400 mt-1">
          {timestamp || 'Time unavailable'}
        </p>
      </div>
    </li>
  );
};

export default NotificationItem;
