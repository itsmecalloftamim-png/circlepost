import React, { useState } from 'react';
import { POSTCARD_TEMPLATES } from '../data/postcards';
import { CATEGORIES } from '../data/categories';
import { PostcardTemplate } from '../types';
import { PostcardCard } from '../components/PostcardCard';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';

interface PostcardsViewProps {
  initialCategory?: string;
  onSelectTemplate: (template: PostcardTemplate) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export const PostcardsView: React.FC<PostcardsViewProps> = ({
  initialCategory,
  onSelectTemplate,
  favorites,
  onToggleFavorite,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredTemplates = POSTCARD_TEMPLATES.filter((t) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      t.category === selectedCategory ||
      (selectedCategory === 'featured' && (t.featured || t.isNew));

    const matchesSearch =
      !searchQuery ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.defaultQuote.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div id="postcards-library-view" className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 sm:pb-6 border-b border-stone-200">
        <div>
          <div className="text-xs uppercase tracking-widest text-[#8b1e2a] font-cinzel font-semibold mb-1">
            ARCHIVE REPOSITORY
          </div>
          <h2 className="text-2xl sm:text-3xl font-bengali-serif font-bold text-stone-900">
            পোস্টকার্ড সম্ভার (Postcard Library)
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-anek mt-1">
            পছন্দের ভিন্টেজ পোস্টকার্ড ডিজাইন বেছে নিন এবং আপনার নিজস্ব প্রেমপত্র তৈরি করুন।
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <input
            id="postcards-library-search"
            type="text"
            placeholder="পোস্টকার্ড বা অনুভূতি খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-full border border-stone-300 bg-white text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-[#8b1e2a] font-anek shadow-xs"
          />
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
        </div>
      </div>

      {/* Category Filter Bar */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          type="button"
          onClick={() => setSelectedCategory('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-anek font-medium whitespace-nowrap transition-all cursor-pointer ${
            selectedCategory === 'all'
              ? 'bg-[#8b1e2a] text-white shadow-xs'
              : 'bg-stone-100 border border-stone-200 text-stone-700 hover:text-stone-900 hover:bg-stone-200/80'
          }`}
        >
          সবগুলো ({POSTCARD_TEMPLATES.length})
        </button>

        {CATEGORIES.map((cat) => {
          const count = POSTCARD_TEMPLATES.filter((t) => t.category === cat.name).length;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-3 py-1.5 rounded-full text-xs font-anek font-medium whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedCategory === cat.name
                  ? 'bg-[#8b1e2a] text-white shadow-xs'
                  : 'bg-stone-100 border border-stone-200 text-stone-700 hover:text-stone-900 hover:bg-stone-200/80'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
              {count > 0 && <span className="text-[10px] opacity-75">({count})</span>}
            </button>
          );
        })}
      </div>

      {/* Templates Grid */}
      {filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredTemplates.map((template) => (
            <PostcardCard
              key={template.id}
              template={template}
              isFavorite={favorites.includes(template.id)}
              onToggleFavorite={onToggleFavorite}
              onSelect={onSelectTemplate}
            />
          ))}
        </div>
      ) : (
        <div className="p-8 sm:p-12 text-center rounded-2xl border border-stone-200 bg-white space-y-3 shadow-xs">
          <span className="text-4xl">🔍</span>
          <h4 className="text-lg font-bengali-serif font-bold text-stone-900">
            কোনো পোস্টকার্ড খুঁজে পাওয়া যায়নি
          </h4>
          <p className="text-xs sm:text-sm text-stone-600 font-anek max-w-sm mx-auto">
            আপনার অনুসন্ধানের সাথে মিল পাওয়া যায়নি। অন্য কোনো নাম বা ক্যাটাগরি দিয়ে চেষ্টা করুন।
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="mt-2 px-4 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 text-xs font-bengali-serif transition-all cursor-pointer"
          >
            ফিল্টার রিসেট করুন
          </button>
        </div>
      )}
    </div>
  );
};
