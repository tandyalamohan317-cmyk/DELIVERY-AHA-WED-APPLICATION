import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation as useRouterLocation } from 'react-router-dom';
import {
  Crown,
  MapPin,
  Search,
  ShoppingBag,
  User,
  Heart,
  Clock,
  Settings,
  Bell,
  HelpCircle,
  LogOut,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useLocation } from '../../context/LocationContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { totals } = useCart();
  const { selectedCity, selectedArea, openLocationModal } = useLocation();
  const routerLocation = useRouterLocation();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/search');
    }
  };

  const isActiveRoute = (path) => {
    if (path === '/' && routerLocation.pathname === '/') return true;
    if (path !== '/' && routerLocation.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 shadow-lg backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Logo & Location Selector */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* AHA Royal Brand */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-300 to-amber-600 p-0.5 shadow-gold-glow group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0D0622] rounded-[14px] flex items-center justify-center">
                <Crown className="w-5 h-5 text-[#D4AF37] stroke-[2.5]" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-royal font-black text-2xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#F3E5AB]">
                AHA
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#D4AF37]/80 -mt-1 font-semibold">
                A Taste Above
              </span>
            </div>
          </Link>

          {/* Location Picker Pill */}
          <button
            onClick={openLocationModal}
            className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-amber-400/40 transition-all text-xs group max-w-[210px]"
            title="Change delivery location"
          >
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 group-hover:animate-bounce" />
            <div className="flex flex-col text-left truncate">
              <span className="font-bold text-white group-hover:text-amber-300 truncate">
                {selectedArea || 'Banjara Hills'}
              </span>
              <span className="text-[10px] text-white/50 truncate -mt-0.5">
                {selectedCity?.name || 'Hyderabad'}
              </span>
            </div>
            <ChevronDown className="w-3 h-3 text-white/40 ml-1 shrink-0" />
          </button>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden sm:flex items-center flex-1 max-w-md mx-2 relative"
        >
          <Search className="w-4 h-4 text-white/40 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search royal biryanis, cuisines, restaurants..."
            className="w-full pl-10 pr-4 py-2 rounded-2xl glass-input text-xs text-white placeholder-white/40 focus:outline-none"
          />
        </form>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold">
          {[
            { path: '/', label: 'Home' },
            { path: '/restaurants', label: 'Restaurants' },
            { path: '/categories', label: 'Cuisines' },
            { path: '/offers', label: 'Offers' }
          ].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-colors py-1 relative ${
                isActiveRoute(link.path)
                  ? 'text-amber-300 font-bold'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {link.label}
              {isActiveRoute(link.path) && (
                <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-amber-400 rounded-full shadow-gold-glow" />
              )}
            </Link>
          ))}
        </nav>

        {/* Cart & Profile Controls */}
        <div className="flex items-center gap-3">
          
          {/* Cart Button */}
          <Link
            to="/cart"
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 text-amber-300 transition-all text-xs font-bold relative group"
            title="View Feast Cart"
          >
            <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Cart</span>
            {totals.itemCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 text-[11px] font-extrabold flex items-center justify-center shadow-gold-glow">
                {totals.itemCount}
              </span>
            )}
          </Link>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all text-xs"
              aria-expanded={isProfileOpen}
            >
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                alt={user?.name || 'User'}
                className="w-7 h-7 rounded-xl object-cover border border-amber-400/40"
              />
              <span className="hidden sm:inline font-semibold text-white/90 truncate max-w-[100px]">
                {user?.name || 'Account'}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-white/40 hidden sm:inline" />
            </button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-3xl glass-panel-gold border border-amber-400/40 shadow-2xl py-2 z-50 text-xs animate-fade-in backdrop-blur-2xl">
                <div className="px-4 py-3 border-b border-white/10">
                  <p className="font-bold text-white text-sm truncate">{user?.name || 'Arjun Verma'}</p>
                  <p className="text-[11px] text-white/50 truncate">{user?.email || 'customer@aha.com'}</p>
                </div>

                <div className="py-1">
                  <Link
                    to="/profile"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <User className="w-4 h-4 text-amber-400" />
                    <span>My Profile</span>
                  </Link>

                  <Link
                    to="/orders"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <Clock className="w-4 h-4 text-indigo-400" />
                    <span>My Orders</span>
                  </Link>

                  <Link
                    to="/favorites"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <Heart className="w-4 h-4 text-rose-400" />
                    <span>Saved Favorites</span>
                  </Link>

                  <Link
                    to="/notifications"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <Bell className="w-4 h-4 text-purple-400" />
                    <span>Notifications</span>
                  </Link>

                  <Link
                    to="/help"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <HelpCircle className="w-4 h-4 text-cyan-400" />
                    <span>Help & Support</span>
                  </Link>

                  <Link
                    to="/settings"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <Settings className="w-4 h-4 text-amber-400" />
                    <span>Settings</span>
                  </Link>
                </div>

                <div className="pt-1 border-t border-white/10">
                  {isAuthenticated ? (
                    <button
                      onClick={() => {
                        logout();
                        setIsProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 text-left transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      onClick={() => setIsProfileOpen(false)}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-amber-300 hover:bg-amber-400/10 text-left transition-colors font-bold"
                    >
                      <User className="w-4 h-4" />
                      <span>Log In / Sign Up</span>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
