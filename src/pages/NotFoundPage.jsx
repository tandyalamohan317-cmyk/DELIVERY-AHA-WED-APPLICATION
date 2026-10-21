import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Crown, ArrowLeft, Home, Search, Store } from 'lucide-react';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full glass-panel-gold rounded-3xl sm:rounded-[36px] p-8 sm:p-12 border border-amber-400/40 text-center space-y-6 shadow-2xl relative overflow-hidden">
        
        {/* Crown Icon */}
        <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-gold-glow animate-bounce">
          <Crown className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-5xl font-black text-amber-400 tracking-wider">
            404
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-royal">
            Oops! This Dish Isn't on the Menu
          </h1>
          <p className="text-xs sm:text-sm text-white/60 max-w-sm mx-auto leading-relaxed">
            The page you are looking for has been retired from the royal banquet or moved to another dining chamber.
          </p>
        </div>

        {/* Buttons */}
        <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl btn-royal-gold text-xs font-bold shadow-lg flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Go Home</span>
          </button>

          <button
            onClick={() => navigate('/restaurants')}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all"
          >
            <Store className="w-4 h-4 text-amber-400" />
            <span>Browse Restaurants</span>
          </button>

          <button
            onClick={() => navigate('/search')}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all"
          >
            <Search className="w-4 h-4 text-amber-400" />
            <span>Search Food</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
