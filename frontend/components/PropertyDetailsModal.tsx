
import React from 'react';
import { Vehicle } from '../types';
import { X, MapPin, Calendar, Gauge, Fuel, MessageCircle, Phone, Share2, Heart, CheckCircle, Info } from 'lucide-react';

interface VehicleDetailsModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
}

const VehicleDetailsModal: React.FC<VehicleDetailsModalProps> = ({ vehicle, onClose }) => {
  if (!vehicle) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative bg-white rounded-3xl w-full max-w-5xl h-[90vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row overflow-hidden">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition"><X className="h-5 w-5" /></button>

        <div className="w-full md:w-1/2 h-80 md:h-auto relative bg-gray-100">
             <img src={vehicle.imageUrl} alt={vehicle.title} className="w-full h-full object-cover" />
             <div className="absolute bottom-6 left-6 bg-white px-5 py-3 rounded-2xl shadow-2xl">
                <p className="text-2xl font-black text-blue-600">{vehicle.price}</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{vehicle.category}</p>
             </div>
        </div>

        <div className="w-full md:w-1/2 p-8 flex flex-col">
            <div className="mb-6">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-widest mb-3">
                    {vehicle.type}
                </span>
                <h2 className="text-3xl font-black text-gray-900 mb-2">{vehicle.title}</h2>
                <div className="flex items-center text-gray-500 font-medium">
                    <MapPin className="h-4 w-4 mr-1 text-blue-500" />
                    <span className="text-sm">{vehicle.location}</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
                 <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-2 text-blue-600 mb-1"><Calendar className="h-4 w-4" /><span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Year</span></div>
                    <span className="text-lg font-bold text-gray-900">{vehicle.year}</span>
                 </div>
                 <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-2 text-blue-600 mb-1"><Gauge className="h-4 w-4" /><span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Transmission</span></div>
                    <span className="text-lg font-bold text-gray-900">{vehicle.transmission}</span>
                 </div>
                 <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-2 text-blue-600 mb-1"><Fuel className="h-4 w-4" /><span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Fuel</span></div>
                    <span className="text-lg font-bold text-gray-900">{vehicle.fuelType}</span>
                 </div>
                 <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-2 text-blue-600 mb-1"><Info className="h-4 w-4" /><span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Mileage</span></div>
                    <span className="text-lg font-bold text-gray-900">{vehicle.mileage}</span>
                 </div>
            </div>

            <div className="mb-8">
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-3">Description</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{vehicle.description}</p>
                <div className="flex items-center gap-2 text-xs font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-full w-fit">
                    <CheckCircle className="h-3 w-3" /> Verified Listing
                </div>
            </div>

            <div className="mt-auto flex gap-3 flex-wrap">
                <a href={`tel:${vehicle.phone}`} className="flex-1 min-w-[140px] bg-blue-600 text-white font-black py-4 rounded-2xl hover:bg-blue-700 transition shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2">
                    <Phone className="h-5 w-5" /> CALL NOW
                </a>
                <a href={`https://wa.me/${vehicle.whatsapp}`} target="_blank" className="flex-1 min-w-[140px] bg-green-600 text-white font-black py-4 rounded-2xl hover:bg-green-700 transition shadow-xl shadow-green-600/20 flex items-center justify-center gap-2">
                    <MessageCircle className="h-5 w-5" /> WHATSAPP
                </a>
                <div className="flex gap-2 w-full mt-2 sm:mt-0 sm:w-auto">
                    <button className="p-4 border border-gray-100 rounded-2xl hover:bg-gray-50 text-gray-400 transition"><Heart className="h-5 w-5" /></button>
                    <button className="p-4 border border-gray-100 rounded-2xl hover:bg-gray-50 text-gray-400 transition"><Share2 className="h-5 w-5" /></button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailsModal;
