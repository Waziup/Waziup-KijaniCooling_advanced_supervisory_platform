// src/components/dashboard/DashboardCard.jsx
import React from 'react';

const DashboardCard = ({ title, children }) => {
  return (
    <div className="bg-white rounded-2xl border-2 border-green-100 shadow-sm h-full flex flex-col overflow-hidden">
      {/* Padding Top: 16px (pt-4)
          Padding Bottom: 8px (pb-2) - halved as requested
      */}
      <div className="px-6 pt-4 pb-2">
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">
          {title}
        </h3>
      </div>
      
      {/* Content Area */}
      <div className="px-6 flex-grow pb-4">
        {children}
      </div>
    </div>
  );
};

export default DashboardCard;