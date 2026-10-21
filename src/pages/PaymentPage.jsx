import React, { useState, useEffect } from 'react';
import { useLocation as useRouteLocation, useNavigate } from 'react-router-dom';
import {
  CreditCard,
  Wallet,
  CheckCircle2,
  Lock,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Banknote,
  Smartphone,
  Building2,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { addStoredOrder, getStoredAddresses } from '../data/storage';

const PaymentPage = () => {
  const routeLocation = useRouteLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, restaurant, totals, clearCart } = useCart();
  const { showToast } = useToast();

  const passedState = routeLocation.state || {};
  const [selectedAddress] = useState(() => {
    if (passedState.address) return passedState.address;
    const addrs = getStoredAddresses();
    return addrs.find(a => a.isDefault) || addrs[0] || { title: 'Home', fullName: 'Customer', street: 'Royal Residency', area: 'Banjara Hills', city: 'Hyderabad' };
  });

  const [paymentMethod, setPaymentMethod] = useState('UPI'); // 'WALLET' | 'UPI' | 'CARD' | 'NETBANKING' | 'COD'
  const [upiOption, setUpiOption] = useState('gpay');
  const [upiId, setUpiId] = useState('');
  const [cardData, setCardData] = useState({
    number: '4532 •••• •••• 8892',
    name: user?.name || 'Arjun Verma',
    expiry: '08/29',
    cvv: '•••'
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  const handlePayNow = () => {
    if (paymentMethod === 'UPI' && upiOption === 'id' && !upiId.trim()) {
      showToast('Please enter a valid UPI ID', 'error');
      return;
    }

    setIsProcessing(true);
    setProcessingStep('Connecting to AHA Royal Payment Gateway...');

    setTimeout(() => {
      setProcessingStep('Authorizing 256-Bit Bank Handshake...');
    }, 900);

    setTimeout(() => {
      setProcessingStep('Payment authorized! Generating your royal feast order...');

      const orderPayload = {
        restaurant: {
          id: restaurant?.id || 'rest-1',
          name: restaurant?.name || 'Royal Kitchen',
          coverImage: restaurant?.coverImage,
          address: restaurant?.address
        },
        deliveryAddress: selectedAddress,
        deliverySlot: passedState.slot || 'Within 25-30 mins',
        instructions: passedState.deliveryInstructions || '',
        items: cartItems.map(i => ({
          foodId: i.foodId,
          name: i.name,
          unitPrice: i.unitPrice,
          quantity: i.quantity,
          selectedSize: i.selectedSize,
          selectedAddons: i.selectedAddons
        })),
        pricing: {
          subtotal: totals.subtotal,
          deliveryFee: totals.deliveryFee,
          tax: totals.taxes,
          platformFee: totals.platformFee,
          discount: totals.couponDiscount,
          grandTotal: totals.grandTotal
        },
        paymentMethod: paymentMethod === 'COD' ? 'CASH_ON_DELIVERY' : paymentMethod,
        paymentStatus: paymentMethod === 'COD' ? 'PENDING' : 'COMPLETED',
        estimatedDeliveryTime: 'Within 25-30 mins'
      };

      const createdOrder = addStoredOrder(orderPayload);
      clearCart();
      setIsProcessing(false);
      navigate(`/order-success/${createdOrder.orderId}`);
    }, 2200);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16">
      
      {/* Stepper */}
      <div className="flex items-center justify-between max-w-md mx-auto px-4">
        <div className="flex flex-col items-center gap-1.5 text-emerald-400">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 font-bold flex items-center justify-center text-xs">
            ✓
          </div>
          <span className="text-[11px] font-semibold">Address</span>
        </div>

        <div className="flex-1 h-0.5 bg-amber-400 mx-3" />

        <div className="flex flex-col items-center gap-1.5 text-amber-400">
          <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 font-bold flex items-center justify-center text-xs shadow-gold-glow">
            2
          </div>
          <span className="text-[11px] font-bold">Payment</span>
        </div>

        <div className="flex-1 h-0.5 bg-white/20 mx-3" />

        <div className="flex flex-col items-center gap-1.5 text-white/50">
          <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 text-white font-bold flex items-center justify-center text-xs">
            3
          </div>
          <span className="text-[11px] font-medium">Confirmation</span>
        </div>
      </div>

      {/* Main Payment Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Payment Method Selection (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" /> 256-Bit Bank-Grade Encrypted
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-royal">
                  Select Payment Option
                </h2>
              </div>
            </div>

            {/* Methods List */}
            <div className="space-y-3">
              
              {/* Option 1: AHA Royal Gold Wallet */}
              <div
                onClick={() => setPaymentMethod('WALLET')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  paymentMethod === 'WALLET'
                    ? 'bg-amber-400/15 border-amber-400 shadow-gold-glow'
                    : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-white">AHA Royal Wallet</h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-bold">1-Click Fast</span>
                    </div>
                    <p className="text-xs text-white/60">Balance: <strong className="text-amber-300">₹{user?.walletBalance || 750}</strong></p>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'WALLET' ? 'border-amber-400 bg-amber-400' : 'border-white/30'}`}>
                  {paymentMethod === 'WALLET' && <div className="w-2 h-2 rounded-full bg-slate-950" />}
                </div>
              </div>

              {/* Option 2: Instant UPI */}
              <div
                onClick={() => setPaymentMethod('UPI')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-3 ${
                  paymentMethod === 'UPI'
                    ? 'bg-amber-400/15 border-amber-400 shadow-gold-glow'
                    : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">UPI (Google Pay, PhonePe, Paytm)</h4>
                      <p className="text-xs text-white/60">Zero processing fee</p>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'UPI' ? 'border-amber-400 bg-amber-400' : 'border-white/30'}`}>
                    {paymentMethod === 'UPI' && <div className="w-2 h-2 rounded-full bg-slate-950" />}
                  </div>
                </div>

                {paymentMethod === 'UPI' && (
                  <div className="pt-2 border-t border-white/10 space-y-3" onClick={(e) => e.stopPropagation()}>
                    <div className="grid grid-cols-3 gap-2">
                      {['gpay', 'phonepe', 'paytm'].map((app) => (
                        <button
                          key={app}
                          type="button"
                          onClick={() => setUpiOption(app)}
                          className={`py-2 px-3 rounded-xl border text-xs font-bold uppercase transition-all ${
                            upiOption === app ? 'bg-amber-400 text-slate-950 border-amber-400' : 'bg-white/5 border-white/10 text-white/70'
                          }`}
                        >
                          {app === 'gpay' ? 'Google Pay' : app === 'phonepe' ? 'PhonePe' : 'Paytm'}
                        </button>
                      ))}
                    </div>

                    <div>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => { setUpiId(e.target.value); setUpiOption('id'); }}
                        placeholder="Or enter UPI ID (e.g. arjun@okhdfcbank)"
                        className="w-full px-3.5 py-2 rounded-xl glass-input text-xs text-white placeholder-white/40 focus:outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Option 3: Credit / Debit Card */}
              <div
                onClick={() => setPaymentMethod('CARD')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-3 ${
                  paymentMethod === 'CARD'
                    ? 'bg-amber-400/15 border-amber-400 shadow-gold-glow'
                    : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">Credit & Debit Cards</h4>
                      <p className="text-xs text-white/60">Visa, Mastercard, RuPay, Amex</p>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'CARD' ? 'border-amber-400 bg-amber-400' : 'border-white/30'}`}>
                    {paymentMethod === 'CARD' && <div className="w-2 h-2 rounded-full bg-slate-950" />}
                  </div>
                </div>

                {paymentMethod === 'CARD' && (
                  <div className="pt-2 border-t border-white/10 space-y-3" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="text"
                      value={cardData.number}
                      onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                      placeholder="Card Number"
                      className="w-full px-3.5 py-2 rounded-xl glass-input text-xs"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={cardData.expiry}
                        onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                        placeholder="MM/YY"
                        className="w-full px-3.5 py-2 rounded-xl glass-input text-xs"
                      />
                      <input
                        type="password"
                        value={cardData.cvv}
                        onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                        placeholder="CVV"
                        className="w-full px-3.5 py-2 rounded-xl glass-input text-xs"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Option 4: Cash On Delivery */}
              <div
                onClick={() => setPaymentMethod('COD')}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  paymentMethod === 'COD'
                    ? 'bg-amber-400/15 border-amber-400 shadow-gold-glow'
                    : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-300">
                    <Banknote className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">Cash on Delivery (COD)</h4>
                    <p className="text-xs text-white/60">Pay cash or scan QR upon doorstep delivery</p>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'COD' ? 'border-amber-400 bg-amber-400' : 'border-white/30'}`}>
                  {paymentMethod === 'COD' && <div className="w-2 h-2 rounded-full bg-slate-950" />}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Summary & Pay CTA (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel-gold p-6 rounded-3xl border border-amber-400/30 space-y-4 shadow-2xl">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Payment Breakdown</h3>

            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
              <p className="text-[10px] text-white/50 uppercase font-semibold">Delivering To</p>
              <p className="text-xs font-bold text-white">{selectedAddress?.title} • {selectedAddress?.fullName}</p>
              <p className="text-xs text-white/60 line-clamp-1">{selectedAddress?.flatNo}, {selectedAddress?.street}, {selectedAddress?.area}</p>
            </div>

            <div className="space-y-2 text-xs text-white/70 pt-2 border-t border-white/10">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="text-white">₹{totals.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery & Platform</span>
                <span className="text-white">₹{totals.deliveryFee + totals.platformFee}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes & Packaging</span>
                <span className="text-white">₹{totals.taxes + totals.packagingFee}</span>
              </div>
              {totals.couponDiscount > 0 && (
                <div className="flex justify-between text-amber-400 font-bold">
                  <span>Royal Voucher Savings</span>
                  <span>-₹{totals.couponDiscount}</span>
                </div>
              )}
              <div className="pt-3 border-t border-white/10 flex justify-between text-lg font-extrabold text-white">
                <span>Total Due</span>
                <span className="text-amber-300 font-mono">₹{totals.grandTotal}</span>
              </div>
            </div>

            {/* Pay Now Button */}
            <button
              onClick={handlePayNow}
              disabled={isProcessing}
              className="w-full py-4 px-6 rounded-2xl btn-royal-gold text-sm font-bold shadow-xl shadow-amber-500/25 flex items-center justify-between hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50"
            >
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold text-slate-900/70 block">Pay Now</span>
                <span className="text-base font-extrabold">₹{totals.grandTotal}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>Complete Feast Order</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-white/10 flex items-center gap-3 text-xs text-white/60">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <p>100% Safe & Secure payment processed through AHA Royal Vault.</p>
          </div>
        </div>
      </div>

      {/* Payment Processing Modal Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
          <div className="max-w-md w-full glass-panel-gold p-8 rounded-3xl border border-amber-400/40 text-center space-y-6 shadow-2xl animate-fade-in">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 animate-spin">
              <Sparkles className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white font-royal">Processing Payment</h3>
              <p className="text-xs text-amber-300 font-mono">{processingStep}</p>
              <p className="text-[11px] text-white/50 pt-2">Please do not refresh or hit the back button.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
