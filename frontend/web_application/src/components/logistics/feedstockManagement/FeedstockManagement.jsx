import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import KpiCard from "../sharedComponents/KpiCard";
import PredictionCard from "../sharedComponents/PredictionCard";
import InsightsPanel from "../sharedComponents/InsightsPanel";
import StatusNotificationItem from "../sharedComponents/StatusNotificationItem";
import FeedstockTrendChart from "./FeedstockTrendChart";
import { FEEDSTOCK_DATA } from "./feedstockData";

// Feedstock Management tab content. All values come from FEEDSTOCK_DATA so the
// mock source can later be swapped for real API data without touching markup.
const FeedstockManagement = () => {
  const { kpis, predictions, charts, insights, notifications } = FEEDSTOCK_DATA;

  return (
    <div
      id="panel-feedstock"
      role="tabpanel"
      aria-labelledby="tab-feedstock"
      className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-5"
    >
      {/* Main analytics column (~65%) */}
      <div className="xl:col-span-2 flex flex-col gap-5">
        <section>
          <h2 className="text-[24px] font-bold text-gray-900 mb-3">
            Overview Metrics
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {kpis.map((kpi) => (
              <KpiCard
                key={kpi.id}
                label={kpi.label}
                value={kpi.value}
                unit={kpi.unit}
                icon={kpi.icon}
                valueClassName={kpi.valueClassName}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-[24px] font-bold text-gray-900 mb-3">
            Predictions
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {predictions.map((prediction) => (
              <PredictionCard
                key={prediction.id}
                label={prediction.label}
                value={prediction.value}
                unit={prediction.unit}
                valueClassName={prediction.valueClassName}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-[24px] font-bold text-gray-900 mb-3">
            Trend Graphs
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <FeedstockTrendChart
              title={charts.consumption.title}
              data={charts.consumption.data}
              yDomain={charts.consumption.yDomain}
              unit={charts.consumption.unit}
              actualName={charts.consumption.actualName}
              predictedName={charts.consumption.predictedName}
              ariaLabel={charts.consumption.ariaLabel}
            />
            <FeedstockTrendChart
              title={charts.production.title}
              data={charts.production.data}
              yDomain={charts.production.yDomain}
              unit={charts.production.unit}
              actualName={charts.production.actualName}
              predictedName={charts.production.predictedName}
              ariaLabel={charts.production.ariaLabel}
            />
          </div>
        </section>
      </div>

      {/* Right-hand column (~35%) */}
      <div className="flex flex-col gap-5">
        <InsightsPanel insights={insights} />

        <section className="bg-white rounded-xl border border-green-300 shadow-sm p-5 flex flex-col">
          <h3 className="text-[20px] font-bold text-gray-900 mb-3">Notifications</h3>

          <ul className="flex flex-col gap-3">
            {notifications.map((notification) => (
              <StatusNotificationItem
                key={notification.id}
                severity={notification.severity}
                title={notification.title}
                message={notification.message}
              />
            ))}
          </ul>

          <Link
            to="/notifications"
            className="mt-4 w-full inline-flex items-center justify-center gap-1 rounded-md border border-blue-300 bg-white hover:bg-blue-50 px-4 py-2 text-[14px] font-bold text-blue-700 shadow-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-700"
          >
            See all notifications
            <ChevronRight size={16} aria-hidden="true" />
          </Link>
        </section>
      </div>
    </div>
  );
};

export default FeedstockManagement;
