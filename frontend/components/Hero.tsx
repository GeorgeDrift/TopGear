
import React, { useState, useEffect } from 'react';
import { Search, MapPin, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Vehicle } from '../types';

interface HeroProps {
  onSearch: (query: string) => void;
  featuredVehicles: Vehicle[];
  onViewDetails: (vehicle: Vehicle) => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch, featuredVehicles, onViewDetails }) => {
  const [query, setQuery] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (featuredVehicles.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredVehicles.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [featuredVehicles.length]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % featuredVehicles.length);
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + featuredVehicles.length) % featuredVehicles.length);
  };

  const currentVehicle = featuredVehicles[currentIndex];

  return (
    <div className="relative min-h-[500px] lg:h-[650px] bg-black text-white overflow-hidden group transition-all duration-500">
      {/* Background with cross-fade effect */}
      <div className="absolute inset-0 transition-all duration-1000 ease-in-out">
        {featuredVehicles.map((v, idx) => (
          <div
            key={v.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${idx === currentIndex ? 'opacity-100' : 'opacity-0'}`}
          >
            <img
              src={v.imageUrl}
              alt={v.title}
              className={`w-full h-full object-cover opacity-50 transition-transform duration-[8000ms] ease-linear scale-100`}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-full mx-auto px-4 sm:px-6 lg:px-12 py-20 lg:py-0 h-full flex flex-col justify-center items-start text-left">
        <div className="inline-flex items-center gap-1.5 md:gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-2.5 md:px-3 py-1 rounded-full text-white text-[7px] md:text-[9px] font-black uppercase tracking-[0.2em] mb-4 md:mb-8">
          <Star className="h-2.5 w-2.5 md:h-3 md:w-3 fill-current" />
          Top Gear Exclusive
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black tracking-tighter mb-4 md:mb-6 drop-shadow-2xl max-w-4xl leading-[0.9] md:leading-[0.85] uppercase">
          {currentVehicle?.title || "Drive Premium."}
        </h1>
        <p className="text-sm md:text-xl text-gray-300 mb-8 md:mb-12 max-w-md md:max-w-xl font-medium drop-shadow-md line-clamp-3 md:line-clamp-none">
          Malawi's premier destination for high-quality vehicles. Browse our exclusive inventory of verified car sales across the nation.
        </p>

        <div className="flex flex-col sm:flex-row w-full max-w-2xl gap-3 md:gap-4">
          <form onSubmit={handleSearch} className="flex-1 flex flex-col md:flex-row bg-white rounded-2xl md:rounded-full p-1.5 md:p-2 shadow-2xl gap-1.5 md:gap-2">
            <div className="flex-1 flex items-center px-4 md:px-6 py-2.5 md:py-4 bg-gray-50 rounded-xl md:rounded-full">
              <MapPin className="h-4 w-4 md:h-5 md:w-5 text-black mr-2 md:mr-4 shrink-0" />
              <input
                type="text"
                placeholder="Search model, brand or city..."
                className="w-full bg-transparent outline-none text-black placeholder-gray-400 font-bold text-xs md:text-sm"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <button type="submit" className="bg-black hover:bg-gray-800 text-white font-black py-3 md:py-4 px-8 md:px-12 rounded-xl md:rounded-full transition duration-300 flex items-center justify-center gap-2 shadow-lg uppercase text-[8px] md:text-[10px] tracking-widest shrink-0">
              <Search className="h-3.5 w-3.5 md:h-4 md:w-4" />
              <span>Search</span>
            </button>
          </form>
        </div>

        <div className="mt-8 md:mt-10 flex flex-wrap gap-2 md:gap-4 text-[7px] md:text-[9px] font-black text-gray-400 uppercase tracking-widest">
          <span className="text-gray-500">Trending:</span>
          <button onClick={() => onSearch("Toyota")} className="hover:text-white transition bg-white/5 px-2.5 md:px-4 py-1 md:py-1.5 rounded-full border border-white/10">Toyota</button>
          <button onClick={() => onSearch("SUV")} className="hover:text-white transition bg-white/5 px-2.5 md:px-4 py-1 md:py-1.5 rounded-full border border-white/10">SUV</button>
          <button onClick={() => onSearch("Lilongwe")} className="hover:text-white transition bg-white/5 px-2.5 md:px-4 py-1 md:py-1.5 rounded-full border border-white/10">Lilongwe</button>
        </div>
      </div>

      {/* Mini preview */}
      {currentVehicle && (
        <div
          className="absolute bottom-16 right-16 z-20 max-w-[280px] md:max-w-[320px] hidden lg:block cursor-pointer"
          onClick={() => onViewDetails(currentVehicle)}
        >
          <div className="bg-white text-black p-5 md:p-6 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border border-white/20 hover:-translate-y-2 transition duration-500 transform-gpu">
            <div className="flex justify-between items-start mb-3 md:mb-4">
              <div className="flex flex-col">
                <span className="text-[7px] md:text-[8px] font-black px-2 py-0.5 rounded-full w-fit uppercase tracking-tighter mb-1.5 md:mb-2 bg-black text-white">
                  {currentVehicle.category}
                </span>
                <h3 className="text-sm md:text-base font-black leading-tight line-clamp-1 uppercase tracking-tighter">{currentVehicle.title}</h3>
              </div>
            </div>

            {/* Gallery Preview */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {(currentVehicle.images?.slice(0, 3) || [currentVehicle.imageUrl, currentVehicle.imageUrl, currentVehicle.imageUrl]).map((img, i) => (
                <div key={i} className="aspect-video rounded-lg overflow-hidden bg-gray-100 ring-1 ring-black/5">
                  <img src={img} className="w-full h-full object-cover hover:scale-110 transition duration-500" alt="" />
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-3 md:pt-4 border-t border-gray-100">
              <span className="text-black font-black text-xl md:text-2xl tracking-tighter">{currentVehicle.price}</span>
              <div className="flex flex-col items-end">
                <span className="text-[8px] md:text-[9px] text-gray-400 font-bold uppercase">{currentVehicle.location.split(',')[0]}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Indicators */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2 md:gap-3">
        {featuredVehicles.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1 rounded-full transition-all duration-500 ${idx === currentIndex ? 'w-10 md:w-16 bg-white' : 'w-2 md:w-4 bg-white/30 hover:bg-white/50'}`}
          />
        ))}
      </div>

      <button onClick={prevSlide} className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 p-4 md:p-5 rounded-full bg-white/10 hover:bg-white/30 text-white transition backdrop-blur-md opacity-0 group-hover:opacity-100 hidden md:block"><ChevronLeft className="h-5 w-5 md:h-6 md:w-6" /></button>
      <button onClick={nextSlide} className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 p-4 md:p-5 rounded-full bg-white/10 hover:bg-white/30 text-white transition backdrop-blur-md opacity-0 group-hover:opacity-100 hidden md:block"><ChevronRight className="h-5 w-5 md:h-6 md:w-6" /></button>
    </div>
  );
};

export default Hero;
