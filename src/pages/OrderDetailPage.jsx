import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  MapPin,
  Bike,
  Store,
  CheckCircle2,
  Download,
  RotateCcw,
  Star,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { getStoredOrderById, getStoredCatalog } from '../data/storage';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const OrderDetailPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { showToast } = useToast();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    const found = getStoredOrderById(orderId);
    if (found) {
      setOrder(found);
    }
  }, [orderId]);

  if (!order) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 text-center px-4">
        <p className="text-white/70">Order #{orderId} not found.</p>
        <button
          onClick={() => navigate('/orders')}
          className="px-5 py-2.5 rounded-xl btn-royal-gold text-xs font-bold"
        >
          View All Orders
        </button>
      </div>
    );
  }

  const handleReorder = () => {
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

    showToast(`Items from order #${orderId} added to cart!`, 'success');
    navigate('/cart');
  };

  const handleDownloadInvoice = () => {
    showToast(`Generating official receipt for order #${orderId}...`, 'info');
    setTimeout(() => {
      showToast(`Invoice #${orderId}.pdf downloaded successfully.`, 'success');
    }, 1200);
  };

  const isActive = order.status !== 'DELIVERED' && order.status !== 'CANCELLED';

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16">
      
      {/* Top Navigation */}
      <div className="flex items-center justify-between text-xs text-white/60">
        <button
          onClick={() => navigate('/orders')}
          className="flex items-center gap-1.5 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Orders</span>
        </button>

        <div className="flex items-center gap-2">
          <span>Order Placed:</span>
          <span className="text-white font-medium">
            {new Date(order.createdAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
          </span>
        </div>
      </div>

      {/* Main Invoice Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 space-y-8 shadow-2xl">
        
        {/* Header: Title & Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest block">
              Official Feast Invoice
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-royal mt-0.5">
              Order #{order.orderId || order.id}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-full bg-amber-400/20 text-amber-300 font-bold text-xs border border-amber-400/40">
              {order.status?.replace(/_/g, ' ')}
            </span>

            {isActive ? (
              <button
                onClick={() => navigate(`/orders/${orderId}/track`)}
                className="px-4 py-2 rounded-xl btn-royal-gold text-xs font-bold shadow flex items-center gap-1.5"
              >
                <Bike className="w-4 h-4" />
                <span>Track Live</span>
              </button>
            ) : (
              <button
                onClick={handleReorder}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reorder Feast</span>
              </button>
            )}
          </div>
        </div>

        {/* Restaurant & Delivery Locations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <Store className="w-4 h-4" />
              <span>Restaurant Kitchen</span>
            </div>
            <h3 className="font-bold text-white text-sm">{order.restaurant?.name || 'Royal Kitchen'}</h3>
            <p className="text-xs text-white/50">{order.restaurant?.address || 'Hyderabad City'}</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
              <MapPin className="w-4 h-4" />
              <span>Delivery Destination</span>
            </div>
            <h3 className="font-bold text-white text-sm">{order.deliveryAddress?.fullName || 'Customer'}</h3>
            <p className="text-xs text-white/50">{order.deliveryAddress?.flatNo}, {order.deliveryAddress?.street}, {order.deliveryAddress?.area}</p>
          </div>
        </div>

        {/* Ordered Items Table */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Ordered Items</h3>
          <div className="divide-y divide-white/5 rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden">
            {(order.items || []).map((item, idx) => (
              <div key={idx} className="p-4 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-white">{item.quantity}x {item.name}</h4>
                  {item.selectedSize?.name && (
                    <p className="text-[11px] text-amber-300/80">{item.selectedSize.name}</p>
                  )}
                  {item.selectedAddons && item.selectedAddons.length > 0 && (
                    <p className="text-[10px] text-white/40">+ {item.selectedAddons.map(a => a.name).join(', ')}</p>
                  )}
                </div>
                <span className="font-mono font-bold text-white text-sm">
                  ₹{item.unitPrice * item.quantity}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Price Breakdown */}
        <div className="p-5 rounded-2xl glass-card border border-white/10 space-y-3 text-xs">
          <h3 className="font-bold text-white uppercase tracking-wider text-xs">Financial Receipt</h3>
          <div className="space-y-2 text-white/70">
            <div className="flex justify-between">
              <span>Item Total</span>
              <span className="text-white">₹{order.pricing?.subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charges</span>
              <span className="text-white">₹{order.pricing?.deliveryFee}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes & GST</span>
              <span className="text-white">₹{order.pricing?.tax}</span>
            </div>
            <div className="flex justify-between">
              <span>Packaging & Platform</span>
              <span className="text-white">₹{order.pricing?.platformFee || 10}</span>
            </div>
            {order.pricing?.discount > 0 && (
              <div className="flex justify-between text-amber-400 font-bold">
                <span>Voucher Discount</span>
                <span>-₹{order.pricing.discount}</span>
              </div>
            )}
            <div className="pt-3 border-t border-white/10 flex justify-between text-base font-extrabold text-white">
              <span>Total Paid ({order.paymentMethod || 'UPI'})</span>
              <span className="text-amber-300 font-mono">₹{order.pricing?.grandTotal}</span>
            </div>
          </div>
        </div>

        {/* Action Row */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handleDownloadInvoice}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold flex items-center gap-2 transition-all"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>Download Official PDF Receipt</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/profile/reviews')}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold flex items-center gap-1.5"
            >
              <Star className="w-4 h-4 text-amber-400" />
              <span>Rate Feast</span>
            </button>

            <button
              onClick={() => navigate('/help')}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold"
            >
              Need Concierge Help?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
