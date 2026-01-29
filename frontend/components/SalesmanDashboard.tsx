
import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard, Compass, Box, LogOut, Sun, Moon,
  Activity, PlusSquare, Bookmark, Car, TrendingUp, MessageCircle,
  ShieldCheck, Globe, ListPlus
} from 'lucide-react';
import { Vehicle, User, VehicleStatus } from '../types';
import InventoryManager from './InventoryManager';
import PostVehicleForm from './PostVehicleForm';
import ExploreManager from './ExploreManager';
import SavedListings from './SavedListings';

interface SalesmanDashboardProps {
  user: User;
  vehicles: Vehicle[];
  onLogout: () => void;
  onViewDetails: (v: Vehicle) => void;
  onUpdateStatus: (id: string, status: VehicleStatus) => void;
}

type DashboardTab = 'overview' | 'shop' | 'fleet' | 'marketing' | 'saved';

const SalesmanDashboard: React.FC<SalesmanDashboardProps> = ({ user, vehicles, onLogout, onViewDetails, onUpdateStatus }) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('topgear-theme') as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('topgear-theme', theme);
  }, [theme]);

  const myStock = vehicles.slice(3, 10);
  const myAds = myStock.filter(v => v.isPublished);

  const renderContent = () => {
    switch (activeTab) {
      case 'fleet':
        return <InventoryManager
          vehicles={myStock}
          onViewDetails={onViewDetails}
          onAddNew={() => setActiveTab('marketing')}
          onUpdateStatus={onUpdateStatus}
          title="Vehicle Registry"
          subtitle="Stock units assigned to your sales profile"
        />;
      case 'marketing':
        return <PostVehicleForm mode="marketplace" inventory={vehicles} onSuccess={() => setActiveTab('fleet')} />;
      case 'shop':
        return <ExploreManager vehicles={vehicles} onViewDetails={onViewDetails} showContactIcons={false} />;
      case 'saved':
        return <SavedListings vehicles={vehicles} />;
      case 'overview':
        return (
          <div className="space-y-10 md:space-y-16 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-indigo-600 rounded-[2.5rem] p-10 text-white shadow-xl flex flex-col justify-between min-h-[260px]">
                <div>
                  <TrendingUp className="h-10 w-10 mb-6 opacity-40" />
                  <h2 className="text-4xl font-black tracking-tight leading-none mb-2">14 Leads</h2>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-200">Customer Inquiries Today</p>
                </div>
                <button onClick={() => setActiveTab('marketing')} className="bg-white text-indigo-600 font-black text-[10px] px-8 py-4 rounded-2xl uppercase tracking-widest mt-12 w-fit">Manage Live Ads</button>
              </div>
              <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/5 rounded-[2.5rem] p-10 shadow-sm flex flex-col justify-between min-h-[260px]">
                <div>
                  <Car className="h-10 w-10 mb-6 text-blue-600 opacity-40" />
                  <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight leading-none mb-2">{myStock.length} Stock Units</h2>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Total Assigned Inventory</p>
                </div>
                <button onClick={() => setActiveTab('marketing')} className="bg-blue-600 text-white font-black text-[10px] px-8 py-4 rounded-2xl uppercase tracking-widest mt-12 w-fit shadow-xl shadow-blue-600/20">Post to Marketplace</button>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/5 rounded-[2.5rem] p-10 shadow-sm">
              <h3 className="text-xl font-black uppercase mb-10">Sales Performance</h3>
              <div className="space-y-4">
                {myAds.slice(0, 5).map((v) => (
                  <div key={v.id} className="flex items-center gap-6 p-4 rounded-3xl bg-gray-50 dark:bg-white/5 hover:border-blue-100 border border-transparent transition-all cursor-pointer" onClick={() => onViewDetails(v)}>
                    <img src={v.imageUrl} className="w-16 h-16 rounded-2xl object-cover" alt="" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-black uppercase tracking-tight truncate">{v.title}</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Status: {v.status} • Ad Active</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-indigo-600">{v.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'fleet', label: 'Fleet Stock', icon: Car },
    { id: 'marketing', label: 'Marketing', icon: Globe },
    { id: 'shop', label: 'Our Shop', icon: Compass },
  ];

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50 dark:bg-black overflow-hidden font-sans transition-colors duration-500">
      <aside className="fixed bottom-0 left-0 right-0 h-16 lg:h-screen bg-black flex lg:flex-col lg:w-20 lg:hover:w-64 items-center lg:items-start py-0 lg:py-8 border-t lg:border-t-0 lg:border-r border-white/10 shrink-0 transition-all duration-300 z-[60] overflow-hidden group/sidebar">
        <div className="hidden lg:flex items-center gap-4 px-5 mb-10 cursor-pointer" onClick={() => setActiveTab('overview')}>
          <div className="bg-white p-1 rounded-xl shadow-lg shrink-0">
            <img src="https://www.topgearsmw.com/wp-content/uploads/go-x/u/61f99a7a-1d85-4675-b4d9-515d73e49cb3/image-160x162.jpg" className="h-7 w-7 object-contain" alt="Agent Logo" />
          </div>
          <span className="text-white font-black text-xl tracking-tighter opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300 whitespace-nowrap uppercase">Top Gear Agent</span>
        </div>

        <nav className="flex lg:flex-col flex-row justify-around lg:justify-start gap-0 lg:gap-4 w-full h-full lg:h-auto lg:px-4">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => setActiveTab(item.id as DashboardTab)} className={`flex flex-col lg:flex-row items-center gap-1 lg:gap-4 p-2 lg:p-4 rounded-xl transition-all duration-300 lg:w-full ${activeTab === item.id ? 'text-indigo-400 lg:text-white lg:bg-white/10' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}>
              <item.icon className="h-5 w-5 md:h-6 md:w-6 shrink-0" />
              <span className="text-[8px] lg:text-[10px] font-black uppercase tracking-widest lg:opacity-0 lg:group-hover/sidebar:opacity-100 transition-opacity duration-300 whitespace-nowrap">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto hidden lg:flex flex-col gap-4 w-full px-4 mb-4">
          <button onClick={onLogout} className="flex items-center gap-4 p-3 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-400/5 transition-all duration-300 w-full">
            <LogOut className="h-6 w-6 shrink-0" />
            <span className="text-[10px] font-black uppercase tracking-widest opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300 whitespace-nowrap">Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-full overflow-hidden pb-16 lg:pb-0">
        <header className="h-16 md:h-24 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-white/5 flex items-center justify-between px-6 md:px-12 lg:px-24 shrink-0 transition-colors duration-500">
          <div className="flex flex-col text-left min-w-0">
            <h1 className="text-lg md:text-2xl font-black text-gray-900 dark:text-white tracking-tight uppercase leading-none truncate">{navItems.find(i => i.id === activeTab)?.label || 'Agent Portal'}</h1>
            <p className="text-[8px] md:text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-1 flex items-center gap-2 truncate">
              <ShieldCheck className="h-3 w-3 text-blue-500 shrink-0" /> <span>Official Top Gear Personnel</span>
            </p>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-xl">
              <button onClick={() => setTheme('light')} className={`p-1.5 md:p-2 rounded-lg transition-all ${theme === 'light' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400'}`}><Sun className="h-3.5 w-3.5 md:h-4 md:w-4" /></button>
              <button onClick={() => setTheme('dark')} className={`p-1.5 md:p-2 rounded-lg transition-all ${theme === 'dark' ? 'bg-gray-800 shadow-sm text-white' : 'text-gray-400'}`}><Moon className="h-3.5 w-3.5 md:h-4 md:w-4" /></button>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black shadow-lg uppercase text-xs">SA</div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto px-6 md:px-12 lg:px-24 py-10 md:py-16 bg-white dark:bg-black transition-colors duration-500">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default SalesmanDashboard;
