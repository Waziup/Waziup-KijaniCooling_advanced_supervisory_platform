import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import ReportsNavGroup from './ReportsNavGroup';

const Sidebar = ({ activePage }) => {
  // Below lg the sidebar is an off-canvas drawer. Each page mounts its own
  // Sidebar, so navigating to another page closes the drawer automatically.
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKeyDown = (event) => event.key === 'Escape' && setDrawerOpen(false);
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [drawerOpen]);

  const mainNav = [
    { name: 'Dashboard', icon: '/dashboard.svg', path: '/' },
    { name: 'Device Management', icon: '/device-management.svg', path: '/devices' },
    { name: 'Notifications', icon: '/notifications.svg', path: '/notifications' },
    // Rendered by its own component (sub-pages, expand/collapse)
    { name: 'Reports & Analytics', Group: ReportsNavGroup },
    { name: 'Troubleshooting', icon: '/troubleshooting.svg', path: '/troubleshooting' },
  ];

  const bottomNav = [
    { name: 'Help', icon: '/help.svg', path: '/help' },
    { name: 'Settings', icon: '/settings.svg', path: '/settings' },
  ];

  const isActive = (name) => activePage?.toLowerCase() === name.toLowerCase();

  return (
    <>
    {/* Drawer toggle: sits over the header's left edge on small screens */}
    <button
      type="button"
      onClick={() => setDrawerOpen((open) => !open)}
      aria-label={drawerOpen ? 'Close navigation menu' : 'Open navigation menu'}
      aria-expanded={drawerOpen}
      aria-controls="app-sidebar"
      className="lg:hidden fixed top-3 left-3 z-50 w-10 h-10 flex items-center justify-center rounded-md text-black hover:bg-black/10 transition-colors"
    >
      {drawerOpen ? <X size={24} /> : <Menu size={24} />}
    </button>

    {drawerOpen && (
      <div
        className="lg:hidden fixed inset-0 top-[64px] z-30 bg-black/40"
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />
    )}

    <aside
      id="app-sidebar"
      className={`fixed left-0 top-[64px] w-[265px] h-[calc(100vh-64px)] bg-[#7CBE83] flex flex-col z-40 border-r border-black/5 overflow-y-auto transition-[transform,visibility] duration-200 lg:translate-x-0 lg:visible ${
        drawerOpen ? 'translate-x-0' : '-translate-x-full invisible'
      }`}
    >

      {/* Main Links */}
      <nav className="flex-1 px-4 pt-6 space-y-1">
        {mainNav.map((item) => (
          item.Group ? (
            <item.Group key={item.name} active={isActive(item.name)} />
          ) : (
            <div key={item.name}>
              <Link
                to={item.path}
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
              </Link>
            </div>
          )
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
    </>
  );
};

export default Sidebar;
