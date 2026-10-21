import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ activePage }) => {
  const location = useLocation();
  const [reportsOpen, setReportsOpen] = useState(
    () => location.pathname.startsWith('/reports')
  );

  const mainNav = [
    { name: 'Dashboard', icon: '/dashboard.svg', path: '/' },
    { name: 'Device Management', icon: '/device-management.svg', path: '/devices' },
    { name: 'Notifications', icon: '/notifications.svg', path: '/notifications' },
    {
      name: 'Reports & Analytics',
      icon: '/reports.svg',
      path: '/reports',
      children: [
        { name: 'Logistics', icon: '/logistics.svg', path: '/reports/logistics' },
        { name: 'Energy', icon: '/energy.svg', path: '/reports/energy' },
      ],
    },
    { name: 'Troubleshooting', icon: '/troubleshooting.svg', path: '/troubleshooting' },
  ];

  const bottomNav = [
    { name: 'Help', icon: '/help.svg', path: '/help' },
    { name: 'Settings', icon: '/settings.svg', path: '/settings' },
  ];

  const isActive = (name) => activePage?.toLowerCase() === name.toLowerCase();
  const isChildActive = (path) => location.pathname === path;

  return (
    <aside className="fixed left-0 top-[64px] w-[265px] h-[calc(100vh-64px)] bg-[#7CBE83] flex flex-col z-40 border-r border-black/5">
      
      {/* Main Links */}
      <nav className="flex-1 px-4 pt-6 space-y-1">
        {mainNav.map((item) => {
          const hasChildren = item.children?.length > 0;

          return (
            <div key={item.name}>
              <Link
                to={item.path}
                onClick={() => hasChildren && setReportsOpen((open) => !open)}
                className={`flex items-center gap-4 px-3 py-3 rounded-md cursor-pointer transition-all ${
                  isActive(item.name)
                    ? "bg-[#F8D300] shadow-sm"
                    : "hover:bg-black/5"
                }`}
              >
                <img src={item.icon} alt="" className="w-5 h-5 opacity-90" />
                <span className={`text-[14px] font-semibold text-black flex-1`}>
                  {item.name}
                </span>
                {hasChildren && (
                  <svg
                    className={`w-4 h-4 text-black/70 transition-transform ${reportsOpen ? "rotate-90" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </Link>

              {/* Indented sub-items */}
              {hasChildren && reportsOpen && (
                <div className="mt-1 space-y-1 pl-6">
                  {item.children.map((child) => (
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
        })}
      </nav>

      {/* Bottom Links */}
      <div className="px-4 pb-8 space-y-1 border-t border-black/10 pt-4">
        {bottomNav.map((item) => (
          <Link 
            key={item.name} 
            to={item.path}
            className={`flex items-center gap-4 px-3 py-3 rounded-md cursor-pointer transition-all ${
              isActive(item.name) 
                ? "bg-[#F8D300] shadow-sm" 
                : "hover:bg-black/5"
            }`}
          >
            <img src={item.icon} alt="" className="w-5 h-5 opacity-90" />
            <span className="text-[14px] font-semibold text-black">{item.name}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
