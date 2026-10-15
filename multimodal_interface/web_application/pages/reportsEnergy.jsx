import React from "react";
import Sidebar from "../src/components/layout/sidebar";
import Header from "../src/components/layout/header";
import Footer from "../src/components/layout/footer";

export default function ReportsEnergy() {
  return (
    <div className="flex flex-col h-screen overflow-hidden text-gray-900 font-sans">
      <header className="h-16 min-h-[64px] max-h-[64px] w-full flex-shrink-0 border-b border-gray-200 z-10">
        <Header title="Reports & Analytics" />
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 flex-shrink-0 z-20">
          <Sidebar activePage="Reports & Analytics" />
        </aside>

        <main className="flex-1 flex flex-col overflow-y-auto bg-[#E5E7EB] pt-0 pr-12 pb-5 pl-6 relative z-10">
          <div className="w-full max-w-[1600px] h-full flex flex-col gap-3">
            <section className="flex-shrink-0">
              <h2 className="text-[32px] font-bold text-gray-900 mb-3 mt-2 tracking-wide">
                Energy
              </h2>

              <div className="bg-white rounded-xl shadow-sm border border-green-300 p-6">
                <p className="text-[18px] text-gray-700 leading-relaxed">
                  Energy reports and analytics will be displayed here.
                </p>
              </div>
            </section>
          </div>
        </main>
      </div>

      <footer className="flex-shrink-0"><Footer /></footer>
    </div>
  );
}
