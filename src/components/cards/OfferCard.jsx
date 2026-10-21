import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tag, Copy, Check, Percent, Sparkles, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

const OfferCard = ({ offer }) => {
  const navigate = useNavigate();
  const { applyCoupon, coupon: activeCoupon, cartItems } = useCart();
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  const isCurrentActive = activeCoupon?.code === offer.code;

  const handleCopy = () => {
    navigator.clipboard.writeText(offer.code);
    setCopied(true);
    showToast(`Coupon code ${offer.code} copied to clipboard!`, 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApply = () => {
    const success = applyCoupon(offer.code);
    if (success && cartItems.length > 0) {
      navigate('/cart');
    }
  };

  return (
    <div
      className={`p-5 sm:p-6 rounded-3xl glass-panel-gold border transition-all duration-300 flex flex-col justify-between space-y-4 relative overflow-hidden shadow-xl ${
        isCurrentActive ? 'border-amber-400 shadow-gold-glow bg-amber-400/[0.08]' : 'border-amber-400/30 hover:border-amber-400/60'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30">
              {offer.discountPercent
                ? `${offer.discountPercent}% OFF`
                : offer.discountFlat
                ? `₹${offer.discountFlat} FLAT OFF`
                : 'FREE DELIVERY'}
            </span>
            {isCurrentActive && (
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-extrabold border border-emerald-500/30">
                ACTIVE IN CART
              </span>
            )}
          </div>
          <h4 className="text-base font-bold text-white mt-1 font-royal">{offer.title}</h4>
          <p className="text-xs text-white/70 leading-relaxed">{offer.description}</p>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center shrink-0 text-amber-400">
          <Percent className="w-6 h-6" />
        </div>
      </div>

      <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
        <div className="text-[11px] text-white/50">
          <span>Min order ₹{offer.minOrder || 0}</span>
          {offer.maxDiscount && <span> • Max ₹{offer.maxDiscount}</span>}
        </div>

        <div className="flex items-center gap-2">
          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition-all"
            title="Copy coupon code"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-amber-400" />
                <span>COPIED</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>{offer.code}</span>
              </>
            )}
          </button>

          {/* Apply Button */}
          <button
            onClick={handleApply}
            className="px-3.5 py-1.5 rounded-xl btn-royal-gold text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all"
          >
            {isCurrentActive ? 'Applied' : 'Apply'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
