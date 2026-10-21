import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, Camera, Save, RotateCcw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
];

const ProfileEditPage = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: user?.name || 'Arjun Verma',
    email: user?.email || 'arjun@aha.com',
    phone: user?.phone || '+91 98765 43210',
    avatar: user?.avatar || AVATARS[0],
    bio: user?.bio || 'Epicurean connoisseur of dum cooking, aged saffron, and royal street feasts.'
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Please correct form errors', 'error');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      updateProfile(formData);
      setLoading(false);
      navigate('/profile');
    }, 400);
  };

  const handleReset = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      avatar: user?.avatar || AVATARS[0],
      bio: user?.bio || ''
    });
    setErrors({});
    showToast('Reset to saved values', 'info');
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto pb-16">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between text-xs text-white/60">
        <Link to="/profile" className="flex items-center gap-1.5 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Profile</span>
        </Link>
        <span className="text-amber-400 font-semibold">Editing Profile</span>
      </div>

      <div className="glass-panel-gold rounded-3xl p-6 sm:p-10 border border-amber-400/30 space-y-8 shadow-2xl">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-royal">
            Edit Royal Profile
          </h1>
          <p className="text-xs sm:text-sm text-white/60 mt-1">
            Update your dining persona, contact details, and avatar.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Avatar Selector */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-white uppercase tracking-wider block">
              Profile Avatar
            </label>
            <div className="flex items-center gap-4 flex-wrap">
              <img
                src={formData.avatar}
                alt="Selected avatar"
                className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-400 shadow-gold-glow"
              />
              <div className="flex gap-2 flex-wrap">
                {AVATARS.map((url, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setFormData({ ...formData, avatar: url })}
                    className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all ${
                      formData.avatar === url ? 'border-amber-400 scale-105 shadow-md' : 'border-white/10 hover:border-white/30 opacity-70'
                    }`}
                  >
                    <img src={url} alt={`Avatar ${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-white/80 block mb-1">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-xl glass-input text-xs ${errors.name ? 'border-rose-500' : ''}`}
              />
              {errors.name && <p className="text-[10px] text-rose-400 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="text-xs font-semibold text-white/80 block mb-1">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-xl glass-input text-xs ${errors.email ? 'border-rose-500' : ''}`}
              />
              {errors.email && <p className="text-[10px] text-rose-400 mt-1">{errors.email}</p>}
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-white/80 block mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-xl glass-input text-xs ${errors.phone ? 'border-rose-500' : ''}`}
              />
              {errors.phone && <p className="text-[10px] text-rose-400 mt-1">{errors.phone}</p>}
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-white/80 block mb-1">
                Culinary Bio & Foodie Notes
              </label>
              <textarea
                rows={3}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 text-xs font-semibold flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => navigate('/profile')}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 rounded-xl btn-royal-gold text-xs font-bold shadow flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>{loading ? 'Saving...' : 'Save Profile'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditPage;
