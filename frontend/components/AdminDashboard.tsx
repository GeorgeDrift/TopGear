
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Users, ShieldCheck, LayoutDashboard,
  LogOut, Sun, Moon, Bell, UserPlus,
  Search, Filter, GripVertical, Trash2, Edit, Mail, Car, Activity, Briefcase, Globe, Compass
} from 'lucide-react';
import { User, UserRole, Employee, Vehicle, VehicleStatus } from '../types';
import InventoryManager from './InventoryManager';
import PostVehicleForm from './PostVehicleForm';
import ExploreManager from './ExploreManager';

interface AdminDashboardProps {
  user: User;
  vehicles: Vehicle[];
  onLogout: () => void;
  onViewDetails: (v: Vehicle) => void;
  onUpdateStatus: (id: string, status: VehicleStatus) => void;
}

type AdminTab = 'overview' | 'fleet' | 'marketing' | 'staff' | 'add-stock' | 'shop';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, vehicles, onLogout, onViewDetails, onUpdateStatus }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('topgear-theme') as 'light' | 'dark') || 'light';
  });

  // Mock Staff Data - Focused on internal roles
  const [staff, setStaff] = useState<Employee[]>([
    { id: '1', name: 'Limbani Mwale', email: 'limbani@topgear.mw', role: UserRole.MANAGER, status: 'Active', listingsManaged: 45, lastActive: '2 mins ago' },
    { id: '2', name: 'Thoko Phiri', email: 'thoko@topgear.mw', role: UserRole.AGENT, status: 'Active', listingsManaged: 22, lastActive: '1 hour ago' },
    { id: '3', name: 'Chisomo Banda', email: 'chisomo@topgear.mw', role: UserRole.AGENT, status: 'Active', listingsManaged: 12, lastActive: 'Yesterday' },
    { id: '4', name: 'Ephraim Phiri', email: 'ephraim@topgear.mw', role: UserRole.MANAGER, status: 'Active', listingsManaged: 38, lastActive: '5 mins ago' },
  ]);

  const [isAddingStaff, setIsAddingStaff] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    role: UserRole.AGENT,
    password: ''
  });

  // Sidebar Resizing Logic
  const [sidebarWidth, setSidebarWidth] = useState(260);
  const publishedVehicles = vehicles.filter(v => v.isPublished);
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

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    const staffMember: Employee = {
      id: Math.random().toString(36).substr(2, 9),
      name: newStaff.name,
      email: newStaff.email,
      role: newStaff.role as UserRole,
      status: 'Active' as const,
      listingsManaged: 0,
      lastActive: 'Just now'
    };
    setStaff([...staff, staffMember]);
    setNewStaff({ name: '', email: '', role: UserRole.AGENT, password: '' });
    setIsAddingStaff(false);
  };

  const handleDeleteStaff = (id: string) => {
    if (confirm('Are you sure you want to revoke access?')) {
      setStaff(staff.filter(s => s.id !== id));
    }
  };

  const handleToggleStatus = (id: string) => {
    setStaff(staff.map(s =>
      s.id === id ? { ...s, status: s.status === 'Active' ? 'Suspended' : 'Active' } : s
    ));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'staff':
        return (
          <div className="space-y-8 animate-in fade-in duration-500 text-left">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Personnel Directory</h2>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Manage Top Gear Motors Managers and Sales Agents</p>
              </div>
              <button
                onClick={() => setIsAddingStaff(true)}
                className="bg-indigo-600 text-white font-black px-6 py-3 rounded-2xl flex items-center gap-3 hover:bg-indigo-700 transition shadow-xl shadow-indigo-600/20 uppercase text-[10px] tracking-widest"
              >
                <UserPlus className="h-4 w-4" /> Add Staff Member
              </button>
            </div>

            <div className="resize overflow-auto bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/5 rounded-[2.5rem] shadow-sm min-h-[450px]">
              <div className="overflow-x-auto p-2">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      <th className="px-8 py-4">Employee</th>
                      <th className="px-8 py-4">Internal Role</th>
                      <th className="px-8 py-4">Inventory Oversight</th>
                      <th className="px-8 py-4">Activity Status</th>
                      <th className="px-8 py-4 text-right">Moderation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                    {staff.map((s) => (
                      <tr key={s.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-600/10 text-indigo-600 flex items-center justify-center font-black text-xs uppercase">
                              {s.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="text-sm font-black text-gray-900 dark:text-white leading-none truncate uppercase tracking-tight">{s.name}</p>
                              <p className="text-[10px] text-gray-400 mt-1 font-bold truncate">{s.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className={`text-[8px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest shadow-sm ${s.role === UserRole.MANAGER ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30' : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30'
                            }`}>
                            {s.role}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <span className="text-sm font-black text-gray-900 dark:text-white">{s.listingsManaged} Units</span>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${s.status === 'Active' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : 'bg-red-500'}`}></div>
                            <span className="text-xs font-bold text-gray-600 dark:text-gray-400">{s.status}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleToggleStatus(s.id)} className="p-2 text-gray-400 hover:text-indigo-600 transition" title={s.status === 'Active' ? 'Suspend' : 'Activate'}><Edit className="h-4 w-4" /></button>
                            <button onClick={() => handleDeleteStaff(s.id)} className="p-2 text-gray-400 hover:text-red-500 transition" title="Revoke Access"><Trash2 className="h-4 w-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'overview':
        return (
          <div className="space-y-10 md:space-y-16 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <div className="resize overflow-auto bg-white dark:bg-gray-900 p-6 md:p-8 rounded-[2rem] border border-gray-100 dark:border-white/5 shadow-sm min-w-[200px] min-h-[140px] group hover:ring-2 ring-indigo-500/20 transition-all">
                <div className="bg-indigo-50 dark:bg-indigo-600/10 p-2.5 rounded-xl text-indigo-600 w-fit mb-4"><Users className="h-5 w-5 md:h-6 md:w-6" /></div>
                <p className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white">{staff.length}</p>
                <p className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Personnel Strength</p>
              </div>
              <div className="resize overflow-auto bg-white dark:bg-gray-900 p-6 md:p-8 rounded-[2rem] border border-gray-100 dark:border-white/5 shadow-sm min-w-[200px] min-h-[140px] group hover:ring-2 ring-green-500/20 transition-all">
                <div className="bg-green-50 dark:bg-green-600/10 p-2.5 rounded-xl text-green-600 w-fit mb-4"><Car className="h-5 w-5 md:h-6 md:w-6" /></div>
                <p className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white">124</p>
                <p className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Managed Fleet</p>
              </div>
              <div className="resize overflow-auto bg-slate-900 p-6 md:p-8 rounded-[2rem] border border-white/5 shadow-xl min-w-[200px] min-h-[140px] group transition-all text-white sm:col-span-2 lg:col-span-1">
                <div className="bg-white/10 p-2.5 rounded-xl text-indigo-300 w-fit mb-4"><Activity className="h-5 w-5 md:h-6 md:w-6" /></div>
                <p className="text-2xl md:text-4xl font-black">100%</p>
                <p className="text-[9px] md:text-[10px] font-black text-indigo-200 uppercase tracking-widest mt-1">Showroom Sync Status</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              <div className="resize overflow-auto bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/5 rounded-[2.5rem] p-8 md:p-10 min-h-[400px]">
                <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight mb-8">Personnel Recent Activity</h3>
                <div className="space-y-6">
                  {staff.map((s, i) => (
                    <div key={i} className="flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center text-[10px] font-black text-gray-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">{s.name[0]}</div>
                        <div>
                          <p className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-tight">{s.name}</p>
                          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Logged in from Blantyre Office</p>
                        </div>
                      </div>
                      <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">{s.lastActive}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="resize overflow-auto bg-indigo-600 rounded-[2.5rem] p-8 md:p-10 text-white min-h-[400px] relative overflow-hidden group">
                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-4 leading-none">Administration Control</h3>
                  <p className="text-indigo-100 text-sm font-medium mb-12 leading-relaxed max-w-sm">
                    Access full administrative authority for Top Gear Motors Malawi. Directly manage internal accounts, assign management roles, and oversee company-wide inventory throughput.
                  </p>
                  <button onClick={() => setActiveTab('staff')} className="bg-white text-indigo-600 font-black px-10 py-5 rounded-2xl uppercase text-[10px] tracking-[0.2em] shadow-2xl hover:bg-indigo-50 transition transform hover:-translate-y-1">
                    Staff Management
                  </button>
                </div>
                <ShieldCheck className="absolute -bottom-10 -right-10 h-80 w-80 text-white/5 group-hover:scale-110 transition duration-1000 rotate-12" />
              </div>
            </div>
          </div>
        );
      case 'marketing':
        return (
          <div className="space-y-6">
            <InventoryManager
              vehicles={publishedVehicles}
              onViewDetails={onViewDetails}
              onAddNew={() => { }}
              onUpdateStatus={onUpdateStatus}
              title="Central Marketplace Ads"
              subtitle="Oversee all published advertisements currently live on Top Gear Motors"
            />
          </div>
        );
      case 'shop':
        return <ExploreManager vehicles={vehicles} onViewDetails={onViewDetails} showContactIcons={false} />;
      case 'fleet':
        return (
          <div className="space-y-6">
            <InventoryManager
              vehicles={vehicles}
              onViewDetails={onViewDetails}
              onAddNew={() => setActiveTab('add-stock')}
              onUpdateStatus={onUpdateStatus}
              title="Global Fleet Oversight"
              subtitle="Monitor and moderate all internal stock units across Top Gear Motors"
            />
          </div>
        );
      case 'add-stock':
        return <PostVehicleForm mode="registry" onSuccess={() => setActiveTab('fleet')} />;
      default:
        return null;
    }
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'fleet', label: 'Fleet Stock', icon: Car },
    { id: 'marketing', label: 'Marketplace', icon: Globe },
    { id: 'shop', label: 'Our Shop', icon: Compass },
    { id: 'staff', label: 'Staff Hub', icon: Users },
  ];

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50 dark:bg-black overflow-hidden font-sans transition-colors duration-500">
      <aside
        style={{ width: `${sidebarWidth}px` }}
        className="fixed bottom-0 left-0 right-0 h-16 bg-slate-950 flex lg:flex-col lg:h-screen lg:static items-center lg:items-start py-0 lg:py-8 border-t lg:border-t-0 lg:border-r border-white/10 shrink-0 transition-all duration-300 z-[60] overflow-hidden group/sidebar relative"
      >
        <div className="hidden lg:flex items-center gap-4 px-5 mb-10 cursor-pointer w-full" onClick={() => setActiveTab('overview')}>
          <div className="bg-white p-1 rounded-xl shadow-lg shrink-0">
            <img src="https://www.topgearsmw.com/wp-content/uploads/go-x/u/61f99a7a-1d85-4675-b4d9-515d73e49cb3/image-160x162.jpg" className="h-7 w-7 object-contain" alt="Admin Logo" />
          </div>
          <span className={`text-white font-black text-xl tracking-tighter transition-opacity duration-300 whitespace-nowrap uppercase ${sidebarWidth < 150 ? 'lg:hidden' : 'opacity-100'}`}>Top Gear Admin</span>
        </div>

        <nav className="flex lg:flex-col flex-row justify-around lg:justify-start gap-0 lg:gap-4 w-full h-full lg:h-auto lg:px-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as AdminTab)}
              className={`flex flex-col lg:flex-row items-center gap-1 lg:gap-4 p-2 lg:p-4 rounded-xl transition-all duration-300 lg:w-full ${activeTab === item.id
                ? 'text-indigo-400 lg:text-white lg:bg-indigo-600/20'
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
            <span className={`text-[10px] font-black uppercase tracking-widest transition-opacity duration-300 whitespace-nowrap ${sidebarWidth < 120 ? 'lg:hidden' : 'opacity-100'}`}>Logout</span>
          </button>
        </div>

        <div onMouseDown={startResizing} className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-indigo-600 transition-colors hidden lg:flex items-center justify-center opacity-0 group-hover/sidebar:opacity-100">
          <GripVertical className="h-4 w-4 text-white/20" />
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-full overflow-hidden pb-16 lg:pb-0">
        <header className="h-16 md:h-24 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-white/5 flex items-center justify-between px-6 md:px-12 lg:px-24 shrink-0 transition-colors duration-500">
          <div className="flex flex-col text-left min-w-0">
            <h1 className="text-lg md:text-2xl font-black text-gray-900 dark:text-white tracking-tight leading-none uppercase truncate">
              {navItems.find(n => n.id === activeTab)?.label || 'Administration'}
            </h1>
            <p className="hidden md:block text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-1">Top Gear Corporate Hub</p>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-xl">
              <button onClick={() => setTheme('light')} className={`p-1.5 md:p-2 rounded-lg transition-all ${theme === 'light' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400'}`}><Sun className="h-3.5 w-3.5 md:h-4 md:w-4" /></button>
              <button onClick={() => setTheme('dark')} className={`p-1.5 md:p-2 rounded-lg transition-all ${theme === 'dark' ? 'bg-gray-800 shadow-sm text-white' : 'text-gray-400'}`}><Moon className="h-3.5 w-3.5 md:h-4 md:w-4" /></button>
            </div>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-100 dark:border-white/5">
              <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black shadow-lg shadow-indigo-600/20 uppercase text-xs">RT</div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-black text-gray-900 dark:text-white leading-none">Root Admin</p>
                <p className="text-[8px] text-gray-400 font-bold uppercase mt-1">Top Gear HQ</p>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-6 md:px-12 lg:px-24 py-10 md:py-16 bg-white dark:bg-black transition-colors duration-500">
          {renderContent()}
        </div>
      </main>

      {isAddingStaff && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] w-full max-w-md shadow-2xl text-left border border-gray-100 dark:border-white/5">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-black uppercase flex items-center gap-2 tracking-tight"><UserPlus className="h-5 w-5 text-indigo-600" /> New Account</h3>
              <button onClick={() => setIsAddingStaff(false)} className="text-gray-400 hover:text-gray-900">×</button>
            </div>
            <form onSubmit={handleAddStaff} className="space-y-5">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1 block">Staff Role Selection</label>
                <select
                  className="w-full bg-gray-50 dark:bg-black border border-gray-100 dark:border-white/10 rounded-xl px-4 py-4 text-xs font-bold dark:text-white outline-none"
                  value={newStaff.role}
                  onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value as UserRole })}
                >
                  <option value={UserRole.MANAGER}>Showroom Manager</option>
                  <option value={UserRole.AGENT}>Sales Agent</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1 block">Staff Member Full Name</label>
                <input
                  type="text"
                  className="w-full bg-gray-50 dark:bg-black border border-gray-100 dark:border-white/10 rounded-xl px-4 py-4 text-xs font-bold dark:text-white"
                  placeholder="e.g. John Mtambo"
                  value={newStaff.name}
                  onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1 block">Official Work Email</label>
                <input
                  type="email"
                  className="w-full bg-gray-50 dark:bg-black border border-gray-100 dark:border-white/10 rounded-xl px-4 py-4 text-xs font-bold dark:text-white"
                  placeholder="name@topgear.mw"
                  value={newStaff.email}
                  onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1 block">Assigned Temporary Key</label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full bg-gray-50 dark:bg-black border border-gray-100 dark:border-white/10 rounded-xl px-4 py-4 text-xs font-bold dark:text-white pr-12"
                    placeholder="••••••••"
                    value={newStaff.password}
                    onChange={(e) => setNewStaff({ ...newStaff, password: e.target.value })}
                    required
                  />
                  <Briefcase className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300" />
                </div>
              </div>
              <div className="flex gap-3 pt-6">
                <button type="submit" className="flex-1 bg-indigo-600 text-white py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-xl hover:bg-indigo-700 transition">Establish Account</button>
                <button type="button" onClick={() => setIsAddingStaff(false)} className="px-8 border border-gray-200 dark:border-white/10 text-gray-400 py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-gray-50 transition">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
