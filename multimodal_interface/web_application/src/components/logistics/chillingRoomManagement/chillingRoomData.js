// Mock data and status logic for the Chilling Room Management tab.
//
// This is NOT live operational data. It is isolated in its own file so the
// markup in ChillingRoomManagement never needs to change when a real sensor
// source becomes available: swap the import for an API/polling hook and keep
// the same object shape.

// Safe storage band for produce: 0-4 °C. Values approaching 4 °C are amber.
export const SAFE_MIN_TEMP = 0;
export const SAFE_MAX_TEMP = 4;
export const WARN_TEMP = 3.5;
export const POLL_INTERVAL_MS = 30000;

// Colour-codes a temperature reading: green within the safe band, amber when
// approaching the upper limit, red above the limit (or below freezing).
export const getTemperatureToneClass = (value) => {
  if (value > SAFE_MAX_TEMP || value < SAFE_MIN_TEMP) return 'text-red-600';
  if (value >= WARN_TEMP) return 'text-amber-600';
  return 'text-green-600';
};

// Cooling system status states. Each maps to a label and value colour.
export const COOLING_STATUSES = {
  active: { label: 'Active', valueClassName: 'text-blue-600' },
  idle: { label: 'Idle', valueClassName: 'text-gray-500' },
  fault: { label: 'Fault', valueClassName: 'text-red-600' },
  offline: { label: 'Offline', valueClassName: 'text-gray-400' },
};

export const CHILLING_ROOM_DATA = {
  status: {
    temperature: 2, // °C — current live reading (simulated)
    coolingStatusKey: 'active',
  },

  forecast: {
    label: 'Predicted Chilling Room Temperature (Next 24 Hours)',
    value: 3,
    unit: ' °C',
  },

  chart: {
    title: 'Chilling Room Temperature Trend Graphs',
    yDomain: [-2, 10],
    thresholds: [
      { value: 4, label: 'Upper safe limit 4°C', stroke: '#dc2626' },
      { value: 0, label: 'Lower safe limit 0°C', stroke: '#2563eb' },
    ],
    // Past hours carry `actual`; future hours carry `predicted`. Hour 12:00
    // ("now") has both so the two series join seamlessly. Forecast stays
    // within the safe band — consistent with the ~2 °C live reading.
    data: [
      { hour: '00:00', actual: 2.0, predicted: null },
      { hour: '01:00', actual: 2.1, predicted: null },
      { hour: '02:00', actual: 1.9, predicted: null },
      { hour: '03:00', actual: 1.8, predicted: null },
      { hour: '04:00', actual: 2.0, predicted: null },
      { hour: '05:00', actual: 2.2, predicted: null },
      { hour: '06:00', actual: 2.4, predicted: null },
      { hour: '07:00', actual: 2.3, predicted: null },
      { hour: '08:00', actual: 2.1, predicted: null },
      { hour: '09:00', actual: 2.0, predicted: null },
      { hour: '10:00', actual: 2.2, predicted: null },
      { hour: '11:00', actual: 2.3, predicted: null },
      { hour: '12:00', actual: 2.1, predicted: 2.2 },
      { hour: '13:00', actual: null, predicted: 2.4 },
      { hour: '14:00', actual: null, predicted: 2.6 },
      { hour: '15:00', actual: null, predicted: 2.9 },
      { hour: '16:00', actual: null, predicted: 3.1 },
      { hour: '17:00', actual: null, predicted: 3.0 },
      { hour: '18:00', actual: null, predicted: 2.8 },
      { hour: '19:00', actual: null, predicted: 2.7 },
      { hour: '20:00', actual: null, predicted: 2.9 },
      { hour: '21:00', actual: null, predicted: 3.0 },
      { hour: '22:00', actual: null, predicted: 2.8 },
      { hour: '23:00', actual: null, predicted: 2.6 },
    ],
  },

  insights: [
    {
      id: 'temp-stable',
      title: 'Temperature stable for 8 hours',
      value: '8 hours',
      description: 'Within the recommended storage range.',
      icon: 'thermometer',
      tone: 'green',
    },
    {
      id: 'inspect-chiller',
      title: 'Inspect chiller unit',
      description: 'Cooling performance has declined over the past 48 hours.',
      icon: 'alert-triangle',
      tone: 'amber',
    },
    {
      id: 'efficiency-check',
      title: 'Cooling efficiency check',
      value: 'Now',
      description: 'Inspect airflow.',
      icon: 'wind',
      tone: 'blue',
    },
  ],

  notifications: [
    {
      id: 'high-temp',
      severity: 'danger',
      title: 'High room temperatures',
      message: 'Exceeded 4°C; immediate action recommended.',
    },
    {
      id: 'temp-restored',
      severity: 'success',
      title: 'Temperature Restored',
      message: 'Returned to the safe range.',
    },
    {
      id: 'spoilage-risk',
      severity: 'info',
      title: 'Spoilage Risk',
      message: 'Extended exposure to elevated temperatures may affect stored products.',
    },
  ],
};
