
import React from 'react';
// Added History to imports from lucide-react to avoid collision with global History type
import { PlusCircle, Settings, AlertCircle, MapPin, Car, CheckCircle, XCircle, Trash2, History } from 'lucide-react';
import { Vehicle, ListingCategory, VehicleStatus } from '../types';

interface FleetProps {
  vehicles: Vehicle[];
  onAddVehicle?: () => void;
  onUpdateStatus: (id: string, status: VehicleStatus) => void;
}

const Fleet: React.FC<FleetProps> = ({ vehicles, onAddVehicle, onUpdateStatus }) => {
  // Only show non-archived vehicles in the main fleet view, or show all with clear status
  const visibleVehicles = vehicles;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Fleet Management</h2>
          <p className="text-sm text-gray-500">View and manage your active vehicle listings.</p>
        </div>
        <button 
          onClick={onAddVehicle}
          className="bg-blue-600 text-white font-black text-xs px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-blue-700 transition shadow-lg shadow-blue-600/20"
        >
          <PlusCircle className="h-4 w-4" /> ADD NEW VEHICLE
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {visibleVehicles.length > 0 ? (
          visibleVehicles.map((v) => (
            <div key={v.id} className={`bg-white dark:bg-gray-900 p-4 rounded-3xl border border-gray-100 dark:border-white/5 flex flex-col group hover:shadow-xl transition-all duration-300 ${v.status === VehicleStatus.ARCHIVED ? 'opacity-50 grayscale' : ''}`}>
              <div className="relative h-44 mb-4 overflow-hidden rounded-2xl">
                <img src={v.imageUrl} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                    <span className="bg-blue-600/90 backdrop-blur-sm text-white text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-widest">
                    {v.category === ListingCategory.RENTAL ? 'Rental' : 'Sale'}
                    </span>
                    <span className={`text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-widest ${
                        v.status === VehicleStatus.AVAILABLE ? 'bg-green-500 text-white' : 
                        v.status === VehicleStatus.SOLD ? 'bg-red-500 text-white' : 
                        v.status === VehicleStatus.RENTED ? 'bg-orange-500 text-white' : 'bg-gray-500 text-white'
                    }`}>
                        {v.status}
                    </span>
                </div>
              </div>
              <div className="px-1 flex-1 flex flex-col">
                <h3 className="font-bold text-gray-900 dark:text-white mb-1 truncate">{v.title}</h3>
                <div className="flex items-center text-gray-400 text-[10px] font-bold uppercase mb-3">
                  <MapPin className="h-3 w-3 mr-1 text-blue-500" /> {v.location.split(',')[0]}
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-4">
                    {v.category === ListingCategory.SALE && v.status === VehicleStatus.AVAILABLE && (
                        <button 
                            onClick={() => onUpdateStatus(v.id, VehicleStatus.SOLD)}
                            className="bg-red-50 dark:bg-red-900/10 text-red-600 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition flex items-center justify-center gap-1"
                        >
                            <CheckCircle className="h-3 w-3" /> Mark Sold
                        </button>
                    )}
                    {v.category === ListingCategory.RENTAL && v.status === VehicleStatus.AVAILABLE && (
                        <button 
                            onClick={() => onUpdateStatus(v.id, VehicleStatus.RENTED)}
                            className="bg-orange-50 dark:bg-orange-900/10 text-orange-600 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-orange-600 hover:text-white transition flex items-center justify-center gap-1"
                        >
                            <CheckCircle className="h-3 w-3" /> Mark Rented
                        </button>
                    )}
                    {(v.status === VehicleStatus.SOLD || v.status === VehicleStatus.RENTED) && (
                        <button 
                            onClick={() => onUpdateStatus(v.id, VehicleStatus.AVAILABLE)}
                            className="bg-blue-50 dark:bg-blue-900/10 text-blue-600 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition flex items-center justify-center gap-1"
                        >
                            <History className="h-3 w-3" /> Relist Car
                        </button>
                    )}
                    {v.status !== VehicleStatus.ARCHIVED ? (
                        <button 
                            onClick={() => onUpdateStatus(v.id, VehicleStatus.ARCHIVED)}
                            className="bg-gray-100 dark:bg-white/5 text-gray-400 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-gray-900 hover:text-white transition flex items-center justify-center gap-1"
                        >
                            <Trash2 className="h-3 w-3" /> Archive
                        </button>
                    ) : (
                        <button 
                            onClick={() => onUpdateStatus(v.id, VehicleStatus.AVAILABLE)}
                            className="bg-green-50 dark:bg-green-900/10 text-green-600 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-green-600 hover:text-white transition col-span-2 flex items-center justify-center gap-1"
                        >
                            <PlusCircle className="h-3 w-3" /> Unarchive Listing
                        </button>
                    )}
                </div>

                <div className="mt-auto pt-3 border-t border-gray-50 dark:border-white/5 flex justify-between items-center">
                  <span className="font-black text-blue-600 text-sm">{v.price}</span>
                  <div className="flex gap-1">
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition" title="Edit Listing">
                      <Settings className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 bg-gray-50 dark:bg-gray-900/50 rounded-3xl border-2 border-dashed border-gray-200 dark:border-white/10 flex flex-col items-center justify-center text-center">
             <div className="bg-white dark:bg-gray-800 p-4 rounded-full shadow-sm mb-4"><Car className="h-8 w-8 text-gray-300" /></div>
             <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">No vehicles in your fleet yet</p>
             <button onClick={onAddVehicle} className="mt-4 text-blue-600 font-black text-sm hover:underline">Click here to add your first car</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Fleet;
