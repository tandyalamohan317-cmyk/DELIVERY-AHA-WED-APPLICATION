import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Crown, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!password || password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (password !== confirmPassword) errs.confirmPassword = 'Passwords do not match';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitted(true);
    showToast('Password updated successfully! Please sign in.', 'success');
    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full glass-panel-gold rounded-3xl p-6 sm:p-10 border border-amber-400/40 space-y-6 shadow-2xl relative animate-fade-in text-center">
        
        <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-gold-glow">
          <Crown className="w-6 h-6" />
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-royal">
            Set New Password
          </h1>
          <p className="text-xs text-white/60 mt-1">
            Choose a strong password to protect your royal AHA dining privileges.
          </p>
        </div>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h3 className="text-sm font-bold text-white">Password Reset Complete!</h3>
            <p className="text-xs text-white/70">Redirecting to login portal...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="text-xs font-semibold text-white/80 block mb-1">
                New Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-white/40 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs ${errors.password ? 'border-rose-500' : ''}`}
                />
              </div>
              {errors.password && <p className="text-[10px] text-rose-400 mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="text-xs font-semibold text-white/80 block mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-white/40 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs ${errors.confirmPassword ? 'border-rose-500' : ''}`}
                />
              </div>
              {errors.confirmPassword && <p className="text-[10px] text-rose-400 mt-1">{errors.confirmPassword}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl btn-royal-gold text-xs font-bold shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all"
            >
              <span>Update Password</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="pt-2 border-t border-white/10">
          <Link
            to="/login"
            className="text-xs text-white/60 hover:text-white inline-flex items-center gap-1.5"
          >
            <span>Back to Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
