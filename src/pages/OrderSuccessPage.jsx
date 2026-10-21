import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  CheckCircle2,
  Clock,
  MapPin,
  Bike,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Store,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { getStoredOrderById } from '../data/storage';

const OrderSuccessPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Confetti celebration
    try {
      confetti({
        particleCount: 110,
        spread: 75,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.error(e);
    }

    const found = getStoredOrderById(orderId);
    if (found) {
      setOrder(found);
    }
  }, [orderId]);

  return (
    <div className="space-y-8 max-w-3xl mx-auto pb-16 pt-4">
      
      {/* Celebration Header Card */}
      <div className="glass-panel-gold rounded-3xl sm:rounded-[36px] p-8 sm:p-10 border border-amber-400/40 text-center space-y-6 shadow-2xl relative overflow-hidden">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400 shadow-lg">
          <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Feast Placed Successfully</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-royal tracking-wide">
            Order Confirmed!
          </h1>
          <p className="text-sm text-white/70 max-w-md mx-auto">
            Your royal culinary experience is being prepared with utmost care and fresh ingredients.
          </p>
        </div>

        {/* Order Details Chip */}
        <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col sm:flex-row items-center justify-around gap-4 text-xs">
          <div>
            <span className="text-white/50 block text-[11px]">Order Identifier</span>
            <span className="font-mono font-extrabold text-amber-300 text-sm">#{orderId}</span>
          </div>
          <div className="hidden sm:block w-px h-8 bg-white/10" />
          <div>
            <span className="text-white/50 block text-[11px]">Estimated Arrival</span>
            <span className="font-bold text-white text-sm flex items-center gap-1 justify-center sm:justify-start">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{order?.estimatedDeliveryTime || 'Within 25-30 mins'}</span>
            </span>
          </div>
          <div className="hidden sm:block w-px h-8 bg-white/10" />
          <div>
            <span className="text-white/50 block text-[11px]">Payment Mode</span>
            <span className="font-bold text-white text-sm">{order?.paymentMethod || 'UPI (Completed)'}</span>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate(`/orders/${orderId}/track`)}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl btn-royal-gold text-xs font-bold shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all"
          >
            <Bike className="w-4 h-4" />
            <span>Track Order Live</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => navigate(`/orders/${orderId}`)}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all"
          >
            <FileText className="w-4 h-4 text-amber-400" />
            <span>View Receipt & Invoice</span>
          </button>
        </div>
      </div>

      {/* Items Summary Card */}
      {order && (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Store className="w-4 h-4 text-amber-400" />
              <h3 className="font-bold text-sm text-white">{order.restaurant?.name || 'Royal Kitchen'}</h3>
            </div>
            <span className="text-xs text-amber-400 font-mono font-bold">Total Paid: ₹{order.pricing?.grandTotal}</span>
          </div>

          <div className="space-y-2 text-xs">
            {(order.items || []).map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-white/80">
                <span>{item.quantity}x {item.name} {item.selectedSize?.name ? `(${item.selectedSize.name})` : ''}</span>
                <span className="font-mono text-white font-medium">₹{item.unitPrice * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex items-start gap-2.5 text-xs text-white/60">
            <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p>Delivering to: <strong className="text-white">{order.deliveryAddress?.flatNo}, {order.deliveryAddress?.street}, {order.deliveryAddress?.area}</strong></p>
          </div>
        </div>
      )}

      {/* Explore More Footer Link */}
      <div className="text-center pt-2">
        <Link
          to="/restaurants"
          className="text-xs text-amber-400 hover:text-amber-300 font-semibold inline-flex items-center gap-1.5"
        >
          <span>Continue Shopping & Browse Restaurants</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
