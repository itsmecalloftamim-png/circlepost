import React, { useState, useEffect } from 'react';
import { SPONSOR_URL, SPONSOR_COUNTDOWN_SECONDS } from '../config/sponsor';
import { X, ExternalLink, Download, Lock, CheckCircle2, Sparkles, Image as ImageIcon } from 'lucide-react';

interface DownloadGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownloadReady: (format: 'png' | 'jpg') => void;
  isDownloading: boolean;
}

export const DownloadGateModal: React.FC<DownloadGateModalProps> = ({
  isOpen,
  onClose,
  onDownloadReady,
  isDownloading,
}) => {
  const [hasClickedSponsor, setHasClickedSponsor] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(SPONSOR_COUNTDOWN_SECONDS);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [selectedFormat, setSelectedFormat] = useState<'png' | 'jpg'>('png');

  // Reset state whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setHasClickedSponsor(false);
      setCountdown(SPONSOR_COUNTDOWN_SECONDS);
      setIsCompleted(false);
    }
  }, [isOpen]);

  // Countdown timer after sponsor link is clicked
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (hasClickedSponsor && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (hasClickedSponsor && countdown === 0) {
      setIsCompleted(true);
    }
    return () => clearTimeout(timer);
  }, [hasClickedSponsor, countdown]);

  if (!isOpen) return null;

  const handleSponsorClick = () => {
    // Open sponsor URL in new tab safely
    try {
      window.open(SPONSOR_URL, '_blank', 'noopener,noreferrer');
    } catch {
      // fallback
      window.location.href = SPONSOR_URL;
    }
    setHasClickedSponsor(true);
  };

  const handleDownloadClick = () => {
    if (!isCompleted || isDownloading) return;
    onDownloadReady(selectedFormat);
  };

  return (
    <div
      id="download-gate-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isDownloading) onClose();
      }}
    >
      <div
        id="download-gate-modal-card"
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 text-stone-900 shadow-2xl"
      >
        {/* Subtle vintage decorative corner accents */}
        <div className="absolute top-2.5 left-3 text-stone-400 font-serif text-[10px] select-none tracking-widest">✦ CIRCLE POST ✦</div>
        <div className="absolute top-2.5 right-12 text-stone-400 font-serif text-[10px] select-none tracking-widest">✦ HD EXPORT ✦</div>

        {/* Close Button */}
        <button
          id="close-download-gate-button"
          onClick={onClose}
          disabled={isDownloading}
          className="absolute top-3.5 right-3.5 p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
          aria-label="বন্ধ করুন"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header / Seal */}
        <div className="text-center space-y-2 mb-6 mt-1">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-stone-200 bg-[#faf9f6] text-[#8b1e2a] shadow-xs mb-1">
            <span className="text-2xl">💌</span>
          </div>
          <div className="text-xs uppercase tracking-widest text-[#8b1e2a] font-cinzel font-semibold">
            Postcard Ready
          </div>
          <h3 className="text-xl sm:text-2xl font-bengali-serif font-bold text-stone-900">
            আপনার পোস্টকার্ড প্রস্তুত
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 font-anek">
            ডাউনলোড চালু করার আগে Sponsor Page দেখুন।
          </p>
        </div>

        {/* Format Selector */}
        <div className="mb-5 bg-[#faf9f6] border border-stone-200 rounded-xl p-3.5">
          <div className="text-xs text-stone-800 font-anek mb-2 flex items-center gap-1.5 font-semibold">
            <ImageIcon className="w-3.5 h-3.5 text-[#8b1e2a]" />
            ডাউনলোড ফরম্যাট নির্বাচন করুন:
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              id="select-format-png"
              type="button"
              onClick={() => setSelectedFormat('png')}
              className={`py-1.5 px-3 rounded-full text-xs font-semibold transition-all flex items-center justify-center gap-1.5 border cursor-pointer ${
                selectedFormat === 'png'
                  ? 'bg-[#8b1e2a] text-white border-[#8b1e2a] shadow-xs'
                  : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300'
              }`}
            >
              <span className="font-bold">PNG</span>
              <span className="text-[10px] opacity-80">(উচ্চ স্বচ্ছতা)</span>
            </button>
            <button
              id="select-format-jpg"
              type="button"
              onClick={() => setSelectedFormat('jpg')}
              className={`py-1.5 px-3 rounded-full text-xs font-semibold transition-all flex items-center justify-center gap-1.5 border cursor-pointer ${
                selectedFormat === 'jpg'
                  ? 'bg-[#8b1e2a] text-white border-[#8b1e2a] shadow-xs'
                  : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300'
              }`}
            >
              <span className="font-bold">JPG</span>
              <span className="text-[10px] opacity-80">(স্ট্যান্ডার্ড HD)</span>
            </button>
          </div>
        </div>

        {/* Step 1: Sponsor Action */}
        {!hasClickedSponsor ? (
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-center space-y-2">
              <p className="text-xs sm:text-sm text-stone-700 font-anek leading-relaxed">
                আমাদের ফ্রি প্রিমিয়াম সার্ভিস বজায় রাখতে স্পনসর পেজে ক্লিক করুন। এরপর ৮ সেকেন্ডের মধ্যে ডাউনলোড লিঙ্ক সক্রিয় হবে।
              </p>
            </div>

            <button
              id="sponsor-action-button"
              type="button"
              onClick={handleSponsorClick}
              className="w-full py-2.5 px-6 rounded-full bg-gradient-to-r from-[#8b1e2a] to-[#a82333] hover:from-[#9c2230] hover:to-[#bd273a] text-white font-bengali-serif font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xs transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
            >
              <span>👁️ Sponsor দেখুন</span>
              <ExternalLink className="w-4 h-4 ml-1 opacity-90" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 font-anek">
              <Lock className="w-3 h-3 text-[#8b1e2a]" />
              <span>[ 🔒 Download Locked ] স্পনসর দেখার পর আনলক হবে</span>
            </div>
          </div>
        ) : (
          /* Step 2: Countdown or Completed Ready State */
          <div className="space-y-4 text-center">
            {!isCompleted ? (
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex flex-col items-center justify-center space-y-3">
                <div className="relative flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border-2 border-stone-200 border-t-[#8b1e2a] animate-spin flex items-center justify-center"></div>
                  <div className="absolute text-xl sm:text-2xl font-bold font-cinzel text-[#8b1e2a]">
                    0{countdown}
                  </div>
                </div>

                <div className="space-y-0.5">
                  <p className="text-sm font-bengali-serif text-stone-900 font-semibold animate-pulse">
                    Download প্রস্তুত হচ্ছে...
                  </p>
                  <p className="text-xs text-stone-500 font-anek">
                    অনুগ্রহ করে কয়েক সেকেন্ড অপেক্ষা করুন
                  </p>
                </div>

                <button
                  id="locked-download-button"
                  type="button"
                  disabled
                  className="w-full py-2 px-4 rounded-full bg-stone-100 text-stone-400 border border-stone-200 font-bengali-serif text-xs flex items-center justify-center gap-2 cursor-not-allowed"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>[ 🔒 Download Locked ]</span>
                </button>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col items-center justify-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center border border-emerald-300">
                  <CheckCircle2 className="w-6 h-6" />
                </div>

                <div className="space-y-0.5">
                  <div className="text-[11px] uppercase tracking-widest text-emerald-700 font-cinzel font-bold">
                    ✓ READY
                  </div>
                  <p className="text-sm sm:text-base font-bengali-serif font-bold text-stone-900">
                    ✅ Download Ready
                  </p>
                  <p className="text-xs text-emerald-800 font-anek">
                    আপনার {selectedFormat.toUpperCase()} পোস্টকার্ড এখনই সেভ করে নিন
                  </p>
                </div>

                <button
                  id="final-download-button"
                  type="button"
                  onClick={handleDownloadClick}
                  disabled={isDownloading}
                  className="w-full py-2.5 px-6 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bengali-serif font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xs transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                >
                  {isDownloading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>এইচডি ইমেজ তৈরি হচ্ছে...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>⬇️ DOWNLOAD NOW ({selectedFormat.toUpperCase()})</span>
                      <Sparkles className="w-3.5 h-3.5 ml-1 opacity-90" />
                    </>
                  )}
                </button>
              </div>
            )}

            <button
              id="reopen-sponsor-button"
              type="button"
              onClick={handleSponsorClick}
              className="text-xs text-[#8b1e2a] hover:underline font-anek inline-flex items-center gap-1 font-medium cursor-pointer"
            >
              <span>Sponsor পেজ আবার খুলুন</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Small footer notice */}
        <div className="mt-5 pt-3 border-t border-stone-100 text-center">
          <p className="text-[11px] text-stone-500 font-anek">
            কোনো প্রকার ওয়াটারমার্ক বা বিজ্ঞাপন ছাড়া প্রিমিয়াম সম্পূর্ণ এইচডি পোস্টকার্ড।
          </p>
        </div>
      </div>
    </div>
  );
};
