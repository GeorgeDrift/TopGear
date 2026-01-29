
import React from 'react';
import { ShieldCheck, Star, Users, MapPin } from 'lucide-react';

const AboutUs: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-gray-50 dark:bg-white/5 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
                <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
                    <img 
                        src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop" 
                        alt="Top Gear Showroom" 
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute -bottom-8 -right-8 bg-black dark:bg-white p-10 rounded-[2.5rem] shadow-2xl hidden md:block">
                    <p className="text-white dark:text-black font-black text-4xl leading-none tracking-tighter">12+</p>
                    <p className="text-gray-400 dark:text-gray-500 text-[10px] font-black uppercase tracking-widest mt-2">Years of Excellence</p>
                </div>
            </div>

            <div className="space-y-8 text-left">
                <div>
                    <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Our DNA</span>
                    <h2 className="text-4xl md:text-6xl font-black text-black dark:text-white tracking-tighter uppercase leading-[0.9]">
                        Premier destination for luxury <br/> in Malawi.
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-6 text-sm md:text-lg font-medium leading-relaxed max-w-xl">
                        At Top Gear Motors, we have redefined the vehicle buying experience in Malawi. We specialize in sourcing verified, high-performance vehicles for the discerning driver.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="flex gap-4">
                        <div className="p-3 bg-white dark:bg-black rounded-2xl shadow-lg h-fit text-blue-600 shrink-0">
                            <ShieldCheck className="h-6 w-6" />
                        </div>
                        <div>
                            <h4 className="font-black text-black dark:text-white text-sm uppercase mb-1">Top Gear Verified</h4>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Rigorous unit check</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="p-3 bg-white dark:bg-black rounded-2xl shadow-lg h-fit text-orange-500 shrink-0">
                            <Star className="h-6 w-6" />
                        </div>
                        <div>
                            <h4 className="font-black text-black dark:text-white text-sm uppercase mb-1">Platinum Support</h4>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">7 Days showroom access</p>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-200 dark:border-white/10 flex items-center gap-6">
                    <div className="flex -space-x-3">
                        {[1,2,3,4].map(i => (
                            <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-black bg-gray-200 overflow-hidden">
                                <img src={`https://i.pravatar.cc/100?u=${i+10}`} alt="User" />
                            </div>
                        ))}
                    </div>
                    <div>
                        <p className="text-xs font-black text-black dark:text-white uppercase tracking-tighter">Trusted by 5,000+ owners</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
