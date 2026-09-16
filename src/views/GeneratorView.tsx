import React, { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas-pro';
import confetti from 'canvas-confetti';
import { POSTCARD_TEMPLATES } from '../data/postcards';
import { QUOTES } from '../data/quotes';
import { CATEGORIES } from '../data/categories';
import {
  PostcardTemplate,
  QuoteItem,
  PostcardState,
  FontFamily,
  TextAlign,
  TextPosition,
  VintageEffect,
  AspectRatio,
} from '../types';
import { PostcardCanvas } from '../components/PostcardCanvas';
import { DownloadGateModal } from '../components/DownloadGateModal';
import {
  Sparkles,
  Shuffle,
  RotateCcw,
  Download,
  Check,
  Type,
  Sliders,
  Palette,
  Eye,
  Layers,
  Share2,
  Maximize2,
  Calendar,
  User,
  Heart,
} from 'lucide-react';

interface GeneratorViewProps {
  initialTemplate?: PostcardTemplate;
  onNavigateHome: () => void;
}

const DEFAULT_FONT_STYLES: { id: FontFamily; label: string; preview: string }[] = [
  { id: 'noto-serif-bengali', label: 'Elegant Bengali (এলিগ্যান্ট)', preview: 'ভালোবাসা' },
  { id: 'tiro-bangla', label: 'Classic Bengali (ক্লাসিক সাহিত্য)', preview: 'অনুরাগ' },
  { id: 'anek-bangla', label: 'Modern Clean (পরিচ্ছন্ন আধুনিক)', preview: 'স্মৃতি' },
  { id: 'special-elite', label: 'Typewriter (টাইপরাইটার)', preview: 'Typewriter' },
  { id: 'playfair-display', label: 'Vintage Serif (ভিন্টেজ সেরিফ)', preview: 'Serif' },
  { id: 'great-vibes', label: 'Calligraphy (রোমান্টিক ক্যালিগ্রাফি)', preview: 'Love' },
  { id: 'cormorant-garamond', label: 'Old Newspaper (সংবাদপত্র)', preview: 'Archive' },
];

const VINTAGE_EFFECTS: { id: VintageEffect; label: string; icon: string }[] = [
  { id: 'original', label: 'Original', icon: '✨' },
  { id: 'sepia', label: 'Sepia (সেপিয়া)', icon: '📜' },
  { id: 'old-paper', label: 'Old Paper (হলুদ কাগজ)', icon: '📄' },
  { id: 'faded', label: 'Faded (ম্লান স্মৃতি)', icon: '🌫️' },
  { id: 'black-white', label: 'Black & White (সাদা-কালো)', icon: '🎞️' },
  { id: 'film-grain', label: 'Film Grain (গ্রেইন)', icon: '🎬' },
  { id: 'dust-scratch', label: 'Dust & Scratch', icon: '⏳' },
  { id: 'coffee-stain', label: 'Coffee Stain (কফির দাগ)', icon: '☕' },
  { id: 'warm-vintage', label: 'Warm Vintage (উষ্ণ সোনালী)', icon: '🌅' },
];

const ASPECT_RATIOS: { id: AspectRatio; label: string; sub: string }[] = [
  { id: 'postcard', label: 'Postcard (পোস্টকার্ড)', sub: '3:2 Landscape' },
  { id: 'square', label: 'Instagram Square', sub: '1:1 Ratio' },
  { id: 'story', label: 'Instagram Story', sub: '9:16 Vertical' },
  { id: 'facebook', label: 'Facebook Post', sub: '1.91:1 Landscape' },
  { id: 'status', label: 'WhatsApp Status', sub: '9:16 Full' },
];

const COLOR_PALETTES = [
  { label: 'Warm Cream', color: '#f5eedc' },
  { label: 'Vintage Gold', color: '#e6c587' },
  { label: 'Antique Parchment', color: '#eae1cb' },
  { label: 'Blush Rose', color: '#f7cfd6' },
  { label: 'Pure Paper White', color: '#faf7f2' },
  { label: 'Deep Sepia', color: '#d1bca4' },
];

export const GeneratorView: React.FC<GeneratorViewProps> = ({ initialTemplate }) => {
  const canvasRef = useRef<HTMLDivElement>(null);

  // Active Postcard Template
  const [selectedTemplate, setSelectedTemplate] = useState<PostcardTemplate>(
    initialTemplate || POSTCARD_TEMPLATES[0]
  );

  // Form State
  const [recipient, setRecipient] = useState<string>(
    selectedTemplate.defaultRecipient || 'প্রিয়তমা'
  );
  const [bodyText, setBodyText] = useState<string>(selectedTemplate.defaultQuote);
  const [sender, setSender] = useState<string>(
    selectedTemplate.defaultSender || 'ইতি, তোমার চির সাথী'
  );
  const [date, setDate] = useState<string>(
    selectedTemplate.defaultDate || '১৬ সেপ্টেম্বর, ১৯৭৪'
  );

  // Text Customization
  const [fontFamily, setFontFamily] = useState<FontFamily>('tiro-bangla');
  const [fontSize, setFontSize] = useState<number>(17);
  const [isBold, setIsBold] = useState<boolean>(false);
  const [isItalic, setIsItalic] = useState<boolean>(false);
  const [textAlign, setTextAlign] = useState<TextAlign>('center');
  const [letterSpacing, setLetterSpacing] = useState<number>(0.5);
  const [lineHeight, setLineHeight] = useState<number>(1.7);
  const [textColor, setTextColor] = useState<string>('#f5eedc');
  const [textPosition, setTextPosition] = useState<TextPosition>('center');

  // Vintage Visual Effect & Aspect Ratio
  const [effect, setEffect] = useState<VintageEffect>('sepia');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('postcard');

  // Filter Categories for Template Picker & Quote Picker
  const [templateCategoryFilter, setTemplateCategoryFilter] = useState<string>('all');
  const [quoteCategoryFilter, setQuoteCategoryFilter] = useState<string>('all');
  const [quoteSearch, setQuoteSearch] = useState<string>('');

  // Active step / tab in editor sidebar
  const [activeTab, setActiveTab] = useState<'template' | 'quotes' | 'text' | 'customize' | 'effects'>('text');
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');

  // Download Gate Modal
  const [isDownloadGateOpen, setIsDownloadGateOpen] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [downloadSuccessToast, setDownloadSuccessToast] = useState<string | null>(null);

  // Update form fields when template changes externally
  useEffect(() => {
    if (initialTemplate) {
      setSelectedTemplate(initialTemplate);
      setRecipient(initialTemplate.defaultRecipient || 'প্রিয়তমা');
      setBodyText(initialTemplate.defaultQuote);
      setSender(initialTemplate.defaultSender || 'ইতি, তোমার...');
      setDate(initialTemplate.defaultDate || '১৬ সেপ্টেম্বর, ১৯৭৪');
    }
  }, [initialTemplate]);

  // Surprise Me Handler
  const handleSurpriseMe = () => {
    const randomTemplate = POSTCARD_TEMPLATES[Math.floor(Math.random() * POSTCARD_TEMPLATES.length)];
    const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    const randomFont = DEFAULT_FONT_STYLES[Math.floor(Math.random() * DEFAULT_FONT_STYLES.length)].id;
    const randomEffect = VINTAGE_EFFECTS[Math.floor(Math.random() * VINTAGE_EFFECTS.length)].id;

    setSelectedTemplate(randomTemplate);
    setBodyText(randomQuote.text);
    if (randomTemplate.defaultRecipient) setRecipient(randomTemplate.defaultRecipient);
    if (randomTemplate.defaultSender) setSender(randomTemplate.defaultSender);
    setFontFamily(randomFont);
    setEffect(randomEffect);

    // subtle confetti
    try {
      confetti({
        particleCount: 25,
        spread: 40,
        origin: { y: 0.6 },
        colors: ['#c5a880', '#8b1e2a', '#f5eedc'],
      });
    } catch {
      // ignore
    }
  };

  // Reset Text Customization
  const handleResetStyle = () => {
    setFontFamily('tiro-bangla');
    setFontSize(17);
    setIsBold(false);
    setIsItalic(false);
    setTextAlign('center');
    setLetterSpacing(0.5);
    setLineHeight(1.7);
    setTextColor('#f5eedc');
    setTextPosition('center');
  };

  // Switch template
  const handleSelectTemplate = (t: PostcardTemplate) => {
    setSelectedTemplate(t);
    if (!bodyText || bodyText === selectedTemplate.defaultQuote) {
      setBodyText(t.defaultQuote);
    }
    if (t.defaultRecipient) setRecipient(t.defaultRecipient);
    if (t.defaultSender) setSender(t.defaultSender);
    if (t.defaultDate) setDate(t.defaultDate);
  };

  // Apply quote
  const handleApplyQuote = (q: QuoteItem) => {
    setBodyText(q.text);
    setActiveTab('text');
  };

  // HD Download process after 8-second sponsor gate unlocks
  const handleConfirmDownload = async (format: 'png' | 'jpg') => {
    if (!canvasRef.current) return;
    setIsExporting(true);

    try {
      // Allow DOM rendering stability
      await new Promise((resolve) => setTimeout(resolve, 200));

      const canvas = await html2canvas(canvasRef.current, {
        scale: 2.5, // Crisp HD rendering
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#191410',
        logging: false,
      });

      const mimeType = format === 'jpg' ? 'image/jpeg' : 'image/png';
      const fileExt = format === 'jpg' ? 'jpg' : 'png';
      const dataUrl = canvas.toDataURL(mimeType, 0.95);

      // Trigger standard browser download
      const link = document.createElement('a');
      const filename = `vintage-postcard-${selectedTemplate.id}-${Date.now()}.${fileExt}`;
      link.download = filename;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Close modal
      setIsDownloadGateOpen(false);

      // Celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#c5a880', '#8b1e2a', '#f5eedc', '#ffd700'],
        });
      } catch {
        // ignore
      }

      setDownloadSuccessToast('আপনার এইচডি পোস্টকার্ড সফলভাবে ডাউনলোড হয়েছে!');
      setTimeout(() => setDownloadSuccessToast(null), 4000);
    } catch (err) {
      console.error('Download export failed:', err);
      alert('পোস্টকার্ড ডাউনলোড করার সময় একটি সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
    } finally {
      setIsExporting(false);
    }
  };

  // Filtered Templates
  const filteredTemplates = POSTCARD_TEMPLATES.filter((t) => {
    if (templateCategoryFilter === 'all') return true;
    return t.category === templateCategoryFilter;
  });

  // Filtered Quotes
  const filteredQuotes = QUOTES.filter((q) => {
    const matchesCategory =
      quoteCategoryFilter === 'all' || q.category === quoteCategoryFilter;
    const matchesSearch =
      !quoteSearch ||
      q.text.toLowerCase().includes(quoteSearch.toLowerCase()) ||
      (q.author && q.author.toLowerCase().includes(quoteSearch.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Current Postcard State object for Canvas
  const currentState: PostcardState = {
    template: selectedTemplate,
    recipient,
    bodyText,
    sender,
    date,
    customization: {
      fontFamily,
      fontSize,
      isBold,
      isItalic,
      textAlign,
      letterSpacing,
      lineHeight,
      textColor,
      textPosition,
    },
    effect,
    aspectRatio,
  };

  return (
    <div id="postcard-generator-view" className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6 sm:space-y-8">
      {/* Toast Notification */}
      {downloadSuccessToast && (
        <div className="fixed top-20 right-4 sm:right-6 z-50 p-3 sm:p-4 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-900 shadow-xl flex items-center gap-2.5 animate-fade-in text-xs sm:text-sm font-bengali-serif font-medium">
          <span className="text-lg sm:text-xl">🎉</span>
          <span>{downloadSuccessToast}</span>
        </div>
      )}

      {/* Header with Title and Surprise Me */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 pb-3 sm:pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs uppercase tracking-widest text-[#8b1e2a] font-cinzel font-semibold">
            <span>CIRCLE POST STUDIO</span>
            <span>·</span>
            <span>১০০% ভিন্টেজ ডিজাইন</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bengali-serif font-bold text-stone-900 mt-0.5">
            💌 Circle Post Generator (সার্কেল পোস্ট)
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-anek">
            ডিজাইন নির্বাচন করুন, পছন্দের উক্তি লিখুন এবং প্রস্তুত করুন আপনার অমর প্রেমের চিঠি।
          </p>
        </div>

        {/* Surprise Me & Main Download Trigger */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            id="generator-surprise-me-btn"
            type="button"
            onClick={handleSurpriseMe}
            className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 text-xs font-bengali-serif font-semibold flex items-center gap-1.5 transition-all hover:scale-[1.02] active:scale-95 shadow-xs cursor-pointer whitespace-nowrap"
          >
            <Shuffle className="w-3.5 h-3.5 text-[#8b1e2a]" />
            <span>🎲 Surprise Me</span>
          </button>

          <button
            id="generator-hd-download-trigger"
            type="button"
            onClick={() => setIsDownloadGateOpen(true)}
            className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-[#8b1e2a] to-[#a82333] hover:from-[#9c2230] hover:to-[#bd273a] text-white font-bengali-serif font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-xs transition-all hover:scale-[1.02] active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5 shrink-0" />
            <span>⬇️ HD ডাউনলোড</span>
          </button>
        </div>
      </div>

      {/* Mobile Segemented Switch: Editor vs Live Preview */}
      <div className="lg:hidden flex items-center p-1 rounded-full bg-stone-100 border border-stone-200 shadow-xs">
        <button
          type="button"
          onClick={() => setMobileView('editor')}
          className={`flex-1 py-1.5 px-3 rounded-full text-xs font-bengali-serif font-semibold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
            mobileView === 'editor'
              ? 'bg-[#8b1e2a] text-white shadow-xs'
              : 'text-stone-700 hover:text-stone-900'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>✍️ এডিটর প্যানেল</span>
        </button>
        <button
          type="button"
          onClick={() => setMobileView('preview')}
          className={`flex-1 py-1.5 px-3 rounded-full text-xs font-bengali-serif font-semibold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
            mobileView === 'preview'
              ? 'bg-[#8b1e2a] text-white shadow-xs'
              : 'text-stone-700 hover:text-stone-900'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>👁️ লাইভ প্রিভিউ</span>
        </button>
      </div>

      {/* Main 2-Column Layout: Left Controls, Right Large Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* ==================================================
            LEFT COLUMN: STEP-BY-STEP EDITOR CONTROLS
            ================================================== */}
        <div className={`lg:col-span-5 space-y-4 sm:space-y-6 ${mobileView === 'editor' ? 'block' : 'hidden lg:block'}`}>
          {/* Quick preview banner on mobile */}
          <div className="lg:hidden">
            <button
              type="button"
              onClick={() => setMobileView('preview')}
              className="w-full py-2 px-3.5 rounded-full bg-rose-50 hover:bg-rose-100 border border-rose-200 text-[#8b1e2a] text-xs font-bengali-serif font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>লাইভ পোস্টকার্ডের প্রিভিউ দেখুন →</span>
            </button>
          </div>

          {/* Navigation Tabs for Steps */}
          <div className="flex items-center gap-1 p-1 rounded-full bg-stone-100 border border-stone-200 overflow-x-auto">
            <button
              id="tab-btn-text"
              type="button"
              onClick={() => setActiveTab('text')}
              className={`flex-1 min-w-[65px] py-1.5 px-2 rounded-full text-xs font-bengali-serif font-semibold transition-all text-center cursor-pointer ${
                activeTab === 'text'
                  ? 'bg-[#8b1e2a] text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              ✍️ লেখা
            </button>
            <button
              id="tab-btn-template"
              type="button"
              onClick={() => setActiveTab('template')}
              className={`flex-1 min-w-[70px] py-1.5 px-2 rounded-full text-xs font-bengali-serif font-semibold transition-all text-center cursor-pointer ${
                activeTab === 'template'
                  ? 'bg-[#8b1e2a] text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              ১. পোস্টকার্ড
            </button>
            <button
              id="tab-btn-quotes"
              type="button"
              onClick={() => setActiveTab('quotes')}
              className={`flex-1 min-w-[60px] py-1.5 px-2 rounded-full text-xs font-bengali-serif font-semibold transition-all text-center cursor-pointer ${
                activeTab === 'quotes'
                  ? 'bg-[#8b1e2a] text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              ২. উক্তি
            </button>
            <button
              id="tab-btn-customize"
              type="button"
              onClick={() => setActiveTab('customize')}
              className={`flex-1 min-w-[60px] py-1.5 px-2 rounded-full text-xs font-bengali-serif font-semibold transition-all text-center cursor-pointer ${
                activeTab === 'customize'
                  ? 'bg-[#8b1e2a] text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              স্টাইল
            </button>
            <button
              id="tab-btn-effects"
              type="button"
              onClick={() => setActiveTab('effects')}
              className={`flex-1 min-w-[60px] py-1.5 px-2 rounded-full text-xs font-bengali-serif font-semibold transition-all text-center cursor-pointer ${
                activeTab === 'effects'
                  ? 'bg-[#8b1e2a] text-white shadow-xs'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              ইফেক্ট
            </button>
          </div>

          {/* TAB 1: CUSTOM TEXT */}
          {activeTab === 'text' && (
            <div className="space-y-4 rounded-xl border border-stone-200 bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <h3 className="text-base font-bengali-serif font-bold text-stone-900 flex items-center gap-1.5">
                  <span>✍️ নিজের লেখা ও চিঠির বিবরণ</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveTab('quotes')}
                  className="text-xs text-[#8b1e2a] hover:underline font-anek font-medium"
                >
                  উক্তি পছন্দ করুন
                </button>
              </div>

              {/* Recipient */}
              <div className="space-y-1">
                <label className="text-xs font-anek font-semibold text-stone-800 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#8b1e2a]" />
                  <span>প্রাপক:</span>
                </label>
                <input
                  id="input-recipient"
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="প্রিয়তমা / প্রিয় মহাশয়া"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-[#faf9f6] text-sm text-stone-900 focus:outline-none focus:border-[#8b1e2a] font-anek"
                />
              </div>

              {/* Main Body Text (Large textarea) */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-anek font-semibold text-stone-800">
                    মূল লেখা (চিঠি বা প্রেমের উক্তি):
                  </label>
                  <span className="text-[10px] text-stone-500 font-mono">
                    {bodyText.length} অক্ষর
                  </span>
                </div>
                <textarea
                  id="textarea-body-text"
                  rows={4}
                  value={bodyText}
                  onChange={(e) => setBodyText(e.target.value)}
                  placeholder="এখানে আপনার নিজের লেখা লিখুন..."
                  className="w-full px-3.5 py-3 rounded-lg border border-stone-300 bg-[#faf9f6] text-sm text-stone-900 focus:outline-none focus:border-[#8b1e2a] font-anek leading-relaxed resize-y"
                />
              </div>

              {/* Sender & Date row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-anek font-semibold text-stone-800 flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-[#8b1e2a]" />
                    <span>প্রেরক:</span>
                  </label>
                  <input
                    id="input-sender"
                    type="text"
                    value={sender}
                    onChange={(e) => setSender(e.target.value)}
                    placeholder="ইতি, তোমার..."
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-[#faf9f6] text-xs text-stone-900 focus:outline-none focus:border-[#8b1e2a] font-anek"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-anek font-semibold text-stone-800 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#8b1e2a]" />
                    <span>তারিখ (ঐচ্ছিক):</span>
                  </label>
                  <input
                    id="input-date"
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="১৬ সেপ্টেম্বর, ১৯৭৪"
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-[#faf9f6] text-xs text-stone-900 focus:outline-none focus:border-[#8b1e2a] font-anek"
                  />
                </div>
              </div>

              {/* Direct Quick Apply or Next */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveTab('customize')}
                  className="w-full py-2.5 px-4 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 text-xs font-bengali-serif font-semibold flex items-center justify-center gap-1.5 transition-all"
                >
                  <Type className="w-3.5 h-3.5 text-[#8b1e2a]" />
                  <span>ফন্ট ও সাইজ কাস্টমাইজ করুন →</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: TEMPLATE SELECTOR (Section 5, Step 1) */}
          {activeTab === 'template' && (
            <div className="space-y-4 rounded-xl border border-stone-200 bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <h3 className="text-base font-bengali-serif font-bold text-stone-900">
                  ১. পোস্টকার্ড নির্বাচন করুন
                </h3>
                <span className="text-xs text-stone-500 font-anek">
                  {filteredTemplates.length} টি ডিজাইন
                </span>
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
                <button
                  type="button"
                  onClick={() => setTemplateCategoryFilter('all')}
                  className={`px-3 py-1 rounded-full text-xs font-anek whitespace-nowrap transition-all ${
                    templateCategoryFilter === 'all'
                      ? 'bg-[#8b1e2a] text-white font-semibold'
                      : 'bg-stone-100 text-stone-700 hover:text-stone-900 hover:bg-stone-200'
                  }`}
                >
                  সবগুলো
                </button>
                {CATEGORIES.slice(0, 8).map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setTemplateCategoryFilter(cat.name)}
                    className={`px-3 py-1 rounded-full text-xs font-anek whitespace-nowrap transition-all ${
                      templateCategoryFilter === cat.name
                        ? 'bg-[#8b1e2a] text-white font-semibold'
                        : 'bg-stone-100 text-stone-700 hover:text-stone-900 hover:bg-stone-200'
                    }`}
                  >
                    {cat.icon} {cat.name}
                  </button>
                ))}
              </div>

              {/* Thumbnail Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[380px] overflow-y-auto pr-1">
                {filteredTemplates.map((t) => {
                  const isSelected = selectedTemplate.id === t.id;
                  return (
                    <button
                      key={t.id}
                      id={`template-thumb-${t.id}`}
                      type="button"
                      onClick={() => handleSelectTemplate(t)}
                      className={`group relative aspect-[3/2] overflow-hidden rounded-lg border text-left transition-all ${
                        isSelected
                          ? 'border-[#8b1e2a] ring-2 ring-[#8b1e2a] shadow-md'
                          : 'border-stone-200 hover:border-stone-400 opacity-90 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={t.image}
                        alt={t.title}
                        loading="lazy"
                        className="h-full w-full object-cover filter brightness-95 group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-1.5 inset-x-2 text-[10px] font-bengali-serif text-white line-clamp-1 font-semibold">
                        {t.title.split('(')[0]}
                      </div>
                      {isSelected && (
                        <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-[#8b1e2a] text-white flex items-center justify-center text-xs shadow-sm">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: QUOTE SELECTOR (Section 5, Step 2) */}
          {activeTab === 'quotes' && (
            <div className="space-y-4 rounded-xl border border-stone-200 bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <h3 className="text-base font-bengali-serif font-bold text-stone-900">
                  ২. উক্তি নির্বাচন করুন
                </h3>
                <span className="text-xs text-stone-500 font-anek">
                  {filteredQuotes.length} টি উক্তি
                </span>
              </div>

              {/* Quote Search */}
              <input
                id="quote-search-input"
                type="text"
                placeholder="উক্তি বা কবি খুঁজুন (যেমন: বৃষ্টি, হুমায়ূন, প্রেম)..."
                value={quoteSearch}
                onChange={(e) => setQuoteSearch(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-[#faf9f6] text-xs text-stone-900 focus:outline-none focus:border-[#8b1e2a] font-anek"
              />

              {/* Quote Category Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                <button
                  type="button"
                  onClick={() => setQuoteCategoryFilter('all')}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-anek whitespace-nowrap transition-all ${
                    quoteCategoryFilter === 'all'
                      ? 'bg-[#8b1e2a] text-white font-semibold'
                      : 'bg-stone-100 text-stone-700 hover:text-stone-900 hover:bg-stone-200'
                  }`}
                >
                  সব উক্তি
                </button>
                {CATEGORIES.slice(0, 7).map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setQuoteCategoryFilter(cat.name)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-anek whitespace-nowrap transition-all ${
                      quoteCategoryFilter === cat.name
                        ? 'bg-[#8b1e2a] text-white font-semibold'
                        : 'bg-stone-100 text-stone-700 hover:text-stone-900 hover:bg-stone-200'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Ready-made Quote Cards list */}
              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                {filteredQuotes.map((q) => (
                  <div
                    key={q.id}
                    id={`quote-item-${q.id}`}
                    className="p-3.5 rounded-lg border border-stone-200 bg-[#faf9f6] hover:border-stone-300 transition-colors space-y-2"
                  >
                    <p className="text-xs sm:text-sm font-bengali-serif text-stone-900 leading-relaxed italic">
                      “{q.text}”
                    </p>
                    <div className="flex items-center justify-between pt-1 border-t border-stone-200 text-xs">
                      <span className="text-[11px] text-stone-600 font-anek">
                        {q.author} · {q.category}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleApplyQuote(q)}
                        className="px-2.5 py-1 rounded bg-[#8b1e2a] hover:bg-[#a32232] text-white text-[11px] font-bengali-serif font-medium transition-all cursor-pointer"
                      >
                        [ ব্যবহার করুন ]
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: TEXT CUSTOMIZATION (Section 7) */}
          {activeTab === 'customize' && (
            <div className="space-y-5 rounded-xl border border-stone-200 bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <h3 className="text-base font-bengali-serif font-bold text-stone-900 flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-[#8b1e2a]" />
                  <span>টেক্সট কাস্টমাইজেশন</span>
                </h3>
                <button
                  id="reset-text-style-btn"
                  type="button"
                  onClick={handleResetStyle}
                  className="text-xs text-stone-600 hover:text-stone-900 font-anek flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Text Style</span>
                </button>
              </div>

              {/* Font Family Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-anek font-semibold text-stone-800">
                  ফন্ট স্টাইল (Font Family):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {DEFAULT_FONT_STYLES.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFontFamily(f.id)}
                      className={`p-2.5 rounded-lg border text-left text-xs transition-all ${
                        fontFamily === f.id
                          ? 'bg-[#8b1e2a] border-[#8b1e2a] text-white font-semibold shadow-xs'
                          : 'bg-[#faf9f6] border-stone-200 text-stone-800 hover:border-stone-300'
                      }`}
                    >
                      <div className="text-[11px] opacity-90">{f.label}</div>
                      <div className="text-sm mt-0.5 font-bold tracking-wide">{f.preview}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Size & Weight & Style */}
              <div className="space-y-3 pt-2 border-t border-stone-100">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-anek font-semibold text-stone-800">
                    ফন্ট সাইজ (Font Size):
                  </label>
                  <span className="text-xs font-mono font-semibold text-stone-900">{fontSize}px</span>
                </div>
                <input
                  type="range"
                  min={12}
                  max={26}
                  step={1}
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full accent-[#8b1e2a] cursor-pointer"
                />

                {/* Bold & Italic Toggles */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsBold(!isBold)}
                    className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-all ${
                      isBold
                        ? 'bg-[#8b1e2a] text-white border-[#8b1e2a]'
                        : 'bg-[#faf9f6] text-stone-800 border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    B - বোল্ড (Bold)
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsItalic(!isItalic)}
                    className={`py-2 px-3 rounded-lg border text-xs font-semibold transition-all ${
                      isItalic
                        ? 'bg-[#8b1e2a] text-white border-[#8b1e2a] italic'
                        : 'bg-[#faf9f6] text-stone-800 border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    I - ইটালিক (Italic)
                  </button>
                </div>
              </div>

              {/* Text Alignment & Text Position */}
              <div className="space-y-2 pt-2 border-t border-stone-100">
                <label className="text-xs font-anek font-semibold text-stone-800">
                  টেক্সট অ্যালাইনমেন্ট (Text Alignment):
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {(['left', 'center', 'right', 'justify'] as TextAlign[]).map((align) => (
                    <button
                      key={align}
                      type="button"
                      onClick={() => setTextAlign(align)}
                      className={`py-1.5 rounded-lg border text-xs capitalize transition-all ${
                        textAlign === align
                          ? 'bg-[#8b1e2a] text-white border-[#8b1e2a] font-semibold'
                          : 'bg-[#faf9f6] text-stone-800 border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      {align}
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Position */}
              <div className="space-y-2 pt-2 border-t border-stone-100">
                <label className="text-xs font-anek font-semibold text-stone-800">
                  পজিশন (Text Position):
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['center', 'top', 'bottom'] as TextPosition[]).map((pos) => (
                    <button
                      key={pos}
                      type="button"
                      onClick={() => setTextPosition(pos)}
                      className={`py-1.5 rounded-lg border text-xs capitalize transition-all ${
                        textPosition === pos
                          ? 'bg-[#8b1e2a] text-white border-[#8b1e2a] font-semibold'
                          : 'bg-[#faf9f6] text-stone-800 border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      {pos === 'center' ? 'মাঝখানে' : pos === 'top' ? 'উপরে' : 'নিচে'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Palette */}
              <div className="space-y-2 pt-2 border-t border-stone-100">
                <label className="text-xs font-anek font-semibold text-stone-800">
                  টেক্সট রঙ (Text Color):
                </label>
                <div className="flex items-center gap-2">
                  {COLOR_PALETTES.map((p) => (
                    <button
                      key={p.color}
                      type="button"
                      onClick={() => setTextColor(p.color)}
                      style={{ backgroundColor: p.color }}
                      className={`w-7 h-7 rounded-full border-2 transition-all ${
                        textColor === p.color ? 'border-[#8b1e2a] scale-110 shadow-sm ring-2 ring-[#8b1e2a]/30' : 'border-stone-300'
                      }`}
                      title={p.label}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: VINTAGE EFFECTS & ASPECT RATIO (Section 9 & 16) */}
          {activeTab === 'effects' && (
            <div className="space-y-5 rounded-xl border border-stone-200 bg-white p-5 shadow-xs">
              <div className="pb-2 border-b border-stone-100">
                <h3 className="text-base font-bengali-serif font-bold text-stone-900 flex items-center gap-1.5">
                  <Palette className="w-4 h-4 text-[#8b1e2a]" />
                  <span>৯. ভিন্টেজ ফিল্টার ও অনুপাত</span>
                </h3>
              </div>

              {/* Visual Effects Grid */}
              <div className="space-y-2">
                <label className="text-xs font-anek font-semibold text-stone-800">
                  ভিন্টেজ ফিল্টার এফেক্ট (Vintage Effect):
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {VINTAGE_EFFECTS.map((eff) => (
                    <button
                      key={eff.id}
                      type="button"
                      onClick={() => setEffect(eff.id)}
                      className={`p-2.5 rounded-lg border text-left text-xs transition-all flex items-center gap-2 ${
                        effect === eff.id
                          ? 'bg-[#8b1e2a] text-white border-[#8b1e2a] font-semibold shadow-xs'
                          : 'bg-[#faf9f6] text-stone-800 border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <span className="text-base">{eff.icon}</span>
                      <span className="truncate">{eff.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Aspect Ratio Selector (Section 16: Social Media Export) */}
              <div className="space-y-2 pt-3 border-t border-stone-100">
                <label className="text-xs font-anek font-semibold text-stone-800">
                  সোশ্যাল মিডিয়া অনুপাত (Export Size Ratio):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ASPECT_RATIOS.map((ratio) => (
                    <button
                      key={ratio.id}
                      type="button"
                      onClick={() => setAspectRatio(ratio.id)}
                      className={`p-2 rounded-lg border text-left text-xs transition-all ${
                        aspectRatio === ratio.id
                          ? 'bg-[#8b1e2a] text-white border-[#8b1e2a] font-semibold'
                          : 'bg-[#faf9f6] text-stone-800 border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <div>{ratio.label}</div>
                      <div className="text-[10px] opacity-75 font-mono">{ratio.sub}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ==================================================
            RIGHT COLUMN: REALISTIC LIVE POSTCARD PREVIEW
            ================================================== */}
        <div className={`lg:col-span-7 space-y-4 lg:sticky lg:top-20 ${mobileView === 'preview' ? 'block' : 'hidden lg:block'}`}>
          <div className="p-3 sm:p-6 rounded-2xl border border-stone-200 bg-white shadow-md relative">
            {/* Mobile quick back & download action bar */}
            <div className="lg:hidden flex items-center justify-between pb-3 mb-3 border-b border-stone-100">
              <button
                type="button"
                onClick={() => setMobileView('editor')}
                className="px-3.5 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 text-xs font-bengali-serif font-medium flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <span>← এডিট প্যানেলে ফিরুন</span>
              </button>
              <button
                type="button"
                onClick={() => setIsDownloadGateOpen(true)}
                className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#8b1e2a] to-[#a82333] text-white text-xs font-bengali-serif font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>ডাউনলোড</span>
              </button>
            </div>

            {/* Top Bar above preview */}
            <div className="flex items-center justify-between mb-3 sm:mb-4 pb-2 border-b border-stone-100 text-xs text-stone-700 font-anek">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Eye className="w-3.5 h-3.5 text-[#8b1e2a]" />
                <span className="font-cinzel tracking-wider uppercase font-bold text-stone-900 text-[11px] sm:text-xs">
                  LIVE POSTCARD PREVIEW
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] text-stone-500">
                যেটি দেখছেন, হুবহু এটিই ডাউনলোড হবে
              </span>
            </div>

            {/* The Live Postcard Component */}
            <div className="flex items-center justify-center p-2 sm:p-5 bg-[#faf8f5] rounded-xl border border-stone-200 overflow-hidden">
              <PostcardCanvas
                ref={canvasRef}
                state={currentState}
                id="main-postcard-canvas"
                isExporting={isExporting}
              />
            </div>

            {/* Preview Action Bar */}
            <div className="mt-4 sm:mt-5 pt-3 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-[11px] sm:text-xs text-stone-500 font-anek flex items-center gap-1.5">
                <span className="text-[#8b1e2a] font-bold">✓</span>
                <span>কোনো প্রকার ওয়াটারমার্ক বা ওয়েবসাইট ইউআই ডাউনলোড হবে না</span>
              </div>

              {/* Main HD Download Button */}
              <button
                id="preview-bottom-download-btn"
                type="button"
                onClick={() => setIsDownloadGateOpen(true)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-gradient-to-r from-[#8b1e2a] to-[#a82333] hover:from-[#9c2230] hover:to-[#bd273a] text-white font-bengali-serif font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>⬇️ HD পোস্টকার্ড ডাউনলোড করুন</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 8-Second Sponsor Download Gate Modal */}
      <DownloadGateModal
        isOpen={isDownloadGateOpen}
        onClose={() => setIsDownloadGateOpen(false)}
        onDownloadReady={handleConfirmDownload}
        isDownloading={isExporting}
      />
    </div>
  );
};
