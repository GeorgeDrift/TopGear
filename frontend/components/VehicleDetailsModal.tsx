
import React, { useState } from 'react';
import { Vehicle } from '../types';
import { X, MapPin, Calendar, Gauge, Fuel, MessageCircle, Phone, Share2, Heart, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

interface VehicleDetailsModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
  onTrackLead: (vehicle: Vehicle, type: 'WhatsApp' | 'Call') => void;
}

const VehicleDetailsModal: React.FC<VehicleDetailsModalProps> = ({ vehicle, onClose, onTrackLead }) => {
  const [activeImg, setActiveImg] = useState(0);
  
  if (!vehicle) return null;

  const images = vehicle.images || [vehicle.imageUrl];

  const nextImg = () => setActiveImg((prev) => (prev + 1) % images.length);
  const prevImg = () => setActiveImg((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose}></div>

      <div className="relative bg-white dark:bg-black rounded-[2.5rem] w-full max-w-6xl h-[90vh] overflow-y-auto shadow-2xl flex flex-col lg:flex-row overflow-hidden border border-gray-200 dark:border-gray-800">
        <button onClick={onClose} className="absolute top-6 right-6 z-20 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition backdrop-blur-md"><X className="h-6 w-6" /></button>

        <div className="w-full lg:w-3/5 h-[400px] lg:h-auto relative bg-gray-100 dark:bg-gray-900 group">
             <div className="absolute inset-0">
               {images.map((img, idx) => (
                 <img 
                    key={idx}
                    src={img} 
                    alt={`${vehicle.title}`} 
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === activeImg ? 'opacity-100' : 'opacity-0'}`} 
                  />
               ))}
             </div>

             {images.length > 1 && (
               <>
                 <div className="absolute inset-0 flex items-center justify-between px-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={prevImg} className="p-4 rounded-full bg-black/30 hover:bg-black/50 text-white transition backdrop-blur-md border border-white/10">
                        <ChevronLeft className="h-8 w-8" />
                    </button>
                    <button onClick={nextImg} className="p-4 rounded-full bg-black/30 hover:bg-black/50 text-white transition backdrop-blur-md border border-white/10">
                        <ChevronRight className="h-8 w-8" />
                    </button>
                 </div>
                 <div className="absolute bottom-8 right-8 flex gap-3">
                   {images.map((_, idx) => (
                     <button 
                        key={idx}
                        onClick={() => setActiveImg(idx)}
                        className={`h-1 rounded-full transition-all duration-500 ${idx === activeImg ? 'w-16 bg-white' : 'w-4 bg-white/40 hover:bg-white'}`}
                      />
                   ))}
                 </div>
               </>
             )}

             <div className="absolute bottom-8 left-8 bg-white dark:bg-black p-8 rounded-[1.5rem] shadow-2xl border border-gray-100 dark:border-gray-800">
                <p className="text-3xl font-black text-black dark:text-white tracking-tighter">{vehicle.price}</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{vehicle.category}</p>
             </div>
        </div>

        <div className="w-full lg:w-2/5 p-10 flex flex-col bg-white dark:bg-black text-black dark:text-white">
            <div className="mb-8">
                <span className="inline-block px-4 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white text-[9px] font-black uppercase tracking-widest mb-4">
                    {vehicle.type}
                </span>
                <h2 className="text-4xl font-black text-black dark:text-white mb-3 uppercase tracking-tighter leading-none">{vehicle.title}</h2>
                <div className="flex items-center text-gray-400 font-bold uppercase tracking-widest text-[10px]">
                    <MapPin className="h-4 w-4 mr-2 text-black dark:text-white" />
                    <span>{vehicle.location}</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-10">
                 <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-2 text-black dark:text-white mb-2"><Calendar className="h-4 w-4" /><span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Manufactured</span></div>
                    <span className="text-xl font-black text-black dark:text-white">{vehicle.year}</span>
                 </div>
                 <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-2 text-black dark:text-white mb-2"><Gauge className="h-4 w-4" /><span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Transmission</span></div>
                    <span className="text-xl font-black text-black dark:text-white">{vehicle.transmission}</span>
                 </div>
                 <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-2 text-black dark:text-white mb-2"><Fuel className="h-4 w-4" /><span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Fuel Type</span></div>
                    <span className="text-xl font-black text-black dark:text-white">{vehicle.fuelType}</span>
                 </div>
                 <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-2 text-black dark:text-white mb-2"><CheckCircle className="h-4 w-4" /><span className="text-[9px] font-black uppercase tracking-widest text-gray-400">Mileage</span></div>
                    <span className="text-xl font-black text-black dark:text-white">{vehicle.mileage}</span>
                 </div>
            </div>

            <div className="mb-10">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Seller Description</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 font-medium">{vehicle.description}</p>
                <div className="flex items-center gap-2 text-[10px] font-black text-black dark:text-white bg-gray-50 dark:bg-gray-900 px-4 py-2 rounded-full w-fit uppercase tracking-widest border border-gray-100 dark:border-gray-800">
                    <CheckCircle className="h-4 w-4 text-green-500" /> Top Gear Verified
                </div>
            </div>

            <div className="mt-auto flex flex-col gap-3">
                <div className="flex gap-3">
                    <button 
                      onClick={() => {
                        onTrackLead(vehicle, 'Call');
                        window.location.href = `tel:${vehicle.phone}`;
                      }}
                      className="flex-1 bg-black dark:bg-white text-white dark:text-black font-black py-5 rounded-2xl hover:opacity-80 transition shadow-2xl flex items-center justify-center gap-3 uppercase text-[10px] tracking-widest"
                    >
                        <Phone className="h-5 w-5" /> Call Dealer
                    </button>
                    <button 
                      onClick={() => {
                        onTrackLead(vehicle, 'WhatsApp');
                        window.open(`https://wa.me/${vehicle.whatsapp}?text=Hi, I am interested in your ${vehicle.title} on Top Gear Motors`, '_blank');
                      }}
                      className="flex-1 bg-gray-50 dark:bg-gray-900 text-black dark:text-white font-black py-5 rounded-2xl border border-gray-200 dark:border-gray-800 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition flex items-center justify-center gap-3 uppercase text-[10px] tracking-widest"
                    >
                        <MessageCircle className="h-5 w-5" /> WhatsApp
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailsModal;
