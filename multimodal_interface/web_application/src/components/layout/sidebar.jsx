import React from 'react';
import { Link } from 'react-router-dom'; // 1. Import Link

const Sidebar = ({ activePage }) => {
  const mainNav = [
    // 2. Add a 'path' property to tell the router where to go
    { name: 'Dashboard', icon: '/dashboard.svg', path: '/' },
    { name: 'Device Management', icon: '/device-management.svg', path: '/devices' },
    { name: 'Notifications', icon: '/notifications.svg', path: '/notifications' },
    { name: 'Reports & Analytics', icon: '/reports.svg', path: '/reports' },
    { name: 'Troubleshooting', icon: '/troubleshooting.svg', path: '/troubleshooting' },
  ];

  const bottomNav = [
    { name: 'Help', icon: '/help.svg', path: '/help' },
    { name: 'Settings', icon: '/settings.svg', path: '/settings' },
  ];

  const isActive = (name) => activePage?.toLowerCase() === name.toLowerCase();

  return (
    <aside className="fixed left-0 top-[64px] w-[265px] h-[calc(100vh-64px)] bg-[#7CBE83] flex flex-col z-40 border-r border-black/5">
      
      {/* Main Links */}
      <nav className="flex-1 px-4 pt-6 space-y-1">
        {mainNav.map((item) => (
          // 3. Change div to Link and use the 'to' prop
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
            <span className={`text-[14px] font-semibold text-black`}>
              {item.name}
            </span>
          </Link>
        ))}
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