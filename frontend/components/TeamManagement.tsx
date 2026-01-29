
import React from 'react';
import { UserPlus, Shield, Mail, MoreVertical, CheckCircle2, Clock, Trash2 } from 'lucide-react';
import { Employee, UserRole } from '../types';

interface TeamManagementProps {
  team: Employee[];
  onAddSalesman: () => void;
  onDeleteMember: (id: string) => void;
}

const TeamManagement: React.FC<TeamManagementProps> = ({ team, onAddSalesman, onDeleteMember }) => {

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div className="text-left">
          <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">Our Staff & Fleet Management</h2>
          <p className="text-gray-400 text-sm font-medium">Manage your sales team and their assigned vehicle portfolios</p>
        </div>
        <button
          onClick={onAddSalesman}
          className="bg-blue-600 text-white font-black px-6 py-3 rounded-2xl flex items-center gap-3 hover:bg-blue-700 transition shadow-lg shadow-blue-600/20"
        >
          <UserPlus className="h-5 w-5" />
          <span>ADD SALESMAN</span>
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <th className="px-8 py-4">Employee</th>
                <th className="px-8 py-4">Role</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Activity</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {team.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50/50 transition">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 leading-none">{member.name}</p>
                        <p className="text-xs text-gray-400 mt-1">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <Shield className="h-3 w-3 text-blue-500" />
                      <span className="text-xs font-bold text-gray-700">{member.role}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`text-[9px] font-black px-2 py-1 rounded-full uppercase tracking-tighter ${member.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                      }`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <Clock className="h-3 w-3" />
                      <span className="text-[10px] font-bold">{member.lastActive}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition"><MoreVertical className="h-4 w-4" /></button>
                      <button
                        onClick={() => onDeleteMember(member.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-3xl p-6 flex items-start gap-4">
        <CheckCircle2 className="h-6 w-6 text-blue-600 shrink-0" />
        <div className="text-left">
          <h4 className="font-black text-blue-900 text-sm uppercase tracking-wide">Role-Based Access Control</h4>
          <p className="text-xs text-blue-700 font-medium mt-1">
            <b>Listers</b> can only add/edit vehicle details. <b>Sales Agents</b> can track leads and contact buyers. <b>Managers</b> have full control over inventory and staff.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TeamManagement;