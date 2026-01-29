
import React from 'react';
import { X, FileText, CheckCircle, CreditCard, ShieldCheck, Download } from 'lucide-react';

interface QuotationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuotationModal: React.FC<QuotationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const quoteItems = [
    { name: 'Core Marketplace Engine', desc: 'Front-end & Backend Development (React/Express)', price: '1,500,000' },
    { name: 'Role Management System', desc: 'Admin, Seller, Agent & Client Portals', price: '350,000' },
    { name: 'Hostinger Business Hosting', desc: '1 Year Premium Cloud Web Hosting', price: '185,000' },
    { name: 'Domain Registration', desc: 'Custom .mw Domain Name (1 Year)', price: '45,000' },
  ];

  const total = 2080000;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-white dark:bg-black rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-gray-200 dark:border-white/10">
        <div className="p-8 border-b border-gray-100 dark:border-white/5 flex justify-between items-center bg-gray-50/50 dark:bg-white/5">
          <div className="flex items-center gap-3">
             <div className="bg-black dark:bg-white p-2 rounded-xl text-white dark:text-black shadow-lg">
                <FileText className="h-5 w-5" />
             </div>
             <div>
                <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight uppercase">System Quotation</h2>
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Project ID: TG-2024-001</p>
             </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 text-gray-400 transition">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-8 space-y-6 text-left max-h-[70vh] overflow-y-auto">
          <div className="space-y-4">
            {quoteItems.map((item, idx) => (
              <div key={idx} className="flex justify-between items-start pb-4 border-b border-gray-50 dark:border-white/5">
                <div className="flex-1">
                  <h4 className="text-[11px] font-black text-gray-900 dark:text-white uppercase tracking-tight">{item.name}</h4>
                  <p className="text-[10px] text-gray-400 font-medium mt-1">{item.desc}</p>
                </div>
                <span className="text-xs font-black text-gray-900 dark:text-white whitespace-nowrap ml-4">MK {item.price}</span>
              </div>
            ))}
          </div>

          <div className="bg-black dark:bg-white p-6 rounded-3xl flex justify-between items-center text-white dark:text-black mt-8 shadow-xl">
             <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] opacity-60">Total Investment</p>
                <h3 className="text-2xl font-black tracking-tighter">MK {total.toLocaleString()}.00</h3>
             </div>
             <div className="flex flex-col items-end">
                <p className="text-[8px] font-bold uppercase opacity-60">Valid For 30 Days</p>
                <p className="text-[8px] font-bold uppercase opacity-60">MWK Curreny</p>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
               <ShieldCheck className="h-4 w-4 text-green-500 mb-2" />
               <p className="text-[9px] font-black uppercase text-gray-900 dark:text-white mb-1">Maintenance</p>
               <p className="text-[8px] text-gray-400 font-medium leading-tight">3 Months free technical support included.</p>
            </div>
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
               <CreditCard className="h-4 w-4 text-blue-500 mb-2" />
               <p className="text-[9px] font-black uppercase text-gray-900 dark:text-white mb-1">Payment</p>
               <p className="text-[8px] text-gray-400 font-medium leading-tight">50% Deposit, 50% on Handover.</p>
            </div>
          </div>
        </div>

        <div className="p-8 bg-gray-50 dark:bg-white/5 flex gap-3">
            <button className="flex-1 bg-black dark:bg-white text-white dark:text-black font-black py-4 rounded-2xl flex items-center justify-center gap-3 uppercase text-[10px] tracking-widest shadow-xl hover:opacity-80 transition">
                <Download className="h-4 w-4" /> Download PDF
            </button>
            <button onClick={onClose} className="px-8 border border-gray-200 dark:border-white/10 text-gray-500 font-black text-[10px] rounded-2xl uppercase tracking-widest hover:bg-gray-100 dark:hover:bg-white/5 transition">
                Close
            </button>
        </div>
      </div>
    </div>
  );
};

export default QuotationModal;
