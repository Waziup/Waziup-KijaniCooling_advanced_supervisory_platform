import React from 'react';

// Section navigation for the Logistics Service page. Implements the ARIA tabs
// pattern with keyboard support (Left/Right/Home/End).
const LogisticsTabs = ({ tabs = [], activeTab, onChange }) => {
  const refs = React.useRef([]);

  const handleKeyDown = (event, index) => {
    let nextIndex = null;

    if (event.key === 'ArrowRight') {
      nextIndex = (index + 1) % tabs.length;
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = tabs.length - 1;
    }

    if (nextIndex !== null) {
      event.preventDefault();
      onChange(tabs[nextIndex].id);
      refs.current[nextIndex]?.focus();
    }
  };

  return (
    <div
      role="tablist"
      aria-label="Logistics sections"
      className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full"
    >
      {tabs.map((tab, index) => {
        const selected = tab.id === activeTab;

        return (
          <button
            key={tab.id}
            ref={(el) => {
              refs.current[index] = el;
            }}
            type="button"
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={selected}
            aria-controls={`panel-${tab.id}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(tab.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={`w-full text-center px-4 py-2 rounded-md text-[14px] font-semibold shadow-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-700 ${
              selected
                ? 'bg-[#F8D300] text-black'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default LogisticsTabs;
