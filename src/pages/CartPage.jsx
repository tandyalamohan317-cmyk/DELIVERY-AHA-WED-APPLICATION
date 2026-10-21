import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Store,
  MapPin,
  Tag,
  Percent,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLocation } from '../context/LocationContext';
import { useToast } from '../context/ToastContext';
import { getStoredAddresses, getStoredCatalog } from '../data/storage';

const CartPage = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    restaurant,
    totals,
    updateQuantity,
    removeItem,
    clearCart,
    coupon,
    applyCoupon,
    removeCoupon,
    orderType,
    setOrderType,
    cookingInstructions,
    setCookingInstructions
  } = useCart();

  const { selectedCity, selectedArea } = useLocation();
  const { showToast } = useToast();

  const [couponCode, setCouponCode] = useState('');
  const catalog = getStoredCatalog();
  const availableOffers = catalog.offers || [];
  const savedAddresses = getStoredAddresses();
  const defaultAddress = savedAddresses.find(a => a.isDefault) || savedAddresses[0];

  const handleApplyCoupon = (codeToApply) => {
    const code = (codeToApply || couponCode).trim().toUpperCase();
    if (!code) return;
    const success = applyCoupon(code);
    if (success) {
      setCouponCode('');
    }
  };

  // Empty Cart State
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[65vh] flex flex-col items-center justify-center px-4 py-16 text-center space-y-5">
        <div className="w-20 h-20 rounded-3xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shadow-gold-glow">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2 max-w-sm">
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-royal">Your Feast Bag is Empty</h2>
          <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
            Experience hand-curated dum biryanis, authentic royal gravies, and heritage delicacies crafted by master chefs.
          </p>
        </div>
        <button
          onClick={() => navigate('/restaurants')}
          className="px-6 py-3 rounded-2xl btn-royal-gold text-xs font-bold shadow-xl shadow-amber-500/20 flex items-center gap-2"
        >
          <span>Explore Royal Restaurants</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      
      {/* Title Bar */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-royal uppercase tracking-widest text-amber-300 font-semibold flex items-center gap-1.5">
            <ShoppingBag className="w-3.5 h-3.5 text-amber-400" /> Royal Feast Cart
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-royal mt-1">
            Review Your Order
          </h1>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/20 transition-all"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Bag</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Items List & Preferences (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Restaurant Header */}
          {restaurant && (
            <div className="p-4 sm:p-5 rounded-3xl glass-card border border-amber-400/30 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Store className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-sm sm:text-base text-white truncate">{restaurant.name}</h3>
                  <p className="text-xs text-white/50 truncate">{restaurant.address || `${restaurant.area}, ${restaurant.city}`}</p>
                </div>
              </div>
              <Link
                to={`/restaurants/${restaurant.slug || restaurant.id}`}
                className="text-xs font-semibold text-amber-400 hover:text-amber-300 shrink-0"
              >
                + Add More
              </Link>
            </div>
          )}

          {/* Cart Items List */}
          <div className="space-y-3">
            {cartItems.map((item) => (
              <div
                key={item.key || item.foodId}
                className="p-4 rounded-2xl glass-panel border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  <img
                    src={item.image || 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=150&q=80'}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-white/10"
                  />
                  <div className="min-w-0 space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center shrink-0 ${
                          item.isVeg ? 'border-emerald-500' : 'border-rose-500'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                      </span>
                      <h4 className="font-bold text-sm text-white truncate">{item.name}</h4>
                    </div>

                    <p className="text-[11px] text-amber-300 font-medium">
                      {item.selectedSize?.name || 'Regular'}
                    </p>

                    {item.selectedAddons && item.selectedAddons.length > 0 && (
                      <p className="text-[10px] text-white/50 line-clamp-1">
                        + {item.selectedAddons.map(a => a.name).join(', ')}
                      </p>
                    )}

                    <p className="text-xs font-extrabold text-white mt-1">₹{item.unitPrice * item.quantity}</p>
                  </div>
                </div>

                {/* Quantity Control & Remove */}
                <div className="flex items-center gap-3 self-end sm:self-center">
                  <div className="flex items-center gap-2 p-1 rounded-xl bg-white/5 border border-white/10">
                    <button
                      onClick={() => updateQuantity(item.key, item.quantity - 1)}
                      className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-mono text-xs font-bold text-white px-2">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.key, item.quantity + 1)}
                      className="w-7 h-7 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 flex items-center justify-center transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.key)}
                    className="p-2 rounded-xl text-white/40 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cooking Instructions */}
          <div className="p-4 rounded-2xl glass-panel border border-white/10 space-y-2">
            <label className="text-xs font-bold text-white uppercase tracking-wider block">
              Special Cooking or Packing Notes
            </label>
            <input
              type="text"
              value={cookingInstructions}
              onChange={(e) => setCookingInstructions(e.target.value)}
              placeholder="e.g. Please send extra mint raita and cutlery..."
              className="w-full px-4 py-2.5 rounded-xl glass-input text-xs text-white placeholder-white/40 focus:outline-none"
            />
          </div>

          {/* Delivery vs Pickup Toggle */}
          <div className="p-4 rounded-2xl glass-panel border border-white/10 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-white">Order Fulfilment Type</p>
              <p className="text-[11px] text-white/50">Choose Doorstep Royal Delivery or Kitchen Takeaway</p>
            </div>
            <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold">
              <button
                onClick={() => setOrderType('DELIVERY')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  orderType === 'DELIVERY' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-white/70'
                }`}
              >
                Delivery
              </button>
              <button
                onClick={() => setOrderType('PICKUP')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  orderType === 'PICKUP' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-white/70'
                }`}
              >
                Pickup
              </button>
            </div>
          </div>
        </div>

        {/* Right: Bill Details & Checkout CTA (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Address Preview */}
          <div className="p-5 rounded-3xl glass-panel border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Delivery Address</span>
              </div>
              <button
                onClick={() => navigate('/profile/addresses')}
                className="text-xs font-semibold text-amber-400 hover:text-amber-300"
              >
                Change
              </button>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
              <p className="text-xs font-bold text-white">{defaultAddress?.title || 'Home'} • {defaultAddress?.fullName || 'Customer'}</p>
              <p className="text-xs text-white/60 line-clamp-2 mt-0.5">
                {defaultAddress ? `${defaultAddress.flatNo}, ${defaultAddress.street}, ${defaultAddress.area}` : `${selectedArea}, ${selectedCity?.name}`}
              </p>
            </div>
          </div>

          {/* Promo Code Box */}
          <div className="p-5 rounded-3xl glass-panel-gold border border-amber-400/30 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
              <Tag className="w-4 h-4 text-amber-400" />
              <span>Apply Royal Coupon</span>
            </div>

            {coupon ? (
              <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-400/20 border border-amber-400/40">
                <div className="flex items-center gap-2">
                  <Percent className="w-4 h-4 text-amber-400" />
                  <div>
                    <p className="text-xs font-extrabold text-amber-300 font-mono">{coupon.code}</p>
                    <p className="text-[10px] text-white/70">Savings of ₹{totals.couponDiscount} applied</p>
                  </div>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-xs text-rose-300 hover:text-rose-200 font-semibold"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code (e.g. AHA50)"
                    className="flex-1 px-3.5 py-2 rounded-xl glass-input text-xs text-white placeholder-white/40 uppercase font-mono focus:outline-none"
                  />
                  <button
                    onClick={() => handleApplyCoupon()}
                    disabled={!couponCode.trim()}
                    className="px-4 py-2 rounded-xl btn-royal-gold text-xs font-bold disabled:opacity-50"
                  >
                    Apply
                  </button>
                </div>

                {/* Quick Voucher Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {availableOffers.slice(0, 3).map((c) => (
                    <button
                      key={c.code}
                      onClick={() => handleApplyCoupon(c.code)}
                      className="text-[10px] px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-amber-300 font-mono transition-all"
                    >
                      {c.code}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bill Summary */}
          <div className="p-5 rounded-3xl glass-panel border border-white/10 space-y-3.5 shadow-xl">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Bill Summary</h3>

            <div className="space-y-2 text-xs text-white/70">
              <div className="flex justify-between">
                <span>Item Subtotal</span>
                <span className="text-white font-medium">₹{totals.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Partner Fee</span>
                <span className="text-white font-medium">
                  {totals.deliveryFee === 0 ? <span className="text-emerald-400 font-bold">FREE</span> : `₹${totals.deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Restaurant Packaging</span>
                <span className="text-white font-medium">₹{totals.packagingFee}</span>
              </div>
              <div className="flex justify-between">
                <span>Govt Taxes & GST (5%)</span>
                <span className="text-white font-medium">₹{totals.taxes}</span>
              </div>
              <div className="flex justify-between">
                <span>Platform Fee</span>
                <span className="text-white font-medium">₹{totals.platformFee}</span>
              </div>

              {totals.couponDiscount > 0 && (
                <div className="flex justify-between text-amber-400 font-bold pt-1">
                  <span>Royal Voucher Savings</span>
                  <span>-₹{totals.couponDiscount}</span>
                </div>
              )}

              <div className="pt-3 border-t border-white/10 flex justify-between text-base font-extrabold text-white">
                <span>Grand Total</span>
                <span className="text-amber-300 font-mono">₹{totals.grandTotal}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-4 px-6 rounded-2xl btn-royal-gold text-sm font-bold shadow-xl shadow-amber-500/25 flex items-center justify-between hover:scale-[1.01] active:scale-[0.99] transition-all"
            >
              <div className="text-left">
                <p className="text-[10px] uppercase font-bold tracking-wider text-slate-900/70">Total Payable</p>
                <p className="text-base font-extrabold leading-tight">₹{totals.grandTotal}</p>
              </div>
              <div className="flex items-center gap-2">
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
