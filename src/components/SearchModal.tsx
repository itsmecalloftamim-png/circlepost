import React, { useState, useEffect } from 'react';
import { POSTCARD_TEMPLATES } from '../data/postcards';
import { QUOTES } from '../data/quotes';
import { VINTAGE_GALLERY } from '../data/gallery';
import { CATEGORIES } from '../data/categories';
import { PostcardTemplate, QuoteItem, GalleryItem } from '../types';
import { Search, X, Sparkles, ArrowRight, Heart } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: PostcardTemplate) => void;
  onUseQuote: (quote: QuoteItem) => void;
  onSelectCategory: (catName: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectTemplate,
  onUseQuote,
  onSelectCategory,
}) => {
  const [query, setQuery] = useState('');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  const matchingCategories = CATEGORIES.filter(
    (c) => q && (c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q))
  );

  const matchingPostcards = POSTCARD_TEMPLATES.filter(
    (t) =>
      q &&
      (t.title.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.defaultQuote.toLowerCase().includes(q))
  );

  const matchingQuotes = QUOTES.filter(
    (qt) =>
      q &&
      (qt.text.toLowerCase().includes(q) ||
        qt.category.toLowerCase().includes(q) ||
        (qt.author && qt.author.toLowerCase().includes(q)))
  );

  const matchingGallery = VINTAGE_GALLERY.filter(
    (g) =>
      q &&
      (g.title.toLowerCase().includes(q) ||
        g.category.toLowerCase().includes(q) ||
        g.quote.toLowerCase().includes(q))
  );

  const totalResults =
    matchingCategories.length +
    matchingPostcards.length +
    matchingQuotes.length +
    matchingGallery.length;

  return (
    <div
      id="global-search-modal-backdrop"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="global-search-modal-content"
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-2xl text-stone-900"
      >
        {/* Search Input Header */}
        <div className="relative flex items-center border-b border-stone-200 px-4 py-3.5 bg-[#faf9f6]">
          <Search className="w-5 h-5 text-[#8b1e2a] mr-3 shrink-0" />
          <input
            id="global-search-query-input"
            type="text"
            autoFocus
            placeholder="উক্তি বা পোস্টকার্ড খুঁজুন... (যেমন: বৃষ্টি, প্রেম, চিঠি, রবীন্দ্রনাথ)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-base sm:text-lg text-stone-900 placeholder-stone-400 focus:outline-none font-anek"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded text-stone-400 hover:text-stone-700 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 rounded bg-stone-200 text-stone-700 hover:text-stone-950 text-xs font-mono font-medium"
          >
            ESC
          </button>
        </div>

        {/* Quick Suggestion Pills when query is empty */}
        {!q && (
          <div className="p-6 space-y-3">
            <div className="text-xs uppercase tracking-widest text-[#8b1e2a] font-cinzel font-semibold">
              জনপ্রিয় অনুসন্ধান:
            </div>
            <div className="flex flex-wrap gap-2">
              {['বৃষ্টি', 'প্রেমপত্র', 'বিরহ', 'হুমায়ূন', 'রবীন্দ্রনাথ', 'জোছনা', 'গোলাপ', 'Anniversary'].map(
                (term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 rounded-lg border border-stone-200 bg-stone-50 text-xs font-anek text-stone-700 hover:text-stone-950 hover:bg-stone-100 hover:border-stone-300 transition-colors cursor-pointer"
                  >
                    #{term}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* Search Results */}
        {q && (
          <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-6">
            {totalResults === 0 ? (
              <div className="py-8 text-center text-sm text-stone-500 font-anek">
                “{query}” দিয়ে কিছু পাওয়া যায়নি। অন্য শব্দ দিয়ে খুঁজে দেখুন।
              </div>
            ) : (
              <>
                {/* Categories Match */}
                {matchingCategories.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-xs uppercase tracking-widest text-[#8b1e2a] font-cinzel font-semibold">
                      ক্যাটাগরি ({matchingCategories.length})
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {matchingCategories.map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => {
                            onSelectCategory(c.name);
                            onClose();
                          }}
                          className="px-3 py-1.5 rounded-lg bg-stone-50 border border-stone-200 hover:border-[#8b1e2a] hover:bg-stone-100 text-xs font-bengali-serif text-stone-800 flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>{c.icon}</span>
                          <span>{c.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Postcards Match */}
                {matchingPostcards.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-xs uppercase tracking-widest text-[#8b1e2a] font-cinzel font-semibold">
                      পোস্টকার্ড ডিজাইন ({matchingPostcards.length})
                    </div>
                    <div className="space-y-2">
                      {matchingPostcards.slice(0, 4).map((t) => (
                        <div
                          key={t.id}
                          onClick={() => {
                            onSelectTemplate(t);
                            onClose();
                          }}
                          className="flex items-center gap-3 p-2.5 rounded-lg border border-stone-200 bg-stone-50 hover:border-stone-300 hover:bg-stone-100 transition-all cursor-pointer"
                        >
                          <img
                            src={t.image}
                            alt={t.title}
                            className="w-14 h-10 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bengali-serif font-bold text-stone-900 truncate">
                              {t.title}
                            </h4>
                            <p className="text-[11px] text-stone-600 font-anek truncate italic">
                              “{t.defaultQuote}”
                            </p>
                          </div>
                          <span className="text-xs text-[#8b1e2a] font-anek font-semibold flex items-center gap-1 shrink-0">
                            <span>ব্যবহার করুন</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quotes Match */}
                {matchingQuotes.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-xs uppercase tracking-widest text-[#8b1e2a] font-cinzel font-semibold">
                      রোমান্টিক উক্তি ({matchingQuotes.length})
                    </div>
                    <div className="space-y-2">
                      {matchingQuotes.slice(0, 4).map((qt) => (
                        <div
                          key={qt.id}
                          onClick={() => {
                            onUseQuote(qt);
                            onClose();
                          }}
                          className="p-3 rounded-lg border border-stone-200 bg-stone-50 hover:border-stone-300 hover:bg-stone-100 transition-all cursor-pointer space-y-1"
                        >
                          <p className="text-xs font-bengali-serif text-stone-900 italic leading-relaxed">
                            “{qt.text}”
                          </p>
                          <div className="flex justify-between items-center text-[10px] text-stone-600 font-anek">
                            <span>{qt.author} · {qt.category}</span>
                            <span className="text-[#8b1e2a] font-semibold underline">পোস্টকার্ডে ব্যবহার করুন →</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Gallery Match */}
                {matchingGallery.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-xs uppercase tracking-widest text-[#8b1e2a] font-cinzel font-semibold">
                      গ্যালারি আর্টওয়ার্ক ({matchingGallery.length})
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {matchingGallery.slice(0, 4).map((g) => (
                        <div
                          key={g.id}
                          className="p-2 rounded-lg border border-stone-200 bg-stone-50 flex items-center gap-2"
                        >
                          <img
                            src={g.image}
                            alt={g.title}
                            className="w-10 h-10 object-cover rounded"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-bengali-serif font-bold text-stone-900 truncate">
                              {g.title}
                            </div>
                            <div className="text-[10px] text-stone-500 font-anek truncate">
                              {g.category}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
