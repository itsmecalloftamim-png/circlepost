import React from 'react';
import { PostcardTemplate } from '../types';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';

interface PostcardCardProps {
  template: PostcardTemplate;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelect: (template: PostcardTemplate) => void;
}

export const PostcardCard: React.FC<PostcardCardProps> = ({
  template,
  isFavorite,
  onToggleFavorite,
  onSelect,
}) => {
  return (
    <div
      id={`postcard-card-${template.id}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-stone-200 bg-white shadow-xs transition-all duration-300 hover:border-stone-300 hover:shadow-md hover:-translate-y-1"
    >
      {/* Visual Artwork Thumbnail with Stamp Accent */}
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-stone-100">
        <img
          src={template.image}
          alt={template.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95 contrast-100"
        />

        {/* Vintage Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-black/20 pointer-events-none" />

        {/* Category Pill */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center gap-1 rounded-full border border-white/40 bg-white/90 px-2.5 py-0.5 text-[11px] font-anek font-semibold text-stone-800 backdrop-blur-md shadow-xs">
            <span>{template.theme.stampIcon || '💌'}</span>
            <span>{template.category}</span>
          </span>
        </div>

        {/* Favorite Icon */}
        <button
          id={`fav-button-${template.id}`}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(template.id);
          }}
          className={`absolute top-2.5 right-2.5 z-10 p-1.5 rounded-full backdrop-blur-md transition-all cursor-pointer ${
            isFavorite
              ? 'bg-[#8b1e2a] text-white shadow-xs scale-105'
              : 'bg-white/80 text-stone-700 hover:text-stone-900 hover:bg-white shadow-xs'
          }`}
          aria-label={isFavorite ? 'পছন্দ থেকে সরান' : 'পছন্দে যোগ করুন'}
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Mini Stamp Badge in Artwork Corner */}
        <div className="absolute bottom-2 right-2 z-10 w-8 h-10 rounded-[2px] bg-[#f7f2e4] text-[#8b1e2a] border border-[#3e3024] p-0.5 flex flex-col items-center justify-center opacity-90 shadow-xs">
          <span className="text-xs">{template.theme.stampIcon || '💌'}</span>
          <span className="text-[5px] font-cinzel font-bold text-[#36271c]">POST</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col justify-between p-3.5 sm:p-4 space-y-3">
        <div>
          <h4 className="text-sm sm:text-base font-bengali-serif font-bold text-stone-900 group-hover:text-[#8b1e2a] transition-colors line-clamp-1">
            {template.title}
          </h4>
          <p className="mt-1 text-xs text-stone-600 font-anek line-clamp-2 leading-relaxed italic">
            “{template.defaultQuote}”
          </p>
        </div>

        {/* Action Button: ব্যবহার করুন */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
          <span className="text-[10px] text-stone-400 font-cinzel tracking-wider uppercase">
            {template.id.toUpperCase()}
          </span>

          <button
            id={`use-template-${template.id}`}
            type="button"
            onClick={() => onSelect(template)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 hover:bg-[#8b1e2a] text-[#8b1e2a] hover:text-white border border-rose-200 hover:border-[#8b1e2a] text-xs font-bengali-serif font-semibold transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            <span>ব্যবহার করুন</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
