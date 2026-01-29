
import React from 'react';
import { Vehicle } from '../types';
import { Gauge, Fuel, Phone, Heart, MessageCircle, Calendar } from 'lucide-react';

interface ListingCardProps {
  vehicle: Vehicle;
  onClick: (vehicle: Vehicle) => void;
  onTrackLead: (vehicle: Vehicle, type: 'WhatsApp' | 'Call') => void;
}

const ListingCard: React.FC<ListingCardProps> = ({ vehicle, onClick, onTrackLead }) => {
  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    onTrackLead(vehicle, 'WhatsApp');
    window.open(`https://wa.me/${vehicle.whatsapp}?text=Hi, I am interested in your vehicle: ${vehicle.title} listed on Top Gear Motors`, '_blank');
  };

  const handlePhone = (e: React.MouseEvent) => {
    e.stopPropagation();
    onTrackLead(vehicle, 'Call');
    window.location.href = `tel:${vehicle.phone}`;
  };

  return (
    <div
      className="group bg-white dark:bg-black rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col h-full shadow-sm"
      onClick={() => onClick(vehicle)}
    >
      <div className="relative h-40 md:h-52 overflow-hidden bg-gray-50 dark:bg-gray-900">
        <img
          src={vehicle.imageUrl}
          alt={`${vehicle.title}`}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute top-3 md:top-4 left-3 md:left-4 flex flex-col gap-1.5 md:gap-2 z-10">
          {vehicle.isSponsored && (
            <span className="bg-white/90 dark:bg-black/90 backdrop-blur-sm text-[7px] md:text-[8px] font-black px-2 md:px-2.5 py-0.5 md:py-1 rounded-full text-black dark:text-white uppercase tracking-widest shadow-sm border border-black/5 dark:border-white/5">
              SPONSORED
            </span>
          )}
          <span className="bg-black dark:bg-white text-white dark:text-black text-[7px] md:text-[8px] font-black px-3 md:px-3.5 py-1 md:py-1.5 rounded-full uppercase tracking-widest shadow-xl">
            FOR SALE
          </span>
        </div>

        <button className="absolute top-3 md:top-4 right-3 md:right-4 z-10 p-2 md:p-2.5 bg-white/90 dark:bg-black/90 rounded-full text-gray-400 hover:text-black dark:hover:text-white transition shadow-lg shrink-0">
          <Heart className="h-3.5 w-3.5 md:h-4 md:w-4" />
        </button>
      </div>

      <div className="p-4 md:p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-3 md:mb-4">
          <span className="text-[8px] md:text-[9px] font-black text-gray-400 uppercase tracking-widest shrink-0">{vehicle.brand} • {vehicle.year}</span>
          <span className="text-black dark:text-white font-black text-base md:text-lg tracking-tighter ml-2">{vehicle.price}</span>
        </div>

        <h3 className="text-lg md:text-xl font-black text-black dark:text-white line-clamp-1 mb-1 uppercase tracking-tight">{vehicle.title}</h3>
        <p className="text-gray-400 dark:text-gray-500 text-[9px] md:text-[11px] font-bold uppercase tracking-widest mb-6 md:mb-8 truncate">{vehicle.location}</p>

        <div className="grid grid-cols-3 gap-2 py-4 md:py-5 border-y border-gray-50 dark:border-white/5 mb-6 md:mb-8">
          <div className="flex flex-col items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-gray-400" />
            <span className="text-[9px] md:text-[10px] text-gray-900 dark:text-white font-black">{vehicle.year}</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 border-x border-gray-50 dark:border-white/5">
            <Gauge className="h-3.5 w-3.5 text-gray-400" />
            <span className="text-[9px] md:text-[10px] text-gray-900 dark:text-white font-black">{vehicle.transmission.charAt(0)}</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <Fuel className="h-3.5 w-3.5 text-gray-400" />
            <span className="text-[9px] md:text-[10px] text-gray-900 dark:text-white font-black">{vehicle.fuelType}</span>
          </div>
        </div>

        <div className="mt-auto flex gap-3">
          <button
            onClick={handleWhatsApp}
            className="flex-1 bg-black dark:bg-white text-white dark:text-black text-[9px] md:text-[10px] font-black py-3.5 md:py-4 rounded-2xl md:rounded-3xl transition flex items-center justify-center gap-2 uppercase tracking-widest hover:scale-[1.02] active:scale-95 transform shadow-lg"
          >
            <MessageCircle className="h-3.5 md:h-4 w-3.5 md:w-4 shrink-0 fill-current" />
            WhatsApp Us
          </button>
          <button onClick={handlePhone} className="p-3.5 md:p-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/5 rounded-2xl md:rounded-3xl text-black dark:text-white hover:bg-black hover:text-white transition group/phone shrink-0 active:scale-95 transform shadow-md">
            <Phone className="h-4 w-4 md:h-5 md:w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
