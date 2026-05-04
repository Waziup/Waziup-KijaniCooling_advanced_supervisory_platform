// src/components/layout/Header.jsx

export default function Header({ title }) {
  return (
    <header className="bg-[#7CBE83] w-full h-[64px] relative flex items-center justify-between px-6 shadow-sm text-black">
      
      {/* Left Section: Logo & Title (Maintained from your code) */}
      <div className="flex items-center gap-2 z-10">
        <img 
          src="/logo.png" 
          alt="FarmBox Logo" 
          className="h-10 w-auto object-contain" 
        />
        <span className="font-bold text-xl tracking-tight hidden sm:block">
          FarmBox
        </span>
      </div>

      {/* Center Section: Dynamic Page Title (Maintained from your code) */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none">
        <h1 className="text-xl md:text-2xl font-medium tracking-wide">
          {title}
        </h1>
      </div>

      {/* Right Section: Profile/Actions (Integrated from the new section) */}
      <div className="flex items-center gap-4 z-10">
        {/* You can add Search icons or Notifications here later */}
        <div className="w-8 h-8 bg-white/20 hover:bg-white/30 transition-colors rounded-full cursor-pointer flex items-center justify-center border border-black/5">
          {/* Placeholder for Profile/User Icon */}
          <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
        </div>
      </div>

    </header>
  );
}