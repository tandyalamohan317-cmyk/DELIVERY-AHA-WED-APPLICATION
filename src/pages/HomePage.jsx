import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Crown,
  Sparkles,
  MapPin,
  Search,
  ArrowRight,
  Flame,
  Star,
  Clock,
  ShieldCheck,
  ChevronRight,
  Percent,
  TrendingUp,
  Award
} from 'lucide-react';
import { useLocation } from '../context/LocationContext';
import { useCart } from '../context/CartContext';
import { getStoredCatalog } from '../data/storage';
import RestaurantCard from '../components/cards/RestaurantCard';
import FoodCard from '../components/cards/FoodCard';
import CategoryCard from '../components/cards/CategoryCard';
import OfferCard from '../components/cards/OfferCard';

const HomePage = () => {
  const navigate = useNavigate();
  const { selectedCity, selectedArea, openLocationModal } = useLocation();
  const [catalog, setCatalog] = useState(getStoredCatalog());
  const [searchHero, setSearchHero] = useState('');

  useEffect(() => {
    setCatalog(getStoredCatalog());
  }, []);

  // Filter restaurants matching current city or default to top restaurants
  const cityRestaurants = catalog.restaurants.filter(r => 
    r.city?.toLowerCase() === selectedCity?.name?.toLowerCase()
  );
  const displayRestaurants = cityRestaurants.length > 0 ? cityRestaurants : catalog.restaurants;

  const topRatedRestaurants = [...displayRestaurants].sort((a, b) => b.rating - a.rating).slice(0, 6);
  const fastDeliveryRestaurants = [...displayRestaurants].sort((a, b) => a.deliveryTimeMin - b.deliveryTimeMin).slice(0, 6);
  const popularDishes = catalog.foods.filter(f => f.isBestseller).slice(0, 6);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (searchHero.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchHero.trim())}`);
    } else {
      navigate('/search');
    }
  };

  return (
    <div className="space-y-14 sm:space-y-20 pb-16">
      
      {/* Royal Hero Section */}
      <section className="relative min-h-[500px] sm:min-h-[560px] rounded-3xl sm:rounded-[40px] overflow-hidden glass-panel-gold border border-amber-400/30 p-6 sm:p-12 flex flex-col justify-center shadow-2xl relative">
        {/* Background Ambient Glows & Imagery */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E061E]/95 via-[#0E061E]/80 to-transparent z-10" />
        <img
          src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1600&q=80"
          alt="Royal Feast"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-40 mix-blend-overlay"
        />

        <div className="relative z-20 max-w-2xl space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold shadow-gold-glow">
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>Curated Heritage Dining in {selectedCity?.name || 'Hyderabad'}</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-royal tracking-wide leading-tight">
            A Feast Crafted <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#F3E5AB]">
              A Taste Above.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-white/70 max-w-lg leading-relaxed font-normal">
            Experience hand-sealed charcoal dum biryanis, 18-hour simmered gravies, and artisanal desserts delivered in gold thermal boxes.
          </p>

          {/* Hero Search & Location Bar */}
          <div className="p-2 sm:p-2.5 rounded-2xl sm:rounded-3xl glass-panel border border-amber-400/40 shadow-2xl flex flex-col sm:flex-row items-center gap-2 max-w-xl">
            {/* Location Pill */}
            <button
              type="button"
              onClick={openLocationModal}
              className="w-full sm:w-auto px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold flex items-center gap-2 shrink-0 border border-white/10 transition-colors"
            >
              <MapPin className="w-4 h-4 text-amber-400" />
              <span className="truncate max-w-[130px]">{selectedArea}, {selectedCity?.name}</span>
            </button>

            {/* Input Form */}
            <form onSubmit={handleHeroSearch} className="w-full flex-1 flex items-center gap-2">
              <input
                type="text"
                value={searchHero}
                onChange={(e) => setSearchHero(e.target.value)}
                placeholder="Search royal dishes, cuisines, or restaurants..."
                className="w-full bg-transparent px-3 py-2 text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl btn-royal-gold text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all shrink-0"
              >
                Discover
              </button>
            </form>
          </div>

          {/* Fast Quick Links */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap text-xs">
            <span className="text-white/50 text-[11px]">Popular:</span>
            {['Dum Biryani', 'Mutton Haleem', 'Benne Dosa', 'Butter Chicken'].map((item) => (
              <button
                key={item}
                onClick={() => navigate(`/search?q=${encodeURIComponent(item)}`)}
                className="px-3 py-1 rounded-full bg-white/5 hover:bg-amber-400/20 text-white/80 hover:text-amber-300 border border-white/10 text-[11px] transition-all"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Cuisines Carousel / Grid */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-royal uppercase tracking-widest text-amber-300 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Culinary Traditions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-royal mt-1">
              Explore Cuisines
            </h2>
          </div>

          <Link
            to="/categories"
            className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 group"
          >
            <span>View All ({catalog.categories.length})</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {catalog.categories.slice(0, 8).map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate(`/categories/${cat.id}`)}
              className="group cursor-pointer p-3 rounded-2xl glass-card border border-white/10 hover:border-amber-400/40 text-center space-y-2 transition-all hover:-translate-y-1 shadow-md"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-2xl overflow-hidden bg-slate-900 border border-white/10 shadow-md">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h4 className="font-bold text-xs text-white group-hover:text-amber-300 transition-colors truncate">
                {cat.name}
              </h4>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended Restaurants in City */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-royal uppercase tracking-widest text-amber-300 font-semibold flex items-center gap-1.5">
              <Crown className="w-3.5 h-3.5 text-amber-400" /> Hand-Curated Palaces
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-royal mt-1">
              Top Rated in {selectedCity?.name || 'Hyderabad'}
            </h2>
          </div>

          <Link
            to="/restaurants"
            className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 group"
          >
            <span>See All ({displayRestaurants.length})</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topRatedRestaurants.map((rest) => (
            <RestaurantCard key={rest.id} restaurant={rest} />
          ))}
        </div>
      </section>

      {/* Signature Bestseller Dishes */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-royal uppercase tracking-widest text-amber-300 font-semibold flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-400" /> Nizam & Awadh Classics
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-royal mt-1">
              Popular Royal Feasts
            </h2>
          </div>

          <Link
            to="/restaurants"
            className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 group"
          >
            <span>Explore Menu</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {popularDishes.map((food) => {
            const rest = catalog.restaurants.find(r => r.id === food.restaurantId) || catalog.restaurants[0];
            return (
              <FoodCard key={food.id} food={food} restaurant={rest} />
            );
          })}
        </div>
      </section>

      {/* Promotional Dining Vouchers */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-royal uppercase tracking-widest text-amber-300 font-semibold flex items-center gap-1.5">
              <Percent className="w-3.5 h-3.5 text-amber-400" /> Royal Privileges
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-royal mt-1">
              Exclusive Dining Offers
            </h2>
          </div>

          <Link
            to="/offers"
            className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 group"
          >
            <span>View All Vouchers</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {catalog.offers.slice(0, 3).map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      </section>

      {/* Express Delivery Palaces */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-royal uppercase tracking-widest text-amber-300 font-semibold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" /> Lightning Service
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-royal mt-1">
              Fastest Near You
            </h2>
          </div>

          <Link
            to="/restaurants"
            className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 group"
          >
            <span>Explore All</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {fastDeliveryRestaurants.map((rest) => (
            <RestaurantCard key={rest.id} restaurant={rest} />
          ))}
        </div>
      </section>

      {/* Royal Guild Assurance Banner */}
      <section className="p-8 sm:p-10 rounded-3xl glass-panel-gold border border-amber-400/40 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold">
            <Award className="w-3.5 h-3.5" />
            <span>The AHA Royal Guarantee</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white font-royal">
            Gold Thermal Vault Delivery
          </h3>
          <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
            Every royal meal is dispatched with certified tamper seals, ensuring hot, pristine aromatic dining straight from master kitchen ovens.
          </p>
        </div>

        <button
          onClick={() => navigate('/restaurants')}
          className="px-6 py-3.5 rounded-2xl btn-royal-gold text-xs font-bold shadow-xl shadow-amber-500/20 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shrink-0"
        >
          <span>Order Your Feast</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
};

export default HomePage;
