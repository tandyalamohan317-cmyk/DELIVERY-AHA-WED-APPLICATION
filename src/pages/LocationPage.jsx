import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  Search,
  Navigation,
  CheckCircle2,
  Plus,
  Edit2,
  Trash2,
  Home,
  Briefcase,
  ArrowRight,
  Sparkles,
  Building2
} from 'lucide-react';
import { useLocation } from '../context/LocationContext';
import { useToast } from '../context/ToastContext';
import {
  addStoredAddress,
  updateStoredAddress,
  deleteStoredAddress,
  getStoredAddresses
} from '../data/storage';

const LocationPage = () => {
  const navigate = useNavigate();
  const {
    cities,
    selectedCity,
    selectedArea,
    changeCity,
    changeArea,
    selectAddress,
    detectGPS
  } = useLocation();
  const { showToast } = useToast();

  const [citySearch, setCitySearch] = useState('');
  const [savedAddresses, setSavedAddresses] = useState(getStoredAddresses());
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [addressForm, setAddressForm] = useState({
    title: 'Home',
    fullName: 'Arjun Verma',
    phone: '+91 98765 43210',
    flatNo: '',
    street: '',
    area: selectedArea || 'Banjara Hills',
    city: selectedCity?.name || 'Hyderabad',
    pincode: '500034',
    isDefault: false
  });

  const filteredCities = cities.filter(c =>
    c.name.toLowerCase().includes(citySearch.toLowerCase()) ||
    c.state.toLowerCase().includes(citySearch.toLowerCase())
  );

  const handleSaveAddress = (e) => {
    e.preventDefault();
    if (!addressForm.flatNo.trim() || !addressForm.street.trim()) {
      showToast('Please enter full address details', 'error');
      return;
    }

    if (editingId) {
      updateStoredAddress(editingId, addressForm);
      showToast('Address updated successfully', 'success');
    } else {
      addStoredAddress(addressForm);
      showToast('New delivery address added', 'success');
    }

    setSavedAddresses(getStoredAddresses());
    setIsAddingAddress(false);
    setEditingId(null);
  };

  const handleDeleteAddress = (id) => {
    deleteStoredAddress(id);
    setSavedAddresses(getStoredAddresses());
    showToast('Address deleted', 'info');
  };

  const handleEditAddress = (addr) => {
    setEditingId(addr.id);
    setAddressForm({ ...addr });
    setIsAddingAddress(true);
  };

  return (
    <div className="space-y-10 max-w-6xl mx-auto pb-16">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
          <MapPin className="w-3.5 h-3.5" />
          <span>Location & Deliveries</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-royal tracking-wide">
          Select Delivery Destination
        </h1>
        <p className="text-xs sm:text-sm text-white/60">
          Choose from 12 major royal Indian metropolitan areas or pick your saved residences.
        </p>
      </div>

      {/* GPS Quick Action Bar */}
      <div className="p-4 sm:p-5 rounded-3xl glass-panel-gold border border-amber-400/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3.5 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shrink-0">
            <Navigation className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">Current Active Location</h3>
            <p className="text-xs text-amber-300 font-semibold">{selectedArea}, {selectedCity?.name} ({selectedCity?.state})</p>
          </div>
        </div>

        <button
          onClick={detectGPS}
          className="px-5 py-2.5 rounded-xl btn-royal-gold text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span>Auto-Detect Current GPS</span>
        </button>
      </div>

      {/* Saved Addresses Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white font-royal flex items-center gap-2">
            <Home className="w-4 h-4 text-amber-400" />
            <span>Saved Addresses ({savedAddresses.length})</span>
          </h3>

          {!isAddingAddress && (
            <button
              onClick={() => {
                setEditingId(null);
                setAddressForm({
                  title: 'Home',
                  fullName: 'Arjun Verma',
                  phone: '+91 98765 43210',
                  flatNo: '',
                  street: '',
                  area: selectedArea || 'Banjara Hills',
                  city: selectedCity?.name || 'Hyderabad',
                  pincode: '500034',
                  isDefault: false
                });
                setIsAddingAddress(true);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-amber-300 text-xs font-semibold flex items-center gap-1.5 border border-white/10 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Address</span>
            </button>
          )}
        </div>

        {/* Add/Edit Address Form */}
        {isAddingAddress && (
          <form onSubmit={handleSaveAddress} className="p-6 rounded-3xl glass-panel-gold border border-amber-400/40 space-y-4 animate-fade-in shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h4 className="font-bold text-sm text-white font-royal">
                {editingId ? 'Edit Delivery Address' : 'New Address Details'}
              </h4>
              <button
                type="button"
                onClick={() => setIsAddingAddress(false)}
                className="text-xs text-white/50 hover:text-white"
              >
                Cancel
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-white/70 block mb-1">Address Type</label>
                <select
                  value={addressForm.title}
                  onChange={(e) => setAddressForm({ ...addressForm, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#120826] text-white text-xs border border-white/15 focus:outline-none"
                >
                  <option value="Home">Home</option>
                  <option value="Work">Work / Office</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] text-white/70 block mb-1">Contact Name</label>
                <input
                  type="text"
                  required
                  value={addressForm.fullName}
                  onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                />
              </div>

              <div>
                <label className="text-[11px] text-white/70 block mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={addressForm.phone}
                  onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                />
              </div>

              <div>
                <label className="text-[11px] text-white/70 block mb-1">Flat / Villa / House No</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Flat 402, Royal Palms"
                  value={addressForm.flatNo}
                  onChange={(e) => setAddressForm({ ...addressForm, flatNo: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[11px] text-white/70 block mb-1">Street Address / Landmark</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Road No 12, Near Royal Palace"
                  value={addressForm.street}
                  onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                />
              </div>

              <div>
                <label className="text-[11px] text-white/70 block mb-1">Area / Locality</label>
                <input
                  type="text"
                  required
                  value={addressForm.area}
                  onChange={(e) => setAddressForm({ ...addressForm, area: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                />
              </div>

              <div>
                <label className="text-[11px] text-white/70 block mb-1">City</label>
                <input
                  type="text"
                  required
                  value={addressForm.city}
                  readOnly
                  className="w-full px-3 py-2 rounded-xl glass-input text-xs opacity-75 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => setIsAddingAddress(false)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl btn-royal-gold text-xs font-bold shadow"
              >
                Save Delivery Address
              </button>
            </div>
          </form>
        )}

        {/* Address Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {savedAddresses.map((addr) => (
            <div
              key={addr.id}
              onClick={() => selectAddress(addr)}
              className="p-4 rounded-2xl glass-panel border border-white/10 hover:border-amber-400/40 transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-white/5 text-amber-400">
                    {addr.title === 'Home' ? <Home className="w-4 h-4" /> : <Briefcase className="w-4 h-4" />}
                  </span>
                  <h4 className="font-bold text-sm text-white group-hover:text-amber-300 transition-colors">
                    {addr.title}
                  </h4>
                </div>

                {addr.isDefault && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    Default
                  </span>
                )}
              </div>

              <div className="space-y-0.5 text-xs text-white/70">
                <p className="font-semibold text-white">{addr.fullName} ({addr.phone})</p>
                <p>{addr.flatNo}, {addr.street}</p>
                <p className="text-amber-300 font-medium">{addr.area}, {addr.city} - {addr.pincode}</p>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
                <span className="text-[11px] text-amber-400 font-semibold group-hover:underline">
                  Deliver Here →
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditAddress(addr)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/60 hover:text-white"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteAddress(addr.id)}
                    className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Select Indian Cities */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-base font-bold text-white font-royal flex items-center gap-2">
            <Building2 className="w-4 h-4 text-amber-400" />
            <span>Supported Metropolitan Cities ({cities.length})</span>
          </h3>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              value={citySearch}
              onChange={(e) => setCitySearch(e.target.value)}
              placeholder="Filter cities..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl glass-input text-xs text-white placeholder-white/40 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {filteredCities.map((city) => {
            const isSelected = selectedCity?.name === city.name;
            return (
              <div
                key={city.id}
                onClick={() => changeCity(city)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-2 ${
                  isSelected
                    ? 'bg-amber-400/15 border-amber-400 shadow-gold-glow'
                    : 'bg-white/[0.03] border-white/10 hover:border-amber-400/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-white font-royal">{city.name}</h4>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />}
                </div>
                <p className="text-[11px] text-white/50">{city.state}</p>
                <p className="text-[10px] text-amber-300/80 font-medium">
                  {city.areas.length} Localities
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Area Localities in Selected City */}
      {selectedCity && (
        <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            Available Localities in {selectedCity.name}
          </h4>
          <div className="flex flex-wrap gap-2">
            {selectedCity.areas.map((area) => {
              const isSelected = selectedArea === area;
              return (
                <button
                  key={area}
                  onClick={() => {
                    changeArea(area);
                    navigate('/restaurants');
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isSelected
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

      {/* Done CTA */}
      <div className="flex justify-center pt-4">
        <button
          onClick={() => navigate('/restaurants')}
          className="px-8 py-3.5 rounded-2xl btn-royal-gold text-xs font-bold shadow-xl shadow-amber-500/20 flex items-center gap-2"
        >
          <span>Explore Restaurants in {selectedArea}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default LocationPage;
