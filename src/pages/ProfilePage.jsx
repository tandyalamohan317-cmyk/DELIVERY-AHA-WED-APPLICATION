import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  User,
  Crown,
  MapPin,
  Clock,
  Heart,
  Settings,
  Bell,
  HelpCircle,
  LogOut,
  Edit3,
  Wallet,
  Star,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getStoredOrders, getStoredAddresses, getStoredReviews } from '../data/storage';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const orders = getStoredOrders();
  const addresses = getStoredAddresses();
  const reviews = getStoredReviews();

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16">
      
      {/* Profile Header Hero */}
      <div className="glass-panel-gold rounded-3xl sm:rounded-[36px] p-6 sm:p-8 border border-amber-400/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
        <div className="flex items-center gap-5">
          <div className="relative">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
              alt={user?.name || 'User'}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-amber-400/50 shadow-gold-glow"
            />
            <div className="absolute -bottom-2 -right-2 p-1 rounded-lg bg-amber-400 text-slate-950 shadow">
              <Crown className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <h1 className="text-xl sm:text-2xl font-bold text-white font-royal">{user?.name || 'Arjun Verma'}</h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                {user?.tier || 'Royal Connoisseur'}
              </span>
            </div>
            <p className="text-xs text-white/60">{user?.email || 'customer@aha.com'}</p>
            <p className="text-xs text-white/50">{user?.phone || '+91 98765 43210'}</p>
          </div>
        </div>

        <Link
          to="/profile/edit"
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition-all self-center sm:self-auto"
        >
          <Edit3 className="w-3.5 h-3.5 text-amber-400" />
          <span>Edit Profile</span>
        </Link>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl glass-panel border border-white/10 space-y-1">
          <div className="flex items-center justify-between text-white/50 text-xs">
            <span>AHA Wallet</span>
            <Wallet className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-xl font-extrabold text-amber-300 font-mono">₹{user?.walletBalance || 750}</p>
          <span className="text-[10px] text-white/40 block">Royal Cashback Balance</span>
        </div>

        <Link to="/orders" className="p-4 rounded-2xl glass-panel border border-white/10 space-y-1 hover:border-amber-400/30 transition-all group">
          <div className="flex items-center justify-between text-white/50 text-xs">
            <span>Total Orders</span>
            <Clock className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-xl font-extrabold text-white font-mono">{orders.length}</p>
          <span className="text-[10px] text-amber-400 font-semibold group-hover:underline block">View History →</span>
        </Link>

        <Link to="/profile/addresses" className="p-4 rounded-2xl glass-panel border border-white/10 space-y-1 col-span-2 sm:col-span-1 hover:border-amber-400/30 transition-all group">
          <div className="flex items-center justify-between text-white/50 text-xs">
            <span>Saved Addresses</span>
            <MapPin className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-xl font-extrabold text-white font-mono">{addresses.length}</p>
          <span className="text-[10px] text-amber-400 font-semibold group-hover:underline block">Manage Address Book →</span>
        </Link>
      </div>

      {/* Account Navigation List */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider">Account Navigation</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            to="/profile/edit"
            className="p-4 rounded-2xl glass-panel border border-white/10 hover:border-amber-400/40 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <Edit3 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white group-hover:text-amber-300 transition-colors">Edit Profile</h4>
                <p className="text-xs text-white/50">Personal details, photo, and preferences</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
          </Link>

          <Link
            to="/profile/addresses"
            className="p-4 rounded-2xl glass-panel border border-white/10 hover:border-amber-400/40 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white group-hover:text-amber-300 transition-colors">Saved Addresses</h4>
                <p className="text-xs text-white/50">Residences, corporate hubs, and destinations</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
          </Link>

          <Link
            to="/orders"
            className="p-4 rounded-2xl glass-panel border border-white/10 hover:border-amber-400/40 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white group-hover:text-amber-300 transition-colors">My Orders</h4>
                <p className="text-xs text-white/50">Track live orders and review receipts</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
          </Link>

          <Link
            to="/profile/reviews"
            className="p-4 rounded-2xl glass-panel border border-white/10 hover:border-amber-400/40 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <Star className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white group-hover:text-amber-300 transition-colors">My Reviews</h4>
                <p className="text-xs text-white/50">Ratings on restaurants and dishes</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
          </Link>

          <Link
            to="/notifications"
            className="p-4 rounded-2xl glass-panel border border-white/10 hover:border-amber-400/40 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white group-hover:text-amber-300 transition-colors">Notifications</h4>
                <p className="text-xs text-white/50">Order alerts and promotional vouchers</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
          </Link>

          <Link
            to="/help"
            className="p-4 rounded-2xl glass-panel border border-white/10 hover:border-amber-400/40 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white group-hover:text-amber-300 transition-colors">Help & Support</h4>
                <p className="text-xs text-white/50">FAQ, concierge, and assistance tickets</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
          </Link>

          <Link
            to="/settings"
            className="p-4 rounded-2xl glass-panel border border-white/10 hover:border-amber-400/40 transition-all flex items-center justify-between group sm:col-span-2"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                <Settings className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white group-hover:text-amber-300 transition-colors">App Settings</h4>
                <p className="text-xs text-white/50">Dietary filters, alerts, and reset options</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
          </Link>
        </div>
      </div>

      {/* Logout button */}
      <div className="pt-4 border-t border-white/10 flex justify-end">
        <button
          onClick={logout}
          className="px-5 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold flex items-center gap-2 transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out of AHA</span>
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
