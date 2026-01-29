
import React, { useState } from 'react';
import { Plus, MapPin, Gauge, History, Search, Globe, Box } from 'lucide-react';
import { Vehicle, VehicleStatus } from '../types';

interface InventoryManagerProps {
  vehicles: Vehicle[];
  onViewDetails: (v: Vehicle) => void;
  onAddNew: () => void;
  onUpdateStatus: (id: string, status: VehicleStatus) => void;
  title?: string;
  subtitle?: string;
}

const InventoryManager: React.FC<InventoryManagerProps> = ({
  vehicles,
  onViewDetails,
  onAddNew,
  onUpdateStatus,
  title = "Dealer Inventory",
  subtitle = "Manage Top Gear Motors stock records"
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = vehicles.filter(v => {
    const matchesSearch = v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch && v.status !== VehicleStatus.ARCHIVED;
  });

  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in duration-500 text-left px-2 md:px-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6 border-b border-gray-100 dark:border-white/5 pb-6 md:pb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight leading-none">{title}</h2>
          <p className="text-gray-400 dark:text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-2">{subtitle}</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch md:items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 md:h-4 md:w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search stock..."
              className="pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white dark:text-white w-full md:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={onAddNew}
            className="bg-black dark:bg-white text-white dark:text-black font-black px-6 py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-80 transition shadow-lg uppercase text-[9px] md:text-[10px] tracking-widest"
          >
            <Plus className="h-4 w-4" />
            Add Stock
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12">
        {filtered.map((vehicle) => (
          <div
            key={vehicle.id}
            className="group bg-white dark:bg-gray-900 rounded-3xl p-4 border border-gray-100 dark:border-white/5 hover:shadow-xl transition-all duration-500 flex flex-col h-full cursor-pointer"
            onClick={() => onViewDetails(vehicle)}
          >
            <div className="relative aspect-[16/10] mb-4 overflow-hidden rounded-2xl bg-gray-50 dark:bg-black shadow-inner">
              <img
                src={vehicle.imageUrl}
                alt={vehicle.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                <span className={`text-[7px] font-black px-2 py-0.5 rounded-lg uppercase tracking-widest text-white shadow-lg ${vehicle.status === VehicleStatus.AVAILABLE ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                  {vehicle.status}
                </span>
                {vehicle.isPublished && (
                  <span className="text-[7px] font-black px-2 py-0.5 rounded-lg uppercase tracking-widest text-white bg-blue-600 shadow-lg flex items-center gap-1">
                    <Globe className="h-2 w-2" /> Live Ad
                  </span>
                )}
              </div>
            </div>

            <div className="flex-1 flex flex-col">
              <div className="mb-3">
                <h3 className="text-sm md:text-base font-black text-gray-900 dark:text-white line-clamp-1 uppercase tracking-tight">{vehicle.title}</h3>
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1 flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-black dark:text-white" /> {vehicle.location.split(',')[0]}
                </p>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-black text-black dark:text-white tracking-tighter">{vehicle.price}</span>
                <div className="flex items-center gap-1.5">
                  <Gauge className="h-3.5 w-3.5 text-gray-400" />
                  <span className="text-[9px] text-gray-400 font-bold uppercase">{vehicle.mileage}</span>
                </div>
              </div>

              <div className="mt-auto pt-4 border-t border-gray-50 dark:border-white/5 grid grid-cols-2 gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Toggle publication mock logic
                    alert(`${vehicle.title} marketplace status updated.`);
                  }}
                  className="py-2.5 bg-indigo-50 dark:bg-indigo-900/10 text-indigo-600 dark:text-indigo-400 font-black text-[8px] md:text-[9px] rounded-lg transition uppercase tracking-widest hover:bg-indigo-600 hover:text-white"
                >
                  {vehicle.isPublished ? 'Unpublish Ad' : 'Publish Ad'}
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); onUpdateStatus(vehicle.id, VehicleStatus.ARCHIVED); }}
                  className="py-2.5 bg-gray-100 dark:bg-white/5 text-gray-400 font-black text-[8px] md:text-[9px] rounded-lg hover:bg-red-500 hover:text-white transition uppercase tracking-widest"
                >
                  Archive
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryManager;
