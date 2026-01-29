
import React from 'react';
import ListingCard from './ListingCard';
import { Vehicle, VehicleType } from '../types';
import { Loader2, Car, Layers } from 'lucide-react';

interface StockViewProps {
  vehicles: Vehicle[];
  isLoading: boolean;
  activeType: VehicleType | 'All';
  setActiveType: (type: VehicleType | 'All') => void;
  onViewDetails: (v: Vehicle) => void;
  onTrackLead: (v: Vehicle, type: 'WhatsApp' | 'Call') => void;
}

const StockView: React.FC<StockViewProps> = ({
  vehicles,
  isLoading,
  activeType,
  setActiveType,
  onViewDetails,
  onTrackLead
}) => {
  return (
    <div id="inventory" className="max-w-full mx-auto px-4 sm:px-6 lg:px-12 py-16 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8 pb-10">
        <div className="text-left w-full md:w-auto">
          <div className="flex items-center gap-2 mb-4">
            <Layers className="h-4 w-4 text-gray-500" />
            <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-gray-500">TOTAL UNITS: {vehicles.length}</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black dark:text-white uppercase tracking-tighter leading-none m-0">
            STOCK INVENTORY
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2 bg-black/5 dark:bg-white/5 p-1.5 rounded-2xl border border-gray-100 dark:border-white/5 overflow-x-auto max-w-full no-scrollbar">
          <span className="px-3 text-gray-500 shrink-0 font-black uppercase text-[9px] md:text-[10px] tracking-widest">FILTER:</span>
          {['All', ...Object.values(VehicleType)].map((t) => (
            <button
              key={t}
              onClick={() => setActiveType(t as VehicleType | 'All')}
              className={`whitespace-nowrap px-5 py-2.5 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${activeType === t
                ? 'bg-black dark:bg-white text-white dark:text-black shadow-xl scale-105'
                : 'text-gray-400 hover:text-black dark:hover:text-white'
                }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24 md:py-32">
          <Loader2 className="h-10 w-10 md:h-12 md:w-12 text-black dark:text-white animate-spin mb-4 md:mb-6" />
          <p className="text-gray-400 font-black text-[10px] md:text-xs uppercase tracking-[0.3em]">Querying Stock Inventory...</p>
        </div>
      ) : (
        <>
          {vehicles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 md:gap-16">
              {vehicles.map((vehicle) => (
                <ListingCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onClick={onViewDetails}
                  onTrackLead={onTrackLead}
                />
              ))}
            </div>
          ) : (
            <div className="py-24 md:py-32 text-center">
              <Car className="h-12 w-12 md:h-16 md:w-16 text-gray-100 dark:text-gray-800 mx-auto mb-4 md:mb-6" />
              <p className="text-gray-400 font-black text-[10px] md:text-sm uppercase tracking-widest">No matching units found</p>
              <button
                onClick={() => setActiveType('All')}
                className="mt-4 text-black dark:text-white font-black text-[9px] md:text-[10px] uppercase tracking-widest underline decoration-2 underline-offset-4"
              >
                Reset Filters
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StockView;
