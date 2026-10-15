import React, { useState } from "react";
import { Info } from "lucide-react";
import Sidebar from "../src/components/layout/sidebar";
import Header from "../src/components/layout/header";
import Footer from "../src/components/layout/footer";
import LogisticsTabs from "../src/components/logistics/LogisticsTabs";
import WasteCollectionPanel from "../src/components/logistics/wasteCollection/WasteCollectionPanel";
import FeedstockManagement from "../src/components/logistics/feedstockManagement/FeedstockManagement";
import ChillingRoomManagement from "../src/components/logistics/chillingRoomManagement/ChillingRoomManagement";
import { useLogisticsReports } from "../src/components/logistics/useLogisticsReports";
import { SAMPLE_DATA_MODE } from "../src/components/logistics/logisticsSampleData";

const TABS = [
  { id: "waste", label: "Waste Collection" },
  { id: "feedstock", label: "Feedstock Management" },
  { id: "chilling", label: "Chilling Room Management" },
];

export default function ReportsLogistics() {
  const [activeTab, setActiveTab] = useState("waste");
  const { status, data, error } = useLogisticsReports();

  return (
    <div className="flex flex-col h-screen overflow-hidden text-gray-900 font-sans">
      <header className="h-16 min-h-[64px] max-h-[64px] w-full flex-shrink-0 border-b border-gray-200 z-10">
        <Header title="Logistics Service" />
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 flex-shrink-0 z-20">
          <Sidebar activePage="Reports & Analytics" />
        </aside>

        <main className="flex-1 flex flex-col overflow-y-auto bg-[#E5E7EB] pt-5 px-4 sm:px-6 pb-5 relative z-10">
          <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-4">
            <LogisticsTabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />

            {SAMPLE_DATA_MODE && (
              <div
                role="status"
                className="flex items-start gap-2 rounded-lg border border-amber-300 bg-amber-50 px-4 py-2 text-[13px] text-amber-800"
              >
                <Info size={16} className="mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>
                  Preview mode: this page is showing sample data for layout purposes and
                  is not live operational data.
                </span>
              </div>
            )}

            {activeTab === "waste" && (
              <WasteCollectionPanel status={status} data={data} error={error} />
            )}

            {activeTab === "feedstock" && <FeedstockManagement />}

            {activeTab === "chilling" && <ChillingRoomManagement />}
          </div>
        </main>
      </div>

      <footer className="flex-shrink-0"><Footer /></footer>
    </div>
  );
}
