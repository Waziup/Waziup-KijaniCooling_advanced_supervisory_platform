// Explicitly-labelled sample data for the Logistics Service Reports & Analytics
// page. This is NOT live operational data and must never be presented as such.
//
// Sample data is intentionally isolated from any production/backend source so it
// cannot silently appear as genuine measurements, forecasts or schedules. When a
// real logistics data source becomes available, set SAMPLE_DATA_MODE to false and
// provide the endpoint via VITE_LOGISTICS_REPORTS_URL (see useLogisticsReports).

export const SAMPLE_DATA_MODE = true;

export const EMPTY_REPORT = {
  kpis: [],
  predictions: [],
  trend: [],
  insights: [],
  notifications: [],
};

const SAMPLE_KPIS = [
  { id: 'outdoor-temp', label: 'Outdoor Temperature', value: 18, unit: '°C', icon: 'thermometer' },
  { id: 'weekly-avg-temp', label: 'Weekly Average Temperature', value: 24, unit: '°C', icon: 'calendar' },
  { id: 'refills', label: 'Refills', value: 1, unit: '', icon: 'droplet' },
];

const SAMPLE_PREDICTIONS = [
  { id: 'tomorrow-temp', label: "Tomorrow's Temperature", value: 19, unit: '°C' },
  { id: 'next-week-avg-temp', label: "Next Week's Average Temperature", value: 27, unit: '°C' },
  { id: 'delivery-success', label: 'Delivery Success Rate', value: 90, unit: '%' },
];

const SAMPLE_TREND = [
  { day: 'Mon', actual: 42, predicted: 40 },
  { day: 'Tue', actual: 48, predicted: 45 },
  { day: 'Wed', actual: 39, predicted: 44 },
  { day: 'Thu', actual: 55, predicted: 50 },
  { day: 'Fri', actual: 61, predicted: 58 },
  { day: 'Sat', actual: 58, predicted: 62 },
  { day: 'Sun', actual: 67, predicted: 64 },
];

const SAMPLE_INSIGHTS = [
  {
    id: 'feedstock-duration',
    title: 'Feedstock expected to last',
    value: '6 hours',
    description: 'Based on current consumption.',
    icon: 'timer',
  },
  {
    id: 'weather-recommendation',
    title: 'Weather recommendation',
    recommendation: 'Increase loading before rain.',
    reference: '72% chance of heavy rainfall in the next 36 hours.',
    icon: 'cloud-rain',
  },
  {
    id: 'next-collection',
    title: 'Next waste collections',
    value: '08:00 am today',
    description: 'Recommended collection start.',
    icon: 'truck',
  },
];

// Timestamps are intentionally null: no data source currently provides them and
// they must not be invented. The UI renders an explicit "Time unavailable" state.
const SAMPLE_NOTIFICATIONS = [
  {
    id: 'n-rain',
    severity: 'warning',
    title: 'High rainfall forecast',
    message: 'Increase loading recommended.',
    timestamp: null,
  },
  {
    id: 'n-feedstock',
    severity: 'success',
    title: 'Feedstock delivery completed',
    message: '2 tonnes delivered successfully.',
    timestamp: null,
  },
  {
    id: 'n-report',
    severity: 'info',
    title: 'Monthly waste collection report ready',
    message: 'June monthly report generated.',
    timestamp: null,
  },
];

export function getSampleReport() {
  return {
    kpis: SAMPLE_KPIS,
    predictions: SAMPLE_PREDICTIONS,
    trend: SAMPLE_TREND,
    insights: SAMPLE_INSIGHTS,
    notifications: SAMPLE_NOTIFICATIONS,
  };
}
