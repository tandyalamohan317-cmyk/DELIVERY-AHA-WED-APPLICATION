import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Search,
  X,
  Clock,
  TrendingUp,
  Store,
  UtensilsCrossed,
  Filter,
  Sparkles
} from 'lucide-react';
import { getStoredCatalog, getStoredRecentSearches, addStoredRecentSearch } from '../data/storage';
import RestaurantCard from '../components/cards/RestaurantCard';
import FoodCard from '../components/cards/FoodCard';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [catalog] = useState(getStoredCatalog());
  const [recentSearches, setRecentSearches] = useState(getStoredRecentSearches());
  const [vegOnly, setVegOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);

  useEffect(() => {
    const q = searchParams.get('q') || '';
    setQuery(q);
  }, [searchParams]);

  const handleSearchChange = (val) => {
    setQuery(val);
    if (val.trim()) {
      setSearchParams({ q: val.trim() });
    } else {
      setSearchParams({});
    }
  };

  const handleSelectTerm = (term) => {
    setQuery(term);
    setSearchParams({ q: term });
    addStoredRecentSearch(term);
    setRecentSearches(getStoredRecentSearches());
  };

  const handleClear = () => {
    setQuery('');
    setSearchParams({});
  };

  // Perform multi-entity search
  const normalizedQuery = query.toLowerCase().trim();

  const matchingRestaurants = normalizedQuery
    ? catalog.restaurants.filter((r) => {
        const matchesName = r.name.toLowerCase().includes(normalizedQuery);
        const matchesCuisine = (Array.isArray(r.cuisines) ? r.cuisines.join(' ') : r.cuisines).toLowerCase().includes(normalizedQuery);
        const matchesArea = (r.area || '').toLowerCase().includes(normalizedQuery);
        const matchesVeg = vegOnly ? r.isPureVeg : true;
        const matchesRating = r.rating >= minRating;
        return (matchesName || matchesCuisine || matchesArea) && matchesVeg && matchesRating;
      })
    : [];

  const matchingFoods = normalizedQuery
    ? catalog.foods.filter((f) => {
        const matchesName = f.name.toLowerCase().includes(normalizedQuery);
        const matchesDesc = (f.description || '').toLowerCase().includes(normalizedQuery);
        const matchesVeg = vegOnly ? f.isVeg : true;
        const matchesRating = f.rating ? f.rating >= minRating : true;
        return (matchesName || matchesDesc) && matchesVeg && matchesRating;
      })
    : [];

  const matchingCategories = normalizedQuery
    ? catalog.categories.filter((c) =>
        c.name.toLowerCase().includes(normalizedQuery) ||
        (c.description || '').toLowerCase().includes(normalizedQuery)
      )
    : [];

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      
      {/* Search Bar Input */}
      <div className="p-3 sm:p-4 rounded-3xl glass-panel-gold border border-amber-400/40 shadow-xl space-y-3">
        <div className="relative flex items-center">
          <Search className="w-5 h-5 text-amber-400 absolute left-4 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search for biryani, kebabs, butter chicken, dosa, restaurants..."
            className="w-full pl-12 pr-10 py-3 rounded-2xl glass-input text-sm text-white placeholder-white/40 focus:outline-none"
            autoFocus
          />
          {query && (
            <button
              onClick={handleClear}
              className="p-2 text-white/50 hover:text-white absolute right-3"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filters Row */}
        <div className="flex items-center gap-2 flex-wrap pt-1 text-xs">
          <span className="text-white/50 text-[11px] font-medium mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3 text-amber-400" /> Filters:
          </span>

          <button
            onClick={() => setVegOnly(!vegOnly)}
            className={`px-3 py-1.5 rounded-xl border font-semibold transition-all ${
              vegOnly
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm'
                : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
            }`}
          >
            Pure Veg Only
          </button>

          <button
            onClick={() => setMinRating(minRating === 4.5 ? 0 : 4.5)}
            className={`px-3 py-1.5 rounded-xl border font-semibold transition-all ${
              minRating === 4.5
                ? 'bg-amber-400/20 text-amber-300 border-amber-400/40 shadow-sm'
                : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
            }`}
          >
            ★ 4.5+ Top Rated
          </button>

          {(vegOnly || minRating > 0) && (
            <button
              onClick={() => {
                setVegOnly(false);
                setMinRating(0);
              }}
              className="text-[11px] text-rose-400 hover:underline ml-auto"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* When Query is empty: show Recent & Trending */}
      {!query && (
        <div className="space-y-8">
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white/70 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" /> Recent Searches
              </h4>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => handleSelectTerm(term)}
                    className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 text-xs border border-white/10 transition-colors flex items-center gap-2"
                  >
                    <span>{term}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Trending Searches */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white/70 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-amber-400" /> Trending Feasts Across India
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                'Nizami Mutton Dum Biryani',
                'GI Tagged Mutton Haleem',
                'Guntur Karam Ghee Dosa',
                'Dal Bukhara',
                'Galouti Kebab',
                'Chelo Kebab',
                'Old Delhi Butter Chicken',
                'Shahi Tukda'
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => handleSelectTerm(item)}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 text-xs border border-amber-400/30 transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>{item}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Matching Categories */}
      {query && matchingCategories.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Matching Cuisines</h3>
          <div className="flex flex-wrap gap-2.5">
            {matchingCategories.map((c) => (
              <button
                key={c.id}
                onClick={() => navigate(`/categories/${c.id}`)}
                className="px-4 py-2 rounded-2xl glass-card border border-amber-400/30 text-xs font-bold text-amber-300 hover:bg-amber-400/20 flex items-center gap-2 transition-all"
              >
                <span>{c.name}</span>
                <span className="text-[10px] text-white/50">View Menu →</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Matching Food Dishes */}
      {query && matchingFoods.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white font-royal flex items-center gap-2">
            <UtensilsCrossed className="w-4 h-4 text-amber-400" />
            <span>Dishes Found ({matchingFoods.length})</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matchingFoods.map((food) => {
              const rest = catalog.restaurants.find(r => r.id === food.restaurantId) || catalog.restaurants[0];
              return (
                <FoodCard key={food.id} food={food} restaurant={rest} />
              );
            })}
          </div>
        </div>
      )}

      {/* Matching Restaurants */}
      {query && matchingRestaurants.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white font-royal flex items-center gap-2">
            <Store className="w-4 h-4 text-amber-400" />
            <span>Restaurants Found ({matchingRestaurants.length})</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchingRestaurants.map((rest) => (
              <RestaurantCard key={rest.id} restaurant={rest} />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {query && matchingRestaurants.length === 0 && matchingFoods.length === 0 && matchingCategories.length === 0 && (
        <div className="p-12 text-center glass-panel rounded-3xl border border-white/10 space-y-4 my-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
            <Search className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white font-royal">No Royal Feasts Found</h3>
            <p className="text-xs text-white/50 max-w-md mx-auto">
              We couldn't find any dishes or dining palaces matching "{query}". Try checking your spelling or explore popular recommendations.
            </p>
          </div>
          <div className="flex justify-center gap-2 pt-2">
            <button
              onClick={handleClear}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold"
            >
              Clear Search
            </button>
            <button
              onClick={() => navigate('/restaurants')}
              className="px-4 py-2 rounded-xl btn-royal-gold text-xs font-bold"
            >
              Browse All Restaurants
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
