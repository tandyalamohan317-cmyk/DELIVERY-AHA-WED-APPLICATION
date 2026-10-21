import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Star,
  Clock,
  MapPin,
  Heart,
  Sparkles,
  Search,
  Tag,
  ShieldCheck,
  ArrowLeft,
  Filter,
  MessageSquare,
  Plus
} from 'lucide-react';
import { getStoredCatalog, toggleFavoriteRestaurant, getStoredFavorites, getStoredReviews } from '../data/storage';
import { useToast } from '../context/ToastContext';
import FoodCard from '../components/cards/FoodCard';

const RestaurantDetailPage = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const catalog = getStoredCatalog();

  const restaurant = catalog.restaurants.find(
    r => r.id === restaurantId || r.slug === restaurantId
  ) || catalog.restaurants[0];

  const [foods, setFoods] = useState([]);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchMenu, setSearchMenu] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (restaurant) {
      const restFoods = catalog.foods.filter(f => f.restaurantId === restaurant.id);
      // If none directly assigned, show subset
      setFoods(restFoods.length > 0 ? restFoods : catalog.foods.slice(0, 8));

      const favs = getStoredFavorites();
      setIsFav((favs.restaurants || []).includes(restaurant.id));

      const allRevs = getStoredReviews();
      const matched = allRevs.filter(r => r.restaurantId === restaurant.id);
      setReviews(matched.length > 0 ? matched : allRevs.slice(0, 2));
    }
  }, [restaurant, catalog]);

  if (!restaurant) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 text-center">
        <p className="text-white/70">Restaurant not found.</p>
        <button
          onClick={() => navigate('/restaurants')}
          className="px-5 py-2.5 rounded-xl btn-royal-gold text-xs font-bold"
        >
          Back to Restaurants
        </button>
      </div>
    );
  }

  const handleFavoriteToggle = () => {
    const nextState = toggleFavoriteRestaurant(restaurant.id);
    setIsFav(nextState);
    showToast(
      nextState ? `${restaurant.name} added to favorites!` : `${restaurant.name} removed from favorites`,
      'info'
    );
  };

  // Group food items by categories
  const filteredFoods = foods.filter((f) => {
    if (searchMenu.trim()) {
      const q = searchMenu.toLowerCase();
      if (!f.name.toLowerCase().includes(q) && !(f.description || '').toLowerCase().includes(q)) {
        return false;
      }
    }
    if (vegOnly && !f.isVeg) return false;
    if (activeCategory !== 'ALL' && f.categoryId !== activeCategory) return false;
    return true;
  });

  const uniqueCategories = ['ALL', ...new Set(foods.map(f => f.categoryId).filter(Boolean))];

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      
      {/* Back Navigation */}
      <div className="flex items-center justify-between text-xs text-white/60">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Restaurants</span>
        </button>

        <div className="flex items-center gap-2">
          <Link to="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link to="/restaurants" className="hover:text-white">Restaurants</Link>
          <span>/</span>
          <span className="text-amber-300 truncate max-w-[150px]">{restaurant.name}</span>
        </div>
      </div>

      {/* Hero Header Card */}
      <div className="relative rounded-3xl sm:rounded-[36px] overflow-hidden glass-panel-gold border border-amber-400/30 p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2 flex-wrap">
              {restaurant.isAhaSelect && (
                <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-extrabold flex items-center gap-1 shadow-gold-glow">
                  <Sparkles className="w-3.5 h-3.5" /> AHA Select Master Kitchen
                </span>
              )}
              {restaurant.isPureVeg && (
                <span className="px-3 py-1 rounded-full bg-emerald-500/90 text-white text-xs font-bold">
                  Pure Veg
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-royal tracking-wide">
              {restaurant.name}
            </h1>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              {restaurant.description}
            </p>

            <div className="flex items-center gap-2 text-xs text-white/50 flex-wrap">
              <span className="text-amber-300 font-semibold">
                {Array.isArray(restaurant.cuisines) ? restaurant.cuisines.join(' • ') : restaurant.cuisines}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{restaurant.address || `${restaurant.area}, ${restaurant.city}`}</span>
              </span>
            </div>
          </div>

          {/* Right Metrics & Favorite */}
          <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4 pt-4 md:pt-0 border-t md:border-t-0 border-white/10 shrink-0">
            
            <button
              onClick={handleFavoriteToggle}
              className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-all flex items-center gap-2 text-xs font-semibold"
              title="Save favorite"
            >
              <Heart className={`w-4 h-4 ${isFav ? 'text-rose-500 fill-rose-500' : 'text-white'}`} />
              <span>{isFav ? 'Saved' : 'Favorite'}</span>
            </button>

            <div className="flex items-center gap-3">
              {/* Rating Card */}
              <div className="p-3 rounded-2xl glass-panel text-center border border-amber-400/30">
                <div className="flex items-center justify-center gap-1 text-amber-400 font-bold text-sm">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{restaurant.rating}</span>
                </div>
                <span className="text-[10px] text-white/50">{restaurant.ratingCount}+ reviews</span>
              </div>

              {/* Delivery Time Card */}
              <div className="p-3 rounded-2xl glass-panel text-center border border-white/10">
                <div className="flex items-center justify-center gap-1 text-white font-bold text-sm">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>{restaurant.deliveryTimeMin} mins</span>
                </div>
                <span className="text-[10px] text-white/50">Delivery ETA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Offer Banner */}
        {restaurant.offer && (
          <div className="p-3.5 rounded-2xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-amber-400" />
              <span className="font-bold text-amber-300">{restaurant.offer}</span>
            </div>
            <Link to="/offers" className="text-white/60 hover:text-white text-[11px] underline">
              View All Vouchers
            </Link>
          </div>
        )}
      </div>

      {/* Menu Sticky Filter Bar */}
      <div className="sticky top-20 z-30 p-3 rounded-2xl glass-panel border border-white/10 backdrop-blur-xl shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none text-xs">
          {uniqueCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap capitalize transition-all font-semibold ${
                activeCategory === cat
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                  : 'bg-white/5 hover:bg-white/10 text-white/70'
              }`}
            >
              {cat === 'ALL' ? 'Full Menu' : cat.replace(/-/g, ' ')}
            </button>
          ))}
        </div>

        {/* Search menu & Veg Toggle */}
        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
          <div className="relative flex-1 sm:w-48">
            <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              value={searchMenu}
              onChange={(e) => setSearchMenu(e.target.value)}
              placeholder="Search in menu..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl glass-input text-xs text-white placeholder-white/40 focus:outline-none"
            />
          </div>

          <button
            onClick={() => setVegOnly(!vegOnly)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold whitespace-nowrap transition-all ${
              vegOnly
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-white/5 border-white/10 text-white/70'
            }`}
          >
            Veg Only
          </button>
        </div>
      </div>

      {/* Menu Food Dishes Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white font-royal flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Master Kitchen Specialties ({filteredFoods.length})</span>
        </h2>

        {filteredFoods.length === 0 ? (
          <div className="py-16 text-center glass-panel rounded-3xl border border-white/10 space-y-3">
            <p className="text-white/70 text-sm">No delicacies match your filter.</p>
            <button
              onClick={() => {
                setSearchMenu('');
                setVegOnly(false);
                setActiveCategory('ALL');
              }}
              className="px-4 py-2 rounded-xl btn-royal-gold text-xs font-bold"
            >
              Reset Menu Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredFoods.map((food) => (
              <FoodCard key={food.id} food={food} restaurant={restaurant} />
            ))}
          </div>
        )}
      </div>

      {/* Guest Reviews Section */}
      <div className="space-y-4 pt-6 border-t border-white/10">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white font-royal flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-amber-400" />
            <span>Connoisseur Reviews ({reviews.length})</span>
          </h3>

          <Link
            to="/profile/reviews"
            className="text-xs text-amber-400 hover:text-amber-300 font-semibold"
          >
            Write a Review →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {reviews.map((rev) => (
            <div key={rev.id} className="p-4 rounded-2xl glass-panel border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={rev.userAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                    alt={rev.userName}
                    className="w-8 h-8 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-xs text-white">{rev.userName}</h4>
                    <p className="text-[10px] text-white/40">{rev.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{rev.rating}.0</span>
                </div>
              </div>
              <p className="text-xs text-white/70 leading-relaxed">
                "{rev.comment}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailPage;
