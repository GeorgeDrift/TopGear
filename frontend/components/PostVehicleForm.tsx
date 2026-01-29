
import React, { useState } from 'react';
import {
  Plus, Trash2, Save, Image as ImageIcon, Briefcase, Globe, Search
} from 'lucide-react';
import { Vehicle, VehicleType, ListingCategory } from '../types';

interface PostVehicleFormProps {
  mode: 'registry' | 'marketplace';
  inventory?: Vehicle[];
  onSuccess: () => void;
}

const PostVehicleForm: React.FC<PostVehicleFormProps> = ({ mode, inventory = [], onSuccess }) => {
  const [selectedInventoryId, setSelectedInventoryId] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState<(string | null)[]>([null, null, null, null]);
  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    price: '',
    location: '',
    mileage: '',
    transmission: 'Automatic',
    fuelType: 'Petrol',
    type: VehicleType.SEDAN,
    description: ''
  });

  const handleInventorySelect = (id: string) => {
    setSelectedInventoryId(id);
    setIsDropdownOpen(false);
    const vehicle = inventory.find(v => v.id === id);
    if (vehicle) {
      setFormData({
        title: vehicle.title,
        brand: vehicle.brand,
        model: vehicle.model,
        year: vehicle.year,
        price: vehicle.price,
        location: vehicle.location,
        mileage: vehicle.mileage,
        transmission: vehicle.transmission,
        fuelType: vehicle.fuelType,
        type: vehicle.type,
        description: vehicle.description
      });
      if (vehicle.imageUrl) {
        const newImages = [...images];
        newImages[0] = vehicle.imageUrl;
        setImages(newImages);
      }
    }
  };

  const filteredInventory = inventory.filter(v =>
    v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleImageUpload = (index: number) => {
    const mockUrls = [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1525609004556-c46c7d6cf0ad?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1200&auto=format&fit=crop'
    ];
    const newImages = [...images];
    newImages[index] = mockUrls[index % mockUrls.length];
    setImages(newImages);
  };

  const removeImage = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (images.filter(img => img !== null).length < 1) {
      alert('Please upload at least one image.');
      return;
    }
    alert('Vehicle successfully added to internal stock registry.');
    onSuccess();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 text-left px-2">
      <div className="border-b border-gray-100 dark:border-white/5 pb-6 md:pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tight leading-none">
            {mode === 'registry' ? 'Register New Stock' : 'Post to Marketplace'}
          </h2>
          <p className="text-gray-400 dark:text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-2">
            {mode === 'registry' ? 'Add a unit to Top Gear Motors Internal Registry' : 'Publish an inventory unit to the public marketplace'}
          </p>
        </div>

        {mode === 'marketplace' && (
          <div className="w-full md:w-80">
            <label className="text-[9px] font-black uppercase tracking-widest text-indigo-600 mb-2 block ml-1">Select from Inventory</label>
            <div className="relative">
              {inventory.length > 0 ? (
                <>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full bg-indigo-50 dark:bg-indigo-600/10 border border-indigo-100 dark:border-indigo-500/20 rounded-xl px-4 py-3 text-xs font-black dark:text-white flex items-center justify-between outline-none uppercase transition-all hover:bg-indigo-100/50"
                  >
                    <span>{selectedInventoryId ? inventory.find(v => v.id === selectedInventoryId)?.title : '— Pick a Car —'}</span>
                    <Plus className={`h-4 w-4 text-indigo-600 transition-transform duration-300 ${isDropdownOpen ? 'rotate-45' : 'rotate-0'}`} />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/10 rounded-2xl shadow-2xl z-[100] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                      <div className="p-3 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search inventory..."
                            className="w-full bg-white dark:bg-black border border-gray-200 dark:border-white/5 rounded-xl pl-10 pr-4 py-2 text-[10px] font-bold uppercase transition-focus outline-none focus:ring-2 focus:ring-indigo-500/20"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="max-h-60 overflow-y-auto py-2">
                        {filteredInventory.length > 0 ? (
                          filteredInventory.map(v => (
                            <button
                              key={v.id}
                              type="button"
                              onClick={() => handleInventorySelect(v.id)}
                              className="w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/5 transition flex items-center gap-4 text-left group"
                            >
                              <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-white/5 shrink-0">
                                <img src={v.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" alt="" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-[10px] font-black uppercase text-gray-900 dark:text-white truncate leading-none">{v.title}</p>
                                <p className="text-[9px] font-bold text-gray-400 mt-1 uppercase">{v.brand} • {v.price}</p>
                              </div>
                            </button>
                          ))
                        ) : (
                          <div className="p-4 text-center">
                            <p className="text-[10px] font-bold text-gray-400">No matching cars found</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-[10px] font-bold text-gray-400 bg-gray-50 dark:bg-white/5 px-4 py-3 rounded-xl border border-dashed border-gray-200 dark:border-white/10 italic">
                  Add cars to your inventory to post here
                </p>
              )}
            </div>
          </div>
        )}

        {mode === 'registry' && (
          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-600/10 rounded-xl border border-indigo-100 dark:border-indigo-500/20">
            <Briefcase className="h-4 w-4 text-indigo-600" />
            <span className="text-[9px] font-black uppercase text-indigo-700 dark:text-indigo-400">Internal Use Only</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 md:space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="space-y-4 md:space-y-6">
            <div className="space-y-1.5 md:space-y-2">
              <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Vehicle Label / Name</label>
              <input required className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/5 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 text-xs md:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition uppercase" placeholder="e.g. TOYOTA HILUX 2.8GD-6" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="space-y-1.5 md:space-y-2">
                <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Manufacturer</label>
                <input required className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/5 rounded-xl px-3 md:px-4 py-2.5 md:py-3 text-xs md:text-sm font-bold dark:text-white" placeholder="Toyota" value={formData.brand} onChange={(e) => setFormData({ ...formData, brand: e.target.value })} />
              </div>
              <div className="space-y-1.5 md:space-y-2">
                <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Price Evaluation (MK)</label>
                <input required className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/5 rounded-xl px-3 md:px-4 py-2.5 md:py-3 text-xs md:text-sm font-bold dark:text-white" placeholder="6,500,000" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
              </div>
            </div>
          </div>
          <div className="space-y-1.5 md:space-y-2 flex flex-col">
            <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Technical Condition Notes</label>
            <textarea className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-white/5 rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 text-xs md:text-sm font-medium h-full min-h-[120px] md:min-h-[140px] resize-none dark:text-white" placeholder="Include engine specs, interior grade, and existing flaws..." value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}></textarea>
          </div>
        </div>

        <section className="space-y-3 md:space-y-4">
          <h3 className="text-xs md:text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest">
            {mode === 'registry' ? 'Inspection Documentation Photos' : 'Marketplace Gallery (Fetched from Stock)'}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {images.map((img, idx) => (
              <div
                key={idx}
                onClick={() => mode === 'registry' && handleImageUpload(idx)}
                className={`aspect-video rounded-xl md:rounded-2xl overflow-hidden group relative border-2 border-dashed transition-all ${images[idx] ? '' : 'cursor-pointer'} ${img ? 'border-black dark:border-white bg-black' : 'border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 hover:border-black dark:hover:border-white'}`}
              >
                {img ? (
                  <>
                    <img src={img} className="w-full h-full object-cover" alt="" />
                    {mode === 'registry' && (
                      <button onClick={(e) => removeImage(idx, e)} className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition shadow-md"><Trash2 className="h-3 w-3" /></button>
                    )}
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <Plus className="h-5 w-5 md:h-6 md:w-6 mb-1" />
                    <span className="text-[7px] md:text-[8px] font-black uppercase tracking-widest text-center px-2">
                      {mode === 'registry' ? 'Attach Document / Photo' : 'No Image Fetched'}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <div className="pt-6 flex justify-center md:justify-end">
          <button type="submit" className="w-full md:w-auto bg-black dark:bg-white text-white dark:text-black font-black px-12 md:px-16 py-4 md:py-6 rounded-xl md:rounded-[2.5rem] hover:opacity-80 transition shadow-xl flex items-center justify-center gap-3 uppercase text-[10px] md:text-xs tracking-[0.2em]">
            {mode === 'registry' ? <Save className="h-4 w-4 md:h-5 md:w-5" /> : <Globe className="h-4 w-4 md:h-5 md:w-5" />}
            {mode === 'registry' ? 'Commit to Stock Registry' : 'Post to Marketplace'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostVehicleForm;
