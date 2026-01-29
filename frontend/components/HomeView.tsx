
import React from 'react';
import Hero from './Hero';
import StockView from './StockView';
import { Vehicle, VehicleType } from '../types';

interface HomeViewProps {
  featuredVehicles: Vehicle[];
  allVehicles: Vehicle[];
  isLoading: boolean;
  activeType: VehicleType | 'All';
  setActiveType: (type: VehicleType | 'All') => void;
  onSearch: (query: string) => void;
  onViewDetails: (vehicle: Vehicle) => void;
  onTrackLead: (v: Vehicle, type: 'WhatsApp' | 'Call') => void;
}

const HomeView: React.FC<HomeViewProps> = ({
  featuredVehicles,
  allVehicles,
  isLoading,
  activeType,
  setActiveType,
  onSearch,
  onViewDetails,
  onTrackLead
}) => {
  return (
    <div id="home" className="animate-in fade-in duration-700">
      <Hero
        onSearch={onSearch}
        featuredVehicles={featuredVehicles}
        onViewDetails={onViewDetails}
      />

      <div className="bg-white dark:bg-black">
        <StockView
          vehicles={allVehicles}
          isLoading={isLoading}
          activeType={activeType}
          setActiveType={setActiveType}
          onViewDetails={onViewDetails}
          onTrackLead={onTrackLead}
        />
      </div>

      <section className="max-w-full mx-auto px-4 sm:px-6 lg:px-12 py-20 text-center border-t border-gray-100 dark:border-gray-800">
        <h2 className="text-3xl md:text-5xl font-black text-black dark:text-white uppercase tracking-tighter mb-6">
          The Top Gear Experience
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed mb-12">
          Top Gear Motors provides a premium digital marketplace for high-end vehicles in Malawi. Every unit listed is verified and backed by our commitment to quality.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-10 bg-gray-50 dark:bg-white/5 rounded-[2.5rem] border border-gray-100 dark:border-white/10">
            <h3 className="text-xl font-black mb-3 uppercase tracking-tight">Verified Stock</h3>
            <p className="text-sm text-gray-500 font-medium">Internal registry checks ensure every Top Gear vehicle is genuine and duty-paid.</p>
          </div>
          <div className="p-10 bg-gray-50 dark:bg-white/5 rounded-[2.5rem] border border-gray-100 dark:border-white/10">
            <h3 className="text-xl font-black mb-3 uppercase tracking-tight">Direct Access</h3>
            <p className="text-sm text-gray-500 font-medium">Connect directly with our marketplace managers in Blantyre and Lilongwe via WhatsApp or Phone.</p>
          </div>
          <div className="p-10 bg-gray-50 dark:bg-white/5 rounded-[2.5rem] border border-gray-100 dark:border-white/10">
            <h3 className="text-xl font-black mb-3 uppercase tracking-tight">Expert Sourcing</h3>
            <p className="text-sm text-gray-500 font-medium">Can't find it? Our expert agents can source specific models from our global network.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeView;
