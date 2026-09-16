import React from 'react';
import { CATEGORIES } from '../data/categories';
import { POSTCARD_TEMPLATES } from '../data/postcards';
import { ArrowRight } from 'lucide-react';

interface CategoriesViewProps {
  onSelectCategory: (categoryName: string) => void;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({ onSelectCategory }) => {
  return (
    <div id="categories-view" className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="pb-4 sm:pb-6 border-b border-stone-200">
        <div className="text-xs uppercase tracking-widest text-[#8b1e2a] font-cinzel font-semibold mb-1">
          DISCOVER ALL MOODS
        </div>
        <h2 className="text-2xl sm:text-3xl font-bengali-serif font-bold text-stone-900">
          ক্যাটাগরি সমূহ (Categories)
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 font-anek mt-1">
          আপনার মনের অনুভূতির সাথে মানানসই সেরা ভিন্টেজ পোস্টকার্ড থিম বেছে নিন।
        </p>
      </div>

      {/* Grid of Categories with rich details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {CATEGORIES.map((cat) => {
          const matchingPostcards = POSTCARD_TEMPLATES.filter((t) => t.category === cat.name);
          const sampleImage = matchingPostcards[0]?.image || POSTCARD_TEMPLATES[0].image;

          return (
            <div
              key={cat.id}
              id={`category-full-card-${cat.id}`}
              onClick={() => onSelectCategory(cat.name)}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-stone-200 bg-white shadow-xs transition-all duration-300 hover:border-[#8b1e2a]/40 hover:shadow-md cursor-pointer"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-100">
                <img
                  src={sampleImage}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 text-3xl drop-shadow-md">
                  {cat.icon}
                </div>
                <div className="absolute bottom-2 right-3 text-[11px] font-mono text-white bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-sm">
                  {matchingPostcards.length} টি পোস্টকার্ড
                </div>
              </div>

              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h3 className="text-base font-bengali-serif font-bold text-stone-900 group-hover:text-[#8b1e2a] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-stone-600 font-anek mt-1 leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs font-anek font-medium text-[#8b1e2a]">
                  <span>পোস্টকার্ডগুলো দেখুন</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
