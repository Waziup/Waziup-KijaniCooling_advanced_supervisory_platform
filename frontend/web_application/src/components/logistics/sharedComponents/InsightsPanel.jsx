import React from 'react';
import { Timer, CloudRain, Truck, Scale, TrendingUp, Waves, Clock, Thermometer, AlertTriangle, Wind } from 'lucide-react';
import InsightCard from './InsightCard';

const ICONS = {
  timer: Timer,
  'cloud-rain': CloudRain,
  truck: Truck,
  scale: Scale,
  'trending-up': TrendingUp,
  waves: Waves,
  clock: Clock,
  thermometer: Thermometer,
  'alert-triangle': AlertTriangle,
  wind: Wind,
};

const InsightsPanel = ({ insights = [], status = 'success' }) => {
  const hasInsights = Array.isArray(insights) && insights.length > 0;

  return (
    <section className="bg-white rounded-xl border border-green-300 shadow-sm p-5 flex flex-col">
      <h3 className="text-[20px] font-bold text-gray-900 mb-3">Insights</h3>

      {status === 'loading' && (
        <p className="text-[14px] text-gray-500">Loading insights…</p>
      )}

      {status !== 'loading' && !hasInsights && (
        <p className="text-[14px] text-gray-500">No insights available.</p>
      )}

      {status !== 'loading' && hasInsights && (
        <div className="flex flex-col gap-3">
          {insights.map((insight) => (
            <InsightCard
              key={insight.id}
              title={insight.title}
              value={insight.value}
              recommendation={insight.recommendation}
              description={insight.description}
              reference={insight.reference}
              icon={ICONS[insight.icon]}
              tone={insight.tone}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default InsightsPanel;
