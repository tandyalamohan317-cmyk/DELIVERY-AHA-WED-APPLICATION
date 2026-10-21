import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Clock,
  RotateCcw,
  Star,
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Bike,
  Store
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { getStoredOrders, getStoredCatalog } from '../data/storage';

const OrderHistoryPage = () => {
  const { addItem } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [filterTab, setFilterTab] = useState('ALL'); // 'ALL' | 'ACTIVE' | 'DELIVERED'

  useEffect(() => {
    setOrders(getStoredOrders() || []);
  }, []);

  const filteredOrders = orders.filter((o) => {
    if (filterTab === 'ACTIVE') {
      return o.status !== 'DELIVERED' && o.status !== 'CANCELLED';
    }
    if (filterTab === 'DELIVERED') {
      return o.status === 'DELIVERED';
    }
    return true;
  });

  const handleReorder = (order) => {
    const catalog = getStoredCatalog();
    const rest = catalog.restaurants.find(r => r.id === order.restaurant?.id) || catalog.restaurants[0];

    (order.items || []).forEach((item) => {
      const foodItem = catalog.foods.find(f => f.id === item.foodId) || {
        id: item.foodId,
        name: item.name,
        price: item.unitPrice,
        isVeg: true
      };
      addItem(foodItem, rest, {
        selectedSize: item.selectedSize,
        selectedAddons: item.selectedAddons,
        quantity: item.quantity || 1
      });
    });

    showToast(`Items from order #${order.orderId || order.id} placed in cart!`, 'success');
    navigate('/cart');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'DELIVERED':
        return (
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Delivered
          </span>
        );
      case 'OUT_FOR_DELIVERY':
        return (
          <span className="px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30 flex items-center gap-1">
            <Bike className="w-3.5 h-3.5 animate-bounce" /> On the Way
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 animate-spin" /> In Preparation
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-royal uppercase tracking-widest text-amber-300 font-semibold flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-400" /> Dining History Ledger
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-royal mt-1">
            My Royal Orders
          </h1>
          <p className="text-xs sm:text-sm text-white/60 mt-1">
            Track live dispatches, review past feasts, and reorder signature dishes.
          </p>
        </div>

        <button
          onClick={() => navigate('/restaurants')}
          className="self-start sm:self-auto px-4 py-2 rounded-xl btn-royal-gold text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all"
        >
          Explore New Dishes
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3 text-xs">
        {[
          { key: 'ALL', label: 'All Orders' },
          { key: 'ACTIVE', label: 'Active Dispatches' },
          { key: 'DELIVERED', label: 'Delivered Feasts' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilterTab(tab.key)}
            className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
              filterTab === tab.key
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="py-20 text-center glass-panel rounded-3xl border border-white/10 space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <p className="text-base font-bold text-white font-royal">No Orders Found</p>
            <p className="text-xs text-white/60">You do not have any orders under this category.</p>
          </div>
          <button
            onClick={() => navigate('/restaurants')}
            className="px-5 py-2.5 rounded-xl btn-royal-gold text-xs font-bold shadow"
          >
            Order Your Royal Feast
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const orderId = order.orderId || order.id;
            const isActive = order.status !== 'DELIVERED' && order.status !== 'CANCELLED';

            return (
              <div
                key={orderId}
                onClick={() => navigate(`/orders/${orderId}`)}
                className="group cursor-pointer p-5 sm:p-6 rounded-3xl glass-panel border border-white/10 hover:border-amber-400/40 transition-all duration-300 space-y-4 shadow-lg hover:shadow-amber-500/5 relative"
              >
                {/* Header row: Restaurant, status, date */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
                      <Store className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-white group-hover:text-amber-300 transition-colors">
                        {order.restaurant?.name || 'Royal Hyderabadi Bawarchi'}
                      </h3>
                      <p className="text-xs text-white/50">
                        Order #{orderId} • {new Date(order.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-start sm:self-auto">
                    {getStatusBadge(order.status)}
                    <span className="font-mono font-extrabold text-white text-base">
                      ₹{order.pricing?.grandTotal}
                    </span>
                  </div>
                </div>

                {/* Items preview list */}
                <div className="space-y-1 text-xs text-white/75">
                  {(order.items || []).map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <span>{item.quantity}x {item.name}</span>
                      <span className="font-mono text-white/60">₹{item.unitPrice * item.quantity}</span>
                    </div>
                  ))}
                </div>

                {/* Footer Actions */}
                <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center gap-1.5 text-white/50">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span className="truncate max-w-xs">{order.deliveryAddress?.area || 'Banjara Hills'}, {order.deliveryAddress?.city || 'Hyderabad'}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isActive ? (
                      <button
                        onClick={() => navigate(`/orders/${orderId}/track`)}
                        className="px-4 py-2 rounded-xl btn-royal-gold text-xs font-bold shadow flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-all"
                      >
                        <Bike className="w-4 h-4" />
                        <span>Track Live</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleReorder(order)}
                        className="px-4 py-2 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-semibold flex items-center gap-1.5 transition-all"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reorder Feast</span>
                      </button>
                    )}

                    <button
                      onClick={() => navigate(`/orders/${orderId}`)}
                      className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold flex items-center gap-1 transition-all"
                    >
                      <span>Invoice</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;
