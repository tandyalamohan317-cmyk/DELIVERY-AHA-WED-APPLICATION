import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Plus, ArrowLeft, Store, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { getStoredReviews, addStoredReview, getStoredCatalog } from '../data/storage';

const ReviewsPage = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const catalog = getStoredCatalog();

  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [restaurants] = useState(catalog.restaurants || []);

  const [newReview, setNewReview] = useState({
    restaurantId: catalog.restaurants[0]?.id || 'rest-1',
    restaurantName: catalog.restaurants[0]?.name || 'Royal Kitchen',
    rating: 5,
    comment: ''
  });

  useEffect(() => {
    setReviews(getStoredReviews());
  }, []);

  const handleRestaurantChange = (e) => {
    const selectedId = e.target.value;
    const found = restaurants.find(r => r.id === selectedId);
    setNewReview({
      ...newReview,
      restaurantId: selectedId,
      restaurantName: found?.name || 'Royal Kitchen'
    });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.comment.trim()) {
      showToast('Please share your comments in the review', 'error');
      return;
    }

    addStoredReview({
      ...newReview,
      userName: user?.name || 'Arjun Verma',
      userAvatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'
    });

    setReviews(getStoredReviews());
    setIsModalOpen(false);
    setNewReview(prev => ({ ...prev, comment: '', rating: 5 }));
    showToast('Your royal review has been published!', 'success');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <Link to="/profile" className="text-xs text-white/50 hover:text-white flex items-center gap-1 mb-2 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Profile
          </Link>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-royal">
            My Dining Reviews & Ratings
          </h1>
          <p className="text-xs sm:text-sm text-white/60">
            Reviews authored by you for royal dining establishments and culinary creations.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="self-start sm:self-auto px-5 py-2.5 rounded-2xl btn-royal-gold text-xs font-bold shadow-lg shadow-amber-500/20 flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Write a Review</span>
        </button>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="p-5 sm:p-6 rounded-3xl glass-panel border border-white/10 space-y-3 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Store className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-white">{rev.restaurantName}</h3>
                  <p className="text-xs text-white/50">{rev.date || 'Recently'}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 px-3 py-1 rounded-xl bg-amber-400/10 border border-amber-400/20">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-bold text-xs text-amber-300">{rev.rating}.0</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-white/80 leading-relaxed pt-1">
              "{rev.comment}"
            </p>
          </div>
        ))}
      </div>

      {/* Write Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="max-w-md w-full glass-panel-gold p-6 sm:p-8 rounded-3xl border border-amber-400/40 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-bold text-base text-white font-royal">
                Write a Royal Review
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-white/50 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-white/80 block mb-1">
                  Select Dining Establishment
                </label>
                <select
                  value={newReview.restaurantId}
                  onChange={handleRestaurantChange}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#140828] text-white text-xs border border-white/15"
                >
                  {restaurants.map(r => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-white/80 block mb-2 text-center">
                  Your Overall Rating
                </label>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating: s })}
                      className="p-1 transition-transform hover:scale-125"
                    >
                      <Star className={`w-7 h-7 ${s <= newReview.rating ? 'fill-amber-400 text-amber-400' : 'text-white/20'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-white/80 block mb-1">
                  Your Dining Experience
                </label>
                <textarea
                  rows={4}
                  required
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  placeholder="Describe the aroma, tenderness, spice balance, packaging, and service..."
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs text-white placeholder-white/30 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl btn-royal-gold text-xs font-bold shadow"
                >
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsPage;
