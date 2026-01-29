
import React, { useState } from 'react';
import { 
  Check, Zap, Shield, Rocket, Smartphone, 
  Globe, Instagram, Facebook, Share2, 
  CreditCard, Sparkles, TrendingUp, Gift,
  CalendarDays, ChevronRight, Star
} from 'lucide-react';
import { User } from '../types';

interface SettingsProps {
  user: User;
}

type Duration = 'Monthly' | '3 Months' | '6 Months' | 'Yearly';

interface PlanOption {
  duration: Duration;
  price: string;
  savings?: string;
}

interface SubscriptionPlan {
  name: string;
  description: string;
  icon: any;
  color: string;
  features: (duration: Duration) => string[];
  options: PlanOption[];
  isPremium?: boolean;
}

const Settings: React.FC<SettingsProps> = ({ user }) => {
  const [selectedPlan, setSelectedPlan] = useState('Business');
  const [starterDuration, setStarterDuration] = useState<Duration>('Monthly');
  const [businessDuration, setBusinessDuration] = useState<Duration>('Monthly');
  const [eliteDuration, setEliteDuration] = useState<Duration>('Monthly');

  const subscriptionPlans: SubscriptionPlan[] = [
    {
      name: 'Starter',
      description: 'Roadside dealers.',
      icon: Star,
      color: 'gray',
      features: () => [
        'Up to 5 Vehicles',
        'WhatsApp Button',
        'Standard Search',
        'Basic Dashboard',
        '7-Day Ad Duration'
      ],
      options: [
        { duration: 'Monthly', price: 'MK 15,000' }
      ]
    },
    {
      name: 'Business',
      description: 'Established showrooms.',
      icon: TrendingUp,
      color: 'blue',
      features: (duration) => {
        let postLimit = 'Up to 25 Vehicles';
        if (duration === '3 Months') postLimit = '100+ Listings';
        if (duration === '6 Months' || duration === 'Yearly') postLimit = 'Unlimited Listings';
        
        return [
          postLimit,
          'WhatsApp Integration',
          'Standard Placement',
          'Lead Tracking',
          'Business Profile',
          'Email Support'
        ];
      },
      options: [
        { duration: 'Monthly', price: 'MK 30,000' },
        { duration: '3 Months', price: 'MK 80,000', savings: 'Save MK 10,000' },
        { duration: '6 Months', price: 'MK 150,000', savings: 'Save MK 30,000' },
        { duration: 'Yearly', price: 'MK 290,000', savings: 'Save MK 70,000' },
      ]
    },
    {
      name: 'Elite',
      description: 'Ultimate engine.',
      icon: Rocket,
      color: 'purple',
      isPremium: true,
      features: () => [
        'Unlimited Listings',
        'Priority Placement',
        'Facebook & IG Ads',
        'Advanced Analytics',
        'Verified Gold Badge',
        'Account Manager',
        'Push Notifications'
      ],
      options: [
        { duration: 'Monthly', price: 'MK 50,000' },
        { duration: '3 Months', price: 'MK 135,000', savings: 'Save MK 15,000' },
        { duration: '6 Months', price: 'MK 260,000', savings: 'Save MK 40,000' },
        { duration: 'Yearly', price: 'MK 500,000', savings: 'Save MK 100,000' },
      ]
    }
  ];

  const renderDurationSelector = (planName: string, current: Duration, setter: (d: Duration) => void, planOptions: PlanOption[]) => (
    <div className={`grid ${planOptions.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-1 mt-3`}>
      {planOptions.map((opt) => (
        <button
          key={opt.duration}
          onClick={(e) => {
            e.stopPropagation();
            setter(opt.duration);
          }}
          className={`flex flex-col items-center justify-center p-1.5 rounded-lg border transition-all ${
            current === opt.duration 
              ? 'border-blue-600 bg-blue-50 dark:bg-blue-600/10 shadow-sm' 
              : 'border-gray-100 dark:border-white/5 bg-white dark:bg-gray-800 hover:border-gray-200'
          }`}
        >
          <span className={`text-[7px] font-black uppercase tracking-widest ${current === opt.duration ? 'text-blue-600' : 'text-gray-400'}`}>
            {opt.duration}
          </span>
          <span className="text-[10px] font-black text-gray-900 dark:text-white mt-0.5 whitespace-nowrap">{opt.price}</span>
          {opt.savings && (
            <span className="text-[6px] font-bold text-green-500 flex items-center gap-0.5 mt-0.5">
              <Gift className="h-1.5 w-1.5" /> {opt.savings.split('Save ')[1]}
            </span>
          )}
        </button>
      ))}
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-700 text-left pb-16 max-w-[1300px] mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-gray-100 dark:border-white/5 pb-4">
        <div>
          <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight leading-none uppercase">Marketing Tiers</h2>
          <p className="text-gray-400 dark:text-gray-500 mt-1 text-[10px] font-bold uppercase tracking-widest">Select your showroom growth plan</p>
        </div>
        <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-600/10 px-3 py-1.5 rounded-lg border border-blue-100 dark:border-blue-500/20">
          <CreditCard className="h-3.5 w-3.5 text-blue-600" />
          <span className="text-[9px] font-black text-blue-900 dark:text-blue-400 uppercase tracking-widest">Account Status: Active</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-3 items-stretch justify-center">
        {subscriptionPlans.map((plan) => {
          const currentDuration = 
            plan.name === 'Elite' ? eliteDuration : 
            plan.name === 'Business' ? businessDuration : starterDuration;
          
          const setDuration = 
            plan.name === 'Elite' ? setEliteDuration : 
            plan.name === 'Business' ? setBusinessDuration : setStarterDuration;
          
          const activeOption = plan.options.find(o => o.duration === currentDuration);
          const isSelected = selectedPlan === plan.name;

          return (
            <div 
              key={plan.name}
              onClick={() => setSelectedPlan(plan.name)}
              className={`relative flex flex-col flex-1 min-w-[260px] p-5 rounded-[2rem] border transition-all duration-500 cursor-pointer overflow-hidden ${
                isSelected 
                  ? (plan.isPremium ? 'border-purple-600 bg-white dark:bg-gray-900 shadow-lg scale-[1.02] z-10' : 'border-blue-600 bg-white dark:bg-gray-900 shadow-lg scale-[1.02] z-10')
                  : 'border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5 hover:border-gray-200'
              }`}
            >
              {plan.isPremium && (
                <div className="absolute top-4 right-4 bg-purple-600 text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest shadow-lg flex items-center gap-1">
                  <Sparkles className="h-2 w-2" />
                  Elite
                </div>
              )}

              <div className={`w-10 h-10 rounded-xl mb-4 flex items-center justify-center ${
                plan.isPremium ? 'bg-purple-100 dark:bg-purple-600/20 text-purple-600' : 'bg-blue-100 dark:bg-blue-600/20 text-blue-600'
              }`}>
                <plan.icon className="h-5 w-5" />
              </div>

              <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight">{plan.name}</h3>
              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mt-0.5 h-4 overflow-hidden whitespace-nowrap overflow-ellipsis">{plan.description}</p>
              
              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-white/5">
                <p className="text-[8px] font-black uppercase tracking-widest text-gray-400 mb-1">Billing Duration</p>
                {renderDurationSelector(plan.name, currentDuration, setDuration, plan.options)}
              </div>

              <div className="mt-5 mb-3 flex items-baseline gap-1">
                <span className={`text-xl font-black tracking-tighter ${plan.isPremium ? 'text-purple-600' : 'text-blue-600'}`}>
                  {activeOption?.price}
                </span>
                <span className="text-gray-400 font-bold text-[8px] uppercase tracking-widest">/ {currentDuration}</span>
              </div>

              <ul className="mt-4 space-y-2.5 flex-1">
                {plan.features(currentDuration).map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <div className={`mt-0.5 rounded-full p-0.5 shrink-0 ${
                      isSelected ? 'bg-green-500' : 'bg-gray-200 dark:bg-white/10'
                    }`}>
                      <Check className="h-2 w-2 text-white" />
                    </div>
                    <span className={`text-[10px] font-bold leading-tight ${
                      isSelected ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button className={`mt-6 w-full py-3.5 rounded-xl font-black text-[9px] uppercase tracking-[0.2em] transition duration-300 flex items-center justify-center gap-2 ${
                isSelected 
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-lg' 
                  : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-white/10 text-gray-900 dark:text-white hover:bg-gray-50'
              }`}>
                {isSelected ? 'Current Tier' : 'Upgrade Plan'}
              </button>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-br from-gray-900 to-black rounded-[2rem] p-6 text-white relative overflow-hidden mt-6">
        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-center gap-6 text-center sm:text-left">
          <div className="max-w-xl">
            <h3 className="text-xl font-black leading-tight mb-2 uppercase tracking-tight">Enterprise Solutions</h3>
            <p className="text-gray-400 text-[10px] font-medium leading-relaxed mb-4">
              Manage nationwide showroom networks with multi-user permissions and priority listing support.
            </p>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
               <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">
                 <Facebook className="h-3 w-3 text-blue-500" />
                 <span className="text-[8px] font-black uppercase tracking-widest text-gray-300">FB Marketing</span>
               </div>
               <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">
                 <CalendarDays className="h-3 w-3 text-orange-400" />
                 <span className="text-[8px] font-black uppercase tracking-widest text-gray-300">Multi-Billing</span>
               </div>
            </div>
          </div>
          <button className="whitespace-nowrap py-3.5 px-6 bg-blue-600 text-white rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-blue-700 transition shadow-lg shadow-blue-600/30">
            Contact Specialist
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
