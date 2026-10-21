import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, UtensilsCrossed, Store } from 'lucide-react';
import { getStoredCatalog } from '../data/storage';
import FoodCard from '../components/cards/FoodCard';
import RestaurantCard from '../components/cards/RestaurantCard';

const CategoryDetailPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const catalog = getStoredCatalog();

  const category = catalog.categories.find(
    c => c.id === categoryId || c.name.toLowerCase() === categoryId?.toLowerCase()
  ) || catalog.categories[0];

  const [activeTab, setActiveTab] = useState('dishes'); // 'dishes' | 'restaurants'

  if (!category) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <p className="text-white/70">Category not found.</p>
        <button
          onClick={() => navigate('/categories')}
          className="px-5 py-2.5 rounded-xl btn-royal-gold text-xs font-bold"
        >
          View All Categories
        </button>
      </div>
    );
  }

  // Matched dishes
  const matchedFoods = catalog.foods.filter(
    f => f.categoryId === category.id || f.name.toLowerCase().includes(category.name.toLowerCase())
  );

  // Matched restaurants
  const matchedRestaurants = catalog.restaurants.filter(r => {
    const cuisines = Array.isArray(r.cuisines) ? r.cuisines : [r.cuisines];
    return cuisines.some(c => c.toLowerCase().includes(category.name.toLowerCase()) || c.toLowerCase().includes(category.id));
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-white/60">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <span>/</span>
        <Link to="/categories" className="hover:text-white">Cuisines</Link>
        <span>/</span>
        <span className="text-amber-300 font-semibold">{category.name}</span>
      </div>

      {/* Hero Category Banner */}
      <div className="relative rounded-3xl overflow-hidden glass-panel-gold border border-amber-400/30 p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="relative z-10 max-w-xl space-y-3 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Heritage Flavors</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-royal tracking-wide">
            {category.name}
          </h1>
          <p className="text-sm text-white/70 leading-relaxed">
            {category.description}
          </p>
        </div>

        <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden glass-card border border-amber-400/40 shrink-0 shadow-gold-glow">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Tab Switcher: Dishes vs Restaurants */}
      <div className="flex items-center gap-3 border-b border-white/10 pb-3">
        <button
          onClick={() => setActiveTab('dishes')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'dishes'
              ? 'bg-amber-400 text-slate-950 shadow-md'
              : 'text-white/70 hover:text-white hover:bg-white/5'
          }`}
        >
          <UtensilsCrossed className="w-4 h-4" />
          <span>Signature Dishes ({matchedFoods.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('restaurants')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'restaurants'
              ? 'bg-amber-400 text-slate-950 shadow-md'
              : 'text-white/70 hover:text-white hover:bg-white/5'
          }`}
        >
          <Store className="w-4 h-4" />
          <span>Dining Palaces ({matchedRestaurants.length})</span>
        </button>
      </div>

      {/* Content Section */}
      {activeTab === 'dishes' ? (
        matchedFoods.length === 0 ? (
          <div className="p-12 text-center glass-panel rounded-3xl border border-white/10 space-y-3">
            <p className="text-white/70 text-sm">No specific dishes tagged right now in this category.</p>
            <button
              onClick={() => navigate('/restaurants')}
              className="px-4 py-2 rounded-xl btn-royal-gold text-xs font-bold"
            >
              Explore Restaurants
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matchedFoods.map((food) => {
              const rest = catalog.restaurants.find(r => r.id === food.restaurantId) || catalog.restaurants[0];
              return (
                <FoodCard key={food.id} food={food} restaurant={rest} />
              );
            })}
          </div>
        )
      ) : (
        matchedRestaurants.length === 0 ? (
          <div className="p-12 text-center glass-panel rounded-3xl border border-white/10 space-y-3">
            <p className="text-white/70 text-sm">No specific restaurants found specializing solely in this category.</p>
            <button
              onClick={() => navigate('/restaurants')}
              className="px-4 py-2 rounded-xl btn-royal-gold text-xs font-bold"
            >
              View All Restaurants
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchedRestaurants.map((rest) => (
              <RestaurantCard key={rest.id} restaurant={rest} />
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default CategoryDetailPage;
