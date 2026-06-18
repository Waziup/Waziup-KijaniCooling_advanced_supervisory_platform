import React from "react";
import Sidebar from "../src/components/layout/Sidebar";
import Header from "../src/components/layout/Header";
import Footer from "../src/components/layout/Footer";

export default function ReportsAndAnalytics() {
  return (
    <div className="flex flex-col h-screen overflow-hidden text-gray-900 font-sans">
      {/* Global Header */}
      <header className="h-16 min-h-[64px] max-h-[64px] w-full flex-shrink-0 border-b border-gray-200 z-10">
        <Header title="Reports & Analytics" />
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0 z-20">
          <Sidebar activePage="Reports & Analytics" />
        </aside>

        {/* Main Area: Changed pt-5 to pt-0 to remove the space before Overview Metrics */}
        <main className="flex-1 flex flex-col overflow-y-auto bg-[#E5E7EB] pt-0 pr-12 pb-5 pl-6 relative z-10">
          
          <div className="w-full max-w-[1600px] h-full flex flex-col gap-3">
            
            {/* Section 1: Overview Metrics */}
            <section className="flex-shrink-0">
              <h2 className="text-[32px] font-bold text-gray-900 mb-3 mt-2 tracking-wide">
                Overview Metrics
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 w-full">
                {/* Metric 1 */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-green-300 flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[18px] font-bold text-gray-800 leading-tight">Total Devices</span>
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                  </div>
                  <div className="text-[32px] font-bold text-gray-900 leading-none mb-2">2,450</div>
                  <div className="text-[14px] font-semibold text-green-500">+12% from last month</div>
                </div>

                {/* Metric 2 */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-green-300 flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[18px] font-bold text-gray-800 leading-tight">Warnings</span>
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  </div>
                  <div className="text-[32px] font-bold text-gray-900 leading-none mb-2">18</div>
                  <div className="text-[14px] font-semibold text-red-500">3 critical alerts today</div>
                </div>

                {/* Metric 3 */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-green-300 flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[18px] font-bold text-gray-800 leading-tight">Offline Devices</span>
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3" /></svg>
                  </div>
                  <div className="text-[32px] font-bold text-gray-900 leading-none mb-2">5</div>
                  <div className="text-[14px] font-semibold text-red-500">Check network</div>
                </div>

                {/* Metric 4 */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-green-300 flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[18px] font-bold text-gray-800 leading-tight">Total Alerts</span>
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                  </div>
                  <div className="text-[32px] font-bold text-gray-900 leading-none mb-2">286</div>
                  <div className="text-[14px] font-semibold text-green-500">Avg. 25 per day</div>
                </div>

                {/* Metric 5 */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-green-300 flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[18px] font-bold text-gray-800 leading-tight">Avg. Response</span>
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div className="text-[32px] font-bold text-gray-900 leading-none mb-2">1.2s</div>
                  <div className="text-[14px] font-semibold text-blue-500">Improved by 0.3s</div>
                </div>
              </div>
            </section>

            {/* Section 2: Detailed Visualizations */}
            <section className="flex-1 flex flex-col min-h-[200px]">
              <h2 className="text-[32px] font-bold text-gray-900 mb-3 tracking-wide">
                Detailed Visualizations
              </h2>
              
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-5 w-full">
                
                {/* Pie Chart Card - Updated Border */}
                <div className="bg-white rounded-xl shadow-sm border border-green-300 p-5 flex flex-col h-full">
                  <h3 className="text-[24px] font-bold text-gray-900 leading-none mb-4">Device Status Overview</h3>
                  <div className="flex-1 flex items-center justify-center gap-6">
                    <div className="w-32 h-32 rounded-full relative" style={{ background: "conic-gradient(#F59E0B 0% 12%, #DC2626 12% 24%, #68D391 24% 100%)" }}></div>
                    <div className="flex flex-col gap-3 text-[14px] font-medium text-gray-600">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2"><span className="w-3 h-1 bg-yellow-500"></span>Warning</div>
                        <span className="text-yellow-500 font-bold">12%</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2"><span className="w-3 h-1 bg-red-600"></span>Offline</div>
                        <span className="text-red-600 font-bold">12%</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2"><span className="w-3 h-1 bg-green-400"></span>Online</div>
                        <span className="text-green-400 font-bold">72%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Line Chart Card - Updated Border */}
                <div className="bg-white rounded-xl shadow-sm border border-green-300 p-5 flex flex-col h-full">
                  <h3 className="text-[24px] font-bold text-gray-900 leading-none mb-4">Alert Frequency</h3>
                  <div className="flex-1 relative w-full h-full flex flex-col justify-between">
                    <div className="absolute left-0 top-0 h-[85%] flex flex-col justify-between text-[12px] font-medium text-gray-500">
                      <span>40</span><span>30</span><span>20</span><span>10</span><span>0</span>
                    </div>
                    <div className="absolute left-8 right-0 top-0 h-[85%] flex flex-col justify-between">
                      <div className="border-b border-gray-200 w-full h-0"></div>
                      <div className="border-b border-gray-200 w-full h-0"></div>
                      <div className="border-b border-gray-200 w-full h-0"></div>
                      <div className="border-b border-gray-200 w-full h-0"></div>
                      <div className="border-b border-gray-400 w-full h-0"></div>
                    </div>
                    <svg className="absolute left-8 right-0 top-0 h-[85%] w-[calc(100%-32px)]" preserveAspectRatio="none" viewBox="0 0 100 100">
                      <path d="M0,70 L12,65 L25,80 L38,50 L50,40 L62,70 L75,50 L88,10 L100,30" fill="none" stroke="#7A71E6" strokeWidth="2.5" vectorEffect="non-scaling-stroke"/>
                      <circle cx="0" cy="70" r="2.5" fill="#7A71E6" />
                      <circle cx="12" cy="65" r="2.5" fill="#7A71E6" />
                      <circle cx="25" cy="80" r="2.5" fill="#7A71E6" />
                      <circle cx="38" cy="50" r="2.5" fill="#7A71E6" />
                      <circle cx="50" cy="40" r="2.5" fill="#7A71E6" />
                      <circle cx="62" cy="70" r="2.5" fill="#7A71E6" />
                      <circle cx="75" cy="50" r="2.5" fill="#7A71E6" />
                      <circle cx="88" cy="10" r="2.5" fill="#7A71E6" />
                      <circle cx="100" cy="30" r="2.5" fill="#7A71E6" />
                    </svg>
                    <div className="absolute bottom-0 left-8 right-0 flex justify-between text-[12px] font-medium text-gray-500 px-2">
                      <span>Jan 22</span><span>Jan 25</span><span>Jan 28</span><span>Jan 31</span>
                    </div>
                  </div>
                </div>

                {/* Area Chart Card - Updated Border */}
                <div className="bg-white rounded-xl shadow-sm border border-green-300 p-5 flex flex-col h-full">
                  <h3 className="text-[24px] font-bold text-gray-900 leading-none mb-4">Biogas Trend</h3>
                  <div className="flex-1 relative w-full h-full flex flex-col justify-between">
                    <div className="absolute left-0 top-0 h-[85%] flex flex-col justify-between text-[12px] font-medium text-gray-500">
                      <span>160</span><span>120</span><span>80</span><span>40</span><span>0</span>
                    </div>
                    <div className="absolute left-8 right-0 top-0 h-[85%] flex flex-col justify-between">
                      <div className="border-b border-gray-200 w-full h-0"></div>
                      <div className="border-b border-gray-200 w-full h-0"></div>
                      <div className="border-b border-gray-200 w-full h-0"></div>
                      <div className="border-b border-gray-200 w-full h-0"></div>
                      <div className="border-b border-gray-400 w-full h-0"></div>
                    </div>
                    <svg className="absolute left-8 right-0 top-0 h-[85%] w-[calc(100%-32px)]" preserveAspectRatio="none" viewBox="0 0 100 100">
                      <path d="M0,40 Q15,30 25,50 T60,20 T100,10 L100,100 L0,100 Z" fill="#BAE6FD" opacity="0.6"/>
                      <path d="M0,40 Q15,30 25,50 T60,20 T100,10" fill="none" stroke="#38BDF8" strokeWidth="2.5" vectorEffect="non-scaling-stroke"/>
                    </svg>
                    <div className="absolute bottom-0 left-8 right-0 flex justify-between text-[12px] font-medium text-gray-500">
                      <span>Day 1</span><span>Day 2</span><span>Day 3</span><span>Day 4</span><span>Day 5</span><span>Day 7</span>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* Section 3: Insights & Analysis */}
            <section className="flex-1 flex flex-col min-h-[200px]">
              <h2 className="text-[32px] font-bold text-gray-900 mb-3 tracking-wide">
                Insights & Analysis
              </h2>
              
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
                
                {/* Bar Chart Card - Updated Border */}
                <div className="bg-white rounded-xl shadow-sm border border-green-300 p-5 flex flex-col h-full">
                  <h3 className="text-[24px] font-bold text-gray-900 leading-none mb-4">Severity Breakdown</h3>
                  <div className="flex-1 relative w-full h-full flex flex-col justify-between pt-1">
                    <div className="absolute left-0 top-1 h-[80%] flex flex-col justify-between text-[12px] font-medium text-gray-500">
                      <span>160</span><span>120</span><span>80</span><span>40</span><span>0</span>
                    </div>
                    <div className="absolute left-10 right-0 top-1 h-[80%] flex flex-col justify-between">
                      <div className="border-b border-gray-200 w-full h-0"></div>
                      <div className="border-b border-gray-200 w-full h-0"></div>
                      <div className="border-b border-gray-200 w-full h-0"></div>
                      <div className="border-b border-gray-200 w-full h-0"></div>
                      <div className="border-b border-gray-400 w-full h-0"></div>
                    </div>
                    <div className="absolute left-10 right-0 top-1 h-[80%] flex items-end justify-around px-2">
                      <div className="w-14 bg-black rounded-t-sm h-[10%]"></div>
                      <div className="w-14 bg-black rounded-t-sm h-[25%]"></div>
                      <div className="w-14 bg-black rounded-t-sm h-[50%]"></div>
                      <div className="w-14 bg-black rounded-t-sm h-[95%]"></div>
                    </div>
                    <div className="absolute bottom-0 left-10 right-0 flex justify-around text-[14px] text-gray-600 font-bold px-2">
                      <span className="w-14 text-center">Critical</span>
                      <span className="w-14 text-center">High</span>
                      <span className="w-14 text-center">Medium</span>
                      <span className="w-14 text-center">Low</span>
                    </div>
                  </div>
                </div>

                {/* AI/ML Insights Text Card - Updated Border */}
                <div className="bg-white rounded-xl shadow-sm border border-green-300 p-6 flex flex-col h-full justify-between">
                  <div>
                    <h3 className="text-[24px] font-bold text-gray-900 leading-none mb-4">AI/ML Report & Insights</h3>
                    
                    <p className="text-[18px] text-gray-700 leading-relaxed mb-4">
                      Leverage advanced analytics to uncover hidden patterns and predict future outcomes.
                    </p>
                    <p className="text-[18px] text-gray-700 leading-relaxed">
                      The AI model identified an anomalous pressure spike in Reactor 3, predicting a 15% probability of system overload within the next 48 hours. Recommended action: initiate phase-B cooling protocol.
                    </p>
                  </div>
                  <button className="w-fit px-6 py-2.5 bg-[#F8D300] hover:bg-yellow-400 text-black text-[18px] font-bold rounded shadow-sm transition-colors mt-4">
                    View Full Report
                  </button>
                </div>

              </div>
            </section>

          </div>
        </main>
      </div>

      <footer className="flex-shrink-0"><Footer /></footer>
    </div>
  );
}