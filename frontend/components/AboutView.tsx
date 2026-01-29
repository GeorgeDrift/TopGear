
import React from 'react';
import AboutUs from './AboutUs';

const AboutView: React.FC = () => {
  return (
    <div id="about" className="animate-in fade-in duration-700">
      <AboutUs />
      
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100 dark:border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
           <div>
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-6">Our Mission</h2>
              <p className="text-gray-500 font-medium leading-relaxed">
                At Top Gear Motors, our mission is to empower Malawians with transparent, high-quality vehicle sales. We believe that buying a car should be as exciting as the first drive. We eliminate the uncertainty of the second-hand market by providing fully verified, dealer-backed stock and a modern digital experience.
              </p>
           </div>
           <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square bg-gray-100 dark:bg-white/5 rounded-3xl flex flex-col items-center justify-center p-6 text-center">
                 <span className="text-2xl font-black mb-1">500+</span>
                 <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Cars Sold</span>
              </div>
              <div className="aspect-square bg-black text-white rounded-3xl flex flex-col items-center justify-center p-6 text-center shadow-xl">
                 <span className="text-2xl font-black mb-1">10+</span>
                 <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Dealerships</span>
              </div>
              <div className="aspect-square bg-gray-100 dark:bg-white/5 rounded-3xl flex flex-col items-center justify-center p-6 text-center">
                 <span className="text-2xl font-black mb-1">100%</span>
                 <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Verified</span>
              </div>
              <div className="aspect-square bg-gray-100 dark:bg-white/5 rounded-3xl flex flex-col items-center justify-center p-6 text-center">
                 <span className="text-2xl font-black mb-1">24/7</span>
                 <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Support</span>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default AboutView;
