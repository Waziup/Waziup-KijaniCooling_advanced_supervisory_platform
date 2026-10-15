import React from "react";
import KpiCard from "../sharedComponents/KpiCard";
import PredictionCard from "../sharedComponents/PredictionCard";
import InsightsPanel from "../sharedComponents/InsightsPanel";
import NotificationsPanel from "../sharedComponents/NotificationsPanel";
import WasteCollectionChart from "./WasteCollectionChart";

const WasteCollectionPanel = ({ status = "success", data = null, error = null }) => {
  const kpis = data?.kpis ?? [];
  const predictions = data?.predictions ?? [];
  const trend = data?.trend ?? [];
  const insights = data?.insights ?? [];
  const notifications = data?.notifications ?? [];

  return (
    <div
      id="panel-waste"
      role="tabpanel"
      aria-labelledby="tab-waste"
      className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-5"
    >
      {/* Main analytics column */}
      <div className="xl:col-span-2 flex flex-col gap-5">
        <section>
          <h2 className="text-[24px] font-bold text-gray-900 mb-3">
            Overview Metrics
          </h2>

          {status === "loading" ? (
            <p className="text-[14px] text-gray-500">Loading metrics…</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {kpis.map((kpi) => (
                <KpiCard
                  key={kpi.id}
                  label={kpi.label}
                  value={kpi.value}
                  unit={kpi.unit}
                  icon={kpi.icon}
                />
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-[24px] font-bold text-gray-900 mb-3">
            Predictions
          </h2>

          {status === "loading" ? (
            <p className="text-[14px] text-gray-500">Loading predictions…</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {predictions.map((prediction) => (
                <PredictionCard
                  key={prediction.id}
                  label={prediction.label}
                  value={prediction.value}
                  unit={prediction.unit}
                />
              ))}
            </div>
          )}
        </section>

        <WasteCollectionChart data={trend} status={status} error={error} />
      </div>

      {/* Right-hand column */}
      <div className="flex flex-col gap-5">
        <InsightsPanel insights={insights} status={status} />
        <NotificationsPanel notifications={notifications} status={status} />
      </div>
    </div>
  );
};

export default WasteCollectionPanel;
