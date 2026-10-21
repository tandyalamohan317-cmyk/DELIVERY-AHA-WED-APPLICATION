import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Search,
  Navigation,
  Check,
  X,
  Building2,
  Home,
  Briefcase
} from 'lucide-react';
import { useLocation } from '../../context/LocationContext';

const LocationModal = () => {
  const {
    cities,
    selectedCity,
    selectedArea,
    savedAddresses,
    isLocationModalOpen,
    closeLocationModal,
    changeCity,
    changeArea,
    selectAddress,
    detectGPS
  } = useLocation();

  const [citySearch, setCitySearch] = useState('');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isLocationModalOpen) {
        closeLocationModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLocationModalOpen, closeLocationModal]);

  if (!isLocationModalOpen) return null;

  const filteredCities = cities.filter(c =>
    c.name.toLowerCase().includes(citySearch.toLowerCase()) ||
    c.state.toLowerCase().includes(citySearch.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="max-w-xl w-full glass-panel-gold rounded-3xl border border-amber-400/40 p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <h3 className="text-xl font-bold text-white font-royal flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-400" />
              <span>Choose Delivery Location</span>
            </h3>
            <p className="text-xs text-white/60 mt-0.5">
              Select your city and locality for tailored restaurants and express dispatch.
            </p>
          </div>

          <button
            onClick={closeLocationModal}
            className="p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* GPS Detection Bar */}
        <button
          onClick={() => {
            detectGPS();
            closeLocationModal();
          }}
          className="w-full p-3.5 rounded-2xl bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 text-amber-300 flex items-center justify-between transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-400/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Navigation className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-white">Use Current Location</p>
              <p className="text-[11px] text-white/50">Enable GPS for auto-detection</p>
            </div>
          </div>
          <span className="text-xs font-bold text-amber-400">Detect GPS →</span>
        </button>

        {/* Saved Addresses Section */}
        {savedAddresses.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white/80 uppercase tracking-wider">Saved Addresses</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {savedAddresses.map((addr) => (
                <button
                  key={addr.id}
                  onClick={() => {
                    selectAddress(addr);
                    closeLocationModal();
                  }}
                  className="p-3 rounded-2xl glass-card border border-white/10 text-left hover:border-amber-400/40 transition-all flex items-start gap-2.5"
                >
                  <span className="p-1.5 rounded-lg bg-white/5 text-amber-400 mt-0.5">
                    {addr.title === 'Home' ? <Home className="w-3.5 h-3.5" /> : <Briefcase className="w-3.5 h-3.5" />}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">{addr.title}</p>
                    <p className="text-[11px] text-white/50 truncate">{addr.flatNo}, {addr.street}</p>
                    <p className="text-[10px] text-amber-300">{addr.area}, {addr.city}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search City */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white/80 uppercase tracking-wider">Select Royal City</h4>
          
          <div className="relative">
            <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              value={citySearch}
              onChange={(e) => setCitySearch(e.target.value)}
              placeholder="Search Indian cities (e.g. Hyderabad, Bengaluru, Mumbai)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl glass-input text-xs text-white placeholder-white/40 focus:outline-none"
            />
          </div>

          {/* Cities Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
            {filteredCities.map((city) => {
              const isSelected = selectedCity?.name === city.name;
              return (
                <button
                  key={city.id}
                  onClick={() => changeCity(city)}
                  className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-gold-glow'
                      : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                  }`}
                >
                  <span className="truncate">{city.name}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3] ml-1 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Select Locality / Area */}
        {selectedCity && (
          <div className="space-y-2 pt-2 border-t border-white/10">
            <h4 className="text-xs font-bold text-white/80 uppercase tracking-wider">
              Localities in {selectedCity.name}
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedCity.areas.map((area) => {
                const isAreaSelected = selectedArea === area;
                return (
                  <button
                    key={area}
                    onClick={() => {
                      changeArea(area);
                      closeLocationModal();
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      isAreaSelected
                        ? 'bg-amber-400 text-slate-950 font-bold shadow-md'
                        : 'bg-white/5 hover:bg-white/15 text-white/80 border border-white/10'
                    }`}
                  >
                    {area}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationModal;
