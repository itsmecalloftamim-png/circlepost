import React, { useState } from 'react';
import { VINTAGE_GALLERY } from '../data/gallery';
import { GalleryItem } from '../types';
import { DownloadGateModal } from '../components/DownloadGateModal';
import { Download, Heart, Eye, X, Sparkles, Search } from 'lucide-react';

interface GalleryViewProps {
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({
  favorites,
  onToggleFavorite,
}) => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [downloadTarget, setDownloadTarget] = useState<GalleryItem | null>(null);
  const [isDownloadGateOpen, setIsDownloadGateOpen] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['all', 'Vintage Love', 'স্মৃতি', 'Bengali Vintage', 'বৃষ্টি', 'রাতের অনুভূতি', 'রোমান্টিক', 'প্রেমপত্র', 'মিস করা', 'Classic Vintage', 'Anniversary'];

  const filteredItems = VINTAGE_GALLERY.filter((item) => {
    const matchesCat = filterCategory === 'all' || item.category === filterCategory;
    const matchesSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.quote.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleStartDownload = (item: GalleryItem) => {
    setDownloadTarget(item);
    setIsDownloadGateOpen(true);
  };

  const handleConfirmDownload = async (format: 'png' | 'jpg') => {
    if (!downloadTarget) return;
    setIsDownloading(true);

    try {
      // Fetch image and trigger download
      const response = await fetch(downloadTarget.image, { mode: 'cors' });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${downloadTarget.id}-${downloadTarget.title.replace(/\s+/g, '-').toLowerCase()}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setIsDownloadGateOpen(false);
      setDownloadTarget(null);
    } catch {
      // Direct fallback
      window.open(downloadTarget.image, '_blank');
      setIsDownloadGateOpen(false);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div id="vintage-gallery-view" className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 sm:pb-6 border-b border-stone-200">
        <div>
          <div className="text-xs uppercase tracking-widest text-[#8b1e2a] font-cinzel font-semibold mb-1">
            CURATED ART COLLECTION
          </div>
          <h2 className="text-2xl sm:text-3xl font-bengali-serif font-bold text-stone-900">
            🖼️ Vintage Quote Gallery
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-anek mt-1">
            প্রস্তুতকৃত অনন্য ভিন্টেজ আর্টওয়ার্ক এবং সাহিত্যিক প্রেমের চিত্রশিল্প। সরাসরি দেখুন ও ডাউনলোড করুন।
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <input
            id="gallery-search-input"
            type="text"
            placeholder="গ্যালারি আর্ট খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-full border border-stone-300 bg-white text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-[#8b1e2a] font-anek shadow-xs"
          />
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilterCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-anek font-medium whitespace-nowrap transition-all cursor-pointer ${
              filterCategory === cat
                ? 'bg-[#8b1e2a] text-white shadow-xs'
                : 'bg-stone-100 border border-stone-200 text-stone-700 hover:text-stone-900 hover:bg-stone-200/80'
            }`}
          >
            {cat === 'all' ? 'সব আর্টওয়ার্ক' : cat}
          </button>
        ))}
      </div>

      {/* Gallery Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {filteredItems.map((item) => {
          const isFav = favorites.includes(item.id);

          return (
            <div
              key={item.id}
              id={`gallery-item-${item.id}`}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-stone-200 bg-white shadow-xs transition-all duration-300 hover:border-[#8b1e2a]/40 hover:shadow-md"
            >
              {/* Artwork Container */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-100">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
                />

                {/* Aged Parchment Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30 pointer-events-none" />

                {/* Top Corner Details */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/90 border border-stone-200 text-[10px] font-anek text-stone-800 backdrop-blur-sm shadow-xs">
                    {item.category}
                  </span>
                </div>

                {/* Favorite Button */}
                <button
                  type="button"
                  onClick={() => onToggleFavorite(item.id)}
                  className={`absolute top-3 right-3 z-10 p-1.5 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                    isFav
                      ? 'bg-[#8b1e2a] text-white shadow-xs'
                      : 'bg-white/80 text-stone-600 hover:text-stone-900'
                  }`}
                  aria-label="পছন্দ"
                >
                  <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                </button>

                {/* Embedded Quote Artwork in card center */}
                <div className="absolute inset-x-4 sm:inset-x-6 top-1/2 -translate-y-1/2 text-center pointer-events-none z-10">
                  <div className="p-3 sm:p-4 rounded-lg bg-black/40 border border-white/20 backdrop-blur-[2px]">
                    <p className="text-xs sm:text-sm font-bengali-serif text-white font-medium leading-relaxed italic drop-shadow-md">
                      “{item.quote}”
                    </p>
                    {item.author && (
                      <p className="text-[10px] sm:text-[11px] text-stone-200 font-cinzel mt-1.5 uppercase tracking-wider">
                        — {item.author}
                      </p>
                    )}
                  </div>
                </div>

                {/* Quick View Overlay on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 z-20">
                  <button
                    type="button"
                    onClick={() => setSelectedItem(item)}
                    className="p-2.5 rounded-full bg-white text-stone-800 hover:bg-[#8b1e2a] hover:text-white transition-colors shadow-md cursor-pointer"
                    title="বড় করে দেখুন"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStartDownload(item)}
                    className="p-2.5 rounded-full bg-[#8b1e2a] text-white hover:bg-[#a82333] transition-colors shadow-md cursor-pointer"
                    title="ডাউনলোড করুন"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Bottom Info & Download CTA */}
              <div className="p-3.5 flex items-center justify-between border-t border-stone-100 bg-white">
                <div>
                  <h4 className="text-xs sm:text-sm font-bengali-serif font-bold text-stone-900 line-clamp-1">
                    {item.title}
                  </h4>
                  <span className="text-[10px] text-stone-400 font-cinzel uppercase tracking-wider">
                    {item.id.toUpperCase()} · HD ART
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleStartDownload(item)}
                  className="px-3 py-1 rounded-full bg-rose-50 hover:bg-[#8b1e2a] text-[#8b1e2a] hover:text-white border border-rose-200 hover:border-[#8b1e2a] text-xs font-bengali-serif font-medium flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                >
                  <Download className="w-3 h-3" />
                  <span>ডাউনলোড</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal for Full View */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative max-w-xl w-full bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xl p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors z-30 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-4 bg-stone-100">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30 flex items-center justify-center p-6 text-center">
                <div className="p-4 sm:p-5 rounded-xl bg-black/50 border border-white/20 backdrop-blur-sm max-w-md">
                  <p className="text-base sm:text-lg font-bengali-serif text-white font-semibold leading-relaxed italic">
                    “{selectedItem.quote}”
                  </p>
                  {selectedItem.author && (
                    <p className="text-xs text-stone-300 font-cinzel mt-2 uppercase tracking-widest">
                      — {selectedItem.author}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bengali-serif font-bold text-stone-900">
                  {selectedItem.title}
                </h3>
                <p className="text-xs text-stone-500 font-anek">
                  {selectedItem.category} · হাই রেজোলিউশন ভিন্টেজ আর্ট
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedItem(null);
                  handleStartDownload(selectedItem);
                }}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-[#8b1e2a] to-[#a82333] text-white font-bengali-serif font-semibold text-xs sm:text-sm flex items-center gap-1.5 shadow-xs cursor-pointer whitespace-nowrap"
              >
                <Download className="w-3.5 h-3.5" />
                <span>⬇️ HD ডাউনলোড</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8-Second Download Gate Modal for Gallery downloads */}
      <DownloadGateModal
        isOpen={isDownloadGateOpen}
        onClose={() => setIsDownloadGateOpen(false)}
        onDownloadReady={handleConfirmDownload}
        isDownloading={isDownloading}
      />
    </div>
  );
};
