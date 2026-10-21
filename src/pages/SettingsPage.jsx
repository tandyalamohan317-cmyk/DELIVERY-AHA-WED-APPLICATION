import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Settings,
  Bell,
  Sparkles,
  RotateCcw,
  Shield,
  Smartphone,
  ArrowLeft
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { getStoredPreferences, setStoredPreferences, resetAllStorage } from '../data/storage';

const SettingsPage = () => {
  const { showToast } = useToast();
  const [preferences, setPrefs] = useState(getStoredPreferences());

  const handleToggle = (key) => {
    const updated = {
      ...preferences,
      [key]: !preferences[key]
    };
    setPrefs(updated);
    setStoredPreferences(updated);
    showToast('Preference updated', 'info');
  };

  const handleFactoryReset = () => {
    if (window.confirm('Reset all mock data to factory seed? This will restore original sample restaurants, orders, coupons, and addresses.')) {
      resetAllStorage();
      setPrefs(getStoredPreferences());
      showToast('All data restored to factory state!', 'success');
      setTimeout(() => {
        window.location.reload();
      }, 800);
    }
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto pb-16">
      
      {/* Header */}
      <div className="space-y-1">
        <Link to="/profile" className="text-xs text-white/50 hover:text-white flex items-center gap-1 mb-2 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Profile
        </Link>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-royal">
          App Settings & Preferences
        </h1>
        <p className="text-xs sm:text-sm text-white/60">
          Personalize dietary preferences, notification toggles, and LocalStorage data.
        </p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        
        {/* Dietary Section */}
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 shadow-xl">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Dietary & Gastronomic Filter</span>
          </h3>

          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
            <div>
              <p className="font-bold text-sm text-white">Pure Vegetarian Default Mode</p>
              <p className="text-xs text-white/50">Only show pure vegetarian royal establishments and dishes</p>
            </div>
            <button
              onClick={() => handleToggle('isPureVegOnly')}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                preferences.isPureVegOnly ? 'bg-emerald-500' : 'bg-white/20'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                  preferences.isPureVegOnly ? 'left-7' : 'left-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4 shadow-xl">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Bell className="w-4 h-4 text-purple-400" />
            <span>Notifications & Alerts</span>
          </h3>

          <div className="space-y-2">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
              <div>
                <p className="font-bold text-sm text-white">Live Push Notifications</p>
                <p className="text-xs text-white/50">Instant dispatch & order status timeline updates</p>
              </div>
              <button
                onClick={() => handleToggle('pushNotifications')}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  preferences.pushNotifications ? 'bg-amber-400' : 'bg-white/20'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-slate-950 transition-transform absolute top-1 ${
                    preferences.pushNotifications ? 'left-7' : 'left-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
              <div>
                <p className="font-bold text-sm text-white">SMS Updates</p>
                <p className="text-xs text-white/50">Receive driver arrival PIN and SMS order confirmation</p>
              </div>
              <button
                onClick={() => handleToggle('smsAlerts')}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  preferences.smsAlerts ? 'bg-amber-400' : 'bg-white/20'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-slate-950 transition-transform absolute top-1 ${
                    preferences.smsAlerts ? 'left-7' : 'left-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Data Reset Section */}
        <div className="glass-panel p-6 rounded-3xl border border-rose-500/20 space-y-4 shadow-xl">
          <h3 className="text-xs font-bold text-rose-300 uppercase tracking-wider flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-rose-400" />
            <span>LocalStorage & Factory Demo Reset</span>
          </h3>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-rose-500/[0.03] border border-rose-500/20">
            <div>
              <p className="font-bold text-sm text-white">Reset Demo Storage to Initial Seed</p>
              <p className="text-xs text-white/50">
                Restores original sample restaurants, orders, coupons, and addresses.
              </p>
            </div>
            <button
              onClick={handleFactoryReset}
              className="px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-bold shrink-0 transition-all"
            >
              Reset All Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
