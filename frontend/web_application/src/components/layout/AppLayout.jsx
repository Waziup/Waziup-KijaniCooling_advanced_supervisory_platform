import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./sidebar";
import Header from "./header";
import Footer from "./footer";

// Shared shell for every routed page: header, sidebar, scrolling main, footer.
// Pages render only their content and set the header title and highlighted
// nav item with usePageLayout(title, activePage).
export default function AppLayout() {
  const { pathname } = useLocation();
  const [page, setPage] = useState({ title: "", activePage: "" });

  return (
    <div className="flex flex-col h-screen overflow-hidden text-gray-900 font-sans">
      <div className="h-16 min-h-[64px] max-h-[64px] w-full flex-shrink-0 border-b border-gray-200 z-10">
        <Header title={page.title} />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Spacer for the fixed 265px sidebar. w-0 (not hidden) below lg so the drawer still renders. */}
        <aside className="w-0 lg:w-[265px] flex-shrink-0 z-20">
          {/* Keyed by path so the mobile drawer closes after navigating */}
          <Sidebar key={pathname} activePage={page.activePage} />
        </aside>

        <main className="flex-1 flex flex-col overflow-y-auto bg-[#E5E7EB] relative">
          <Outlet context={setPage} />
        </main>
      </div>

      <div className="flex-shrink-0"><Footer /></div>
    </div>
  );
}
