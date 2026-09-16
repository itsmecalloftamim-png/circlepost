import React, { useState } from 'react';
import { QUOTES } from '../data/quotes';
import { CATEGORIES } from '../data/categories';
import { QuoteItem } from '../types';
import { Search, Heart, Copy, Check, Sparkles, ArrowRight } from 'lucide-react';

interface QuotesViewProps {
  onUseQuote: (quote: QuoteItem) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export const QuotesView: React.FC<QuotesViewProps> = ({
  onUseQuote,
  favorites,
  onToggleFavorite,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredQuotes = QUOTES.filter((q) => {
    const matchesCategory =
      selectedCategory === 'all' || q.category === selectedCategory;

    const matchesSearch =
      !searchQuery ||
      q.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (q.author && q.author.toLowerCase().includes(searchQuery.toLowerCase())) ||
      q.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleCopyQuote = (q: QuoteItem) => {
    navigator.clipboard.writeText(q.text);
    setCopiedId(q.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div id="quotes-library-view" className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 sm:pb-6 border-b border-stone-200">
        <div>
          <div className="text-xs uppercase tracking-widest text-[#8b1e2a] font-cinzel font-semibold mb-1">
            ROMANTIC LITERATURE
          </div>
          <h2 className="text-2xl sm:text-3xl font-bengali-serif font-bold text-stone-900">
            প্রেমের উক্তি সম্ভার (Romantic Quotes)
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-anek mt-1">
            রবীন্দ্রনাথ, নজরুল, জীবনানন্দ এবং চিরায়ত রোমান্টিক কথামালার এক অনন্য সংগ্রহশালা।
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <input
            id="quotes-library-search"
            type="text"
            placeholder="উক্তি বা কবি খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-full border border-stone-300 bg-white text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-[#8b1e2a] font-anek shadow-xs"
          />
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
        </div>
      </div>

      {/* Category Pills */}
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
          সব উক্তি ({QUOTES.length})
        </button>

        {CATEGORIES.map((cat) => (
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
          </button>
        ))}
      </div>

      {/* Quotes Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredQuotes.map((quote) => {
          const isFav = favorites.includes(quote.id);
          const isCopied = copiedId === quote.id;

          return (
            <div
              key={quote.id}
              id={`quote-card-${quote.id}`}
              className="relative flex flex-col justify-between rounded-xl border border-stone-200 bg-white p-4 sm:p-6 transition-all duration-300 hover:border-[#8b1e2a]/40 hover:shadow-md space-y-4 shadow-xs"
            >
              {/* Category & Favorite Header */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 rounded-full border border-rose-200 bg-rose-50 px-2.5 py-0.5 text-[11px] font-anek text-[#8b1e2a]">
                  <span>{quote.category}</span>
                </span>

                <div className="flex items-center gap-1">
                  {/* Copy Button */}
                  <button
                    type="button"
                    onClick={() => handleCopyQuote(quote)}
                    className="p-1.5 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
                    title="উক্তিটি কপি করুন"
                  >
                    {isCopied ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>

                  {/* Favorite Button */}
                  <button
                    type="button"
                    onClick={() => onToggleFavorite(quote.id)}
                    className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                      isFav
                        ? 'text-[#8b1e2a] bg-rose-50'
                        : 'text-stone-400 hover:text-stone-700 hover:bg-stone-100'
                    }`}
                    title={isFav ? 'পছন্দ থেকে সরান' : 'পছন্দে রাখুন'}
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Quote Text */}
              <div className="my-auto py-2">
                <p className="text-base sm:text-lg font-bengali-serif text-stone-900 leading-relaxed italic">
                  “{quote.text}”
                </p>
                {quote.author && (
                  <p className="text-xs text-stone-600 font-anek mt-2 font-medium">
                    — {quote.author}
                  </p>
                )}
              </div>

              {/* Action Button: পোস্টকার্ডে ব্যবহার করুন */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[10px] text-stone-400 font-mono">
                  {quote.id.toUpperCase()}
                </span>

                <button
                  type="button"
                  onClick={() => onUseQuote(quote)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 hover:bg-[#8b1e2a] text-[#8b1e2a] hover:text-white border border-rose-200 hover:border-[#8b1e2a] text-xs font-bengali-serif font-semibold transition-all cursor-pointer shadow-xs"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>পোস্টকার্ডে ব্যবহার করুন</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
