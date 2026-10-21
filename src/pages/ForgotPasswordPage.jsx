import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Crown, Mail, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }

    setSubmitted(true);
    showToast('Password reset link sent to your email!', 'success');
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full glass-panel-gold rounded-3xl p-6 sm:p-10 border border-amber-400/40 space-y-6 shadow-2xl relative animate-fade-in text-center">
        
        <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-gold-glow">
          <Crown className="w-6 h-6" />
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-royal">
            Forgot Password?
          </h1>
          <p className="text-xs text-white/60 mt-1">
            Enter your registered email and we'll send instructions to reset your royal access.
          </p>
        </div>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-4">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <p className="text-xs text-white/80 leading-relaxed">
              We have dispatched a secure recovery code to <strong className="text-white">{email}</strong>.
            </p>
            <button
              onClick={() => navigate('/reset-password')}
              className="w-full py-3 rounded-xl btn-royal-gold text-xs font-bold shadow flex items-center justify-center gap-2"
            >
              <span>Continue to Set New Password</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="text-xs font-semibold text-white/80 block mb-1">
                Registered Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl btn-royal-gold text-xs font-bold shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all"
            >
              <span>Send Recovery Instructions</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="pt-2 border-t border-white/10">
          <Link
            to="/login"
            className="text-xs text-white/60 hover:text-white inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
