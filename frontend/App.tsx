
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import VehicleDetailsModal from './components/VehicleDetailsModal';
import Sidebar from './components/Sidebar';
import HomeView from './components/HomeView';
import StockView from './components/StockView';
import AboutView from './components/AboutView';
import SellerDashboard from './components/SellerDashboard';
import AdminDashboard from './components/AdminDashboard';
import SalesmanDashboard from './components/SalesmanDashboard';
import BuyerDashboard from './components/BuyerDashboard';
import { generateVehicles } from './services/geminiService';
import { Vehicle, User, VehicleType, UserRole, Lead, VehicleStatus } from './types';

type ActiveView = 'home' | 'stock' | 'about';

const App: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveView>('home');
  const [activeType, setActiveType] = useState<VehicleType | 'All'>('All');

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('topgear-theme') as 'light' | 'dark') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('topgear-theme', theme);
  }, [theme]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const data = await generateVehicles();
      setVehicles(data);
      setFilteredVehicles(data.filter(v => v.status === VehicleStatus.AVAILABLE));
      setIsLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    let results = vehicles.filter(v => v.status === VehicleStatus.AVAILABLE);
    if (activeType !== 'All') results = results.filter(v => v.type === activeType);
    setFilteredVehicles(results);
  }, [activeType, vehicles]);

  const handleSearch = (query: string) => {
    const q = query.toLowerCase();
    const results = vehicles.filter(v =>
      v.status === VehicleStatus.AVAILABLE && (
        v.title.toLowerCase().includes(q) ||
        v.brand.toLowerCase().includes(q) ||
        v.location.toLowerCase().includes(q)
      )
    );
    setFilteredVehicles(results);
    setActiveType('All');
    setActiveTab('stock');
  };

  const handleTrackLead = (vehicle: Vehicle, type: 'WhatsApp' | 'Call') => {
    const newLead: Lead = {
      id: Math.random().toString(36).substr(2, 9),
      userName: user ? user.name : 'Guest Visitor',
      vehicleTitle: vehicle.title,
      timestamp: Date.now(),
      type
    };
    setLeads(prev => [newLead, ...prev]);
  };

  const handleUpdateVehicleStatus = (vehicleId: string, newStatus: VehicleStatus) => {
    setVehicles(prev => prev.map(v => v.id === vehicleId ? { ...v, status: newStatus } : v));
  };

  const heroVehicles = vehicles.filter(v => v.isSponsored && v.status === VehicleStatus.AVAILABLE).slice(0, 5);

  const renderCurrentView = () => {
    if (user) {
      if (user.role === UserRole.ADMIN) {
        return (
          <AdminDashboard
            user={user}
            vehicles={vehicles}
            onLogout={() => setUser(null)}
            onViewDetails={setSelectedVehicle}
            onUpdateStatus={handleUpdateVehicleStatus}
          />
        );
      }
      if (user.role === UserRole.MANAGER) {
        return (
          <SellerDashboard
            user={user}
            vehicles={vehicles}
            onLogout={() => setUser(null)}
            onViewDetails={setSelectedVehicle}
            onUpdateStatus={handleUpdateVehicleStatus}
          />
        );
      }
      if (user.role === UserRole.AGENT) {
        return (
          <SalesmanDashboard
            user={user}
            vehicles={vehicles}
            onLogout={() => setUser(null)}
            onViewDetails={setSelectedVehicle}
            onUpdateStatus={handleUpdateVehicleStatus}
          />
        );
      }
      if (user.role === UserRole.CLIENT) {
        return (
          <BuyerDashboard
            user={user}
            vehicles={vehicles}
            onLogout={() => setUser(null)}
            onViewDetails={setSelectedVehicle}
            onTrackLead={handleTrackLead}
          />
        );
      }
    }

    switch (activeTab) {
      case 'home':
        return (
          <HomeView
            onSearch={handleSearch}
            featuredVehicles={heroVehicles}
            allVehicles={filteredVehicles}
            isLoading={isLoading}
            activeType={activeType}
            setActiveType={setActiveType}
            onViewDetails={setSelectedVehicle}
            onTrackLead={handleTrackLead}
          />
        );
      case 'stock':
        return (
          <StockView
            vehicles={filteredVehicles}
            isLoading={isLoading}
            activeType={activeType}
            setActiveType={setActiveType}
            onViewDetails={setSelectedVehicle}
            onTrackLead={handleTrackLead}
          />
        );
      case 'about':
        return <AboutView />;
      default:
        return (
          <HomeView
            onSearch={handleSearch}
            featuredVehicles={heroVehicles}
            allVehicles={filteredVehicles}
            isLoading={isLoading}
            activeType={activeType}
            setActiveType={setActiveType}
            onViewDetails={setSelectedVehicle}
            onTrackLead={handleTrackLead}
          />
        );
    }
  };

  const isPublicView = !user;

  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col relative transition-all duration-500">
      {isPublicView && (
        <Navbar
          user={user}
          theme={theme}
          onToggleTheme={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          onLogout={() => setUser(null)}
          onRefresh={() => { setActiveTab('home'); setActiveType('All'); }}
          onOpenSidebar={() => setIsSidebarOpen(true)}
        />
      )}

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onNavigate={(view) => {
          setActiveTab(view as ActiveView);
          if (view === 'stock') setActiveType('All');
        }}
      />

      <main className="flex-grow">
        {renderCurrentView()}
      </main>

      {isPublicView && (
        <footer className="bg-black text-white py-12 md:py-20 border-t border-white/5 px-4">
          <div className="max-w-full mx-auto text-center px-4 sm:px-6 lg:px-12">
            <div className="flex items-center justify-center gap-2 md:gap-3 mb-8 md:mb-10">
              <div className="bg-white p-1.5 md:p-2 rounded-lg">
                <img src="https://www.topgearsmw.com/wp-content/uploads/go-x/u/61f99a7a-1d85-4675-b4d9-515d73e49cb3/image-160x162.jpg" alt="Logo" className="h-6 w-6 md:h-8 md:w-8 object-contain" />
              </div>
              <span className="text-xl md:text-2xl font-black tracking-tighter uppercase">Top Gear Motors</span>
            </div>
            <p className="text-gray-500 text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-8 md:mb-10">© 2024 Top Gear Motors Malawi</p>
          </div>
        </footer>
      )}

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} onLogin={setUser} />
      <VehicleDetailsModal vehicle={selectedVehicle} onClose={() => setSelectedVehicle(null)} onTrackLead={handleTrackLead} />
    </div>
  );
};

export default App;
