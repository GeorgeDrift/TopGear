
import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Shield, Mail, Trash2, CheckCircle, UserX, Briefcase, UserCheck } from 'lucide-react';
import { UserRole } from '../types';

const AdminUsers: React.FC = () => {
  const [search, setSearch] = useState('');
  
  // Updated Staff Directory for Top Gear
  const mockStaff = [
    { id: '1', name: 'Kondwani Phiri', email: 'kondwani@topgear.mw', role: UserRole.MANAGER, status: 'Active', joined: 'Oct 2023', units: 42 },
    { id: '2', name: 'Mercy Banda', email: 'mercy@topgear.mw', role: UserRole.AGENT, status: 'Active', joined: 'Jan 2024', units: 12 },
    { id: '3', name: 'Chisomo Mtambo', email: 'chisomo@topgear.mw', role: UserRole.AGENT, status: 'Active', joined: 'Mar 2024', units: 5 },
    { id: '4', name: 'Ephraim Phiri', email: 'ephraim@topgear.mw', role: UserRole.MANAGER, status: 'Active', joined: 'Jun 2023', units: 28 },
    { id: '5', name: 'Temporary Liasion', email: 'temp@topgear.mw', role: UserRole.AGENT, status: 'Suspended', joined: 'Jul 2024', units: 0 },
  ];

  const filteredStaff = mockStaff.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500 text-left">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Staff Moderation</h2>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Audit and moderate all internal dealership accounts</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Filter staff members..." 
              className="pl-11 pr-6 py-3 bg-gray-100 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:text-white w-full sm:w-64"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="p-3 bg-gray-100 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl text-gray-500 hover:text-indigo-600 transition">
            <Filter className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/5 rounded-[2.5rem] overflow-hidden shadow-sm">
        <div className="overflow-x-auto resize-y min-h-[350px]">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 dark:bg-white/5 border-b border-gray-100 dark:border-white/5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <th className="px-8 py-5 whitespace-nowrap">Staff Identity</th>
                <th className="px-8 py-5 whitespace-nowrap">Assigned Role</th>
                <th className="px-8 py-5 whitespace-nowrap">Inventory Load</th>
                <th className="px-8 py-5 whitespace-nowrap">Status</th>
                <th className="px-8 py-5 whitespace-nowrap">Onboarding</th>
                <th className="px-8 py-5 text-right">Moderation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-white/5">
              {filteredStaff.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-500 flex items-center justify-center font-black text-sm uppercase">
                        {u.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-black text-gray-900 dark:text-white leading-none truncate uppercase tracking-tight">{u.name}</p>
                        <p className="text-[10px] text-gray-400 mt-1 font-bold truncate">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`text-[8px] font-black px-2.5 py-1 rounded-lg uppercase tracking-widest shadow-sm ${
                        u.role === UserRole.MANAGER ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30' : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                        <Briefcase className="h-3 w-3 text-gray-300" />
                        <span className="text-sm font-black text-gray-900 dark:text-white">{u.units} Units</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                       <div className={`w-2 h-2 rounded-full ${u.status === 'Active' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]'}`}></div>
                       <span className="text-xs font-bold text-gray-600 dark:text-gray-400">{u.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-xs font-bold text-gray-500">{u.joined}</p>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {u.status === 'Active' ? (
                        <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition" title="Suspend Account">
                          <UserX className="h-4 w-4" />
                        </button>
                      ) : (
                        <button className="p-2 text-gray-400 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/10 rounded-lg transition" title="Restore Account">
                          <UserCheck className="h-4 w-4" />
                        </button>
                      )}
                      <button className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg transition">
                        <MoreVertical className="h-4 w-4" />
                      </button>
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
};

export default AdminUsers;
