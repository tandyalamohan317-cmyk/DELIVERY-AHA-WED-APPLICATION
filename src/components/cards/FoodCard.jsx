import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Star,
  Plus,
  Sparkles,
  Flame,
  Check
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import FoodCustomizeModal from '../common/FoodCustomizeModal';

const FoodCard = ({ food, restaurant }) => {
  const navigate = useNavigate();
  const { addItem, cartItems } = useCart();
  const { showToast } = useToast();
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);

  const hasCustomizations = (food.customization?.sizes?.length > 1) || (food.customization?.addons?.length > 0);

  const handleAddClick = (e) => {
    e.stopPropagation();
    if (hasCustomizations) {
      setIsCustomizeOpen(true);
    } else {
      addItem(food, restaurant, {
        selectedSize: { name: 'Regular Portion', price: food.price },
        quantity: 1
      });
    }
  };

  const handleCardClick = () => {
    navigate(`/food/${food.id}`);
  };

  // Find quantity already in cart
  const inCartCount = cartItems
    .filter(item => item.foodId === food.id)
    .reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <div
        onClick={handleCardClick}
        className="group cursor-pointer rounded-3xl glass-card p-4 sm:p-5 border border-white/10 hover:border-amber-400/40 transition-all duration-300 flex items-center justify-between gap-4 shadow-lg hover:shadow-amber-500/5 relative"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter') handleCardClick(); }}
      >
        {/* Left: Food Details */}
        <div className="flex-1 min-w-0 space-y-1.5">
          <div className="flex items-center gap-2">
            {/* Veg / Non-Veg Indicator */}
            <span
              className={`w-4 h-4 rounded-sm border flex items-center justify-center shrink-0 ${
                food.isVeg ? 'border-emerald-500' : 'border-rose-500'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${food.isVeg ? 'bg-emerald-500' : 'bg-rose-500'}`} />
            </span>

            {food.isBestseller && (
              <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-bold flex items-center gap-1 border border-amber-400/30">
                <Sparkles className="w-2.5 h-2.5 text-amber-400" /> Bestseller
              </span>
            )}
          </div>

          <h4 className="font-bold text-sm sm:text-base text-white group-hover:text-amber-300 transition-colors truncate">
            {food.name}
          </h4>

          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-white font-mono text-sm">₹{food.price}</span>
            {food.rating && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-400/10 text-amber-400 font-semibold text-[11px]">
                <Star className="w-3 h-3 fill-amber-400" /> {food.rating}
              </span>
            )}
          </div>

          <p className="text-xs text-white/50 line-clamp-2 leading-relaxed pt-0.5">
            {food.description}
          </p>
        </div>

        {/* Right: Food Image & Add CTA */}
        <div className="relative shrink-0 flex flex-col items-center">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-slate-900 border border-white/10 relative shadow-md">
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>

          {/* Add Button Floating on bottom of image */}
          <div className="-mt-4 relative z-10">
            <button
              onClick={handleAddClick}
              className="px-4 py-1.5 rounded-xl btn-royal-gold text-xs font-extrabold shadow-lg flex items-center gap-1 hover:scale-105 active:scale-95 transition-all uppercase tracking-wider"
              title={hasCustomizations ? 'Customize dish' : 'Add to cart'}
            >
              <span>{inCartCount > 0 ? `ADD (${inCartCount})` : 'ADD'}</span>
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
            </button>
            {hasCustomizations && (
              <span className="text-[9px] text-amber-300/80 block text-center mt-1 font-medium">
                Customisable
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      <FoodCustomizeModal
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
        food={food}
        restaurant={restaurant}
      />
    </>
  );
};

export default FoodCard;
