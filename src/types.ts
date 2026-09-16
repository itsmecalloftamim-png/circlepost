export type AspectRatio = 'postcard' | 'square' | 'story' | 'facebook' | 'status';

export type VintageEffect =
  | 'original'
  | 'sepia'
  | 'old-paper'
  | 'faded'
  | 'black-white'
  | 'film-grain'
  | 'dust-scratch'
  | 'coffee-stain'
  | 'warm-vintage';

export type FontFamily =
  | 'noto-serif-bengali'
  | 'tiro-bangla'
  | 'anek-bangla'
  | 'playfair-display'
  | 'special-elite'
  | 'great-vibes'
  | 'cormorant-garamond';

export type TextPosition = 'center' | 'top' | 'bottom' | 'right' | 'split';

export type TextAlign = 'left' | 'center' | 'right' | 'justify';

export interface TextCustomization {
  fontFamily: FontFamily;
  fontSize: number; // in px or scale
  isBold: boolean;
  isItalic: boolean;
  textAlign: TextAlign;
  letterSpacing: number; // in px
  lineHeight: number; // relative, e.g. 1.6
  textColor: string;
  textPosition: TextPosition;
}

export interface PostcardTemplate {
  id: string;
  title: string;
  category: string;
  image: string; // URL or background asset
  defaultQuote: string;
  defaultRecipient?: string;
  defaultSender?: string;
  defaultDate?: string;
  theme: {
    accentColor: string;
    borderStyle: 'ornate' | 'simple' | 'stamp' | 'classic' | 'airmail';
    stampIcon?: string;
    stampTitle?: string;
  };
  featured?: boolean;
  isNew?: boolean;
  collection?: 'popular' | 'new' | 'romantic' | 'rainy' | 'letter';
}

export interface QuoteItem {
  id: string;
  text: string;
  author?: string;
  category: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  quote: string;
  author?: string;
}

export interface CategoryInfo {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface PostcardState {
  template: PostcardTemplate;
  recipient: string;
  bodyText: string;
  sender: string;
  date: string;
  customization: TextCustomization;
  effect: VintageEffect;
  aspectRatio: AspectRatio;
}
