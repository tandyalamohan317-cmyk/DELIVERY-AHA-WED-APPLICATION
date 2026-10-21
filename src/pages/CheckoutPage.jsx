import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  MapPin,
  Plus,
  ArrowRight,
  Clock,
  ShieldCheck,
  Home,
  Briefcase,
  CheckCircle2,
  Sparkles,
  Phone,
  User
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useLocation } from '../context/LocationContext';
import { useToast } from '../context/ToastContext';
import { getStoredAddresses, addStoredAddress } from '../data/storage';

const CheckoutPage = () => {
  const { user } = useAuth();
  const { cartItems, restaurant, totals, orderType } = useCart();
  const { selectedCity, selectedArea } = useLocation();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState(getStoredAddresses());
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [slot, setSlot] = useState('Standard (Within 25-30 mins)');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');

  // New Address Form State
  const [newAddress, setNewAddress] = useState({
    title: 'Home',
    fullName: user?.name || 'Arjun Verma',
    phone: user?.phone || '+91 98765 43210',
    flatNo: '',
    street: '',
    area: selectedArea || 'Banjara Hills',
    city: selectedCity?.name || 'Hyderabad',
    pincode: '500034',
    isDefault: false
  });

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
      return;
    }
    const saved = getStoredAddresses();
    setAddresses(saved);
    if (saved.length > 0) {
      const def = saved.find(a => a.isDefault) || saved[0];
      setSelectedAddressId(def.id);
    }
  }, [cartItems, navigate]);

  const handleSaveAddress = (e) => {
    e.preventDefault();
    if (!newAddress.flatNo.trim() || !newAddress.street.trim()) {
      showToast('Please enter full address details', 'error');
      return;
    }

    const added = addStoredAddress(newAddress);
    setAddresses(getStoredAddresses());
    setSelectedAddressId(added.id);
    setIsAddingNewAddress(false);
    showToast('New address saved successfully!', 'success');
  };

  const handleContinueToPayment = () => {
    const chosenAddress = addresses.find(a => a.id === selectedAddressId) || addresses[0];
    if (!chosenAddress && orderType === 'DELIVERY') {
      showToast('Please select or add a delivery address', 'error');
      return;
    }

    navigate('/payment', {
      state: {
        address: chosenAddress,
        slot,
        deliveryInstructions
      }
    });
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      
      {/* Checkout Progress Stepper */}
      <div className="flex items-center justify-between max-w-md mx-auto px-4">
        <div className="flex flex-col items-center gap-1.5 text-amber-400">
          <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 font-bold flex items-center justify-center text-xs shadow-gold-glow">
            1
          </div>
          <span className="text-[11px] font-bold">Address & Slot</span>
        </div>

        <div className="flex-1 h-0.5 bg-white/20 mx-3" />

        <div className="flex flex-col items-center gap-1.5 text-white/50">
          <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 text-white font-bold flex items-center justify-center text-xs">
            2
          </div>
          <span className="text-[11px] font-medium">Payment Mode</span>
        </div>

        <div className="flex-1 h-0.5 bg-white/20 mx-3" />

        <div className="flex flex-col items-center gap-1.5 text-white/50">
          <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 text-white font-bold flex items-center justify-center text-xs">
            3
          </div>
          <span className="text-[11px] font-medium">Confirmation</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Address Selection & Delivery Slot (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Address Section */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-5 h-5 text-amber-400" />
                <h2 className="text-lg sm:text-xl font-bold text-white font-royal">
                  1. Delivery Address
                </h2>
              </div>

              {!isAddingNewAddress && (
                <button
                  onClick={() => setIsAddingNewAddress(true)}
                  className="px-3 py-1.5 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-semibold flex items-center gap-1 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New</span>
                </button>
              )}
            </div>

            {/* Address Selection Cards */}
            {!isAddingNewAddress ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addresses.map((addr) => {
                  const isSelected = selectedAddressId === addr.id;
                  return (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-3 relative ${
                        isSelected
                          ? 'bg-amber-400/10 border-amber-400 shadow-gold-glow'
                          : 'bg-white/[0.02] border-white/10 hover:border-white/25'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <span className="p-1.5 rounded-lg bg-white/5 text-amber-400">
                            {addr.title === 'Home' ? <Home className="w-4 h-4" /> : <Briefcase className="w-4 h-4" />}
                          </span>
                          <h4 className="font-bold text-sm text-white">{addr.title}</h4>
                        </div>
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 text-amber-400" />
                        )}
                      </div>

                      <div className="space-y-0.5 text-xs text-white/70">
                        <p className="font-semibold text-white">{addr.fullName} ({addr.phone})</p>
                        <p className="line-clamp-1">{addr.flatNo}, {addr.street}</p>
                        <p className="text-amber-300 font-medium">{addr.area}, {addr.city} - {addr.pincode}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Add New Address Form */
              <form onSubmit={handleSaveAddress} className="p-5 rounded-2xl glass-card border border-amber-400/30 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <h3 className="font-bold text-sm text-white">Add Delivery Destination</h3>
                  <button
                    type="button"
                    onClick={() => setIsAddingNewAddress(false)}
                    className="text-xs text-white/50 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-white/70 font-medium block mb-1">Tag As</label>
                    <select
                      value={newAddress.title}
                      onChange={(e) => setNewAddress({ ...newAddress, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#130928] text-white text-xs border border-white/15"
                    >
                      <option value="Home">Home</option>
                      <option value="Work">Work / Office</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] text-white/70 font-medium block mb-1">Contact Name</label>
                    <input
                      type="text"
                      required
                      value={newAddress.fullName}
                      onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-white/70 font-medium block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={newAddress.phone}
                      onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-white/70 font-medium block mb-1">Flat / Villa / Suite No</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Flat 402, Royal Palms"
                      value={newAddress.flatNo}
                      onChange={(e) => setNewAddress({ ...newAddress, flatNo: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[11px] text-white/70 font-medium block mb-1">Street Address</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Road No 12, Near Park"
                      value={newAddress.street}
                      onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-white/70 font-medium block mb-1">Area</label>
                    <input
                      type="text"
                      required
                      value={newAddress.area}
                      onChange={(e) => setNewAddress({ ...newAddress, area: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-white/70 font-medium block mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={newAddress.city}
                      readOnly
                      className="w-full px-3 py-2 rounded-xl glass-input text-xs opacity-75 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsAddingNewAddress(false)}
                    className="px-4 py-2 rounded-xl bg-white/5 text-white/70 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl btn-royal-gold text-xs font-bold"
                  >
                    Save Address
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Delivery Slot Selection */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 shadow-xl">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-white font-royal">2. Choose Delivery Slot</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Standard (Within 25-30 mins)',
                'Lunch Feast (12:30 PM - 01:30 PM)',
                'Evening High Tea (05:00 PM - 06:00 PM)',
                'Royal Dinner (08:00 PM - 09:00 PM)'
              ].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSlot(s)}
                  className={`p-3 rounded-2xl border text-xs text-left transition-all ${
                    slot === s
                      ? 'bg-amber-400/15 border-amber-400 text-white font-bold shadow-sm'
                      : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <div>
              <label className="text-xs font-semibold text-white/70 block mb-1">
                Special Delivery Instructions for Driver
              </label>
              <input
                type="text"
                value={deliveryInstructions}
                onChange={(e) => setDeliveryInstructions(e.target.value)}
                placeholder="e.g. Ring doorbell twice, leave at reception..."
                className="w-full px-4 py-2.5 rounded-xl glass-input text-xs text-white placeholder-white/40 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right: Order Summary & Proceed to Payment (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel-gold p-6 rounded-3xl border border-amber-400/30 space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Order Summary</h3>

            {/* Restaurant Title */}
            {restaurant && (
              <p className="text-xs text-amber-300 font-semibold border-b border-white/10 pb-2">
                Ordering from {restaurant.name}
              </p>
            )}

            {/* Items */}
            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item.key || item.foodId} className="flex justify-between items-center text-xs">
                  <div className="truncate max-w-[200px]">
                    <span className="font-bold text-white">{item.quantity}x </span>
                    <span className="text-white/80">{item.name}</span>
                    <span className="text-[10px] text-white/50 block truncate">({item.selectedSize?.name || 'Regular'})</span>
                  </div>
                  <span className="font-mono font-semibold text-white">₹{item.unitPrice * item.quantity}</span>
                </div>
              ))}
            </div>

            {/* Pricing Details */}
            <div className="pt-3 border-t border-white/10 space-y-2 text-xs text-white/70">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white font-medium">₹{totals.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="text-emerald-400 font-bold">{totals.deliveryFee === 0 ? 'FREE' : `₹${totals.deliveryFee}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes & GST (5%)</span>
                <span className="text-white font-medium">₹{totals.taxes}</span>
              </div>
              <div className="flex justify-between">
                <span>Packaging & Platform</span>
                <span className="text-white font-medium">₹{totals.packagingFee + totals.platformFee}</span>
              </div>
              {totals.couponDiscount > 0 && (
                <div className="flex justify-between text-amber-400 font-bold">
                  <span>Voucher Savings</span>
                  <span>-₹{totals.couponDiscount}</span>
                </div>
              )}
              <div className="pt-2 border-t border-white/10 flex justify-between text-base font-extrabold text-white">
                <span>Total Amount</span>
                <span className="text-amber-300 font-mono">₹{totals.grandTotal}</span>
              </div>
            </div>

            {/* Continue to Payment CTA */}
            <button
              onClick={handleContinueToPayment}
              className="w-full py-4 px-6 rounded-2xl btn-royal-gold text-sm font-bold shadow-xl shadow-amber-500/25 flex items-center justify-between hover:scale-[1.01] active:scale-[0.99] transition-all"
            >
              <span>Continue to Payment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-white/10 flex items-center gap-3 text-xs text-white/60">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <p>100% Royal Quality Guarantee & Tamper-Proof Packaging.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
