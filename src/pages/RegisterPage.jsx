import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Crown, Mail, Lock, User, Phone, ArrowRight, Gift } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email is required';
    if (!formData.phone.trim() || formData.phone.length < 10) errs.phone = '10-digit mobile number required';
    if (!formData.password || formData.password.length < 6) errs.password = 'Password must be at least 6 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      register(formData);
      setLoading(false);
      navigate('/', { replace: true });
    }, 400);
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full glass-panel-gold rounded-3xl p-6 sm:p-10 border border-amber-400/40 space-y-6 shadow-2xl relative animate-fade-in">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-gold-glow">
            <Crown className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-royal">
            Join AHA Royal Dining
          </h1>
          <p className="text-xs text-white/60">
            Create an account to unlock exclusive chef curations and voucher privileges.
          </p>
        </div>

        {/* Bonus Callout */}
        <div className="p-3 rounded-2xl bg-amber-400/15 border border-amber-400/30 flex items-center gap-3 text-xs text-amber-300">
          <Gift className="w-5 h-5 text-amber-400 shrink-0" />
          <span>Complimentary ₹200 bonus credited into your AHA Wallet on sign-up!</span>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-white/80 block mb-1">
              Full Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-white/40 absolute left-3.5 top-3 pointer-events-none" />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Sravan Kumar"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs ${errors.name ? 'border-rose-500' : ''}`}
              />
            </div>
            {errors.name && <p className="text-[10px] text-rose-400 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="text-xs font-semibold text-white/80 block mb-1">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-3 pointer-events-none" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@example.com"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs ${errors.email ? 'border-rose-500' : ''}`}
              />
            </div>
            {errors.email && <p className="text-[10px] text-rose-400 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="text-xs font-semibold text-white/80 block mb-1">
              Mobile Number *
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-white/40 absolute left-3.5 top-3 pointer-events-none" />
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs ${errors.phone ? 'border-rose-500' : ''}`}
              />
            </div>
            {errors.phone && <p className="text-[10px] text-rose-400 mt-1">{errors.phone}</p>}
          </div>

          <div>
            <label className="text-xs font-semibold text-white/80 block mb-1">
              Create Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-white/40 absolute left-3.5 top-3 pointer-events-none" />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Minimum 6 characters"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs ${errors.password ? 'border-rose-500' : ''}`}
              />
            </div>
            {errors.password && <p className="text-[10px] text-rose-400 mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl btn-royal-gold text-xs font-bold shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50"
          >
            <span>{loading ? 'Creating Membership...' : 'Create Royal Membership'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-xs text-center text-white/60 pt-2 border-t border-white/10">
          Already a Member?{' '}
          <Link to="/login" className="text-amber-400 font-bold hover:underline">
            Sign In Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
