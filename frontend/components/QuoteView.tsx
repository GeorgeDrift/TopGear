
import React from 'react';
import { FileText, Download, ShieldCheck, CreditCard } from 'lucide-react';

const QuoteView: React.FC = () => {
  const quoteItems = [
    { name: 'Core Marketplace Engine', desc: 'Front-end & Backend Development (React/Express)', price: '1,500,000' },
    { name: 'Role Management System', desc: 'Admin, Seller, Agent & Client Portals', price: '350,000' },
    { name: 'Hostinger Business Hosting', desc: '1 Year Premium Cloud Web Hosting', price: '185,000' },
    { name: 'Domain Registration', desc: 'Custom .mw Domain Name (1 Year)', price: '45,000' },
  ];

  const total = 2080000;

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 md:py-24 animate-in fade-in duration-700">
      <div className="bg-white dark:bg-black rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-200 dark:border-white/10">
        <div className="p-10 border-b border-gray-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center bg-gray-50/50 dark:bg-white/5 gap-6">
          <div className="flex items-center gap-4">
             <div className="bg-black dark:bg-white p-3 rounded-2xl text-white dark:text-black shadow-lg">
                <FileText className="h-6 w-6" />
             </div>
             <div className="text-left">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight uppercase">Platform Quotation</h2>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Project ID: TG-2024-001 • Valid: 30 Days</p>
             </div>
          </div>
          <button className="bg-black dark:bg-white text-white dark:text-black font-black py-4 px-8 rounded-2xl flex items-center gap-3 uppercase text-[10px] tracking-widest shadow-xl hover:opacity-80 transition shrink-0">
             <Download className="h-4 w-4" /> Download PDF
          </button>
        </div>

        <div className="p-10 space-y-8 text-left">
          <div className="space-y-6">
            {quoteItems.map((item, idx) => (
              <div key={idx} className="flex justify-between items-start pb-6 border-b border-gray-50 dark:border-white/5">
                <div className="flex-1">
                  <h4 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tight">{item.name}</h4>
                  <p className="text-xs text-gray-400 font-medium mt-1">{item.desc}</p>
                </div>
                <span className="text-sm font-black text-gray-900 dark:text-white whitespace-nowrap ml-8">MK {item.price}</span>
              </div>
            ))}
          </div>

          <div className="bg-black dark:bg-white p-8 rounded-[2rem] flex flex-col md:flex-row justify-between items-center text-white dark:text-black shadow-xl gap-4">
             <div className="text-center md:text-left">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-60">Total Estimated Investment</p>
                <h3 className="text-4xl font-black tracking-tighter mt-1">MK {total.toLocaleString()}.00</h3>
             </div>
             <div className="flex flex-col items-center md:items-end opacity-60">
                <p className="text-[10px] font-bold uppercase">Includes Hostinger Business Hosting</p>
                <p className="text-[10px] font-bold uppercase mt-1">Local .mw Domain Support</p>
             </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
            <div className="p-6 rounded-3xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
               <ShieldCheck className="h-5 w-5 text-green-500 mb-3" />
               <p className="text-xs font-black uppercase text-gray-900 dark:text-white mb-2 tracking-tight">Post-Launch Maintenance</p>
               <p className="text-[11px] text-gray-400 font-medium leading-relaxed">We provide 3 months of priority technical support and performance monitoring after go-live.</p>
            </div>
            <div className="p-6 rounded-3xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
               <CreditCard className="h-5 w-5 text-blue-500 mb-3" />
               <p className="text-xs font-black uppercase text-gray-900 dark:text-white mb-2 tracking-tight">Flexible Payment Terms</p>
               <p className="text-[11px] text-gray-400 font-medium leading-relaxed">Standard 50% deposit to commence development, with the remaining 50% upon final UAT and deployment.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteView;
