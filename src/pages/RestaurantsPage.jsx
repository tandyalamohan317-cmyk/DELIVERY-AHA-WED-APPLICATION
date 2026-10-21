import React, { useState, useEffect } from 'react';
import {
  Store,
  Filter,
  ArrowUpDown,
  Sparkles,
  Search,
  X,
  RotateCcw
} from 'lucide-react';
import { useLocation } from '../context/LocationContext';
import { getStoredCatalog } from '../data/storage';
import RestaurantCard from '../components/cards/RestaurantCard';

const RestaurantsPage = () => {
  const { selectedCity, selectedArea } = useLocation();
  const [catalog] = useState(getStoredCatalog());

  // Search & Filter States
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('RECOMMENDED'); // 'RECOMMENDED' | 'RATING' | 'TIME' | 'COST_LOW' | 'COST_HIGH'
  const [vegOnly, setVegOnly] = useState(false);
  const [ahaSelectOnly, setAhaSelectOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [maxTime, setMaxTime] = useState(0); // 0 means any
  const [selectedCuisine, setSelectedCuisine] = useState('ALL');

  const cuisinesList = [
    'ALL',
    'Biryani',
    'South Indian',
    'North Indian',
    'Mughlai',
    'Kebabs',
    'Pizza',
    'Burger',
    'Chinese',
    'Thali',
    'Desserts'
  ];

  // Filtering & Sorting
  const filteredRestaurants = catalog.restaurants
    .filter((r) => {
      // City affinity (show matching city or all if search active)
      if (search.trim()) {
        const query = search.toLowerCase();
        const matchesName = r.name.toLowerCase().includes(query);
        const matchesCuisine = (Array.isArray(r.cuisines) ? r.cuisines.join(' ') : r.cuisines).toLowerCase().includes(query);
        if (!matchesName && !matchesCuisine) return false;
      }

      if (vegOnly && !r.isPureVeg) return false;
      if (ahaSelectOnly && !r.isAhaSelect) return false;
      if (minRating > 0 && r.rating < minRating) return false;
      if (maxTime > 0 && r.deliveryTimeMin > maxTime) return false;

      if (selectedCuisine !== 'ALL') {
        const cuisines = Array.isArray(r.cuisines) ? r.cuisines : [r.cuisines];
        if (!cuisines.some(c => c.toLowerCase() === selectedCuisine.toLowerCase())) {
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'RATING') return b.rating - a.rating;
      if (sortBy === 'TIME') return a.deliveryTimeMin - b.deliveryTimeMin;
      if (sortBy === 'COST_LOW') return a.costForTwo - b.costForTwo;
      if (sortBy === 'COST_HIGH') return b.costForTwo - a.costForTwo;
      return (b.isAhaSelect ? 1 : 0) - (a.isAhaSelect ? 1 : 0);
    });

  const clearAllFilters = () => {
    setSearch('');
    setSortBy('RECOMMENDED');
    setVegOnly(false);
    setAhaSelectOnly(false);
    setMinRating(0);
    setMaxTime(0);
    setSelectedCuisine('ALL');
  };

  const hasActiveFilters = vegOnly || ahaSelectOnly || minRating > 0 || maxTime > 0 || selectedCuisine !== 'ALL' || search;

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      
      {/* Page Title & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-royal uppercase tracking-widest text-amber-300 font-semibold flex items-center gap-1.5">
            <Store className="w-3.5 h-3.5 text-amber-400" /> Royal Dining Directory
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-royal mt-1">
            Restaurants in {selectedCity?.name || 'India'}
          </h1>
          <p className="text-xs sm:text-sm text-white/60 mt-1">
            Showing {filteredRestaurants.length} vetted kitchens with verified hygiene & royal standards.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search restaurants or dishes..."
            className="w-full pl-10 pr-4 py-2 rounded-2xl glass-input text-xs text-white placeholder-white/40 focus:outline-none"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-2.5 text-white/40 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Filter and Sort Control Bar */}
      <div className="p-4 rounded-3xl glass-panel border border-white/10 space-y-3.5 shadow-lg">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
          {/* Quick Filter Buttons */}
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <button
              onClick={() => setAhaSelectOnly(!ahaSelectOnly)}
              className={`px-3 py-1.5 rounded-xl border font-semibold flex items-center gap-1.5 transition-all ${
                ahaSelectOnly
                  ? 'bg-amber-400 text-slate-950 font-bold border-amber-400 shadow-gold-glow'
                  : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AHA Select</span>
            </button>

            <button
              onClick={() => setVegOnly(!vegOnly)}
              className={`px-3 py-1.5 rounded-xl border font-semibold transition-all ${
                vegOnly
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm'
                  : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
              }`}
            >
              Pure Veg
            </button>

            <button
              onClick={() => setMinRating(minRating === 4.7 ? 0 : 4.7)}
              className={`px-3 py-1.5 rounded-xl border font-semibold transition-all ${
                minRating === 4.7
                  ? 'bg-amber-400/20 text-amber-300 border-amber-400/40'
                  : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
              }`}
            >
              ★ 4.7+ Rating
            </button>

            <button
              onClick={() => setMaxTime(maxTime === 25 ? 0 : 25)}
              className={`px-3 py-1.5 rounded-xl border font-semibold transition-all ${
                maxTime === 25
                  ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
                  : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
              }`}
            >
              ⚡ Fast (&lt; 25 mins)
            </button>

            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="px-2.5 py-1.5 rounded-xl text-rose-400 hover:text-rose-300 flex items-center gap-1 text-xs font-semibold"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset All</span>
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs shrink-0 self-end sm:self-auto">
            <span className="text-white/50 flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-amber-400" /> Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-[#120726] text-white text-xs border border-white/15 focus:outline-none focus:border-amber-400"
            >
              <option value="RECOMMENDED">Recommended</option>
              <option value="RATING">Rating: High to Low</option>
              <option value="TIME">Delivery Time: Fastest</option>
              <option value="COST_LOW">Cost: Low to High</option>
              <option value="COST_HIGH">Cost: High to Low</option>
            </select>
          </div>
        </div>

        {/* Cuisines Pill Filter Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
          {cuisinesList.map((c) => {
            const isSelected = selectedCuisine === c;
            return (
              <button
                key={c}
                onClick={() => setSelectedCuisine(c)}
                className={`px-3 py-1 rounded-xl whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                    : 'bg-white/5 hover:bg-white/10 text-white/70'
                }`}
              >
                {c === 'ALL' ? 'All Cuisines' : c}
              </button>
            );
          })}
        </div>
      </div>

      {/* Restaurants Grid */}
      {filteredRestaurants.length === 0 ? (
        <div className="py-20 text-center glass-panel rounded-3xl border border-white/10 space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
            <Store className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white font-royal">No Restaurants Found</h3>
            <p className="text-xs text-white/50 max-w-sm mx-auto">
              No dining establishments match the chosen filters. Try relaxing your filters or searching another cuisine.
            </p>
          </div>
          <button
            onClick={clearAllFilters}
            className="px-5 py-2.5 rounded-xl btn-royal-gold text-xs font-bold shadow"
          >
            Clear Filters & View All
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((rest) => (
            <RestaurantCard key={rest.id} restaurant={rest} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantsPage;
