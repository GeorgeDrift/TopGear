
import React from 'react';
import { X, Home, Car, Info, Phone, Instagram, Facebook } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onNavigate }) => {
  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[150] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <aside 
        className={`fixed top-0 left-0 h-full w-[280px] md:w-[350px] bg-white dark:bg-black z-[200] transition-transform duration-500 ease-out shadow-2xl flex flex-col border-r border-gray-100 dark:border-white/5 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-6 md:p-8 flex justify-between items-center border-b border-gray-100 dark:border-white/5">
            <div className="flex items-center gap-3">
                <img 
                    src="https://www.topgearsmw.com/wp-content/uploads/go-x/u/61f99a7a-1d85-4675-b4d9-515d73e49cb3/image-160x162.jpg" 
                    alt="Logo" 
                    className="h-8 w-8 object-contain"
                />
                <span className="text-xl font-black tracking-tighter text-black dark:text-white">TOP GEAR</span>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition">
                <X className="h-6 w-6 text-gray-400" />
            </button>
        </div>

        <nav className="p-8 flex-1 space-y-6">
            <button 
                onClick={() => { onNavigate('home'); onClose(); }} 
                className="w-full flex items-center gap-4 text-gray-400 hover:text-black dark:hover:text-white transition group text-left"
            >
                <Home className="h-5 w-5 group-hover:scale-110 transition" />
                <span className="text-xs font-black uppercase tracking-widest">Home</span>
            </button>
            <button 
                onClick={() => { onNavigate('stock'); onClose(); }} 
                className="w-full flex items-center gap-4 text-gray-400 hover:text-black dark:hover:text-white transition group text-left"
            >
                <Car className="h-5 w-5 group-hover:scale-110 transition" />
                <span className="text-xs font-black uppercase tracking-widest">Stock Inventory</span>
            </button>
            <button 
                onClick={() => { onNavigate('about'); onClose(); }} 
                className="w-full flex items-center gap-4 text-gray-400 hover:text-black dark:hover:text-white transition group text-left"
            >
                <Info className="h-5 w-5 group-hover:scale-110 transition" />
                <span className="text-xs font-black uppercase tracking-widest">About Us</span>
            </button>
        </nav>

        <div className="p-8 border-t border-gray-100 dark:border-white/5 space-y-6">
            <div className="space-y-4">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Connect With Us</p>
                <div className="flex gap-4">
                    <a href="#" className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl hover:bg-blue-600 hover:text-white transition"><Facebook className="h-4 w-4" /></a>
                    <a href="#" className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl hover:bg-pink-600 hover:text-white transition"><Instagram className="h-4 w-4" /></a>
                    <a href="#" className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl hover:bg-green-600 hover:text-white transition"><Phone className="h-4 w-4" /></a>
                </div>
            </div>
            <p className="text-[8px] font-black text-gray-400 uppercase tracking-[0.3em] leading-relaxed">
                © 2024 Top Gear Motors Malawi.<br/>Driving Excellence.
            </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
