import React from "react";
import { usePageLayout } from "../src/components/layout/usePageLayout";

export default function ReportsEnergy() {
  usePageLayout("Reports & Analytics", "Reports & Analytics");

  return (
    <div className="flex-1 flex flex-col pt-0 px-4 sm:pr-12 sm:pl-6 pb-5 relative">
      <div className="w-full max-w-[1600px] lg:h-full flex flex-col gap-3">
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
    </div>
  );
}
