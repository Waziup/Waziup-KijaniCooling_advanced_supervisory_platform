import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import KpiCard from "../sharedComponents/KpiCard";
import PredictionCard from "../sharedComponents/PredictionCard";
import InsightsPanel from "../sharedComponents/InsightsPanel";
import StatusNotificationItem from "../sharedComponents/StatusNotificationItem";
import ChillingRoomTrendChart from "./ChillingRoomTrendChart";
import {
  CHILLING_ROOM_DATA,
  COOLING_STATUSES,
  POLL_INTERVAL_MS,
  getTemperatureToneClass,
} from "./chillingRoomData";

// Simulates a sensor poll: nudges the reading slightly and keeps it inside a
// plausible band. Replace with a real fetch/subscription when a sensor API
// becomes available — the rendering logic below is unchanged by the source.
const pollTemperature = (current) => {
  const next = current + (Math.random() * 0.4 - 0.2);
  return Math.round(Math.min(3.8, Math.max(0.8, next)) * 10) / 10;
};

// Chilling Room Management tab content. All values come from
// CHILLING_ROOM_DATA so the mock source can later be swapped for real API
// data without touching the markup.
const ChillingRoomManagement = () => {
  const { status, forecast, chart, insights, notifications } = CHILLING_ROOM_DATA;
  const cooling = COOLING_STATUSES[status.coolingStatusKey] || COOLING_STATUSES.offline;

  const [temperature, setTemperature] = useState(status.temperature);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTemperature((current) => pollTemperature(current));
    }, POLL_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      id="panel-chilling"
      role="tabpanel"
      aria-labelledby="tab-chilling"
      className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-5"
    >
      {/* Main analytics column (~65%) */}
      <div className="xl:col-span-2 flex flex-col gap-5">
        <section>
          <h2 className="text-[24px] font-bold text-gray-900 mb-3">
            Room Status
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <KpiCard
              label="Chilling Room Temperature"
              value={temperature}
              unit="°C"
              icon="thermometer"
              valueClassName={getTemperatureToneClass(temperature)}
            />
            <KpiCard
              label="Cooling Status"
              value={cooling.label}
              icon="snowflake"
              valueClassName={cooling.valueClassName}
            />
          </div>
        </section>

        <section>
          <h2 className="text-[24px] font-bold text-gray-900 mb-3">
            Forecast for Next 24 Hours
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <PredictionCard
              label={forecast.label}
              value={forecast.value}
              unit={forecast.unit}
            />
          </div>
        </section>

        <ChillingRoomTrendChart
          title={chart.title}
          data={chart.data}
          yDomain={chart.yDomain}
          thresholds={chart.thresholds}
          ariaLabel="Line chart of actual versus predicted chilling room temperature over 24 hours, in degrees Celsius, with safe-band threshold lines at 0 and 4 degrees."
        />
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

export default ChillingRoomManagement;
