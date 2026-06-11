import React, { useState } from "react";
import Sidebar from "../src/components/layout/Sidebar";
import Header from "../src/components/layout/Header";
import Footer from "../src/components/layout/Footer";

// --- MAIN HELP PAGE COMPONENT ---
const Help = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden text-gray-900 font-sans">
      {/* Top Header */}
      <header className="h-16 min-h-[64px] max-h-[64px] w-full flex-shrink-0 border-b border-gray-200 z-10 bg-white">
        <Header title="Help" />
      </header>

      <div className="flex flex-1 overflow-hidden bg-[#eef0f4]">
        {/* Sidebar */}
        <aside className="w-[278px] flex-shrink-0 bg-[#8bc389] border-r border-gray-200 overflow-y-auto">
          <Sidebar activePage="help" />
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto pt-6 pb-6 pr-8 pl-8 relative">
          
          {/* Section 1: Frequently Asked Questions */}
          <FAQSection />

          {/* Section 2: Additional Resources */}
          <AdditionalResources />

          {/* Floating / Bottom Action Button */}
          <div className="flex justify-end mt-8">
            <button className="bg-[#fbcc05] hover:bg-yellow-500 text-gray-900 text-[18px] font-bold py-2 px-6 rounded-md border border-gray-800 shadow-sm transition-colors">
              Go to Support Ticket
            </button>
          </div>

        </main>
      </div>
      
      {/* Footer reflecting the layout */}
      <div className="bg-[#8bc389] h-8 flex items-center justify-center border-t border-green-600">
        <span className="text-sm text-gray-800 font-medium">© 2026 Device Manager. All rights reserved.</span>
      </div>
    </div>
  );
};

// --- SECTION 1: FAQ COMPONENT ---
const FAQSection = () => {
  const [openFaq, setOpenFaq] = useState(1);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      id: 1,
      question: "How do I submit a new support ticket?",
      answer: "To submit a new support ticket, navigate to the 'Support Tickets' section using the sidebar menu. On that page, you will find a form where you can submit your issue, attach relevant files, and provide contact information. Once completed, click the 'Submit Ticket' button. You'll receive a confirmation shortly."
    },
    {
      id: 2,
      question: "What does the biogas monitoring system do?",
      answer: "The biogas monitoring system tracks real-time data from your biodigester, including gas pressure, flow rate, substrate temperature, and electrical component status to ensure optimal performance and prevent downtime."
    },
    {
      id: 3,
      question: "How do I interpret the dashboard readings?",
      answer: "The dashboard displays key metrics. Solid lines represent actual data, while dashed lines represent targets. Green indicators mean components are operating normally, while red indicates a warning or fault requiring attention."
    },
    {
      id: 4,
      question: "Can I update an existing support ticket after submission?",
      answer: "Yes, you can update an existing ticket by navigating to the Support Tickets page, selecting your active ticket, and adding a comment or attaching additional files to the thread."
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-[32px] font-bold text-gray-900 mb-4 tracking-wide">
        Frequently Asked Questions
      </h2>
      {/* Changed w-1/2 to w-3/4 to increase the width to three-quarters */}
      <div className="flex flex-col gap-2 w-3/4">
        {faqs.map((faq) => (
          <div key={faq.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <button 
              onClick={() => toggleFaq(faq.id)}
              className="w-full flex justify-between items-center p-4 text-left transition-colors"
            >
              <span className="text-[18px] font-bold text-gray-800">{faq.question}</span>
              <svg 
                className={`w-6 h-6 flex-shrink-0 text-gray-500 transform transition-transform duration-200 ${openFaq === faq.id ? 'rotate-180' : ''}`} 
                fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {openFaq === faq.id && (
              <div className="px-4 pb-4 pt-0 bg-white">
                <p className="text-[16px] text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- SECTION 2: ADDITIONAL RESOURCES COMPONENT ---
const AdditionalResources = () => {
  const resources = [
    {
      title: "Getting Started Guide",
      description: "A step-by-step guide to help you set up and get the most out of our platform.",
      buttonText: "Read More",
      icon: (
        <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: "Video Tutorials Library",
      description: "Watch our comprehensive video tutorials to learn various features and workflows.",
      buttonText: "Watch Now",
      icon: (
        <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Documentation",
      description: "Access detailed technical documentation for integrating with our APIs.",
      buttonText: "Explore APIs",
      icon: (
        <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Meet for Green Community",
      description: "Connect with other users, share insights, and find answers to common questions.",
      buttonText: "Join Community",
      icon: (
        <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    }
  ];

  return (
    <div>
      <h2 className="text-[32px] font-bold text-gray-900 mb-4 tracking-wide">
        Additional Resources
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {resources.map((res, index) => (
          <div key={index} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between h-full">
            <div>
              <div className="mb-3">
                {res.icon}
              </div>
              <h3 className="text-[24px] font-bold text-gray-900 mb-2 leading-none">{res.title}</h3>
              <p className="text-[16px] text-gray-600 mb-4 leading-relaxed">
                {res.description}
              </p>
            </div>
            <div>
              <button className="bg-[#fbcc05] hover:bg-yellow-500 text-gray-900 text-[16px] font-bold py-2 px-4 rounded border border-gray-800 transition-colors w-auto">
                {res.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Help;