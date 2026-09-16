import React, { useState } from 'react';
import { POSTCARD_TEMPLATES } from '../data/postcards';
import { QUOTES } from '../data/quotes';
import { VINTAGE_GALLERY } from '../data/gallery';
import { PostcardTemplate, QuoteItem, GalleryItem } from '../types';
import { PostcardCard } from '../components/PostcardCard';
import { Heart, Sparkles, Copy, Check, ArrowRight } from 'lucide-react';

interface FavoritesViewProps {
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectTemplate: (template: PostcardTemplate) => void;
  onUseQuote: (quote: QuoteItem) => void;
  onNavigateHome: () => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  favorites,
  onToggleFavorite,
  onSelectTemplate,
  onUseQuote,
  onNavigateHome,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'postcards' | 'quotes' | 'gallery'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const favoriteTemplates = POSTCARD_TEMPLATES.filter((t) => favorites.includes(t.id));
  const favoriteQuotes = QUOTES.filter((q) => favorites.includes(q.id));
  const favoriteGallery = VINTAGE_GALLERY.filter((g) => favorites.includes(g.id));

  const totalFavorites = favoriteTemplates.length + favoriteQuotes.length + favoriteGallery.length;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div id="favorites-view" className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 sm:pb-6 border-b border-stone-200">
        <div>
          <div className="text-xs uppercase tracking-widest text-[#8b1e2a] font-cinzel font-semibold mb-1">
            SAVED COLLECTION
          </div>
          <h2 className="text-2xl sm:text-3xl font-bengali-serif font-bold text-stone-900 flex items-center gap-2">
            <span>♡ আমার পছন্দ ({totalFavorites})</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-anek mt-1">
            আপনার পছন্দের সংরক্ষিত পোস্টকার্ড, রোমান্টিক উক্তি ও আর্টওয়ার্কের তালিকা।
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 p-1 rounded-full bg-stone-100 border border-stone-200 overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1 rounded-full text-xs font-anek font-medium whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#8b1e2a] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            সব ({totalFavorites})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('postcards')}
            className={`px-3 py-1 rounded-full text-xs font-anek font-medium whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'postcards'
                ? 'bg-[#8b1e2a] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            পোস্টকার্ড ({favoriteTemplates.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('quotes')}
            className={`px-3 py-1 rounded-full text-xs font-anek font-medium whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'quotes'
                ? 'bg-[#8b1e2a] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            উক্তি ({favoriteQuotes.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('gallery')}
            className={`px-3 py-1 rounded-full text-xs font-anek font-medium whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'gallery'
                ? 'bg-[#8b1e2a] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            গ্যালারি ({favoriteGallery.length})
          </button>
        </div>
      </div>

      {totalFavorites === 0 ? (
        <div className="p-8 sm:p-16 text-center rounded-2xl border border-stone-200 bg-white space-y-4 shadow-xs">
          <div className="w-14 h-14 rounded-full bg-rose-50 text-[#8b1e2a] mx-auto flex items-center justify-center border border-rose-200">
            <Heart className="w-7 h-7" />
          </div>
          <h3 className="text-lg sm:text-xl font-bengali-serif font-bold text-stone-900">
            আপনার পছন্দের তালিকা এখনো খালি
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 font-anek max-w-md mx-auto leading-relaxed">
            হোমপেজ, পোস্টকার্ড সম্ভার বা উক্তি ব্রাউজ করার সময় হার্ট আইকন ক্লিক করে আপনার পছন্দের সংগ্রহশালা গড়ে তুলুন।
          </p>
          <button
            type="button"
            onClick={onNavigateHome}
            className="mt-2 inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-gradient-to-r from-[#8b1e2a] to-[#a82333] hover:from-[#9c2230] hover:to-[#bd273a] text-white font-bengali-serif text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer"
          >
            <span>ব্রাউজ শুরু করুন</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="space-y-8 sm:space-y-12">
          {/* Postcards Section */}
          {(activeTab === 'all' || activeTab === 'postcards') && favoriteTemplates.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bengali-serif font-bold text-stone-900 flex items-center gap-2">
                <span>💌 পছন্দের পোস্টকার্ড ({favoriteTemplates.length})</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {favoriteTemplates.map((template) => (
                  <PostcardCard
                    key={template.id}
                    template={template}
                    isFavorite={true}
                    onToggleFavorite={onToggleFavorite}
                    onSelect={onSelectTemplate}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quotes Section */}
          {(activeTab === 'all' || activeTab === 'quotes') && favoriteQuotes.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bengali-serif font-bold text-stone-900 flex items-center gap-2">
                <span>📜 পছন্দের উক্তি ({favoriteQuotes.length})</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {favoriteQuotes.map((quote) => (
                  <div
                    key={quote.id}
                    className="flex flex-col justify-between p-4 sm:p-5 rounded-xl border border-stone-200 bg-white space-y-4 shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-anek text-[#8b1e2a] bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full">
                        {quote.category}
                      </span>
                      <button
                        type="button"
                        onClick={() => onToggleFavorite(quote.id)}
                        className="text-[#8b1e2a] hover:opacity-80 cursor-pointer"
                      >
                        <Heart className="w-4 h-4 fill-current" />
                      </button>
                    </div>

                    <p className="text-sm sm:text-base font-bengali-serif text-stone-900 italic leading-relaxed">
                      “{quote.text}”
                    </p>

                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => handleCopy(quote.text, quote.id)}
                        className="text-xs text-stone-600 hover:text-stone-900 flex items-center gap-1 font-anek cursor-pointer"
                      >
                        {copiedId === quote.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span>{copiedId === quote.id ? 'কপি হয়েছে' : 'কপি করুন'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onUseQuote(quote)}
                        className="px-3 py-1 rounded-full bg-rose-50 hover:bg-[#8b1e2a] text-[#8b1e2a] hover:text-white border border-rose-200 text-xs font-bengali-serif flex items-center gap-1 cursor-pointer transition-all shadow-xs"
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>ব্যবহার করুন</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gallery Section */}
          {(activeTab === 'all' || activeTab === 'gallery') && favoriteGallery.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bengali-serif font-bold text-stone-900 flex items-center gap-2">
                <span>🖼️ পছন্দের গ্যালারি আর্ট ({favoriteGallery.length})</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {favoriteGallery.map((item) => (
                  <div
                    key={item.id}
                    className="relative aspect-[4/5] rounded-xl overflow-hidden border border-stone-200 bg-stone-100 shadow-xs"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover filter brightness-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 p-3 sm:p-4 flex flex-col justify-between">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-anek bg-white/90 text-stone-800 px-2.5 py-0.5 rounded-full border border-stone-200">
                          {item.category}
                        </span>
                        <button
                          type="button"
                          onClick={() => onToggleFavorite(item.id)}
                          className="text-white p-1 cursor-pointer"
                        >
                          <Heart className="w-4 h-4 fill-[#8b1e2a] text-[#8b1e2a]" />
                        </button>
                      </div>

                      <div className="text-center p-2 rounded-lg bg-black/60 border border-white/20 backdrop-blur-sm">
                        <p className="text-xs font-bengali-serif text-white italic line-clamp-2">
                          “{item.quote}”
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
