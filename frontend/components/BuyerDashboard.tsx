
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Heart, History, User, LogOut, Sun, Moon,
  Compass, LayoutDashboard, GripVertical, Car, MessageCircle, Settings, Bell
} from 'lucide-react';
import { Vehicle, User as UserType, VehicleStatus } from '../types';
import SavedListings from './SavedListings';
import ExploreManager from './ExploreManager';

interface BuyerDashboardProps {
  user: UserType;
  vehicles: Vehicle[];
  onLogout: () => void;
  onViewDetails: (v: Vehicle) => void;
  onTrackLead: (v: Vehicle, type: 'WhatsApp' | 'Call' | 'Message') => void;
}

type BuyerTab = 'overview' | 'saved' | 'marketplace' | 'profile';

const BuyerDashboard: React.FC<BuyerDashboardProps> = ({ user, vehicles, onLogout, onViewDetails, onTrackLead }) => {
  const [activeTab, setActiveTab] = useState<BuyerTab>('overview');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('topgear-theme') as 'light' | 'dark') || 'light';
  });

  const [sidebarWidth, setSidebarWidth] = useState(260);
  const isResizing = useRef(false);

  const startResizing = useCallback((e: React.MouseEvent) => {
    isResizing.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', stopResizing);
    document.body.style.cursor = 'col-resize';
  }, []);

  const stopResizing = useCallback(() => {
    isResizing.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', stopResizing);
    document.body.style.cursor = 'default';
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing.current) return;
    const newWidth = Math.min(Math.max(e.clientX, 80), 500);
    setSidebarWidth(newWidth);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('topgear-theme', theme);
  }, [theme]);

  const savedCount = 3; // Mock
  const recentViews = vehicles.slice(0, 5);

  const renderContent = () => {
    switch (activeTab) {
      case 'saved':
        return <SavedListings vehicles={vehicles} />;
      case 'marketplace':
        return <ExploreManager vehicles={vehicles} onTrackLead={onTrackLead} onViewDetails={onViewDetails} />;
      case 'profile':
        return (
          <div className="max-w-2xl text-left space-y-8 animate-in fade-in duration-500">
            <h2 className="text-2xl font-black uppercase tracking-tight">Personal Settings</h2>
            <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-white/5 space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-3xl bg-gray-100 dark:bg-white/5 flex items-center justify-center text-2xl font-black text-gray-400">
                  {user.name[0]}
                </div>
                <div>
                  <p className="text-lg font-black">{user.name}</p>
                  <p className="text-sm text-gray-400 font-medium">{user.email}</p>
                </div>
              </div>
              <div className="space-y-4 pt-6 border-t border-gray-100 dark:border-white/5">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Phone Number</label>
                  <input className="w-full bg-gray-50 dark:bg-black border border-gray-100 dark:border-white/10 rounded-xl p-3 text-sm font-bold" defaultValue={user.phone || '+265 88...'} />
                </div>
                <button className="bg-black dark:bg-white text-white dark:text-black font-black px-8 py-3 rounded-xl uppercase text-[10px] tracking-widest hover:opacity-80 transition">Update Profile</button>
              </div>
            </div>
          </div>
        );
      case 'overview':
        return (
          <div className="space-y-16 text-left animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-black text-white p-8 rounded-[2.5rem] flex flex-col justify-between min-h-[160px] shadow-xl group hover:scale-[1.02] transition-transform">
                <Heart className="h-6 w-6 text-red-500 fill-current" />
                <div>
                  <p className="text-3xl font-black">{savedCount}</p>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Saved Listings</p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/5 p-8 rounded-[2.5rem] flex flex-col justify-between min-h-[160px] group hover:scale-[1.02] transition-transform">
                <History className="h-6 w-6 text-blue-500" />
                <div>
                  <p className="text-3xl font-black text-gray-900 dark:text-white">12</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Cars Viewed</p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/5 p-8 rounded-[2.5rem] flex flex-col justify-between min-h-[160px] group hover:scale-[1.02] transition-transform">
                <MessageCircle className="h-6 w-6 text-green-500" />
                <div>
                  <p className="text-3xl font-black text-gray-900 dark:text-white">2</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Sellers Contacted</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black uppercase tracking-tight">Recently Viewed</h3>
                <button onClick={() => setActiveTab('marketplace')} className="text-xs font-bold text-blue-600 hover:underline">Marketplace</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentViews.slice(0, 3).map((v) => (
                  <div key={v.id} onClick={() => onViewDetails(v)} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/5 rounded-3xl overflow-hidden cursor-pointer group hover:shadow-lg transition-all p-3">
                    <div className="h-40 rounded-2xl overflow-hidden relative mb-4">
                      <img src={v.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt="" />
                    </div>
                    <p className="font-black text-sm uppercase tracking-tight truncate px-1">{v.title}</p>
                    <p className="text-blue-600 font-black text-xs px-1 mt-1">{v.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  const navItems = [
    { id: 'overview', label: 'My Hub', icon: LayoutDashboard },
    { id: 'saved', label: 'Favorites', icon: Heart },
    { id: 'marketplace', label: 'Marketplace', icon: Compass },
    { id: 'profile', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50 dark:bg-black overflow-hidden font-sans transition-colors duration-500">
      <aside
        style={{ width: `${sidebarWidth}px` }}
        className="fixed bottom-0 left-0 right-0 h-16 bg-black flex lg:flex-col lg:h-screen lg:static items-center lg:items-start py-0 lg:py-8 border-t lg:border-t-0 lg:border-r border-white/10 shrink-0 transition-all duration-300 z-[60] overflow-hidden group/sidebar relative"
      >
        <div className="hidden lg:flex items-center gap-4 px-5 mb-10 cursor-pointer w-full" onClick={() => setActiveTab('overview')}>
          <div className="bg-white p-1 rounded-xl shadow-lg shrink-0">
            <img src="https://www.topgearsmw.com/wp-content/uploads/go-x/u/61f99a7a-1d85-4675-b4d9-515d73e49cb3/image-160x162.jpg" className="h-7 w-7 object-contain" alt="Logo" />
          </div>
          <span className={`text-white font-black text-xl tracking-tighter transition-opacity duration-300 whitespace-nowrap uppercase ${sidebarWidth < 150 ? 'lg:hidden' : 'opacity-100'}`}>Top Gear</span>
        </div>

        <nav className="flex lg:flex-col flex-row justify-around lg:justify-start gap-0 lg:gap-4 w-full h-full lg:h-auto lg:px-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as BuyerTab)}
              className={`flex flex-col lg:flex-row items-center gap-1 lg:gap-4 p-2 lg:p-4 rounded-xl transition-all duration-300 lg:w-full ${activeTab === item.id
                ? 'text-blue-400 lg:text-white lg:bg-white/10'
                : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`}
            >
              <item.icon className="h-5 w-5 md:h-6 md:w-6 shrink-0" />
              <span className={`text-[8px] lg:text-[10px] font-black uppercase tracking-widest transition-opacity duration-300 whitespace-nowrap ${sidebarWidth < 120 ? 'lg:hidden' : 'opacity-100'}`}>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto hidden lg:flex flex-col gap-4 w-full px-4 mb-4">
          <button onClick={onLogout} className="flex items-center gap-4 p-3 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-400/5 transition-all duration-300 w-full">
            <LogOut className="h-6 w-6 shrink-0" />
            <span className={`text-[10px] font-black uppercase tracking-widest transition-opacity duration-300 whitespace-nowrap ${sidebarWidth < 120 ? 'lg:hidden' : 'opacity-100'}`}>Sign Out</span>
          </button>
        </div>

        <div onMouseDown={startResizing} className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-blue-600 transition-colors hidden lg:flex items-center justify-center opacity-0 group-hover/sidebar:opacity-100">
          <GripVertical className="h-4 w-4 text-white/20" />
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-full overflow-hidden pb-16 lg:pb-0">
        <header className="h-16 md:h-24 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-white/5 flex items-center justify-between px-6 md:px-12 lg:px-24 shrink-0 transition-colors duration-500">
          <div className="flex flex-col text-left min-w-0">
            <h1 className="text-lg md:text-2xl font-black text-gray-900 dark:text-white tracking-tight leading-none uppercase truncate">
              {navItems.find(n => n.id === activeTab)?.label || 'My Portal'}
            </h1>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-xl">
              <button onClick={() => setTheme('light')} className={`p-1.5 md:p-2 rounded-lg transition-all ${theme === 'light' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400'}`}><Sun className="h-3.5 w-3.5 md:h-4 md:w-4" /></button>
              <button onClick={() => setTheme('dark')} className={`p-1.5 md:p-2 rounded-lg transition-all ${theme === 'dark' ? 'bg-gray-800 shadow-sm text-white' : 'text-gray-400'}`}><Moon className="h-3.5 w-3.5 md:h-4 md:w-4" /></button>
            </div>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-100 dark:border-white/5">
              <div className="w-10 h-10 rounded-2xl bg-black dark:bg-white flex items-center justify-center text-white dark:text-black font-black shadow-lg uppercase text-xs">
                {user.name[0]}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-black text-gray-900 dark:text-white leading-none">Buyer Account</p>
                <p className="text-[8px] text-gray-400 font-bold uppercase mt-1">Top Gear Motors</p>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-6 md:px-12 lg:px-24 py-10 md:py-16 bg-white dark:bg-black transition-colors duration-500">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default BuyerDashboard;
