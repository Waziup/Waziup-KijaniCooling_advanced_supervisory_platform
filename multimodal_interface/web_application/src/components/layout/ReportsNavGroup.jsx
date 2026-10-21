import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const REPORTS_NAV = {
  name: 'Reports & Analytics',
  icon: '/reports.svg',
  path: '/reports',
  children: [
    { name: 'Logistics', icon: '/logistics.svg', path: '/reports/logistics' },
    { name: 'Energy', icon: '/energy.svg', path: '/reports/energy' },
  ],
};

// Expandable "Reports & Analytics" sidebar item with its report sub-pages.
// Starts open on /reports/* routes; `active` highlights the parent item.
const ReportsNavGroup = ({ active }) => {
  const location = useLocation();
  const [open, setOpen] = useState(
    () => location.pathname.startsWith(REPORTS_NAV.path)
  );

  const isChildActive = (path) => location.pathname === path;

  return (
    <div>
      <Link
        to={REPORTS_NAV.path}
        onClick={() => setOpen((isOpen) => !isOpen)}
        aria-expanded={open}
        className={`flex items-center gap-4 px-3 py-3 rounded-md cursor-pointer transition-all ${
          active
            ? "bg-[#F8D300] shadow-sm"
            : "hover:bg-black/5"
        }`}
      >
        <img src={REPORTS_NAV.icon} alt="" className="w-5 h-5 opacity-90" />
        <span className="text-[14px] font-semibold text-black flex-1">
          {REPORTS_NAV.name}
        </span>
        <svg
          className={`w-4 h-4 text-black/70 transition-transform ${open ? "rotate-90" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </Link>

      {/* Indented sub-items */}
      {open && (
        <div className="mt-1 space-y-1 pl-6">
          {REPORTS_NAV.children.map((child) => (
            <Link
              key={child.name}
              to={child.path}
              className={`flex items-center gap-3 pl-4 pr-3 py-2 rounded-md cursor-pointer transition-all border-l-2 ${
                isChildActive(child.path)
                  ? "bg-[#F8D300] shadow-sm border-black/30"
                  : "hover:bg-black/5 border-black/10"
              }`}
            >
              <img src={child.icon} alt="" className="w-5 h-5 opacity-90" />
              <span className="text-[14px] font-semibold text-black">
                {child.name}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportsNavGroup;
