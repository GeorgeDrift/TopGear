
import React, { useState } from 'react';
import { X, UserPlus, Mail, Shield, Zap } from 'lucide-react';

interface AddSalesmanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMember: (member: { name: string, email: string }) => void;
}

const AddSalesmanModal: React.FC<AddSalesmanModalProps> = ({ isOpen, onClose, onAddMember }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddMember({ name, email });
    setEmail('');
    setName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-md" onClick={onClose}></div>

      <div className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl text-white"><UserPlus className="h-5 w-5" /></div>
            <h2 className="text-xl font-black text-gray-900 tracking-tight">Invite Agent</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 text-gray-400 transition">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6 text-left">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
            <input
              required
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 transition"
              placeholder="e.g. Kondwani Phiri"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                required
                type="email"
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-600/5 transition"
                placeholder="agent@topgear.mw"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Assigned Role</label>
            <div className="flex items-center gap-3 p-4 rounded-2xl border border-blue-200 bg-blue-50">
              <Shield className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-bold text-blue-900">Sales Agent</span>
              <Zap className="h-4 w-4 text-orange-500 fill-current ml-auto" />
            </div>
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-2 px-2">Managers can only board sales agents for ground operations.</p>
          </div>

          <div className="pt-4">
            <button type="submit" className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl hover:bg-blue-700 transition shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3">
              <UserPlus className="h-5 w-5" />
              SEND INVITATION
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSalesmanModal;
