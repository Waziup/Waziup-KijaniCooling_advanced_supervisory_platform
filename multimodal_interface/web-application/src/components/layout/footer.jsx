import React from 'react';

const Footer = () => {
  return (
    <footer className="
      /* Layout & Dimensions */
      h-[40px] 
      w-full 
      
      /* Visual Styling */
      bg-[#7CBE83] 
      border-t border-[#333333]
      
      /* Centering Content */
      flex 
      items-center 
      justify-center
    ">
      <p className="text-[12px] text-gray-800 font-sans">
        © 2026 Device Manager. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;