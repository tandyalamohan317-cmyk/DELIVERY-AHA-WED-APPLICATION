import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Clock, Heart, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const MobileBottomNav = () => {
  const location = useLocation();
  const { totals } = useCart();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/search', label: 'Search', icon: Search },
    { path: '/orders', label: 'Orders', icon: Clock },
    { path: '/favorites', label: 'Favorites', icon: Heart },
    { path: '/profile', label: 'Profile', icon: User }
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-panel border-t border-white/10 px-2 py-2 backdrop-blur-2xl">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all relative ${
                active ? 'text-amber-300' : 'text-white/50 hover:text-white/80'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${active ? 'scale-110 text-amber-400 stroke-[2.5]' : ''}`} />
                {item.path === '/orders' && totals.itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400" />
                )}
              </div>
              <span className={`text-[10px] mt-1 font-medium ${active ? 'font-bold text-amber-300' : ''}`}>
                {item.label}
              </span>

              {active && (
                <span className="w-1 h-1 rounded-full bg-amber-400 absolute bottom-0 shadow-gold-glow" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
