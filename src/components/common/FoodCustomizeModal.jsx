import React, { useState, useEffect } from 'react';
import {
  X,
  Plus,
  Minus,
  Check,
  Flame,
  ShoppingBag,
  Sparkles,
  Store
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

const FoodCustomizeModal = ({ isOpen, onClose, food, restaurant }) => {
  const { addItem } = useCart();
  const { showToast } = useToast();

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [spiceLevel, setSpiceLevel] = useState('Medium');
  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState('');

  useEffect(() => {
    if (food) {
      const defaultSize = food.customization?.sizes?.[0] || { name: 'Regular Portion', price: food.price };
      setSelectedSize(defaultSize);
      setSelectedAddons([]);
      setSpiceLevel(food.spiceLevel || 'Medium');
      setQuantity(1);
      setInstructions('');
    }
  }, [food]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !food) return null;

  const sizes = food.customization?.sizes || [{ name: 'Regular Portion', price: food.price }];
  const addons = food.customization?.addons || [];

  const basePrice = selectedSize ? selectedSize.price : food.price;
  const addonsPrice = selectedAddons.reduce((sum, a) => sum + (a.price || 0), 0);
  const unitPrice = basePrice + addonsPrice;
  const grandTotal = unitPrice * quantity;

  const toggleAddon = (addon) => {
    if (selectedAddons.some(a => a.name === addon.name)) {
      setSelectedAddons(selectedAddons.filter(a => a.name !== addon.name));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const handleAddToCart = () => {
    const success = addItem(food, restaurant, {
      selectedSize,
      selectedAddons,
      spiceLevel,
      cookingInstructions: instructions,
      quantity
    });

    if (success !== false) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="max-w-lg w-full glass-panel-gold rounded-3xl border border-amber-400/40 p-6 sm:p-7 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Header with image */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3.5 min-w-0">
            <img
              src={food.image}
              alt={food.name}
              className="w-16 h-16 rounded-2xl object-cover border border-amber-400/30 shrink-0 shadow-md"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center shrink-0 ${
                    food.isVeg ? 'border-emerald-500' : 'border-rose-500'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${food.isVeg ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                </span>
                <h3 className="text-base font-bold text-white font-royal truncate">{food.name}</h3>
              </div>
              <p className="text-xs text-amber-300 font-bold mt-0.5">Base: ₹{food.price}</p>
              {restaurant && (
                <p className="text-[11px] text-white/50 truncate flex items-center gap-1 mt-0.5">
                  <Store className="w-3 h-3 text-amber-400" />
                  <span>{restaurant.name}</span>
                </p>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Portion / Size Selector */}
        {sizes.length > 1 && (
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-white uppercase tracking-wider block">
              Choose Portion Size
            </label>
            <div className="space-y-2">
              {sizes.map((s) => {
                const isSelected = selectedSize?.name === s.name;
                return (
                  <button
                    key={s.name}
                    type="button"
                    onClick={() => setSelectedSize(s)}
                    className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-amber-400/15 border-amber-400 text-white shadow-sm'
                        : 'bg-white/[0.03] border-white/10 text-white/70 hover:bg-white/[0.06]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-amber-400' : 'border-white/30'
                        }`}
                      >
                        {isSelected && <span className="w-2 h-2 rounded-full bg-amber-400" />}
                      </span>
                      <span className="text-xs font-semibold">{s.name}</span>
                    </div>
                    <span className="text-xs font-bold text-amber-300">₹{s.price}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Addons Selection */}
        {addons.length > 0 && (
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-white uppercase tracking-wider block">
              Accompaniments & Royal Add-ons
            </label>
            <div className="space-y-2">
              {addons.map((a) => {
                const isChecked = selectedAddons.some(x => x.name === a.name);
                return (
                  <button
                    key={a.name}
                    type="button"
                    onClick={() => toggleAddon(a)}
                    className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                      isChecked
                        ? 'bg-purple-500/15 border-purple-400 text-white shadow-sm'
                        : 'bg-white/[0.03] border-white/10 text-white/70 hover:bg-white/[0.06]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                          isChecked ? 'bg-purple-500 border-purple-500 text-white' : 'border-white/30'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </span>
                      <span className="text-xs font-medium">{a.name}</span>
                    </div>
                    <span className="text-xs font-bold text-purple-300">+₹{a.price}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Spice Level Preference */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-white uppercase tracking-wider block">
            Spice Level
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['Mild', 'Medium', 'Authentic Spicy'].map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => setSpiceLevel(lvl)}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                  spiceLevel === lvl
                    ? 'bg-amber-400 text-slate-950 font-bold border-amber-400 shadow-md'
                    : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Cooking Notes */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-white uppercase tracking-wider block">
            Chef Notes / Special Request
          </label>
          <input
            type="text"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="e.g. Extra mint raita, less spicy, eco-friendly cutlery..."
            className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white placeholder-white/30 focus:outline-none"
          />
        </div>

        {/* Quantity & Add to Cart Footer */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-4">
          {/* Stepper */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              disabled={quantity <= 1}
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-sm font-bold text-white px-2">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 flex items-center justify-center transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add CTA */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 py-3 px-5 rounded-2xl btn-royal-gold text-xs font-bold shadow-xl shadow-amber-500/25 flex items-center justify-between"
          >
            <span>Add to Feast</span>
            <span className="font-mono font-extrabold text-sm">₹{grandTotal}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCustomizeModal;
