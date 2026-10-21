import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Star,
  Flame,
  Sparkles,
  Plus,
  Minus,
  ShoppingBag,
  ArrowLeft,
  Check,
  Store,
  Clock,
  ShieldCheck,
  Heart
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { getStoredCatalog, getStoredFavorites, toggleFavoriteFood } from '../data/storage';

const FoodDetailPage = () => {
  const { foodId } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { showToast } = useToast();
  const catalog = getStoredCatalog();

  const food = catalog.foods.find(f => f.id === foodId) || catalog.foods[0];
  const restaurant = catalog.restaurants.find(r => r.id === food?.restaurantId) || catalog.restaurants[0];

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [spiceLevel, setSpiceLevel] = useState('Medium');
  const [instructions, setInstructions] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    if (food) {
      const defaultSize = food.customization?.sizes?.[0] || { name: 'Regular Portion', price: food.price };
      setSelectedSize(defaultSize);
      setSelectedAddons([]);
      setSpiceLevel(food.spiceLevel || 'Medium');
      setInstructions('');
      setQuantity(1);

      const favs = getStoredFavorites();
      setIsFav((favs.foods || []).includes(food.id));
    }
  }, [foodId, food]);

  if (!food) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <p className="text-white/70">Dish not found.</p>
        <button
          onClick={() => navigate('/restaurants')}
          className="px-5 py-2.5 rounded-xl btn-royal-gold text-xs font-bold"
        >
          Explore Restaurants
        </button>
      </div>
    );
  }

  const sizes = food.customization?.sizes || [{ name: 'Regular Portion', price: food.price }];
  const addons = food.customization?.addons || [];

  const basePrice = selectedSize ? selectedSize.price : food.price;
  const addonsTotal = selectedAddons.reduce((sum, a) => sum + (a.price || 0), 0);
  const unitPrice = basePrice + addonsTotal;
  const totalPrice = unitPrice * quantity;

  const toggleAddon = (addon) => {
    if (selectedAddons.some((a) => a.name === addon.name)) {
      setSelectedAddons(selectedAddons.filter((a) => a.name !== addon.name));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const handleFavoriteClick = () => {
    const nextFav = toggleFavoriteFood(food.id);
    setIsFav(nextFav);
    showToast(nextFav ? `${food.name} added to favorites!` : `${food.name} removed from favorites`, 'info');
  };

  const handleAddToCart = () => {
    addItem(food, restaurant, {
      selectedSize,
      selectedAddons,
      spiceLevel,
      cookingInstructions: instructions,
      quantity
    });
  };

  // Related foods from same category
  const relatedFoods = catalog.foods
    .filter(f => f.id !== food.id && (f.categoryId === food.categoryId || f.restaurantId === food.restaurantId))
    .slice(0, 3);

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between text-xs text-white/60">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <div className="flex items-center gap-2">
          <Link to="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link to="/restaurants" className="hover:text-white">Restaurants</Link>
          <span>/</span>
          <span className="text-amber-300 truncate max-w-[200px]">{food.name}</span>
        </div>
      </div>

      {/* Main Food Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Image & Restaurant Banner (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative rounded-3xl overflow-hidden glass-card border border-amber-400/30 shadow-2xl bg-slate-950 aspect-square">
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E061E]/80 via-transparent to-black/40" />

            {/* Top Badges */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`w-6 h-6 rounded-md border flex items-center justify-center bg-black/60 backdrop-blur-md ${
                    food.isVeg ? 'border-emerald-500' : 'border-rose-500'
                  }`}
                >
                  <span className={`w-3 h-3 rounded-full ${food.isVeg ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                </span>

                {food.isBestseller && (
                  <span className="px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-extrabold flex items-center gap-1 shadow-gold-glow">
                    <Sparkles className="w-3.5 h-3.5" /> Bestseller
                  </span>
                )}
              </div>

              <button
                onClick={handleFavoriteClick}
                className="p-2.5 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white transition-all shadow-md"
                title="Save dish"
              >
                <Heart className={`w-5 h-5 ${isFav ? 'text-rose-500 fill-rose-500' : 'text-white'}`} />
              </button>
            </div>

            {/* Bottom Overlay Info */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90">
              <span className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md font-bold text-amber-300 border border-amber-400/30">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{food.rating || 4.8}</span>
                <span className="text-white/50 font-normal">({food.ratingCount || 150}+ reviews)</span>
              </span>

              {food.spiceLevel && (
                <span className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md font-medium text-white/80">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>{food.spiceLevel}</span>
                </span>
              )}
            </div>
          </div>

          {/* Restaurant Origin Banner */}
          {restaurant && (
            <Link
              to={`/restaurants/${restaurant.slug || restaurant.id}`}
              className="p-4 rounded-2xl glass-card border border-white/10 hover:border-amber-400/40 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                  <Store className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] text-white/50 uppercase font-semibold">Master Kitchen</p>
                  <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                    {restaurant.name}
                  </h4>
                  <p className="text-xs text-white/50">{restaurant.area}, {restaurant.city}</p>
                </div>
              </div>
              <span className="text-xs font-bold text-amber-400">View Menu →</span>
            </Link>
          )}
        </div>

        {/* Right: Customization & Actions (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 shadow-2xl">
            
            {/* Title & Description */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                {food.categoryId?.replace(/-/g, ' ') || 'Royal Specialty'}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-royal leading-tight">
                {food.name}
              </h1>
              <p className="text-sm text-white/70 leading-relaxed">
                {food.description}
              </p>
            </div>

            {/* Portion / Size Selector */}
            {sizes.length > 1 && (
              <div className="space-y-3 pt-2">
                <label className="text-xs font-bold text-white/80 uppercase tracking-wider block">
                  Select Portion Size
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {sizes.map((s) => {
                    const isSelected = selectedSize?.name === s.name;
                    return (
                      <button
                        key={s.name}
                        onClick={() => setSelectedSize(s)}
                        className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-amber-400/15 border-amber-400 text-white shadow-sm'
                            : 'bg-white/[0.03] border-white/10 text-white/75 hover:bg-white/[0.06]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              isSelected ? 'border-amber-400' : 'border-white/30'
                            }`}
                          >
                            {isSelected && <span className="w-2 h-2 rounded-full bg-amber-400" />}
                          </span>
                          <span className="text-xs font-semibold">{s.name}</span>
                        </div>
                        <span className="text-xs font-extrabold text-amber-300">₹{s.price}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Addons Selection */}
            {addons.length > 0 && (
              <div className="space-y-3 pt-2">
                <label className="text-xs font-bold text-white/80 uppercase tracking-wider block">
                  Royal Accompaniments & Add-ons
                </label>
                <div className="space-y-2">
                  {addons.map((a) => {
                    const isChecked = selectedAddons.some((x) => x.name === a.name);
                    return (
                      <button
                        key={a.name}
                        onClick={() => toggleAddon(a)}
                        className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                          isChecked
                            ? 'bg-purple-500/15 border-purple-400 text-white shadow-sm'
                            : 'bg-white/[0.03] border-white/10 text-white/75 hover:bg-white/[0.06]'
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

            {/* Spice Preference */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-white/80 uppercase tracking-wider block">
                Spice Level Preference
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Mild', 'Medium', 'Authentic Spicy'].map((lvl) => (
                  <button
                    key={lvl}
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

            {/* Special Instructions */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-white/80 uppercase tracking-wider block">
                Chef Preparation Notes
              </label>
              <input
                type="text"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="E.g. Extra mint raita, less spicy, separate gravy..."
                className="w-full px-4 py-2.5 rounded-xl glass-input text-xs text-white placeholder-white/30 focus:outline-none"
              />
            </div>

            {/* Quantity Stepper & Add to Cart Bar */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center gap-4">
              
              {/* Stepper */}
              <div className="flex items-center gap-3 p-1.5 rounded-2xl bg-white/5 border border-white/10 w-full sm:w-auto justify-between sm:justify-start">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-extrabold text-base text-white px-3 font-mono">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 flex items-center justify-center transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart CTA */}
              <button
                onClick={handleAddToCart}
                className="flex-1 w-full py-3.5 px-6 rounded-2xl btn-royal-gold text-sm font-bold shadow-xl shadow-amber-500/25 flex items-center justify-between hover:scale-[1.01] active:scale-[0.99] transition-all"
              >
                <div className="text-left">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-900/70 block">Total</span>
                  <span className="text-base font-extrabold">₹{totalPrice}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Add to Feast</span>
                  <ShoppingBag className="w-4 h-4" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Dishes */}
      {relatedFoods.length > 0 && (
        <div className="space-y-4 pt-6">
          <h2 className="text-xl font-bold text-white font-royal flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>You May Also Relish</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedFoods.map((rf) => (
              <div
                key={rf.id}
                onClick={() => navigate(`/food/${rf.id}`)}
                className="p-4 rounded-2xl glass-card border border-white/10 hover:border-amber-400/40 cursor-pointer transition-all flex items-center gap-3.5 group"
              >
                <img
                  src={rf.image}
                  alt={rf.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-white group-hover:text-amber-300 truncate transition-colors">
                    {rf.name}
                  </h4>
                  <p className="text-xs font-bold text-amber-400 mt-1">₹{rf.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodDetailPage;
