
import React from 'react';
import { Bookmark, Heart, Star, Share2, Trash2, Search } from 'lucide-react';
import { Vehicle } from '../types';

interface SavedListingsProps {
  vehicles: Vehicle[];
}

const SavedListings: React.FC<SavedListingsProps> = ({ vehicles }) => {
  const saved = vehicles.slice(1, 4);

  return (
    <div className="space-y-10 animate-in fade-in duration-500 text-left">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-black text-gray-900">Saved Inventory</h2>
          <p className="text-gray-400 text-sm font-medium">Your personal watchlist for future acquisitions</p>
        </div>
        <div className="bg-gray-100 p-1 rounded-xl flex">
          <button className="px-4 py-2 bg-white rounded-lg shadow-sm text-xs font-bold text-gray-900">Active</button>
          <button className="px-4 py-2 text-xs font-bold text-gray-400">Sold (2)</button>
        </div>
      </div>

      {saved.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8">
          {saved.map((v) => (
            <div key={v.id} className="bg-white rounded-[2.5rem] p-2 border border-gray-100 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 group">
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden">
                <img src={v.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt="" />
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button className="p-2.5 bg-white rounded-xl text-red-500 shadow-xl shadow-black/10 transition">
                    <Heart className="h-5 w-5 fill-current" />
                  </button>
                  <button className="p-2.5 bg-white/90 backdrop-blur-md rounded-xl text-gray-600 hover:text-blue-600 transition shadow-xl shadow-black/10">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                 <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-black text-gray-900 line-clamp-1">{v.title}</h3>
                    <div className="flex items-center gap-1 bg-orange-50 px-2 py-0.5 rounded-lg">
                      <Star className="h-3 w-3 text-orange-400 fill-current" />
                      <span className="text-[10px] font-black text-orange-600">4.9</span>
                    </div>
                 </div>
                 <div className="flex items-center justify-between mt-auto">
                    <span className="text-blue-600 font-black text-xl">{v.price}</span>
                    <button className="text-gray-400 hover:text-red-500 transition">
                      <Trash2 className="h-5 w-5" />
                    </button>
                 </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-24 flex flex-col items-center justify-center text-gray-300">
           <Bookmark className="h-20 w-20 mb-6 opacity-20" />
           <p className="font-black uppercase tracking-widest text-sm">No saved listings found</p>
           <button className="mt-4 text-blue-600 font-black text-xs hover:underline">BROWSE MARKETPLACE</button>
        </div>
      )}

      <div className="bg-gray-50 rounded-[2.5rem] p-8 border border-gray-100">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shrink-0">
            <Search className="h-8 w-8" />
          </div>
          <div className="text-center md:text-left">
            <h4 className="font-black text-gray-900">Custom Alerts</h4>
            <p className="text-sm text-gray-500">Get notified when a vehicle matching your saved parameters enters the marketplace.</p>
          </div>
          <button className="md:ml-auto bg-white border border-gray-200 text-gray-900 font-black px-8 py-4 rounded-2xl hover:bg-gray-50 transition shadow-sm">Setup Alert</button>
        </div>
      </div>
    </div>
  );
};

export default SavedListings;
