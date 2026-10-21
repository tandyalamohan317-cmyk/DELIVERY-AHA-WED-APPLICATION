import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/categories/${category.id}`)}
      className="group cursor-pointer rounded-3xl glass-card overflow-hidden border border-white/10 hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between shadow-lg hover:shadow-amber-500/10 hover:-translate-y-1 relative"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/categories/${category.id}`); }}
    >
      {/* Image */}
      <div className="relative h-36 sm:h-40 w-full overflow-hidden bg-slate-900">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E061E] via-transparent to-black/30" />
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-1">
        <div>
          <h4 className="font-bold text-base text-white font-royal group-hover:text-amber-300 transition-colors">
            {category.name}
          </h4>
          <p className="text-xs text-white/50 line-clamp-1 mt-0.5">
            {category.description}
          </p>
        </div>

        <div className="pt-2 flex items-center justify-between text-xs font-semibold text-amber-400">
          <span>Explore Menu</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
