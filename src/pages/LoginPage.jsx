import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Crown, Mail, Lock, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();

  const [email, setEmail] = useState('arjun@aha.com');
  const [password, setPassword] = useState('royalpass123');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const redirectPath = location.state?.from?.pathname || '/';

  const validate = () => {
    const errs = {};
    if (!email.trim() || !email.includes('@')) errs.email = 'Valid email is required';
    if (!password || password.length < 4) errs.password = 'Password must be at least 4 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      login(email, password);
      setLoading(false);
      navigate(redirectPath, { replace: true });
    }, 400);
  };

  const handleDemoLogin = () => {
    setEmail('arjun@aha.com');
    setPassword('royalpass123');
    login('arjun@aha.com', 'royalpass123');
    navigate(redirectPath, { replace: true });
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
            Sign In to AHA
          </h1>
          <p className="text-xs text-white/60">
            Enter your royal account to access orders, favorites, and wallet privileges.
          </p>
        </div>

        {/* Demo Fast Access Button */}
        <button
          type="button"
          onClick={handleDemoLogin}
          className="w-full p-3 rounded-2xl bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/40 text-amber-300 text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Quick 1-Click Demo Login</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-[11px] text-white/40 uppercase">Or sign in with email</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-white/80 block mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-3 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs ${errors.email ? 'border-rose-500' : ''}`}
              />
            </div>
            {errors.email && <p className="text-[10px] text-rose-400 mt-1">{errors.email}</p>}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-white/80">Password</label>
              <Link to="/forgot-password" className="text-[11px] text-amber-400 hover:underline">
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-white/40 absolute left-3.5 top-3 pointer-events-none" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
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
            <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-xs text-center text-white/60 pt-2 border-t border-white/10">
          New to AHA?{' '}
          <Link to="/register" className="text-amber-400 font-bold hover:underline">
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
