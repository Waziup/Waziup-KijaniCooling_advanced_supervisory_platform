// src/components/layout/Header.jsx

export default function Header({ title }) {
  return (
    <header className="bg-[#7CBE83] w-full h-[64px] relative flex items-center justify-between gap-2 pl-16 pr-3 sm:pr-6 lg:px-6 shadow-sm text-black">

      {/* Left Section: Logo & Title (pl-16 below lg leaves room for the sidebar's menu button) */}
      <div className="flex items-center gap-2 z-10 flex-shrink-0">
        <img 
          src="/logo.png" 
          alt="FarmBox Logo" 
          className="h-8 sm:h-10 w-auto object-contain"
        />
        <span className="font-bold text-xl tracking-tight hidden sm:block">
          FarmBox
        </span>
      </div>

      {/* Center Section: Dynamic Page Title (40px, centred over the full width from lg; in-flow and smaller below) */}
      <div className="flex-1 min-w-0 text-center pointer-events-none lg:absolute lg:left-1/2 lg:top-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 lg:w-full">
        <h1 className="text-[16px] sm:text-[28px] lg:text-[40px] font-medium sm:tracking-wide leading-tight lg:leading-none break-words hyphens-auto">
          {title}
        </h1>
      </div>

      {/* Right Section: Profile/Actions */}
      <div className="flex items-center gap-4 z-10 flex-shrink-0">
        <div className="w-8 h-8 bg-white/20 hover:bg-white/30 transition-colors rounded-full cursor-pointer flex items-center justify-center border border-black/5">
          {/* Placeholder for Profile/User Icon */}
          <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
        </div>
      </div>

    </header>
  );
}