import { useEffect, useState } from 'react';
import {
  SAMPLE_DATA_MODE,
  EMPTY_REPORT,
  getSampleReport,
} from './logisticsSampleData';

// Coordinates logistics report data for the UI and exposes a status so the page
// can render loading / empty / error states.
//
// No production logistics endpoint currently exists, so in SAMPLE_DATA_MODE this
// returns the explicitly-labelled sample dataset. When SAMPLE_DATA_MODE is false
// and VITE_LOGISTICS_REPORTS_URL is configured, the data is fetched from that
// endpoint. No endpoint is invented here: without configuration the hook reports
// an empty (unavailable) state rather than fabricating data.
export function useLogisticsReports() {
  const [state, setState] = useState({ status: 'loading', data: null, error: null });

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      // Defer past the synchronous effect body to avoid cascading renders.
      await Promise.resolve();

      try {
        if (SAMPLE_DATA_MODE) {
          if (!cancelled) {
            setState({ status: 'success', data: getSampleReport(), error: null });
          }
          return;
        }

        const endpoint = import.meta.env.VITE_LOGISTICS_REPORTS_URL;
        if (!endpoint) {
          if (!cancelled) {
            setState({ status: 'empty', data: EMPTY_REPORT, error: null });
          }
          return;
        }

        const response = await fetch(endpoint, { cache: 'no-store' });
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const json = await response.json();
        if (!cancelled) {
          setState({ status: 'success', data: json, error: null });
        }
      } catch (err) {
        if (!cancelled) {
          setState({ status: 'error', data: null, error: err.message });
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
