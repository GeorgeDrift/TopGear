
import React from 'react';
import { User, LogOut, Menu, Sun, Moon } from 'lucide-react';
import { User as UserType, UserRole } from '../types';

interface NavbarProps {
  user: UserType | null;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenAuth: () => void;
  onLogout: () => void;
  onRefresh: () => void;
  onOpenSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, theme, onToggleTheme, onOpenAuth, onLogout, onRefresh, onOpenSidebar }) => {
  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN: return 'bg-black text-white dark:bg-white dark:text-black';
      case UserRole.MANAGER: return 'bg-indigo-100 text-indigo-700 dark:bg-indigo-600/20 dark:text-indigo-400';
      case UserRole.AGENT: return 'bg-blue-100 text-blue-700 dark:bg-blue-600/20 dark:text-blue-400';
      default: return 'bg-gray-50 text-gray-600 dark:bg-gray-900 dark:text-gray-400';
    }
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case UserRole.CLIENT: return 'Visitor';
      case UserRole.MANAGER: return 'Marketplace Manager';
      case UserRole.AGENT: return 'Sales Agent';
      case UserRole.ADMIN: return 'Root Administrator';
      default: return role;
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-black border-b border-gray-100 dark:border-gray-800 shadow-sm transition-all duration-500">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex justify-between h-16 md:h-20 items-center">
          <div className="flex items-center gap-3 md:gap-4">
            <button
              onClick={onOpenSidebar}
              className="p-2 md:p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-black dark:text-white transition group"
            >
              <Menu className="h-5 w-5 md:h-6 md:w-6 group-hover:rotate-180 transition-transform duration-500" />
            </button>

            <div className="flex items-center cursor-pointer" onClick={onRefresh}>
              <div className="bg-white p-0.5 md:p-1 rounded-lg border border-gray-100 dark:border-gray-800 shrink-0">
                <img
                  src="https://www.topgearsmw.com/wp-content/uploads/go-x/u/61f99a7a-1d85-4675-b4d9-515d73e49cb3/image-160x162.jpg"
                  alt="Top Gear Logo"
                  className="h-8 w-8 md:h-10 md:w-10 object-contain"
                />
              </div>
              <div className="ml-2 md:ml-3 flex flex-col text-left">
                <span className="text-sm md:text-xl font-black text-black dark:text-white tracking-tighter leading-none">TOP GEAR</span>
                <span className="text-[7px] md:text-[9px] text-gray-400 font-bold uppercase tracking-widest">MOTORS MALAWI</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-xl">
              <button
                onClick={onToggleTheme}
                className={`p-1.5 md:p-2 rounded-lg transition-all ${theme === 'light' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400 hover:text-white'}`}
              >
                <Sun className="h-3.5 w-3.5 md:h-4 md:w-4" />
              </button>
              <button
                onClick={onToggleTheme}
                className={`p-1.5 md:p-2 rounded-lg transition-all ${theme === 'dark' ? 'bg-gray-800 shadow-sm text-white' : 'text-gray-400 hover:text-gray-900'}`}
              >
                <Moon className="h-3.5 w-3.5 md:h-4 md:w-4" />
              </button>
            </div>

            <div className="h-4 w-[1px] bg-gray-100 dark:bg-gray-800 hidden sm:block"></div>
            {user ? (
              <div className="flex items-center gap-2 md:gap-4">
                <div className="text-right hidden sm:block">
                  <p className="text-xs md:text-sm font-black text-black dark:text-white leading-none">{user.name}</p>
                  <span className={`text-[7px] md:text-[8px] font-black uppercase tracking-widest px-1 md:px-1.5 py-0.5 rounded mt-1 inline-block ${getRoleBadgeColor(user.role)}`}>
                    {getRoleLabel(user.role)}
                  </span>
                </div>

                <button onClick={onLogout} className="p-1.5 md:p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-black dark:hover:text-white transition">
                  <LogOut className="h-4 w-4 md:h-5 md:w-5" />
                </button>
              </div>
            ) : (
              <button onClick={onOpenAuth} className="flex items-center gap-1.5 md:gap-2 bg-black dark:bg-white text-white dark:text-black px-4 md:px-6 py-2 md:py-2.5 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest hover:opacity-80 transition shadow-lg">
                <User className="h-3 w-3 md:h-4 md:w-4" />
                <span>Join Marketplace</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
