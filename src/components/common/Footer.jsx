import React from 'react';
import { Link } from 'react-router-dom';
import { Crown, Heart, ShieldCheck, Clock, Award, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full glass-panel border-t border-white/10 mt-20 pb-20 md:pb-8 pt-14 text-white/70 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Brand & Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          
          <div className="md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2 group inline-block">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 p-0.5 shadow-gold-glow">
                <div className="w-full h-full bg-[#0D0622] rounded-[14px] flex items-center justify-center">
                  <Crown className="w-4 h-4 text-[#D4AF37]" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-royal font-black text-xl tracking-wider text-[#F3E5AB]">
                  AHA
                </span>
                <span className="text-[8px] uppercase tracking-[0.2em] text-[#D4AF37] -mt-1 font-semibold">
                  A Taste Above
                </span>
              </div>
            </Link>
            <p className="text-xs text-white/50 leading-relaxed">
              Pioneering the royal standard in Indian culinary home delivery. Slow-cooked heritage biryanis, artisanal gravies, and exquisite desserts delivered in tamper-proof gold packaging.
            </p>
          </div>

          {/* Pillar 1 */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Royal Guild Standards</h4>
              <p className="text-xs text-white/50 mt-1">Every restaurant is curated and certified for culinary excellence.</p>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Swift Live Dispatch</h4>
              <p className="text-xs text-white/50 mt-1">Thermal insulation boxes preserve steaming aromas until your doorstep.</p>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Tamper-Proof Guarantee</h4>
              <p className="text-xs text-white/50 mt-1">Sealed gold packaging ensures 100% hygiene and authentic flavor.</p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
          
          <div className="space-y-3">
            <h5 className="font-bold text-white uppercase tracking-wider text-xs font-royal">Discover AHA</h5>
            <ul className="space-y-2 text-white/60">
              <li><Link to="/restaurants" className="hover:text-amber-300 transition-colors">Royal Restaurants</Link></li>
              <li><Link to="/categories" className="hover:text-amber-300 transition-colors">Culinary Cuisines</Link></li>
              <li><Link to="/offers" className="hover:text-amber-300 transition-colors">Dining Vouchers</Link></li>
              <li><Link to="/location" className="hover:text-amber-300 transition-colors">Cities & Locations</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-bold text-white uppercase tracking-wider text-xs font-royal">Signature Flavors</h5>
            <ul className="space-y-2 text-white/60">
              <li><Link to="/categories/biryani" className="hover:text-amber-300 transition-colors">Hyderabadi Dum Biryani</Link></li>
              <li><Link to="/categories/south-indian" className="hover:text-amber-300 transition-colors">Crisp Ghee Dosa & Idlis</Link></li>
              <li><Link to="/categories/kebabs" className="hover:text-amber-300 transition-colors">Galouti & Seekh Kebabs</Link></li>
              <li><Link to="/categories/desserts" className="hover:text-amber-300 transition-colors">Shahi Mithai & Tukda</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-bold text-white uppercase tracking-wider text-xs font-royal">Account & Feasts</h5>
            <ul className="space-y-2 text-white/60">
              <li><Link to="/orders" className="hover:text-amber-300 transition-colors">My Orders Ledger</Link></li>
              <li><Link to="/favorites" className="hover:text-amber-300 transition-colors">Bookmarked Dishes</Link></li>
              <li><Link to="/profile/addresses" className="hover:text-amber-300 transition-colors">Delivery Address Book</Link></li>
              <li><Link to="/cart" className="hover:text-amber-300 transition-colors">Feast Cart & Checkout</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-bold text-white uppercase tracking-wider text-xs font-royal">Royal Concierge</h5>
            <ul className="space-y-2 text-white/60">
              <li><Link to="/help" className="hover:text-amber-300 transition-colors">24/7 Concierge Support</Link></li>
              <li><Link to="/settings" className="hover:text-amber-300 transition-colors">App & Dietary Settings</Link></li>
              <li><Link to="/notifications" className="hover:text-amber-300 transition-colors">Order Alerts</Link></li>
              <li><span className="text-amber-400 font-bold block pt-1">+91 1800-AHA-ROYAL</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/40">
          <p>© {new Date().getFullYear()} AHA – A Taste Above. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/help" className="hover:text-white">Privacy Policy</Link>
            <span>•</span>
            <Link to="/help" className="hover:text-white">Terms of Feast Service</Link>
            <span>•</span>
            <Link to="/help" className="hover:text-white">Security Vault</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
