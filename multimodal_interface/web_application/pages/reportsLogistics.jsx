import React, { useState } from "react";
import { Info } from "lucide-react";
import LogisticsTabs from "../src/components/logistics/LogisticsTabs";
import WasteCollectionPanel from "../src/components/logistics/wasteCollection/WasteCollectionPanel";
import FeedstockManagement from "../src/components/logistics/feedstockManagement/FeedstockManagement";
import ChillingRoomManagement from "../src/components/logistics/chillingRoomManagement/ChillingRoomManagement";
import { useLogisticsReports } from "../src/components/logistics/useLogisticsReports";
import { SAMPLE_DATA_MODE } from "../src/components/logistics/logisticsSampleData";
import { usePageLayout } from "../src/components/layout/usePageLayout";

const TABS = [
  { id: "waste", label: "Waste Collection" },
  { id: "feedstock", label: "Feedstock Management" },
  { id: "chilling", label: "Chilling Room Management" },
];

export default function ReportsLogistics() {
  const [activeTab, setActiveTab] = useState("waste");
  const { status, data, error } = useLogisticsReports();

  usePageLayout("Logistics Service", "Reports & Analytics");

  return (
    <div className="flex-1 flex flex-col pt-5 px-4 sm:px-6 pb-5 relative">
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
    </div>
  );
}
