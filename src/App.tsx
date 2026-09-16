import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { HomeView } from './views/HomeView';
import { GeneratorView } from './views/GeneratorView';
import { PostcardsView } from './views/PostcardsView';
import { QuotesView } from './views/QuotesView';
import { GalleryView } from './views/GalleryView';
import { CategoriesView } from './views/CategoriesView';
import { FavoritesView } from './views/FavoritesView';
import { PostcardTemplate, QuoteItem } from './types';
import { POSTCARD_TEMPLATES } from './data/postcards';
import { QUOTES } from './data/quotes';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedTemplate, setSelectedTemplate] = useState<PostcardTemplate>(POSTCARD_TEMPLATES[0]);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Favorites stored in LocalStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('vintage_postcard_favorites');
      return saved ? JSON.parse(saved) : ['vp001', 'vp004', 'q001'];
    } catch {
      return ['vp001', 'vp004', 'q001'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('vintage_postcard_favorites', JSON.stringify(favorites));
    } catch {
      // storage unavailable fallback
    }
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleNavigate = (view: string, filter?: string) => {
    setCurrentView(view);
    if (filter) {
      setCategoryFilter(filter);
    } else {
      setCategoryFilter('all');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTemplate = (template: PostcardTemplate) => {
    setSelectedTemplate(template);
    setCurrentView('generator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUseQuote = (quote: QuoteItem) => {
    // Find matching template or keep current
    const matchingTemplate =
      POSTCARD_TEMPLATES.find((t) => t.category === quote.category) || selectedTemplate;
    setSelectedTemplate({
      ...matchingTemplate,
      defaultQuote: quote.text,
    });
    setCurrentView('generator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-stone-900 font-anek flex flex-col selection:bg-[#8b1e2a] selection:text-white">
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        favoritesCount={favorites.length}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onSelectTemplate={handleSelectTemplate}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        )}

        {currentView === 'generator' && (
          <GeneratorView
            initialTemplate={selectedTemplate}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {currentView === 'postcards' && (
          <PostcardsView
            initialCategory={categoryFilter}
            onSelectTemplate={handleSelectTemplate}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        )}

        {currentView === 'quotes' && (
          <QuotesView
            onUseQuote={handleUseQuote}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        )}

        {currentView === 'gallery' && (
          <GalleryView
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        )}

        {currentView === 'categories' && (
          <CategoriesView
            onSelectCategory={(catName) => handleNavigate('postcards', catName)}
          />
        )}

        {currentView === 'favorites' && (
          <FavoritesView
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onSelectTemplate={handleSelectTemplate}
            onUseQuote={handleUseQuote}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}
      </main>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectTemplate={handleSelectTemplate}
        onUseQuote={handleUseQuote}
        onSelectCategory={(catName) => handleNavigate('postcards', catName)}
      />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
