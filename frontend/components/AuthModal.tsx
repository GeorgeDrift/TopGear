
import React, { useState } from 'react';
import { UserRole, User } from '../types';
import { X, UserCheck, User as UserIcon, ArrowLeft, UserCircle, Mail, Lock, Zap, Briefcase, ShieldCheck, ShoppingCart } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
}

type AuthView = 'LOGIN' | 'ROLE_SELECT' | 'REGISTER';

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [view, setView] = useState<AuthView>('LOGIN');
  const [role, setRole] = useState<UserRole>(UserRole.CLIENT);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: name || (view === 'LOGIN' ? 'Personnel' : 'New User'),
      email: email || 'user@topgearsmw.com',
      role: view === 'LOGIN' ? UserRole.CLIENT : role,
    };
    onLogin(newUser);
    onClose();
    resetState();
  };

  const resetState = () => {
    setTimeout(() => { 
      setView('LOGIN'); 
      setName(''); 
      setEmail(''); 
    }, 300);
  };

  const handleDemoLogin = (demoRole: UserRole, demoName: string, demoEmail: string) => {
    const demoUser: User = {
      id: `demo-${demoRole.toLowerCase()}`,
      name: demoName,
      email: demoEmail,
      role: demoRole,
    };
    onLogin(demoUser);
    onClose();
    resetState();
  };

  const handleRoleSelect = (selectedRole: UserRole) => {
      setRole(selectedRole);
      setView('REGISTER');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh] transition-colors duration-500">
        <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-white/5">
            <div className="flex items-center gap-2">
                {view !== 'LOGIN' && (
                    <button onClick={() => setView(view === 'REGISTER' ? 'ROLE_SELECT' : 'LOGIN')} className="text-gray-400 hover:text-gray-600 dark:hover:text-white mr-1">
                      <ArrowLeft className="h-5 w-5" />
                    </button>
                )}
                <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
                    {view === 'LOGIN' && 'Sign in'}
                    {view === 'ROLE_SELECT' && 'Top Gear Account'}
                    {view === 'REGISTER' && `Join as ${role === UserRole.CLIENT ? 'Buyer' : role === UserRole.MANAGER ? 'Manager' : 'Agent'}`}
                </h2>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-white"><X className="h-6 w-6" /></button>
        </div>

        <div className="p-6 overflow-y-auto">
            {view === 'ROLE_SELECT' && (
                <div className="space-y-3 text-left">
                    <p className="text-gray-500 dark:text-gray-400 text-center mb-4 text-xs font-bold uppercase tracking-widest">Select your account type</p>
                    
                    <button onClick={() => handleRoleSelect(UserRole.CLIENT)} className="w-full flex items-center p-4 border border-gray-100 dark:border-white/5 rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-900/10 hover:border-blue-200 transition group text-left">
                        <div className="bg-blue-100 dark:bg-blue-900/20 text-blue-600 p-3 rounded-xl mr-4"><ShoppingCart className="h-5 w-5" /></div>
                        <div>
                            <h3 className="font-black text-gray-900 dark:text-white text-sm uppercase">Buyer</h3>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1">Browse stock and save favorites.</p>
                        </div>
                    </button>

                    <button onClick={() => handleRoleSelect(UserRole.MANAGER)} className="w-full flex items-center p-4 border border-gray-100 dark:border-white/5 rounded-2xl hover:bg-green-50 dark:hover:bg-green-900/10 hover:border-green-200 transition group text-left">
                        <div className="bg-green-100 dark:bg-green-900/20 text-green-600 p-3 rounded-xl mr-4"><UserCircle className="h-5 w-5" /></div>
                        <div>
                            <h3 className="font-black text-gray-900 dark:text-white text-sm uppercase">Manager</h3>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1">Oversee showroom and staff.</p>
                        </div>
                    </button>

                    <button onClick={() => handleRoleSelect(UserRole.AGENT)} className="w-full flex items-center p-4 border border-gray-100 dark:border-white/5 rounded-2xl hover:bg-indigo-50 dark:hover:bg-indigo-900/10 hover:border-indigo-200 transition group text-left">
                        <div className="bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 p-3 rounded-xl mr-4"><Briefcase className="h-5 w-5" /></div>
                        <div>
                            <h3 className="font-black text-gray-900 dark:text-white text-sm uppercase">Sales Agent</h3>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1">Post units and track leads.</p>
                        </div>
                    </button>

                    <div className="mt-6 text-center pt-4 border-t border-gray-100 dark:border-white/5">
                        <p className="text-xs text-gray-600 dark:text-gray-400 font-bold uppercase tracking-widest">Already have access? <button onClick={() => setView('LOGIN')} className="font-black text-blue-600 hover:underline ml-1">Sign in</button></p>
                    </div>
                </div>
            )}

            {(view === 'LOGIN' || view === 'REGISTER') && (
                <div className="space-y-6 text-left">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {view === 'REGISTER' && (
                            <div className="space-y-1">
                                <label className="block text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                                <div className="relative">
                                    <UserCheck className="absolute top-3.5 left-4 h-4 w-4 text-gray-400" />
                                    <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-bold dark:text-white transition" placeholder="Personnel Name" />
                                </div>
                            </div>
                        )}
                        <div className="space-y-1">
                            <label className="block text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest ml-1">Work Email</label>
                            <div className="relative">
                                <Mail className="absolute top-3.5 left-4 h-4 w-4 text-gray-400" />
                                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-bold dark:text-white transition" placeholder="user@topgear.mw" />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="block text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute top-3.5 left-4 h-4 w-4 text-gray-400" />
                                <input type="password" required className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-bold dark:text-white transition" placeholder="••••••••" />
                            </div>
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl hover:bg-blue-700 transition shadow-xl shadow-blue-600/20 uppercase text-xs tracking-widest mt-4">
                            {view === 'LOGIN' ? 'Portal Access' : 'Create Record'}
                        </button>
                        {view === 'LOGIN' && (
                             <div className="text-center">
                                <button type="button" onClick={() => setView('ROLE_SELECT')} className="text-xs font-bold text-blue-600 uppercase tracking-widest hover:underline">New here? Create account</button>
                             </div>
                        )}
                    </form>

                    {view === 'LOGIN' && (
                        <div className="space-y-4 pt-6 border-t border-gray-100 dark:border-white/5">
                            <div className="flex items-center gap-2 mb-2">
                                <Zap className="h-4 w-4 text-orange-500 fill-current" />
                                <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Demo Portal Access</h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <button 
                                    onClick={() => handleDemoLogin(UserRole.CLIENT, 'Brenda Buyer', 'brenda@malawi.com')}
                                    className="flex flex-col p-4 border border-blue-100 dark:border-blue-500/20 bg-blue-50/30 dark:bg-blue-600/5 rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-900/10 transition text-left group"
                                >
                                    <div className="bg-blue-100 dark:bg-blue-600/20 p-2 rounded-lg text-blue-600 w-fit mb-3"><ShoppingCart className="h-4 w-4" /></div>
                                    <span className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-tight">Buyer Portal</span>
                                    <p className="text-[8px] text-gray-500 font-bold uppercase mt-1">Saved Cars</p>
                                </button>

                                <button 
                                    onClick={() => handleDemoLogin(UserRole.AGENT, 'Alex Agent', 'alex@topgear.mw')}
                                    className="flex flex-col p-4 border border-indigo-100 dark:border-indigo-500/20 bg-indigo-50/30 dark:bg-indigo-600/5 rounded-2xl hover:bg-indigo-50 dark:hover:bg-indigo-900/10 transition text-left group"
                                >
                                    <div className="bg-indigo-100 dark:bg-indigo-600/20 p-2 rounded-lg text-indigo-600 w-fit mb-3"><Briefcase className="h-4 w-4" /></div>
                                    <span className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-tight">Agent Portal</span>
                                    <p className="text-[8px] text-gray-500 font-bold uppercase mt-1">Manage Ads</p>
                                </button>
                                
                                <button 
                                    onClick={() => handleDemoLogin(UserRole.MANAGER, 'Main Manager', 'manager@topgear.mw')}
                                    className="flex flex-col p-4 border border-green-100 dark:border-green-500/20 bg-green-50/30 dark:bg-green-600/5 rounded-2xl hover:bg-green-50 dark:hover:bg-green-900/10 transition text-left group"
                                >
                                    <div className="bg-green-100 dark:bg-green-600/20 p-2 rounded-lg text-green-600 w-fit mb-3"><UserCircle className="h-4 w-4" /></div>
                                    <span className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-tight">Manager Portal</span>
                                    <p className="text-[8px] text-gray-500 font-bold uppercase mt-1">Full Control</p>
                                </button>

                                <button 
                                    onClick={() => handleDemoLogin(UserRole.ADMIN, 'System Admin', 'admin@topgearsmw.com')}
                                    className="flex flex-col p-4 border border-slate-100 dark:border-slate-500/20 bg-slate-50/30 dark:bg-slate-600/5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900/10 transition text-left group"
                                >
                                    <div className="bg-slate-100 dark:bg-slate-600/20 p-2 rounded-lg text-slate-600 w-fit mb-3"><ShieldCheck className="h-4 w-4" /></div>
                                    <span className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-tight">Administrator</span>
                                    <p className="text-[8px] text-gray-500 font-bold uppercase mt-1">System Oversight</p>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
