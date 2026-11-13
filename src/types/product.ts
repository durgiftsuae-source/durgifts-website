export interface ProductSpecs {
  beadCount?: string;
  beadShape?: string;
  material?: string;
  tassel?: string;
  origin?: string;
  included?: string;
  purpose?: string;
  dimensions?: string;
}

export interface Product {
  id: string;
  name: {
    en: string;
    ar: string;
  };
  category: 'premium-misbahas' | 'luxury-misbahas' | 'special-collections' | 'gifts-accessories' | 'silver';
  price: {
    en: string;
    ar: string;
  };
  image: string;
  description: {
    en: string;
    ar: string;
  };
  specs: {
    en: ProductSpecs;
    ar: ProductSpecs;
  };
  sku: string;
  inStock: boolean;
  featured: boolean;
  visible: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
}

export type CategoryKey = 'all' | 'premium-misbahas' | 'luxury-misbahas' | 'special-collections' | 'gifts-accessories' | 'silver' | 'best-sellers' | 'new-arrivals';
