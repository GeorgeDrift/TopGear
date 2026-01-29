
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Search, MapPin, MoreVertical, LayoutDashboard,
  Compass, Box, LogOut, Sun, Moon, Users, BarChart3,
  PlusSquare, ArrowRight, Car, Bookmark, GripVertical, UserPlus,
  Globe, ListPlus
} from 'lucide-react';
import { Vehicle, User, VehicleStatus, UserRole, Employee } from '../types';
import InventoryManager from './InventoryManager';
import TeamManagement from './TeamManagement';
import AddSalesmanModal from './AddSalesmanModal';
import PostVehicleForm from './PostVehicleForm';
import ExploreManager from './ExploreManager';
import SavedListings from './SavedListings';

interface SellerDashboardProps {
  user: User;
  vehicles: Vehicle[];
  onLogout: () => void;
  onViewDetails: (v: Vehicle) => void;
  onUpdateStatus: (id: string, status: VehicleStatus) => void;
}

type DashboardTab = 'overview' | 'explore' | 'marketing' | 'fleet' | 'staff' | 'saved' | 'post' | 'add-stock' | 'shop';

const SellerDashboard: React.FC<SellerDashboardProps> = ({ user, vehicles, onLogout, onViewDetails, onUpdateStatus }) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [isAddSalesmanOpen, setIsAddSalesmanOpen] = useState(false);
  const [team, setTeam] = useState<Employee[]>([
    { id: '1', name: 'Chisomo Banda', email: 'chisomo@dealership.mw', role: UserRole.MANAGER, status: 'Active', listingsManaged: 42, lastActive: '2 mins ago' },
    { id: '2', name: 'Tiwonge Phiri', email: 'tiwonge@dealership.mw', role: UserRole.AGENT, status: 'Active', listingsManaged: 18, lastActive: '1 hour ago' },
    { id: '3', name: 'Kondwani Mtambo', email: 'kondwani@dealership.mw', role: UserRole.AGENT, status: 'Inactive', listingsManaged: 0, lastActive: 'Invited' },
  ]);
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

  const handleAddMember = (member: { name: string, email: string }) => {
    const newMember: Employee = {
      id: Math.random().toString(36).substr(2, 9),
      name: member.name,
      email: member.email,
      role: UserRole.AGENT,
      status: 'Inactive',
      listingsManaged: 0,
      lastActive: 'Invited'
    };
    setTeam([...team, newMember]);
  };

  const handleDeleteMember = (id: string) => {
    if (confirm('Are you sure you want to remove this agent from your team?')) {
      setTeam(team.filter(m => m.id !== id));
    }
  };

  // Distinguish lists
  const inventoryList = vehicles.slice(0, 12);
  const marketplaceList = vehicles.filter(v => v.isPublished).slice(0, 8);

  const renderContent = () => {
    switch (activeTab) {
      case 'fleet':
        return (
          <div className="space-y-6">
            <InventoryManager
              vehicles={inventoryList}
              onViewDetails={onViewDetails}
              onAddNew={() => setActiveTab('add-stock')}
              onUpdateStatus={onUpdateStatus}
              title="Company Inventory Hub"
              subtitle="Quickly add cars and manage your internal dealership registry"
            />
          </div>
        );
      case 'marketing':
        return (
          <div className="space-y-6">
            <InventoryManager
              vehicles={marketplaceList}
              onViewDetails={onViewDetails}
              onAddNew={() => setActiveTab('post')}
              onUpdateStatus={onUpdateStatus}
              title="Active Marketplace Ads"
              subtitle="Units currently visible to public buyers"
            />
          </div>
        );
      case 'staff':
        return <TeamManagement team={team} onAddSalesman={() => setIsAddSalesmanOpen(true)} onDeleteMember={handleDeleteMember} />;
      case 'post':
        return <PostVehicleForm mode="marketplace" inventory={inventoryList} onSuccess={() => setActiveTab('fleet')} />;
      case 'add-stock':
        return <PostVehicleForm mode="registry" onSuccess={() => setActiveTab('fleet')} />;
      case 'explore':
        return <ExploreManager vehicles={vehicles} />;
      case 'saved':
        return <SavedListings vehicles={vehicles} />;
      case 'shop':
        return <ExploreManager vehicles={vehicles} onViewDetails={onViewDetails} showContactIcons={false} />;
      case 'overview':
        return (
          <div className="space-y-16 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-blue-600 rounded-[2rem] p-8 text-white shadow-xl shadow-blue-600/20">
                <BarChart3 className="h-8 w-8 mb-4 opacity-40" />
                <p className="text-3xl font-black">MK 840M</p>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Fleet Portfolio Value</p>
              </div>
              <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/5 rounded-[2rem] p-8 shadow-sm">
                <Car className="h-8 w-8 mb-4 text-indigo-600" />
                <p className="text-3xl font-black text-gray-900 dark:text-white">{inventoryList.length}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Units in Stock</p>
              </div>
              <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/5 rounded-[2rem] p-8 shadow-sm">
                <Globe className="h-8 w-8 mb-4 text-green-600" />
                <p className="text-3xl font-black text-gray-900 dark:text-white">{marketplaceList.length}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Live Marketplace Ads</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/5 rounded-[2.5rem] p-10">
                <h3 className="text-xl font-black uppercase mb-8">Recent Showroom Stock</h3>
                <div className="space-y-4">
                  {inventoryList.slice(0, 4).map(v => (
                    <div key={v.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-2xl">
                      <div className="flex items-center gap-4">
                        <img src={v.imageUrl} className="w-12 h-12 rounded-xl object-cover" alt="" />
                        <div>
                          <p className="text-xs font-black uppercase tracking-tight">{v.title}</p>
                          <p className="text-[9px] text-gray-400 font-bold">{v.price}</p>
                        </div>
                      </div>
                      <span className="text-[8px] font-black px-2 py-0.5 bg-gray-200 dark:bg-white/10 rounded uppercase">Stock Unit</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-black rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
                <div className="relative z-10">
                  <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">Marketplace Control</h3>
                  <p className="text-gray-400 text-sm mb-10 leading-relaxed">Publish internal stock units to the public Top Gear marketplace to reach buyers nationwide.</p>
                  <button onClick={() => setActiveTab('marketing')} className="bg-white text-black font-black px-8 py-4 rounded-2xl uppercase text-[10px] tracking-widest hover:bg-blue-50 transition shadow-2xl">Manage Ads</button>
                </div>
                <Globe className="absolute -bottom-10 -right-10 h-64 w-64 text-white/5 group-hover:scale-110 transition duration-1000" />
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
    { id: 'staff', label: 'Our Agents', icon: Users },
  ];

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50 dark:bg-black overflow-hidden font-sans transition-colors duration-500">
      <aside
        style={{ width: `${sidebarWidth}px` }}
        className="fixed bottom-0 left-0 right-0 h-16 bg-black flex lg:flex-col lg:h-screen lg:static items-center lg:items-start py-0 lg:py-8 border-t lg:border-t-0 lg:border-r border-white/10 shrink-0 transition-all duration-300 z-[60] overflow-hidden group/sidebar relative"
      >
        <div className="hidden lg:flex items-center gap-4 px-5 mb-10 cursor-pointer w-full" onClick={() => setActiveTab('overview')}>
          <div className="bg-white p-1 rounded-xl shadow-lg shrink-0">
            <img src="https://www.topgearsmw.com/wp-content/uploads/go-x/u/61f99a7a-1d85-4675-b4d9-515d73e49cb3/image-160x162.jpg" className="h-7 w-7 object-contain" alt="Brand Icon" />
          </div>
          <span className={`text-white font-black text-xl tracking-tighter transition-opacity duration-300 whitespace-nowrap uppercase ${sidebarWidth < 150 ? 'lg:hidden' : 'opacity-100'}`}>Top Gear Hub</span>
        </div>

        <nav className="flex lg:flex-col flex-row justify-around lg:justify-start gap-0 lg:gap-4 w-full h-full lg:h-auto lg:px-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as DashboardTab)}
              className={`flex flex-col lg:flex-row items-center gap-1 lg:gap-4 p-2 lg:p-4 rounded-xl transition-all duration-300 lg:w-full ${activeTab === item.id ? 'text-blue-500 lg:text-white lg:bg-white/10' : 'text-gray-500 hover:text-white hover:bg-white/5'
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
            <span className={`text-[10px] font-black uppercase tracking-widest transition-opacity duration-300 whitespace-nowrap ${sidebarWidth < 120 ? 'lg:hidden' : 'opacity-100'}`}>Logout</span>
          </button>
        </div>

        <div onMouseDown={startResizing} className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-blue-600 transition-colors hidden lg:flex items-center justify-center opacity-0 group-hover/sidebar:opacity-100">
          <GripVertical className="h-4 w-4 text-white/20" />
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-full overflow-hidden pb-16 lg:pb-0">
        <header className="h-16 md:h-24 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-white/5 flex items-center justify-between px-6 md:px-12 lg:px-24 shrink-0 transition-colors duration-500">
          <h1 className="text-lg md:text-2xl font-black text-gray-900 dark:text-white tracking-tight uppercase line-clamp-1">
            {navItems.find(i => i.id === activeTab)?.label || 'Manager Portal'}
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-xl">
              <button onClick={() => setTheme('light')} className={`p-1.5 md:p-2 rounded-lg transition-all ${theme === 'light' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400'}`}><Sun className="h-3.5 w-3.5 md:h-4 md:w-4" /></button>
              <button onClick={() => setTheme('dark')} className={`p-1.5 md:p-2 rounded-lg transition-all ${theme === 'dark' ? 'bg-gray-800 shadow-sm text-white' : 'text-gray-400'}`}><Moon className="h-3.5 w-3.5 md:h-4 md:w-4" /></button>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black shadow-lg uppercase text-xs">M</div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto px-6 md:px-12 lg:px-24 py-10 md:py-16 bg-white dark:bg-black transition-colors duration-500">
          {renderContent()}
        </div>
      </main>
      <AddSalesmanModal
        isOpen={isAddSalesmanOpen}
        onClose={() => setIsAddSalesmanOpen(false)}
        onAddMember={handleAddMember}
      />
    </div>
  );
};

export default SellerDashboard;
