
import React, { useState } from 'react';
import { CreditCard, Plus, Save, Trash2, Check, Star, Rocket, TrendingUp, AlertCircle, Sparkles } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  isPremium: boolean;
  color: string;
}

const AdminPlans: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([
    {
      id: 'starter',
      name: 'Starter',
      price: '15,000',
      description: 'Roadside dealers and individuals.',
      features: ['Up to 5 Vehicles', 'WhatsApp Button', 'Standard Search', '7-Day Ad Duration'],
      isPremium: false,
      color: 'blue'
    },
    {
      id: 'business',
      name: 'Business',
      price: '30,000',
      description: 'Established vehicle showrooms.',
      features: ['Up to 25 Vehicles', 'WhatsApp Integration', 'Lead Tracking', 'Business Profile'],
      isPremium: false,
      color: 'indigo'
    },
    {
      id: 'elite',
      name: 'Elite',
      price: '50,000',
      description: 'Ultimate engine for top dealers.',
      features: ['Unlimited Listings', 'Priority Placement', 'Verified Gold Badge', 'Account Manager'],
      isPremium: true,
      color: 'purple'
    }
  ]);

  const handleUpdatePrice = (id: string, newPrice: string) => {
    setPlans(prev => prev.map(p => p.id === id ? { ...p, price: newPrice } : p));
  };

  const handleUpdateDescription = (id: string, newDesc: string) => {
    setPlans(prev => prev.map(p => p.id === id ? { ...p, description: newDesc } : p));
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 text-left pb-16">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 dark:border-white/5 pb-8">
        <div>
          <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Subscription Tiers</h2>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Modify pricing and core features for marketplace partners</p>
        </div>
        <button className="bg-indigo-600 text-white font-black px-6 py-3 rounded-2xl flex items-center gap-3 hover:bg-indigo-700 transition shadow-xl shadow-indigo-600/20 uppercase text-[10px] tracking-widest">
            <Plus className="h-4 w-4" /> Create New Tier
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div key={plan.id} className="resize overflow-auto bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 border-2 border-transparent hover:border-indigo-600/20 transition-all duration-500 shadow-sm relative overflow-hidden group min-w-[280px] min-h-[500px]">
            {plan.isPremium && (
              <div className="absolute top-4 right-4 bg-purple-600 text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1 shadow-lg">
                <Sparkles className="h-2 w-2" /> Premium
              </div>
            )}

            <div className={`w-14 h-14 rounded-2xl mb-6 flex items-center justify-center ${
              plan.id === 'elite' ? 'bg-purple-100 dark:bg-purple-600/20 text-purple-600' : 
              plan.id === 'business' ? 'bg-indigo-100 dark:bg-indigo-600/20 text-indigo-600' : 
              'bg-blue-100 dark:bg-blue-600/20 text-blue-600'
            }`}>
              {plan.id === 'elite' ? <Rocket className="h-7 w-7" /> : 
               plan.id === 'business' ? <TrendingUp className="h-7 w-7" /> : 
               <Star className="h-7 w-7" />}
            </div>

            <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-2">{plan.name}</h3>
            
            <div className="space-y-4 mb-8">
              <div>
                <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest block mb-1">Price (MK per Month)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xs">MK</span>
                  <input 
                    type="text" 
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm font-black text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    value={plan.price}
                    onChange={(e) => handleUpdatePrice(plan.id, e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="text-[8px] font-black text-gray-400 uppercase tracking-widest block mb-1">Tier Description</label>
                <textarea 
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl px-4 py-3 text-xs font-bold text-gray-600 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none h-20"
                  value={plan.description}
                  onChange={(e) => handleUpdateDescription(plan.id, e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-3 mb-8">
              <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-2">Core Features</p>
              {plan.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="bg-green-100 dark:bg-green-600/20 p-1 rounded-full"><Check className="h-3 w-3 text-green-600" /></div>
                  <span className="text-xs font-bold text-gray-600 dark:text-gray-400">{feature}</span>
                </div>
              ))}
              <button className="text-[9px] font-black text-indigo-600 uppercase tracking-widest hover:underline mt-2">+ Add Feature</button>
            </div>

            <div className="pt-6 border-t border-gray-50 dark:border-white/5 flex gap-2">
              <button className="flex-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:opacity-90 transition flex items-center justify-center gap-2">
                <Save className="h-4 w-4" /> Update Tier
              </button>
              <button className="p-4 bg-red-50 dark:bg-red-900/10 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-indigo-50 dark:bg-indigo-600/10 p-8 rounded-[2rem] border border-indigo-100 dark:border-indigo-500/20 flex flex-col md:flex-row items-center gap-6">
        <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl text-indigo-600 shadow-sm"><AlertCircle className="h-8 w-8" /></div>
        <div className="flex-1">
          <h4 className="font-black text-gray-900 dark:text-white uppercase tracking-tight mb-1">Global Tier Pricing Policy</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
            Changes to subscription pricing will affect all new registrations immediately. Existing active subscribers will maintain their current rate until their billing cycle concludes.
          </p>
        </div>
        <button className="px-8 py-4 bg-indigo-600 text-white font-black text-[10px] rounded-xl uppercase tracking-widest shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 transition">
          View Billing Logs
        </button>
      </div>
    </div>
  );
};

export default AdminPlans;
