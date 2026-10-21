import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Crown, Search, ArrowRight, Sparkles } from 'lucide-react';
import { getStoredCatalog } from '../data/storage';
import CategoryCard from '../components/cards/CategoryCard';

const CategoriesPage = () => {
  const navigate = useNavigate();
  const catalog = getStoredCatalog();
  const [search, setSearch] = useState('');

  const filteredCategories = catalog.categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    (c.description || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-10 max-w-7xl mx-auto pb-16">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
          <Crown className="w-3.5 h-3.5 text-amber-400" />
          <span>Royal Culinary Traditions</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-royal tracking-wide">
          Explore Cuisines & Feasts
        </h1>
        <p className="text-xs sm:text-sm text-white/60">
          From slow-cooked charcoal dum biryanis to Deccan tiffins and artisanal royal mithai.
        </p>

        {/* Search */}
        <div className="pt-2 max-w-md mx-auto">
          <div className="p-2 rounded-2xl glass-panel border border-white/10 flex items-center gap-3">
            <Search className="w-4 h-4 text-amber-400 ml-2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search cuisines (e.g. Biryani, South Indian, Rolls)..."
              className="flex-1 bg-transparent text-white placeholder-white/40 text-xs focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCategories.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
