
import React from 'react';
import { Compass, Search, Filter, TrendingUp, Star, MapPin, Phone, MessageCircle, Send } from 'lucide-react';
import { Vehicle } from '../types';

interface ExploreManagerProps {
  vehicles: Vehicle[];
  onTrackLead?: (v: Vehicle, type: 'WhatsApp' | 'Call' | 'Message') => void;
  onViewDetails: (v: Vehicle) => void;
  showContactIcons?: boolean;
}

const ExploreManager: React.FC<ExploreManagerProps> = ({ vehicles, onTrackLead, onViewDetails, showContactIcons = true }) => {
  return (
    <div className="space-y-10 animate-in fade-in duration-500 text-left">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-black text-gray-900">Explore Marketplace</h2>
          <p className="text-gray-400 text-sm font-medium">See what other Malawian dealers are listing</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search marketplace..."
              className="bg-gray-100 border-none rounded-xl py-2 pl-9 pr-4 text-xs font-bold focus:ring-2 focus:ring-blue-500/20 outline-none w-64"
            />
          </div>
          <button className="p-2 bg-gray-100 rounded-xl text-gray-500 hover:text-blue-600 transition">
            <Filter className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2.5rem] p-8 text-white flex flex-col justify-between overflow-hidden relative">
          <div className="relative z-10">
            <div className="bg-white/20 w-10 h-10 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="h-5 w-5" />
            </div>
            <h3 className="text-2xl font-black mb-1">Trending Car</h3>
            <p className="text-indigo-100 text-sm">Toyota Hilux demand up 14%</p>
          </div>
          <button className="mt-8 relative z-10 bg-white text-blue-600 font-black text-[10px] px-6 py-3 rounded-xl uppercase tracking-widest shadow-xl">Analyze Trend</button>
          <Compass className="absolute -bottom-10 -right-10 h-48 w-48 opacity-10" />
        </div>

        {vehicles.slice(2, 4).map((v) => (
          <div key={v.id} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/5 rounded-[2.5rem] p-4 flex gap-4 group hover:border-blue-100 transition-all cursor-pointer" onClick={() => onViewDetails(v)}>
            <img src={v.imageUrl} className="w-32 h-32 rounded-[1.5rem] object-cover" alt="" />
            <div className="flex-1 flex flex-col justify-between py-2">
              <div>
                <h4 className="font-black text-gray-900 dark:text-white text-sm leading-tight line-clamp-2">{v.title}</h4>
                <div className="flex items-center gap-1 mt-1 text-gray-400 text-[10px] font-bold uppercase">
                  <MapPin className="h-3 w-3" /> {v.location.split(',')[0]}
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-blue-600 font-black text-sm">{v.price}</span>
                {showContactIcons && onTrackLead && (
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); onTrackLead(v, 'WhatsApp'); }}
                      className="p-2 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition"
                      title="WhatsApp"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); onTrackLead(v, 'Call'); }}
                      className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition"
                      title="Call"
                    >
                      <Phone className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); onTrackLead(v, 'Message'); }}
                      className="p-2 bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-100 transition"
                      title="In-App Message"
                    >
                      <Send className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <section>
        <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Latest from verified dealers</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {vehicles.slice(0, 8).map(v => (
            <div key={v.id} onClick={() => onViewDetails(v)} className="relative aspect-square rounded-[2rem] overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500">
              <img src={v.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt="" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-white font-black text-xs line-clamp-1 uppercase tracking-tight">{v.title}</p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-blue-400 font-black text-[10px]">{v.price}</p>
                  {showContactIcons && onTrackLead && (
                    <div className="flex gap-1.5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-700">
                      <button onClick={(e) => { e.stopPropagation(); onTrackLead(v, 'WhatsApp'); }} className="p-1.5 bg-green-500/20 text-green-400 rounded-lg backdrop-blur-md hover:bg-green-500 hover:text-white transition"><MessageCircle className="h-3 w-3" /></button>
                      <button onClick={(e) => { e.stopPropagation(); onTrackLead(v, 'Call'); }} className="p-1.5 bg-blue-500/20 text-blue-400 rounded-lg backdrop-blur-md hover:bg-blue-500 hover:text-white transition"><Phone className="h-3 w-3" /></button>
                      <button onClick={(e) => { e.stopPropagation(); onTrackLead(v, 'Message'); }} className="p-1.5 bg-white/20 text-white rounded-lg backdrop-blur-md hover:bg-white hover:text-black transition"><Send className="h-3 w-3" /></button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ExploreManager;
