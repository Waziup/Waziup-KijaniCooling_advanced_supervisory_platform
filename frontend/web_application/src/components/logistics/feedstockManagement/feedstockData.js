// Mock data for the Feedstock Management tab.
//
// This is NOT live operational data. It is isolated in its own file so the
// markup in FeedstockManagement never needs to change when a real logistics
// data source becomes available: swap the import for an API-backed hook and
// keep the same object shape.

export const FEEDSTOCK_DATA = {
  kpis: [
    {
      id: 'current-feedstock',
      label: 'Current Feedstock',
      value: 1000,
      unit: ' kg',
      icon: 'package',
    },
    {
      id: 'daily-avg-consumption',
      label: 'Daily average Consumption',
      value: 2200,
      unit: ' kg',
      icon: 'scale',
    },
    {
      id: 'weekly-avg-demand',
      label: 'Weekly average Demand',
      value: 2400,
      unit: ' kg/day',
      icon: 'calendar',
      valueClassName: 'text-green-600',
    },
    {
      id: 'digestate-produced',
      label: 'Digestate Produced',
      value: 1500,
      unit: ' kg/day',
      icon: 'recycle',
      valueClassName: 'text-[#7A71E6]',
    },
  ],

  predictions: [
    {
      id: 'tomorrows-demand',
      label: "Tomorrow's Feedstock Demand",
      value: 1120,
      unit: ' kg',
    },
    {
      id: 'next-weeks-demand',
      label: "Next Week's Demand",
      value: 2560,
      unit: ' kg/day',
      valueClassName: 'text-green-600',
    },
  ],

  charts: {
    consumption: {
      title: 'Feedstock consumption',
      actualName: 'Actual Consumption',
      predictedName: 'Predicted Consumption',
      ariaLabel:
        'Line chart of actual versus predicted feedstock consumption over the week, in kilograms, rising from 1000 to 4000.',
      yDomain: [1000, 4000],
      unit: ' kg',
      data: [
        { day: 'Mon', actual: 1800, predicted: 1750 },
        { day: 'Tue', actual: 2000, predicted: 2050 },
        { day: 'Wed', actual: 1950, predicted: 2200 },
        { day: 'Thu', actual: 2300, predicted: 2400 },
        { day: 'Fri', actual: 2650, predicted: 2600 },
        { day: 'Sat', actual: 2550, predicted: 2800 },
        { day: 'Sun', actual: 2900, predicted: 3000 },
      ],
    },
    production: {
      title: 'Digestate Production',
      actualName: 'Actual Production',
      predictedName: 'Predicted Production',
      ariaLabel:
        'Line chart of actual versus predicted digestate production over the week, in kilograms, rising from 500 to 2000.',
      yDomain: [500, 2000],
      unit: ' kg',
      data: [
        { day: 'Mon', actual: 700, predicted: 680 },
        { day: 'Tue', actual: 820, predicted: 850 },
        { day: 'Wed', actual: 950, predicted: 930 },
        { day: 'Thu', actual: 1100, predicted: 1080 },
        { day: 'Fri', actual: 1250, predicted: 1220 },
        { day: 'Sat', actual: 1400, predicted: 1380 },
        { day: 'Sun', actual: 1550, predicted: 1520 },
      ],
    },
  },

  insights: [
    {
      id: 'biogas-increase',
      title: 'Biogas production to increase by 10% over the next 8 hours',
      icon: 'trending-up',
      tone: 'green',
    },
    {
      id: 'continuous-flow',
      title: 'Continuous Flow Optimization',
      description: 'Current feeding rate supports the recommended HRT.',
      icon: 'waves',
      tone: 'blue',
    },
    {
      id: 'feed-timing',
      title: 'Feed Timing',
      description: 'Continue the current feeding strategy to maximize gas production.',
      icon: 'clock',
      tone: 'blue',
    },
  ],

  notifications: [
    {
      id: 'low-substrate',
      severity: 'danger',
      title: 'Low substrate levels',
      message: 'Tank level dropped below 60%',
    },
    {
      id: 'consumption-change',
      severity: 'success',
      title: 'Change in feedstock consumption',
      message: 'Feedstock usage is above normal.',
    },
    {
      id: 'monthly-report',
      severity: 'info',
      title: 'Monthly feedstock demand report is ready',
      message: 'June week 2 monthly report generated',
    },
  ],
};
