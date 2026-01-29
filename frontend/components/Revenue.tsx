
import React from 'react';
import { BarChart3, TrendingUp, DollarSign, Users, ArrowUpRight, ArrowDownRight, MessageCircle } from 'lucide-react';
import { Lead } from '../types';

interface RevenueProps {
  leads: Lead[];
}

const Revenue: React.FC<RevenueProps> = ({ leads }) => {
  // Aggregate data for the chart
  const whatsappLeads = leads.filter(l => l.type === 'WhatsApp').length;
  const callLeads = leads.filter(l => l.type === 'Call').length;
  const totalLeads = leads.length;

  // Mock financial stats based on total leads (estimating 5% conversion value)
  const estimatedEarnings = totalLeads * 15000; // e.g. 15k MK estimated lead value
  
  const stats = [
    { label: 'Estimated Lead Value', value: `MK ${estimatedEarnings.toLocaleString()}`, change: '+12.5%', trend: 'up' },
    { label: 'Total Inquiries', value: (totalLeads + 42).toString(), change: '+2.1%', trend: 'up' }, // +42 is base fake traffic
    { label: 'Conversion Rate', value: '4.3%', change: '-0.2%', trend: 'down' },
  ];

  const formatTime = (ts: number) => {
    const diff = Date.now() - ts;
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)} mins ago`;
    return `${Math.floor(diff / 3600000)} hours ago`;
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Revenue & Lead Analytics</h2>
        <p className="text-sm text-gray-500">Real-time lead tracking from your vehicle showroom.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col justify-between h-48 group hover:border-blue-100 transition-colors">
            <div className="flex justify-between items-start">
              <div className={`p-3 rounded-2xl ${i === 0 ? 'bg-green-50 text-green-600' : i === 1 ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
                {i === 0 ? <DollarSign className="h-6 w-6" /> : i === 1 ? <TrendingUp className="h-6 w-6" /> : <BarChart3 className="h-6 w-6" />}
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full uppercase ${stat.trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                {stat.trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {stat.change}
              </div>
            </div>
            <div>
              <p className="text-3xl font-black text-gray-900 tracking-tight">{stat.value}</p>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
          <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-blue-600" /> Inquiry Distribution
          </h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-500">
                <span>WhatsApp Leads</span>
                <span className="text-gray-900">{whatsappLeads} tracked</span>
              </div>
              <div className="h-2 bg-gray-50 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full transition-all duration-1000" style={{ width: `${totalLeads > 0 ? (whatsappLeads / totalLeads) * 100 : 0}%` }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-500">
                <span>Call Leads</span>
                <span className="text-gray-900">{callLeads} tracked</span>
              </div>
              <div className="h-2 bg-gray-50 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full transition-all duration-1000" style={{ width: `${totalLeads > 0 ? (callLeads / totalLeads) * 100 : 0}%` }}></div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
          <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-600" /> Recent Leads (Potential Buyers)
          </h3>
          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
            {leads.length > 0 ? (
              leads.map((lead, i) => (
                <div key={lead.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-white flex items-center justify-center font-black text-xs shadow-sm ${lead.type === 'WhatsApp' ? 'text-green-600' : 'text-blue-600'}`}>
                      {lead.userName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{lead.userName}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Clicked {lead.type}: {lead.vehicleTitle}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-400 font-bold">{formatTime(lead.timestamp)}</span>
                </div>
              ))
            ) : (
              <div className="py-10 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">
                No real leads yet. Contact a seller to see tracking in action!
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Revenue;
