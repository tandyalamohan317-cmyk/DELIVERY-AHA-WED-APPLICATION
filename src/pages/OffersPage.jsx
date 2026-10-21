import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Tag, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getStoredCatalog } from '../data/storage';
import OfferCard from '../components/cards/OfferCard';

const OffersPage = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const catalog = getStoredCatalog();
  const [offers] = useState(catalog.offers || []);

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-royal uppercase tracking-widest text-amber-300 font-semibold flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-amber-400" /> Royal Vouchers & Promotions
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-royal mt-1">
            Dining Offers & Privileges
          </h1>
          <p className="text-xs sm:text-sm text-white/60 mt-1">
            Relish royal feasts with exclusive verified promo vouchers.
          </p>
        </div>

        {cartItems.length > 0 && (
          <button
            onClick={() => navigate('/cart')}
            className="self-start sm:self-auto px-4 py-2 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/40 text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Go to Cart ({cartItems.length})</span>
          </button>
        )}
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {offers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>

      {/* Explore Restaurants Banner */}
      <div className="p-6 rounded-3xl glass-panel text-center space-y-3 border border-white/10">
        <h3 className="text-lg font-bold text-white font-royal">Ready to Dine Like Royalty?</h3>
        <p className="text-xs text-white/60 max-w-md mx-auto">
          Explore award-winning master kitchens across India and enjoy instant coupon savings upon checkout.
        </p>
        <Link
          to="/restaurants"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl btn-royal-gold text-xs font-bold shadow"
        >
          <span>Explore Royal Restaurants</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default OffersPage;
