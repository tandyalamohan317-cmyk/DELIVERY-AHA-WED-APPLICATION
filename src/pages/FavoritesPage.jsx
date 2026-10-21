import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, UtensilsCrossed, Store, ArrowRight } from 'lucide-react';
import { getStoredFavorites, getStoredCatalog } from '../data/storage';
import RestaurantCard from '../components/cards/RestaurantCard';
import FoodCard from '../components/cards/FoodCard';

const FavoritesPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('restaurants'); // 'restaurants' | 'foods'
  const [favRestaurants, setFavRestaurants] = useState([]);
  const [favFoods, setFavFoods] = useState([]);

  useEffect(() => {
    const favs = getStoredFavorites();
    const catalog = getStoredCatalog();

    const matchedRests = catalog.restaurants.filter(r =>
      (favs.restaurants || []).includes(r.id) || (favs.restaurants || []).includes(r.slug)
    );
    setFavRestaurants(matchedRests);

    const matchedDishes = catalog.foods.filter(f =>
      (favs.foods || []).includes(f.id)
    );
    setFavFoods(matchedDishes);
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-royal uppercase tracking-widest text-amber-300 font-semibold flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" /> Saved Feasts
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-royal mt-1">
            My Royal Favorites
          </h1>
          <p className="text-xs sm:text-sm text-white/60 mt-1">
            Your personal collection of cherished dining establishments and signature dishes.
          </p>
        </div>

        <button
          onClick={() => navigate('/restaurants')}
          className="self-start sm:self-auto px-4 py-2 rounded-xl btn-royal-gold text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all"
        >
          Explore More Dining
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        <button
          onClick={() => setActiveTab('restaurants')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'restaurants'
              ? 'bg-amber-400 text-slate-950 shadow-md'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          <Store className="w-4 h-4" />
          <span>Restaurants ({favRestaurants.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('foods')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'foods'
              ? 'bg-amber-400 text-slate-950 shadow-md'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          <UtensilsCrossed className="w-4 h-4" />
          <span>Saved Dishes ({favFoods.length})</span>
        </button>
      </div>

      {/* Content */}
      {activeTab === 'restaurants' ? (
        favRestaurants.length === 0 ? (
          <div className="py-20 text-center glass-panel rounded-3xl border border-white/10 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <Heart className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <p className="text-base font-bold text-white font-royal">No Favorite Restaurants Yet</p>
              <p className="text-xs text-white/60">Tap the heart icon on any restaurant card to bookmark it here.</p>
            </div>
            <button
              onClick={() => navigate('/restaurants')}
              className="px-5 py-2.5 rounded-xl btn-royal-gold text-xs font-bold shadow"
            >
              Browse Restaurants
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favRestaurants.map((rest) => (
              <RestaurantCard key={rest.id} restaurant={rest} />
            ))}
          </div>
        )
      ) : (
        favFoods.length === 0 ? (
          <div className="py-20 text-center glass-panel rounded-3xl border border-white/10 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
              <UtensilsCrossed className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <p className="text-base font-bold text-white font-royal">No Saved Dishes Yet</p>
              <p className="text-xs text-white/60">Bookmark beloved biryanis, tikkas, and desserts for swift reordering.</p>
            </div>
            <button
              onClick={() => navigate('/restaurants')}
              className="px-5 py-2.5 rounded-xl btn-royal-gold text-xs font-bold shadow"
            >
              Discover Dishes
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {favFoods.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default FavoritesPage;
