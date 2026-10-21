import React, { useState } from 'react';
import {
  HelpCircle,
  Phone,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Send,
  CheckCircle2,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

const FAQS = [
  {
    q: 'How does AHA guarantee royal food quality?',
    a: 'Every restaurant on AHA is hand-vetted by our culinary guild. Food is freshly prepared per order using certified high-grade ingredients and dispatched in tamper-evident sealed royal warm-boxes.'
  },
  {
    q: 'Can I track my delivery partner in real-time?',
    a: 'Yes! Once your feast is prepared, our automated live tracking system displays GPS route progress, estimated time of arrival, and direct contact details for your delivery partner.'
  },
  {
    q: 'How do I cancel or modify my active order?',
    a: 'You may cancel your order from the live tracking page within the initial verification window before the kitchen starts preparation. For immediate modifications, our 24/7 concierge can be reached by phone.'
  },
  {
    q: 'What payment methods are supported?',
    a: 'We support AHA Royal Wallet, Instant UPI (Google Pay, PhonePe, Paytm), Visa, MasterCard, RuPay, Amex cards, Net Banking across all major banks, and Cash on Delivery.'
  },
  {
    q: 'How does the AHA Select membership work?',
    a: 'AHA Select offers exclusive privileges including complimentary delivery on all orders above ₹349, priority kitchen preparation, and dedicated royal concierge support.'
  }
];

const HelpPage = () => {
  const { showToast } = useToast();
  const [openFaqIdx, setOpenFaqIdx] = useState(0);

  const [ticket, setTicket] = useState({
    name: 'Arjun Verma',
    email: 'customer@aha.com',
    category: 'ORDER_QUERY',
    orderId: 'AHA-8921',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    if (!ticket.message.trim()) {
      showToast('Please enter your query details', 'error');
      return;
    }

    setSubmitted(true);
    showToast('Your concierge ticket #TCK-9902 has been received!', 'success');
  };

  return (
    <div className="space-y-10 max-w-4xl mx-auto pb-16">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
          <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
          <span>24/7 Royal Concierge Service</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-royal tracking-wide">
          How May We Assist You?
        </h1>
        <p className="text-sm text-white/60">
          Reach our dedicated dining concierge or browse answers to frequently asked questions.
        </p>
      </div>

      {/* Emergency Concierge Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-6 rounded-3xl glass-panel-gold border border-amber-400/30 flex items-center gap-4 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
            <Phone className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">Toll-Free Hotline</h3>
            <p className="text-xs text-white/50">Instant voice assistance</p>
            <a
              href="tel:180024276925"
              className="text-xs font-bold text-amber-300 hover:underline block mt-1"
            >
              +91 1800-AHA-ROYAL
            </a>
          </div>
        </div>

        <div className="p-6 rounded-3xl glass-panel border border-white/10 flex items-center gap-4 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">Concierge Response</h3>
            <p className="text-xs text-white/50">Average response time</p>
            <p className="text-xs font-bold text-purple-300 mt-1">Under 3 minutes</p>
          </div>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white font-royal flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Frequently Asked Inquiries</span>
        </h2>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl glass-panel border border-white/10 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIdx(isOpen ? -1 : idx)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4"
                >
                  <span className="font-bold text-sm text-white">{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-amber-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-white/40 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-white/70 leading-relaxed border-t border-white/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Submit Support Ticket Form */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 shadow-xl">
        <div>
          <h2 className="text-xl font-bold text-white font-royal flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-amber-400" />
            <span>Submit a Concierge Ticket</span>
          </h2>
          <p className="text-xs text-white/50 mt-1">
            Need resolution for an ongoing feast, refund, or corporate delivery?
          </p>
        </div>

        {submitted ? (
          <div className="p-8 text-center rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h3 className="text-base font-bold text-white">Ticket Submitted Successfully</h3>
            <p className="text-xs text-white/70 max-w-sm mx-auto">
              Ticket #TCK-9902 has been routed to our senior concierge duty officer. We will update you via SMS and notifications.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setTicket(prev => ({ ...prev, message: '' }));
              }}
              className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-semibold"
            >
              Submit Another Query
            </button>
          </div>
        ) : (
          <form onSubmit={handleTicketSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-white/80 block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={ticket.name}
                  onChange={(e) => setTicket({ ...ticket, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-white/80 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={ticket.email}
                  onChange={(e) => setTicket({ ...ticket, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-white/80 block mb-1">Query Subject Category</label>
                <select
                  value={ticket.category}
                  onChange={(e) => setTicket({ ...ticket, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#140828] text-white text-xs border border-white/15"
                >
                  <option value="ORDER_QUERY">Active Order Status or Delay</option>
                  <option value="QUALITY_ISSUE">Food Taste or Packaging Quality</option>
                  <option value="REFUND">Refund or Payment Discrepancy</option>
                  <option value="COUPON">Voucher / Promo Code Query</option>
                  <option value="OTHER">General Feedback</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-white/80 block mb-1">Related Order ID (Optional)</label>
                <input
                  type="text"
                  value={ticket.orderId}
                  onChange={(e) => setTicket({ ...ticket, orderId: e.target.value })}
                  placeholder="e.g. AHA-8921"
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-white/80 block mb-1">Message & Details *</label>
              <textarea
                rows={4}
                required
                value={ticket.message}
                onChange={(e) => setTicket({ ...ticket, message: e.target.value })}
                placeholder="Explain what occurred or how we can assist you..."
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl btn-royal-gold text-xs font-bold shadow flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Ticket</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default HelpPage;
