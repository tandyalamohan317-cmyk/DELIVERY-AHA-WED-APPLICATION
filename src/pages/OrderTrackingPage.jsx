import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  CheckCircle2,
  Clock,
  Bike,
  Store,
  Phone,
  ShieldCheck,
  Star,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  MapPin,
  Play,
  Check
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { getStoredOrderById, updateStoredOrderStatus, addStoredReview } from '../data/storage';

const STATUS_STEPS = [
  { key: 'PLACED', label: 'Order Placed', desc: 'Received & verified by AHA Royal Vault' },
  { key: 'CONFIRMED', label: 'Restaurant Accepted', desc: 'Accepted by master bawarchi' },
  { key: 'PREPARING', label: 'Food Preparing', desc: 'Slow cooking & aromatics blending' },
  { key: 'READY_FOR_PICKUP', label: 'Food Ready', desc: 'Packed in tamper-proof gold heatbox' },
  { key: 'PICKED_UP', label: 'Picked Up', desc: 'Dispatched from kitchen' },
  { key: 'OUT_FOR_DELIVERY', label: 'On the Way', desc: 'Partner en route to your doorstep' },
  { key: 'DELIVERED', label: 'Delivered', desc: 'Enjoy your royal feast!' }
];

const OrderTrackingPage = () => {
  const { orderId } = useParams();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Review Modal State
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [restaurantRating, setRestaurantRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  useEffect(() => {
    const found = getStoredOrderById(orderId);
    if (found) {
      setOrder(found);
    }
    setLoading(false);
  }, [orderId]);

  // Automatic status progression simulator (every 9 seconds if not delivered)
  useEffect(() => {
    if (!order || order.status === 'DELIVERED' || order.status === 'CANCELLED') return;

    const sequence = ['PLACED', 'CONFIRMED', 'PREPARING', 'READY_FOR_PICKUP', 'PICKED_UP', 'OUT_FOR_DELIVERY', 'DELIVERED'];
    const currentIdx = sequence.indexOf(order.status);

    if (currentIdx > -1 && currentIdx < sequence.length - 1) {
      const timer = setTimeout(() => {
        const nextStatus = sequence[currentIdx + 1];
        const updated = updateStoredOrderStatus(orderId, nextStatus);
        if (updated) {
          setOrder(updated);
          showToast(`Order status updated: ${nextStatus.replace(/_/g, ' ')}!`, 'info');
        }
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [order, orderId, showToast]);

  const advanceStatusManually = () => {
    const sequence = ['PLACED', 'CONFIRMED', 'PREPARING', 'READY_FOR_PICKUP', 'PICKED_UP', 'OUT_FOR_DELIVERY', 'DELIVERED'];
    const currentIdx = sequence.indexOf(order?.status || 'PLACED');
    if (currentIdx < sequence.length - 1) {
      const nextStatus = sequence[currentIdx + 1];
      const updated = updateStoredOrderStatus(orderId, nextStatus);
      if (updated) {
        setOrder(updated);
        showToast(`Advanced to: ${nextStatus.replace(/_/g, ' ')}`, 'success');
      }
    } else {
      showToast('Order is already delivered!', 'info');
    }
  };

  const handleCallPartner = () => {
    showToast(`Calling delivery partner ${order?.deliveryPartner?.name || 'Ravi Kumar'} at ${order?.deliveryPartner?.phone || '+91 99887 66554'}...`, 'info');
  };

  const handleMessageSupport = () => {
    navigate('/help');
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    addStoredReview({
      restaurantId: order?.restaurant?.id || 'rest-1',
      restaurantName: order?.restaurant?.name || 'Royal Kitchen',
      userName: order?.deliveryAddress?.fullName || 'Arjun Verma',
      rating: restaurantRating,
      comment: reviewComment || 'Exquisite royal meal, steaming hot and impeccably packed!'
    });
    setIsReviewOpen(false);
    showToast('Your royal review has been published!', 'success');
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 text-center px-4">
        <p className="text-white/70">Order #{orderId} not found.</p>
        <button
          onClick={() => navigate('/orders')}
          className="px-5 py-2.5 rounded-xl btn-royal-gold text-xs font-bold"
        >
          Back to Orders
        </button>
      </div>
    );
  }

  const sequence = ['PLACED', 'CONFIRMED', 'PREPARING', 'READY_FOR_PICKUP', 'PICKED_UP', 'OUT_FOR_DELIVERY', 'DELIVERED'];
  const currentStepIdx = sequence.indexOf(order.status);

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between text-xs text-white/60">
        <button
          onClick={() => navigate('/orders')}
          className="flex items-center gap-1.5 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>My Orders</span>
        </button>

        <div className="flex items-center gap-2">
          {order.status !== 'DELIVERED' && (
            <button
              onClick={advanceStatusManually}
              className="px-3 py-1.5 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/40 text-xs font-bold flex items-center gap-1.5 transition-all shadow"
              title="Fast-forward simulation stage"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Simulate Next Step</span>
            </button>
          )}

          <Link
            to={`/orders/${orderId}`}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold"
          >
            Invoice Details
          </Link>
        </div>
      </div>

      {/* Main Tracker Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Status Progression & Timeline (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel-gold rounded-3xl p-6 sm:p-8 border border-amber-400/30 space-y-6 shadow-2xl">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
              <div>
                <span className="text-[11px] font-bold text-amber-300 uppercase tracking-widest block">
                  Live Dispatch Pulse
                </span>
                <h1 className="text-xl sm:text-2xl font-bold text-white font-royal mt-0.5">
                  Order #{orderId}
                </h1>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-extrabold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{order.status === 'DELIVERED' ? 'Delivered' : 'ETA 20-25 Mins'}</span>
                </span>
              </div>
            </div>

            {/* Timeline Steps */}
            <div className="space-y-6 relative pl-2">
              <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-white/10" />

              {STATUS_STEPS.map((step, idx) => {
                const isPassed = currentStepIdx >= idx;
                const isCurrent = currentStepIdx === idx;

                return (
                  <div key={step.key} className="flex items-start gap-4 relative z-10">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all shrink-0 ${
                        isCurrent
                          ? 'bg-amber-400 text-slate-950 shadow-gold-glow ring-4 ring-amber-400/20 animate-pulse'
                          : isPassed
                          ? 'bg-emerald-500 text-white shadow'
                          : 'bg-[#150c2a] text-white/40 border border-white/15'
                      }`}
                    >
                      {isPassed && !isCurrent ? (
                        <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                      ) : (
                        idx + 1
                      )}
                    </div>

                    <div className="flex-1 space-y-0.5">
                      <div className="flex items-center justify-between">
                        <h4 className={`text-sm font-bold ${isCurrent ? 'text-amber-300' : isPassed ? 'text-white' : 'text-white/40'}`}>
                          {step.label}
                        </h4>
                        {isPassed && (
                          <span className="text-[10px] text-white/40 font-mono">
                            {idx === 0 ? 'Verified' : idx === 6 ? 'Delivered' : 'Completed'}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-white/50">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* If Delivered CTA */}
            {order.status === 'DELIVERED' && (
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-xs text-emerald-300 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Feast safely delivered. Bon Appétit!</span>
                </p>
                <button
                  onClick={() => setIsReviewOpen(true)}
                  className="px-4 py-2 rounded-xl btn-royal-gold text-xs font-bold shadow flex items-center gap-1.5"
                >
                  <Star className="w-3.5 h-3.5" />
                  <span>Rate Experience</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: Driver Card & Live Route Map (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Driver Contact Card */}
          <div className="glass-panel p-5 rounded-3xl border border-white/10 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider">
                Assigned Delivery Partner
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{order.deliveryPartner?.rating || 4.9}</span>
              </span>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-300 shrink-0">
                <Bike className="w-6 h-6" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-sm text-white">{order.deliveryPartner?.name || 'Ravi Kumar'}</h4>
                <p className="text-xs text-white/50">{order.deliveryPartner?.vehicleNumber || 'TS 09 EZ 7788'}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCallPartner}
                  className="p-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg transition-transform active:scale-95 shrink-0"
                  title="Call Partner"
                >
                  <Phone className="w-4 h-4" />
                </button>
                <button
                  onClick={handleMessageSupport}
                  className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                  title="Support chat"
                >
                  <MessageSquare className="w-4 h-4 text-amber-400" />
                </button>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-2.5 text-xs text-white/60">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Sanitized thermal box & vaccination verified.</span>
            </div>
          </div>

          {/* Simulated Live Route Map View */}
          <div className="glass-panel rounded-3xl p-5 border border-white/10 space-y-3 shadow-xl">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-white">Live Route Navigation</span>
              <span className="text-amber-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                GPS Active
              </span>
            </div>

            <div className="h-48 rounded-2xl bg-[#0b051c] border border-white/10 relative overflow-hidden flex items-center justify-center">
              {/* Map grid lines */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]" />
              
              {/* Restaurant Node */}
              <div className="absolute left-8 top-12 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-lg">
                  <Store className="w-4 h-4" />
                </div>
                <span className="text-[10px] text-white/70 font-semibold mt-1">Kitchen</span>
              </div>

              {/* Animated Path */}
              <div className="w-48 h-0.5 bg-gradient-to-r from-purple-500 via-amber-400 to-emerald-400 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-gold-glow animate-bounce">
                  <Bike className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Customer Node */}
              <div className="absolute right-8 bottom-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-[10px] text-white/70 font-semibold mt-1">You</span>
              </div>
            </div>

            <p className="text-[11px] text-white/50 text-center">
              {order.status === 'DELIVERED'
                ? 'Feast has arrived safely at your destination.'
                : order.status === 'OUT_FOR_DELIVERY'
                ? 'Partner is approaching your building gate.'
                : 'Kitchen is packing your hot meal.'}
            </p>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {isReviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="max-w-md w-full glass-panel-gold p-6 sm:p-8 rounded-3xl border border-amber-400/40 space-y-5 shadow-2xl">
            <div className="text-center space-y-1">
              <h3 className="text-xl font-bold text-white font-royal">Rate Your Feast</h3>
              <p className="text-xs text-white/60">Share your culinary rating for this order</p>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-white/80 block mb-2 text-center">
                  Restaurant Quality Rating
                </label>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRestaurantRating(s)}
                      className="p-1.5 transition-transform hover:scale-125"
                    >
                      <Star className={`w-6 h-6 ${s <= restaurantRating ? 'fill-amber-400 text-amber-400' : 'text-white/20'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-white/70 block mb-1">
                  Your Feedback
                </label>
                <textarea
                  rows={3}
                  required
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="The flavors, aroma, packaging, and delivery speed..."
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white placeholder-white/30 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsReviewOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl btn-royal-gold text-xs font-bold shadow"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTrackingPage;
