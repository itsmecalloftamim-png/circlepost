import React, { useState } from 'react';
import { Sparkles, Heart, Search, Menu, X, Image as ImageIcon, BookOpen, Layers } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  favoritesCount: number;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  favoritesCount,
  onOpenSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home (হোম)' },
    { id: 'postcards', label: 'Postcards (পোস্টকার্ড)' },
    { id: 'quotes', label: 'Quotes (উক্তি)' },
    { id: 'gallery', label: 'Vintage Gallery (গ্যালারি)' },
    { id: 'categories', label: 'Categories (ক্যাটাগরি)' },
    { id: 'favorites', label: 'Favorites (পছন্দ)', badge: favoritesCount },
  ];

  const handleNavClick = (viewId: string) => {
    onNavigate(viewId);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="vintage-navbar"
      className="sticky top-0 z-40 w-full border-b border-stone-200 bg-white/95 backdrop-blur-md shadow-xs"
    >
      <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8">
        {/* Brand Logo: Circle Post */}
        <div
          id="navbar-brand-logo"
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2 cursor-pointer group select-none shrink-0"
        >
          <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border-2 border-[#8b1e2a] bg-[#faf5f0] shadow-xs text-[#8b1e2a] group-hover:scale-105 transition-all">
            <span className="text-base sm:text-lg">💌</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-cinzel text-base sm:text-lg font-bold tracking-wider text-stone-900 group-hover:text-[#8b1e2a] transition-colors">
                Circle Post
              </span>
              <span className="text-[10px] sm:text-xs font-bengali-serif font-bold text-[#8b1e2a] px-1.5 py-0.5 rounded-full bg-rose-50 border border-rose-200">
                সার্কেল পোস্ট
              </span>
            </div>
            <div className="hidden md:block text-[10px] text-stone-500 font-anek -mt-0.5 tracking-wide">
              পুরনো দিনের অনুভূতি · ভিন্টেজ পোস্ট
            </div>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
          {navLinks.map((link) => {
            const isActive = currentView === link.id;
            return (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => handleNavClick(link.id)}
                className={`relative px-3 py-1.5 rounded-full text-xs xl:text-sm font-anek font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'text-stone-900 bg-stone-100 border border-stone-300 shadow-xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                }`}
              >
                <span>{link.label}</span>
                {link.badge !== undefined && link.badge > 0 && (
                  <span className="ml-1.5 px-1.5 py-0.2 bg-[#8b1e2a] text-white rounded-full text-[10px] font-bold">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Global Search Button */}
          <button
            id="navbar-search-button"
            type="button"
            onClick={onOpenSearch}
            className="p-1.5 sm:px-3 sm:py-1.5 rounded-full border border-stone-200 bg-stone-50 text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-all flex items-center gap-1.5 text-xs font-anek cursor-pointer"
            title="উক্তি বা পোস্টকার্ড খুঁজুন"
          >
            <Search className="w-3.5 h-3.5 text-[#8b1e2a]" />
            <span className="hidden md:inline">খুঁজুন...</span>
          </button>

          {/* Favorites quick icon on mobile/tablet */}
          <button
            id="navbar-favorites-button"
            type="button"
            onClick={() => handleNavClick('favorites')}
            className="relative lg:hidden p-1.5 rounded-full border border-stone-200 bg-stone-50 text-stone-700 hover:text-stone-900 hover:bg-stone-100 cursor-pointer"
            title="পছন্দের তালিকা"
          >
            <Heart className="w-4 h-4 text-[#8b1e2a]" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#8b1e2a] text-white rounded-full text-[8px] font-bold flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Primary CTA: Create Postcard */}
          <button
            id="navbar-create-postcard-cta"
            type="button"
            onClick={() => handleNavClick('generator')}
            className="px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-full bg-gradient-to-r from-[#8b1e2a] to-[#a32232] hover:from-[#9c2230] hover:to-[#b72839] text-white font-bengali-serif font-semibold text-xs sm:text-sm flex items-center gap-1 shadow-xs transition-all hover:scale-[1.02] active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-3 h-3 text-[#f9d784] shrink-0" />
            <span className="inline sm:hidden">তৈরি করুন</span>
            <span className="hidden sm:inline">পোস্টকার্ড তৈরি করুন</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            id="navbar-mobile-menu-toggle"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-full border border-stone-200 bg-stone-50 text-stone-700 hover:text-stone-900 cursor-pointer"
            aria-label="মেনু খুলুন"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4 text-stone-800" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden border-b border-stone-200 bg-white px-4 py-4 space-y-2 animate-fade-in shadow-md"
        >
          {navLinks.map((link) => {
            const isActive = currentView === link.id;
            return (
              <button
                key={link.id}
                id={`mobile-nav-link-${link.id}`}
                onClick={() => handleNavClick(link.id)}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-anek transition-colors ${
                  isActive
                    ? 'bg-rose-50 text-stone-900 border border-rose-200 font-semibold'
                    : 'text-stone-700 hover:bg-stone-50 hover:text-stone-900'
                }`}
              >
                <span>{link.label}</span>
                {link.badge !== undefined && link.badge > 0 && (
                  <span className="px-2 py-0.5 bg-[#8b1e2a] text-white rounded-full text-xs font-bold">
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
