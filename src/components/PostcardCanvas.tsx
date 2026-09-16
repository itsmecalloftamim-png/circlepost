import React, { forwardRef } from 'react';
import { PostcardState, AspectRatio } from '../types';

interface PostcardCanvasProps {
  state: PostcardState;
  id?: string;
  isExporting?: boolean;
}

export const PostcardCanvas = forwardRef<HTMLDivElement, PostcardCanvasProps>(
  ({ state, id = 'vintage-postcard-render-node', isExporting = false }, ref) => {
    const { template, recipient, bodyText, sender, date, customization, effect, aspectRatio } = state;

    // Determine aspect ratio class
    const getAspectRatioClass = (ratio: AspectRatio) => {
      switch (ratio) {
        case 'square':
          return 'aspect-square max-w-[620px]';
        case 'story':
        case 'status':
          return 'aspect-[9/16] max-w-[440px]';
        case 'facebook':
          return 'aspect-[1.91/1] max-w-[760px]';
        case 'postcard':
        default:
          return 'aspect-[3/2] max-w-[740px]';
      }
    };

    // Determine font family CSS class
    const getFontFamilyClass = (fontFamily: string) => {
      switch (fontFamily) {
        case 'tiro-bangla':
          return 'font-tiro';
        case 'anek-bangla':
          return 'font-anek';
        case 'playfair-display':
          return 'font-playfair';
        case 'special-elite':
          return 'font-typewriter';
        case 'great-vibes':
          return 'font-calligraphy';
        case 'cormorant-garamond':
          return 'font-garamond';
        case 'noto-serif-bengali':
        default:
          return 'font-bengali-serif';
      }
    };

    // Text position layout
    const getTextPositionClass = (pos: string) => {
      switch (pos) {
        case 'top':
          return 'justify-start pt-6';
        case 'bottom':
          return 'justify-end pb-6';
        case 'right':
          return 'justify-center items-end text-right';
        case 'split':
          return 'justify-center';
        case 'center':
        default:
          return 'justify-center items-center text-center';
      }
    };

    // Effect filter class
    const getEffectClass = (eff: string) => {
      switch (eff) {
        case 'sepia':
          return 'effect-sepia';
        case 'old-paper':
          return 'effect-old-paper';
        case 'faded':
          return 'effect-faded';
        case 'black-white':
          return 'effect-black-white';
        case 'film-grain':
          return 'effect-film-grain';
        case 'dust-scratch':
          return 'effect-dust-scratch';
        case 'coffee-stain':
          return 'effect-coffee-stain';
        case 'warm-vintage':
          return 'effect-warm-vintage';
        case 'original':
        default:
          return 'effect-original';
      }
    };

    return (
      <div
        id={id}
        ref={ref}
        className={`relative w-full ${getAspectRatioClass(
          aspectRatio
        )} mx-auto overflow-hidden rounded-md shadow-2xl transition-all duration-300 select-none bg-[#191410] border-4 border-[#2b211a]`}
        style={{
          boxShadow: '0 20px 50px -10px rgba(0,0,0,0.85), 0 0 1px 1px rgba(197, 168, 128, 0.2)',
        }}
      >
        {/* Background Vintage Artwork with Selected Effect */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 ${getEffectClass(
            effect
          )}`}
          style={{
            backgroundImage: `url(${template.image})`,
          }}
        />

        {/* Aged Parchment / Vignette & Atmosphere Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0a07]/90 via-[#18120d]/75 to-[#0e0a07]/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[#e8dfcf]/10 mix-blend-overlay" />
        
        {/* Vintage Paper Texture & Vignette */}
        <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.85)] pointer-events-none" />

        {/* Coffee stain overlay if selected */}
        {effect === 'coffee-stain' && (
          <div className="absolute -bottom-8 -right-8 w-44 h-44 rounded-full border-[6px] border-[#4a2e18]/30 pointer-events-none filter blur-[1px] rotate-12 scale-110" />
        )}

        {/* Film grain / scratch texture */}
        {(effect === 'film-grain' || effect === 'dust-scratch') && (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#000]/10 to-[#000]/40 pointer-events-none" />
        )}

        {/* Outer Vintage Border */}
        <div className="absolute inset-2 sm:inset-3 border border-[#c5a880]/40 rounded-sm pointer-events-none" />
        <div className="absolute inset-3 sm:inset-4 border border-[#c5a880]/20 rounded-sm pointer-events-none" />

        {/* Decorative Vintage Corner Flourishes */}
        <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 text-[#c5a880]/50 text-[10px] sm:text-xs font-serif pointer-events-none">✦</div>
        <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 text-[#c5a880]/50 text-[10px] sm:text-xs font-serif pointer-events-none">✦</div>
        <div className="absolute bottom-2.5 left-2.5 sm:bottom-4 sm:left-4 text-[#c5a880]/50 text-[10px] sm:text-xs font-serif pointer-events-none">✦</div>
        <div className="absolute bottom-2.5 right-2.5 sm:bottom-4 sm:right-4 text-[#c5a880]/50 text-[10px] sm:text-xs font-serif pointer-events-none">✦</div>

        {/* Top Header: Postcard Banner & Vintage Postage Stamp */}
        <div className="relative z-10 px-3 sm:px-6 pt-3 sm:pt-5 pb-1 sm:pb-2 flex items-start justify-between">
          {/* Postcard Archive Typography */}
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-cinzel text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] text-[#c5a880] font-bold uppercase drop-shadow-sm">
                POST CARD
              </span>
              <span className="text-[9px] sm:text-[10px] text-[#c5a880]/60 font-bengali-serif">· কার্তেল পোষ্টাল</span>
            </div>
            <div className="text-[8px] sm:text-[9px] text-[#d4c6b1]/60 tracking-wider font-anek uppercase">
              Union Postale Universelle · {template.category}
            </div>
          </div>

          {/* Vintage Stamp & Cancellation Mark */}
          <div className="relative flex items-center">
            {/* Rubber Ink Postmark Cancellation Seal: Circle Post */}
            <div className="absolute -left-9 sm:-left-12 -top-1 w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#1a120b]/70 flex flex-col items-center justify-center rotate-[-15deg] pointer-events-none opacity-85 select-none text-[#d4c6b1]/80">
              <div className="text-[6px] sm:text-[7px] font-bold tracking-widest uppercase font-cinzel text-center leading-none">
                CIRCLE POST
              </div>
              <div className="w-9 sm:w-12 h-[1px] bg-[#d4c6b1]/40 my-0.5"></div>
              <div className="text-[7px] sm:text-[8px] font-mono tracking-tight font-bold">
                {date ? date.slice(0, 10) : '1974.02.14'}
              </div>
              <div className="w-9 sm:w-12 h-[1px] bg-[#d4c6b1]/40 my-0.5"></div>
              <div className="text-[5px] sm:text-[6px] tracking-widest font-anek uppercase">
                G.P.O. DHAKA
              </div>
              {/* Cancellation wavy ink lines */}
              <div className="absolute -right-4 sm:-right-6 top-5 sm:top-6 flex flex-col gap-0.5 sm:gap-1 w-6 sm:w-8">
                <div className="h-[1px] sm:h-[1.5px] bg-[#d4c6b1]/40 rounded-full"></div>
                <div className="h-[1px] sm:h-[1.5px] bg-[#d4c6b1]/40 rounded-full"></div>
                <div className="h-[1px] sm:h-[1.5px] bg-[#d4c6b1]/40 rounded-full"></div>
              </div>
            </div>

            {/* Serrated Postage Stamp */}
            <div className="relative w-12 h-16 sm:w-16 sm:h-20 bg-[#f7f2e4] text-[#1b1510] p-1 rounded-[2px] shadow-lg border border-[#3e3024] flex flex-col justify-between overflow-hidden shrink-0">
              <div className="flex justify-between items-center text-[6px] sm:text-[7px] font-bold font-cinzel text-[#8b1e2a] border-b border-[#8b1e2a]/30 pb-0.5">
                <span>{template.theme.stampTitle ? template.theme.stampTitle.split('·')[0] : 'POST'}</span>
                <span>৫ আনা</span>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center my-0.5 bg-[#eae2cd] border border-dashed border-[#8b1e2a]/30 rounded-[1px] p-0.5">
                <span className="text-lg sm:text-2xl drop-shadow-sm">
                  {template.theme.stampIcon || '💌'}
                </span>
                <span className="text-[5px] sm:text-[6px] font-anek font-semibold text-[#5a4231] line-clamp-1">
                  {template.category}
                </span>
              </div>
              <div className="text-[5px] sm:text-[6px] text-center font-bold tracking-tighter uppercase font-cinzel text-[#36271c] leading-none pt-0.5">
                VINTAGE LOVE
              </div>
            </div>
          </div>
        </div>

        {/* Middle Body: Recipient, Quote/Body, Sender */}
        <div
          className={`relative z-10 px-4 sm:px-8 py-2 sm:py-4 flex flex-col h-[calc(100%-95px)] sm:h-[calc(100%-120px)] ${getTextPositionClass(
            customization.textPosition
          )}`}
        >
          {/* Recipient / প্রাপক */}
          {recipient && (
            <div className="mb-2 sm:mb-3 text-left w-full">
              <span className="text-[11px] sm:text-sm font-anek text-[#c5a880] tracking-wide inline-flex items-center gap-1 sm:gap-1.5 pb-0.5 border-b border-[#c5a880]/30 font-medium">
                <span>প্রাপক:</span>
                <span className="text-[#f5eedc] font-semibold">{recipient}</span>
              </span>
            </div>
          )}

          {/* Main Love Message / Quote */}
          <div
            className={`my-auto py-1 sm:py-2 transition-all break-words ${getFontFamilyClass(customization.fontFamily)}`}
            style={{
              fontSize: `${customization.fontSize}px`,
              fontWeight: customization.isBold ? 700 : 400,
              fontStyle: customization.isItalic ? 'italic' : 'normal',
              textAlign: customization.textAlign,
              letterSpacing: `${customization.letterSpacing}px`,
              lineHeight: customization.lineHeight,
              color: customization.textColor,
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.8), 0 1px 3px rgba(0, 0, 0, 0.9)',
            }}
          >
            <p className="whitespace-pre-wrap leading-relaxed select-text">
              “{bodyText || template.defaultQuote}”
            </p>
          </div>

          {/* Sender & Date lines */}
          <div className="mt-2 sm:mt-4 pt-1 sm:pt-2 w-full flex items-end justify-between border-t border-[#c5a880]/20">
            {/* Date */}
            <div className="text-left">
              {date ? (
                <div className="text-[9px] sm:text-xs text-[#d4c6b1]/80 font-anek flex items-center gap-1">
                  <span className="text-[#c5a880]/70">তারিখ:</span>
                  <span>{date}</span>
                </div>
              ) : (
                <div className="text-[8px] sm:text-[9px] text-[#c5a880]/40 font-cinzel uppercase tracking-widest">
                  VINTAGE POSTCARD ARCHIVE
                </div>
              )}
            </div>

            {/* Sender / প্রেরক */}
            {sender && (
              <div className="text-right">
                <div className="text-[11px] sm:text-sm font-anek text-[#c5a880] font-medium">
                  <span className="text-[#f5eedc] font-semibold italic">{sender}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Vintage Postage Footer Watermark/Numbering */}
        <div className="absolute bottom-1.5 sm:bottom-2 inset-x-4 sm:inset-x-6 z-10 flex items-center justify-between text-[7px] sm:text-[8px] text-[#c5a880]/40 font-mono tracking-widest uppercase">
          <span>NO. {template.id.toUpperCase()}</span>
          <span>POSTCARD ARCHIVE · BENGAL SERIES</span>
        </div>
      </div>
    );
  }
);

PostcardCanvas.displayName = 'PostcardCanvas';
