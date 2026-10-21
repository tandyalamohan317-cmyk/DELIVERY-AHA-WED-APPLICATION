import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Bell,
  CheckCheck,
  Trash2,
  ArrowLeft,
  Tag,
  Wallet,
  ShoppingBag,
  ArrowRight
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import {
  getStoredNotifications,
  markNotificationRead,
  clearAllNotifications
} from '../data/storage';

const NotificationsPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setNotifications(getStoredNotifications());
  }, []);

  const handleMarkAllRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    showToast('All notifications marked as read', 'info');
  };

  const handleClearAll = () => {
    clearAllNotifications();
    setNotifications([]);
    showToast('All notifications cleared', 'info');
  };

  const getIcon = (type) => {
    switch (type) {
      case 'ORDER':
        return <ShoppingBag className="w-5 h-5 text-indigo-400" />;
      case 'OFFER':
        return <Tag className="w-5 h-5 text-amber-400" />;
      case 'WALLET':
        return <Wallet className="w-5 h-5 text-emerald-400" />;
      default:
        return <Bell className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <Link to="/profile" className="text-xs text-white/50 hover:text-white flex items-center gap-1 mb-2 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Profile
          </Link>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-royal">
            Notifications Center
          </h1>
          <p className="text-xs sm:text-sm text-white/60">
            Real-time updates regarding your royal feasts, vouchers, and privileges.
          </p>
        </div>

        {notifications.length > 0 && (
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={handleMarkAllRead}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <CheckCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Mark All Read</span>
            </button>
            <button
              onClick={handleClearAll}
              className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        )}
      </div>

      {/* Notifications List */}
      {notifications.length === 0 ? (
        <div className="py-20 text-center glass-panel rounded-3xl border border-white/10 space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
            <Bell className="w-8 h-8" />
          </div>
          <p className="text-base font-bold text-white font-royal">No New Notifications</p>
          <p className="text-xs text-white/60">You are all caught up on royal dispatches and offers.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                markNotificationRead(n.id);
                if (n.link) navigate(n.link);
              }}
              className={`p-4 sm:p-5 rounded-2xl glass-panel border transition-all duration-300 cursor-pointer flex items-start justify-between gap-4 group ${
                !n.read ? 'border-amber-400/40 bg-amber-400/[0.04]' : 'border-white/10 opacity-75 hover:opacity-100'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  {getIcon(n.type)}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-white group-hover:text-amber-300 transition-colors">
                      {n.title}
                    </h4>
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                    )}
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed">{n.message}</p>
                  <span className="text-[10px] text-white/40 block pt-1">{n.time}</span>
                </div>
              </div>

              {n.link && (
                <div className="text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity self-center shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
