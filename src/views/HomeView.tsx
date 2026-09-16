import React, { useState } from 'react';
import { CATEGORIES } from '../data/categories';
import { POSTCARD_TEMPLATES } from '../data/postcards';
import { PostcardTemplate } from '../types';
import { PostcardCard } from '../components/PostcardCard';
import { PostcardCanvas } from '../components/PostcardCanvas';
import { Sparkles, ArrowRight, Compass, Heart, BookOpen, Layers } from 'lucide-react';

interface HomeViewProps {
  onNavigate: (view: string, categoryFilter?: string) => void;
  onSelectTemplate: (template: PostcardTemplate) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onSelectTemplate,
  favorites,
  onToggleFavorite,
}) => {
  // Demo interactive state for hero postcard preview
  const heroTemplate = POSTCARD_TEMPLATES[0]; // Rainy Window Love
  const [heroState] = useState({
    template: heroTemplate,
    recipient: 'প্রিয়তমা মেঘবতী',
    bodyText: 'যদি জানতে চাও কতটা ভালোবাসি, তবে শ্রাবণের প্রতিটি বৃষ্টির ফোঁটা গুনে দেখো।',
    sender: 'ইতি, তোমার বৃষ্টিপ্রেমিক',
    date: 'শ্রাবণ ১৩৮১ বঙ্গাব্দ',
    customization: {
      fontFamily: 'tiro-bangla' as const,
      fontSize: 16,
      isBold: false,
      isItalic: false,
      textAlign: 'center' as const,
      letterSpacing: 0.5,
      lineHeight: 1.7,
      textColor: '#f5eedc',
      textPosition: 'center' as const,
    },
    effect: 'sepia' as const,
    aspectRatio: 'postcard' as const,
  });

  // Collections
  const popularTemplates = POSTCARD_TEMPLATES.filter((t) => t.collection === 'popular' || t.featured).slice(0, 4);
  const newTemplates = POSTCARD_TEMPLATES.filter((t) => t.isNew || t.collection === 'new').slice(0, 4);
  const romanticTemplates = POSTCARD_TEMPLATES.filter((t) => t.category === 'রোমান্টিক' || t.collection === 'romantic').slice(0, 4);
  const rainyTemplates = POSTCARD_TEMPLATES.filter((t) => t.category === 'বৃষ্টি' || t.collection === 'rainy').slice(0, 4);
  const letterTemplates = POSTCARD_TEMPLATES.filter((t) => t.category === 'প্রেমপত্র' || t.collection === 'letter').slice(0, 4);

  return (
    <div id="home-view-container" className="space-y-16 lg:space-y-24">
      {/* ==================================================
          HERO SECTION
          ================================================== */}
      <section
        id="hero-section"
        className="relative overflow-hidden pt-8 pb-12 lg:pt-16 lg:pb-20 border-b border-stone-200"
      >
        {/* Subtle background ambient glow */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left: Hero Copy */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              {/* Logo / Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-rose-200 bg-white shadow-xs text-xs font-anek text-stone-800">
                <span className="text-base">💌</span>
                <span className="font-cinzel tracking-wider font-bold text-[#8b1e2a]">Circle Post</span>
                <span className="text-[11px] font-bengali-serif text-stone-500">· সার্কেল পোস্ট আর্কাইভ</span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bengali-serif font-bold text-stone-900 leading-[1.3] tracking-tight">
                পুরনো দিনের অনুভূতি, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8b1e2a] via-[#a32232] to-[#b45309]">
                  আজকের ভালোবাসার জন্য।
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-stone-600 font-anek max-w-xl mx-auto lg:mx-0 leading-relaxed">
                আপনার প্রিয় মানুষটির জন্য সার্কেল পোস্টে তৈরি করুন একটি সুন্দর Vintage Love Postcard। পুরনো চিঠি, বৃষ্টি, গোলাপ আর স্মৃতির নকশায় মনের কথা সাজিয়ে ডাউনলোড করুন সম্পূর্ণ এইচডিতে।
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  id="hero-primary-cta"
                  type="button"
                  onClick={() => onNavigate('generator')}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-[#8b1e2a] to-[#a82333] hover:from-[#9c2230] hover:to-[#bd273a] text-white font-bengali-serif font-semibold text-sm sm:text-base shadow-xs hover:shadow-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#f9d784]" />
                  <span>✨ পোস্টকার্ড তৈরি করুন</span>
                </button>

                <button
                  id="hero-secondary-cta"
                  type="button"
                  onClick={() => onNavigate('gallery')}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-white hover:bg-stone-50 text-stone-800 hover:text-stone-900 border border-stone-300 font-bengali-serif font-medium text-sm sm:text-base shadow-xs flex items-center justify-center gap-1.5 transition-all hover:scale-[1.01] active:scale-95 cursor-pointer"
                >
                  <span>🖼️ Vintage Gallery দেখুন</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#8b1e2a]" />
                </button>
              </div>

              {/* Trust/Feature Pills */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-anek text-stone-500">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#8b1e2a] font-bold">✓</span>
                  <span>কোনো ফটো আপলোডের ঝামেলা নেই</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#8b1e2a] font-bold">✓</span>
                  <span>রেডিমেড প্রেমের শত শত উক্তি</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#8b1e2a] font-bold">✓</span>
                  <span>১০০% ফ্রি ওয়াটারমার্কহীন HD ডাউনলোড</span>
                </div>
              </div>
            </div>

            {/* Right: Postcard Live Realistic Showcase */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                {/* Vintage frame matting */}
                <div className="p-3 sm:p-5 rounded-2xl border border-stone-200 bg-white/90 shadow-xl backdrop-blur-sm">
                  <div className="mb-2 flex items-center justify-between text-xs text-stone-600 font-anek px-1">
                    <span className="font-cinzel tracking-wider text-[11px] uppercase font-bold text-[#8b1e2a]">
                      ✦ LIVE PREVIEW SAMPLE
                    </span>
                    <button
                      id="hero-customize-sample-button"
                      onClick={() => onSelectTemplate(heroTemplate)}
                      className="text-xs text-[#8b1e2a] hover:underline inline-flex items-center gap-1 font-medium"
                    >
                      <span>এটি দিয়ে এডিট করুন</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                  
                  {/* The interactive Canvas */}
                  <PostcardCanvas state={heroState} id="hero-live-postcard-preview" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          CATEGORIES SECTION
          ================================================== */}
      <section id="categories-section" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#8b1e2a] font-cinzel font-semibold mb-1">
              DISCOVER BY MOOD
            </div>
            <h2 className="text-2xl sm:text-3xl font-bengali-serif font-bold text-stone-900">
              ক্যাটাগরি বেছে নিন
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-anek mt-1">
              আপনার হৃদয়ের অনুভূতির সাথে মেলানো পোস্টকার্ড ডিজাইন
            </p>
          </div>

          <button
            id="view-all-categories-button"
            onClick={() => onNavigate('categories')}
            className="text-xs sm:text-sm text-[#8b1e2a] hover:text-[#a32232] font-anek font-semibold inline-flex items-center gap-1 self-start sm:self-auto"
          >
            <span>সবগুলো ক্যাটাগরি</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              id={`cat-card-${cat.id}`}
              onClick={() => onNavigate('postcards', cat.name)}
              className="group flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-xl border border-stone-200 bg-white hover:border-[#8b1e2a]/40 hover:shadow-md transition-all hover:scale-[1.03] active:scale-95 shadow-xs cursor-pointer text-center"
            >
              <span className="text-2xl sm:text-3xl mb-2 group-hover:scale-110 transition-transform">
                {cat.icon}
              </span>
              <span className="text-xs sm:text-sm font-bengali-serif font-bold text-stone-900 group-hover:text-[#8b1e2a] transition-colors line-clamp-1">
                {cat.name}
              </span>
              <span className="text-[10px] text-stone-500 font-anek mt-0.5 line-clamp-1">
                {cat.description}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ==================================================
          FEATURED COLLECTION 1: জনপ্রিয় পোস্টকার্ড
          ================================================== */}
      <section id="popular-postcards-section" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#8b1e2a] font-cinzel font-semibold mb-1">
              TOP FAVORITES
            </div>
            <h3 className="text-xl sm:text-2xl font-bengali-serif font-bold text-stone-900 flex items-center gap-2">
              <span>🔥 জনপ্রিয় পোস্টকার্ড</span>
            </h3>
          </div>
          <button
            id="view-all-popular-btn"
            onClick={() => onNavigate('postcards')}
            className="text-xs sm:text-sm text-[#8b1e2a] hover:text-[#a32232] font-anek font-semibold inline-flex items-center gap-1"
          >
            <span>সব দেখুন</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {popularTemplates.map((template) => (
            <PostcardCard
              key={template.id}
              template={template}
              isFavorite={favorites.includes(template.id)}
              onToggleFavorite={onToggleFavorite}
              onSelect={onSelectTemplate}
            />
          ))}
        </div>
      </section>

      {/* ==================================================
          FEATURED COLLECTION 2: নতুন পোস্টকার্ড
          ================================================== */}
      <section id="new-postcards-section" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#8b1e2a] font-cinzel font-semibold mb-1">
              LATEST ADDITIONS
            </div>
            <h3 className="text-xl sm:text-2xl font-bengali-serif font-bold text-stone-900 flex items-center gap-2">
              <span>✨ নতুন পোস্টকার্ড</span>
            </h3>
          </div>
          <button
            id="view-all-new-btn"
            onClick={() => onNavigate('postcards')}
            className="text-xs sm:text-sm text-[#8b1e2a] hover:text-[#a32232] font-anek font-semibold inline-flex items-center gap-1"
          >
            <span>সব দেখুন</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {newTemplates.map((template) => (
            <PostcardCard
              key={template.id}
              template={template}
              isFavorite={favorites.includes(template.id)}
              onToggleFavorite={onToggleFavorite}
              onSelect={onSelectTemplate}
            />
          ))}
        </div>
      </section>

      {/* ==================================================
          FEATURED COLLECTION 3: Romantic Collection
          ================================================== */}
      <section id="romantic-collection-section" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#8b1e2a] font-cinzel font-semibold mb-1">
              SWEET PASSION
            </div>
            <h3 className="text-xl sm:text-2xl font-bengali-serif font-bold text-stone-900 flex items-center gap-2">
              <span>❤️ Romantic Collection</span>
            </h3>
          </div>
          <button
            id="view-romantic-collection-btn"
            onClick={() => onNavigate('postcards', 'রোমান্টিক')}
            className="text-xs sm:text-sm text-[#8b1e2a] hover:text-[#a32232] font-anek font-semibold inline-flex items-center gap-1"
          >
            <span>সব দেখুন</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {romanticTemplates.map((template) => (
            <PostcardCard
              key={template.id}
              template={template}
              isFavorite={favorites.includes(template.id)}
              onToggleFavorite={onToggleFavorite}
              onSelect={onSelectTemplate}
            />
          ))}
        </div>
      </section>

      {/* ==================================================
          FEATURED COLLECTION 4: Rainy Love Collection
          ================================================== */}
      <section id="rainy-collection-section" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#8b1e2a] font-cinzel font-semibold mb-1">
              MONSOON WHISPERS
            </div>
            <h3 className="text-xl sm:text-2xl font-bengali-serif font-bold text-stone-900 flex items-center gap-2">
              <span>🌧️ Rainy Love Collection</span>
            </h3>
          </div>
          <button
            id="view-rainy-collection-btn"
            onClick={() => onNavigate('postcards', 'বৃষ্টি')}
            className="text-xs sm:text-sm text-[#8b1e2a] hover:text-[#a32232] font-anek font-semibold inline-flex items-center gap-1"
          >
            <span>সব দেখুন</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {rainyTemplates.map((template) => (
            <PostcardCard
              key={template.id}
              template={template}
              isFavorite={favorites.includes(template.id)}
              onToggleFavorite={onToggleFavorite}
              onSelect={onSelectTemplate}
            />
          ))}
        </div>
      </section>

      {/* ==================================================
          FEATURED COLLECTION 5: Vintage Letter Collection
          ================================================== */}
      <section id="vintage-letter-section" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#8b1e2a] font-cinzel font-semibold mb-1">
              TIMELESS EPISTOLARY
            </div>
            <h3 className="text-xl sm:text-2xl font-bengali-serif font-bold text-stone-900 flex items-center gap-2">
              <span>💌 Vintage Letter Collection</span>
            </h3>
          </div>
          <button
            id="view-letter-collection-btn"
            onClick={() => onNavigate('postcards', 'প্রেমপত্র')}
            className="text-xs sm:text-sm text-[#8b1e2a] hover:text-[#a32232] font-anek font-semibold inline-flex items-center gap-1"
          >
            <span>সব দেখুন</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {letterTemplates.map((template) => (
            <PostcardCard
              key={template.id}
              template={template}
              isFavorite={favorites.includes(template.id)}
              onToggleFavorite={onToggleFavorite}
              onSelect={onSelectTemplate}
            />
          ))}
        </div>
      </section>

      {/* ==================================================
          CALL TO ACTION BANNER
          ================================================== */}
      <section id="home-cta-banner" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-rose-100 bg-gradient-to-r from-rose-50 via-stone-50 to-amber-50 p-8 sm:p-12 text-center shadow-md">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-4xl">💌</span>
            <h3 className="text-2xl sm:text-3xl font-bengali-serif font-bold text-stone-900">
              আজই আপনার মনের কথা পাঠিয়ে দিন Circle Post-এ
            </h3>
            <p className="text-sm font-anek text-stone-600 leading-relaxed">
              একটি সুন্দর পোস্টকার্ড নির্বাচন করুন, প্রস্তুত করা প্রেমময় উক্তি পছন্দ করুন অথবা নিজের মন খুলে চিঠি লিখুন।
            </p>
            <div className="pt-2">
              <button
                id="banner-create-postcard-btn"
                type="button"
                onClick={() => onNavigate('generator')}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#8b1e2a] to-[#a82333] hover:from-[#9c2230] hover:to-[#bd273a] text-white font-bengali-serif font-semibold text-sm sm:text-base shadow-xs transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <span>✨ পোস্টকার্ড তৈরি শুরু করুন</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
