import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Star,
  Clock,
  MapPin,
  Heart,
  Sparkles,
  Tag,
  ShieldCheck
} from 'lucide-react';
import { toggleFavoriteRestaurant, getStoredFavorites } from '../../data/storage';
import { useToast } from '../../context/ToastContext';

const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [isFav, setIsFav] = useState(() => {
    const favs = getStoredFavorites();
    return (favs.restaurants || []).includes(restaurant.id) || (favs.restaurants || []).includes(restaurant.slug);
  });

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    const nextState = toggleFavoriteRestaurant(restaurant.id);
    setIsFav(nextState);
    showToast(
      nextState ? `${restaurant.name} added to favorites!` : `${restaurant.name} removed from favorites`,
      'info'
    );
  };

  const handleCardClick = () => {
    navigate(`/restaurants/${restaurant.slug || restaurant.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group cursor-pointer rounded-3xl glass-card overflow-hidden border border-white/10 hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between shadow-xl hover:shadow-amber-500/10 relative"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') handleCardClick(); }}
    >
      {/* Cover Image & Badges */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900">
        <img
          src={restaurant.coverImage}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E061E] via-transparent to-black/40" />

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5 flex-wrap">
            {restaurant.isAhaSelect && (
              <span className="px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 text-[10px] font-extrabold flex items-center gap-1 shadow-gold-glow">
                <Sparkles className="w-3 h-3" /> AHA Select
              </span>
            )}
            {restaurant.isPureVeg && (
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/90 text-white text-[10px] font-bold">
                Pure Veg
              </span>
            )}
          </div>

          {/* Favorite Heart Button */}
          <button
            onClick={handleFavoriteClick}
            className="p-2 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white transition-all hover:scale-110 active:scale-95 shadow-md"
            title="Save to favorites"
            aria-label="Save to favorites"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isFav ? 'text-rose-500 fill-rose-500' : 'text-white'
              }`}
            />
          </button>
        </div>

        {/* Bottom Image Bar: Offer & Distance */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
          {restaurant.offer && (
            <span className="px-2.5 py-1 rounded-xl bg-black/65 backdrop-blur-md text-amber-300 font-extrabold border border-amber-400/30 flex items-center gap-1 text-[11px]">
              <Tag className="w-3 h-3 text-amber-400" />
              <span>{restaurant.offer}</span>
            </span>
          )}

          <span className="px-2.5 py-1 rounded-xl bg-black/65 backdrop-blur-md text-white/90 font-medium text-[11px] ml-auto">
            {restaurant.distanceKm ? `${restaurant.distanceKm} km` : 'Near you'}
          </span>
        </div>
      </div>

      {/* Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-base sm:text-lg text-white font-royal group-hover:text-amber-300 transition-colors line-clamp-1">
              {restaurant.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-400/15 border border-amber-400/30 shrink-0">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-amber-300">{restaurant.rating}</span>
            </div>
          </div>

          <p className="text-xs text-white/50 line-clamp-1 mt-1">
            {Array.isArray(restaurant.cuisines) ? restaurant.cuisines.join(' • ') : restaurant.cuisines}
          </p>
        </div>

        {/* Meta row: Delivery time & Cost for two */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-white/60">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>{restaurant.deliveryTimeMin || 30} mins</span>
          </div>

          <div className="flex items-center gap-1 font-mono">
            <span>₹{restaurant.costForTwo} for two</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
