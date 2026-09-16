import React from 'react';
import { Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer
      id="vintage-footer"
      className="relative mt-20 border-t border-stone-200 bg-white text-stone-700 overflow-hidden"
    >
      {/* Subtle decorative top border */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#8b1e2a]/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#8b1e2a] bg-rose-50 text-[#8b1e2a]">
                <span className="text-lg">💌</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-cinzel text-xl font-bold tracking-wider text-stone-900">
                  Circle Post
                </span>
                <span className="text-xs font-bengali-serif font-bold text-[#8b1e2a] px-2 py-0.5 rounded-full bg-rose-50 border border-rose-200">
                  সার্কেল পোস্ট
                </span>
              </div>
            </div>

            <p className="text-sm font-bengali-serif text-stone-800 italic max-w-md leading-relaxed">
              “পুরনো দিনের অনুভূতি, আজকের ভালোবাসার জন্য।”
            </p>

            <p className="text-xs font-anek text-stone-600 max-w-md leading-relaxed">
              সার্কেল পোস্ট – একটি ক্লাসিক ভিন্টেজ প্রেমের পোস্টকার্ড জেনারেটর। ভালোবাসার উক্তি বা নিজের মনের ভাব দিয়ে তৈরি করুন অনন্য স্মৃতিচিহ্ন, এবং ডাউনলোড করুন সম্পূর্ণ এইচডি কোয়ালিটিতে।
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <div className="text-xs uppercase tracking-widest text-[#8b1e2a] font-cinzel font-semibold">
              নেভিগেশন
            </div>
            <ul className="space-y-2 text-xs font-anek text-stone-600">
              <li>
                <button
                  id="footer-link-home"
                  onClick={() => onNavigate('home')}
                  className="hover:text-stone-900 transition-colors"
                >
                  Home (হোমপেজ)
                </button>
              </li>
              <li>
                <button
                  id="footer-link-postcards"
                  onClick={() => onNavigate('postcards')}
                  className="hover:text-stone-900 transition-colors"
                >
                  Postcards (পোস্টকার্ড সম্ভার)
                </button>
              </li>
              <li>
                <button
                  id="footer-link-quotes"
                  onClick={() => onNavigate('quotes')}
                  className="hover:text-stone-900 transition-colors"
                >
                  Quotes (রোমান্টিক উক্তি)
                </button>
              </li>
              <li>
                <button
                  id="footer-link-gallery"
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-stone-900 transition-colors"
                >
                  Vintage Gallery (ভিন্টেজ গ্যালারি)
                </button>
              </li>
              <li>
                <button
                  id="footer-link-generator"
                  onClick={() => onNavigate('generator')}
                  className="hover:text-[#8b1e2a] font-medium transition-colors text-[#8b1e2a]"
                >
                  ✨ পোস্টকার্ড জেনারেটর
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Info */}
          <div className="space-y-3">
            <div className="text-xs uppercase tracking-widest text-[#8b1e2a] font-cinzel font-semibold">
              তথ্য ও নীতি
            </div>
            <ul className="space-y-2 text-xs font-anek text-stone-600">
              <li>
                <span className="hover:text-stone-900 cursor-pointer">Privacy Policy (গোপনীয়তা নীতি)</span>
              </li>
              <li>
                <span className="hover:text-stone-900 cursor-pointer">Terms of Service (শর্তাবলী)</span>
              </li>
              <li>
                <span className="hover:text-stone-900 cursor-pointer">Contact (যোগাযোগ)</span>
              </li>
              <li>
                <span className="text-[11px] text-stone-500">
                  সার্ভারহীন ব্রাউজার-সাইড এইচডি রেন্ডারিং
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom divider & Copyright */}
        <div className="mt-12 pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-anek text-stone-500">
          <p>© {new Date().getFullYear()} Circle Post (সার্কেল পোস্ট) Archive. সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex items-center gap-1.5 text-stone-600">
            <span>ভালোবাসা ও স্মৃতিতে নির্মিত</span>
            <Heart className="w-3.5 h-3.5 fill-[#8b1e2a] text-[#8b1e2a]" />
          </div>
        </div>
      </div>
    </footer>
  );
};
