import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'ar' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  dir: 'rtl' | 'ltr';
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  ar: {
    // Brand
    brandName: 'دُر للهدايا',
    brandTagline: 'هدايا تحمل قيمة تدوم',
    brandEnglishTagline: 'Gifts Worth Keeping',
    
    // Navigation
    navHome: 'الرئيسية',
    navShop: 'المتجر المستقل',
    navBestSellers: 'الأكثر طلباً',
    navNewArrivals: 'وصلنا حديثاً',
    navCollection: 'المجموعة',
    navAbout: 'عن دُر',
    navContact: 'التواصل والموقع',
    navManage: 'إدارة المنتجات',
    orderOnWhatsApp: 'اطلب عبر واتساب',
    
    // Hero
    heroHeadline: 'هدايا تحمل قيمة تدوم',
    heroSubheadline: 'مجموعات استثنائية من المسابح الملكية الفاخرة والهدايا التذكارية المختارة بعناية، تجمع بين فخامة التصميم وأصالة الإهداء الراقي.',
    exploreCollection: 'تصفح المتجر المستقل',
    whatsappConsultation: 'تواصل مباشرة عبر واتساب',
    heroBadge1: 'صياغة يدوية فاخرة',
    heroBadge2: 'طلب فوري ومباشر عبر واتساب',
    heroBadge3: 'توصيل سريع لكافة إمارات الدولة',
    
    // Catalog & Badges
    catalogTitle: 'مجموعة مسابح وهدايا دُر',
    catalogSubtitle: 'كل قطعة هي تحفة فنية صممت لتبقى وتورث عبر الأجيال',
    bestSellersTitle: 'القطع الأكثر طلباً',
    bestSellersSubtitle: 'المسابح الأكثر اقتناءً وإهداءً بين عملاء دُر المتميزين',
    newArrivalsTitle: 'وصلنا حديثاً',
    newArrivalsSubtitle: 'أحدث إبداعات الصياغة اليدوية المنضمة لمجموعة دُر الملكية',
    allCategories: 'كافة القطع',
    catBestSellers: 'الأكثر طلباً',
    catNewArrivals: 'وصلنا حديثاً',
    catPremium: 'مسابح فاخرة',
    catLuxury: 'مسابح ملكية',
    catSpecial: 'مجموعات خاصة',
    catSilver: 'فضة',
    catGifts: 'هدايا وإكسسوارات',
    productSku: 'كود القطعة',
    bestSellerTag: 'الأكثر طلباً ★',
    newArrivalTag: 'وصل حديثاً ✨',
    exportAccountingCsv: 'تصدير أكواد المحاسبة (CSV)',
    searchPlaceholder: 'ابحث باسم المسبحة أو الخامة أو الكود...',
    filterCategory: 'التصنيف',
    sortBy: 'الترتيب',
    sortFeatured: 'المميزة أولاً',
    sortPriceLow: 'السعر: من الأقل للأعلى',
    sortPriceHigh: 'السعر: من الأعلى للأقل',
    orderNow: 'طلب عبر واتساب',
    viewDetails: 'عرض التفاصيل',
    inStock: 'متوفر للطلب الفوري',
    noProductsFound: 'لم يتم العثور على قطع مطابقة للبحث',
    clearFilter: 'إعادة ضبط الفلاتر',
    
    // Product Detail
    specifications: 'مواصفات القطعة',
    beadCount: 'عدد الحبات',
    beadShape: 'قصة الحبة',
    material: 'الخامة والأحجار',
    tassel: 'الكركوشة والخيوط',
    origin: 'الصناعة والجودة',
    included: 'محتويات الهدية',
    purpose: 'المناسبات',
    dimensions: 'المقاس والأبعاد',
    orderViaWhatsApp: 'طلب هذه القطعة عبر واتساب',
    sharePiece: 'مشاركة الرابط',
    copiedLink: 'تم نسخ الرابط بنجاح!',
    close: 'إغلاق',
    
    // About
    aboutSectionTitle: 'قصة دُر',
    aboutHeadline: 'حيث يلتقي عبق التراث بفخامة الحاضر',
    aboutParagraph1: 'انطلقت «دُر للهدايا» لتقدم مفهوماً راقياً للإهداء؛ حيث لا يقاس الإهداء بتكلفته بل بما يتركه من أثر وقيمة تدوم.',
    aboutParagraph2: 'اسم «دُر» مستوحى من لآلئ الخليج العربي الفريدة التي طالما ارتبطت بمجد وتاريخ الآباء والأجداد. كل مسبحة وهدية نقدمها يتم انتقاؤها وتفصيلها بأعلى معايير الإتقان، لتكون رفيقاً يومياً وهدية تليق بأغلى المقامات.',
    
    // Contact & Location
    contactSectionTitle: 'التواصل والموقع',
    contactHeadline: 'يسعدنا خدمتكم وتلبية طلباتكم الخاصة',
    contactSubtitle: 'فريق خدمة عملاء دُر جاهز دائماً للرد على استفساراتكم وتنسيق طلباتكم.',
    whatsappOrderTitle: 'الطلب الفوري عبر واتساب',
    whatsappOrderDesc: 'اضغط للتحدث المباشر مع مستشار الهدايا وتأكيد طلبك',
    ourLocationTitle: 'موقعنا في دولة الإمارات',
    ourLocationDesc: 'خدمة التوصيل السريع متاحة لكافة مدن الإمارات.',
    openGoogleMaps: 'فتح الموقع على خرائط Google',
    socialMediaTitle: 'تابعوا جديد دُر على منصاتنا الرسمية',
    
    // Product Management Tool
    managementTitle: 'لوحة إدارة منتجات دُر',
    managementSubtitle: 'تعديل وحفظ الكتالوج بدون الحاجة لخبرة برمجية',
    downloadJsonBtn: 'تحميل ملف products.json المحدث',
    copyJsonBtn: 'نسخ الكود إلى الحافظة',
    resetDefaultBtn: 'استعادة المنتجات الأصلية',
    addNewProduct: 'إضافة قطعة جديدة',
    editProduct: 'تعديل القطعة',
    deleteProduct: 'حذف القطعة',
    visibilityShow: 'معروض في المتجر',
    visibilityHide: 'مخفي مؤقتاً',
    saveChanges: 'حفظ التعديلات',
    cancel: 'إلغاء',
    
    // Floating CTA
    chatWithUs: 'تواصل مع دُر عبر واتساب',
    
    // Footer
    copyright: 'جميع الحقوق محفوظة لـ دُر للهدايا © 2026',
    freeDeliveryNote: 'توصيل متاح إلى أبوظبي، دبي، الشارقة، عجمان، أم القيوين، رأس الخيمة، والفجيرة.',
    freeHostingGuideLink: 'دليل النشر والاستضافة المجانية'
  },
  en: {
    // Brand
    brandName: 'DUR GIFTS',
    brandTagline: 'هدايا تحمل قيمة تدوم',
    brandEnglishTagline: 'Gifts Worth Keeping',
    
    // Navigation
    navHome: 'Home',
    navShop: 'Full Store',
    navBestSellers: 'Best Sellers',
    navNewArrivals: 'New Arrivals',
    navCollection: 'Collection',
    navAbout: 'About DUR',
    navContact: 'Contact & Location',
    navManage: 'Catalog Manager',
    orderOnWhatsApp: 'Order via WhatsApp',
    
    // Hero
    heroHeadline: 'Gifts Worth Keeping',
    heroSubheadline: 'Curated collections of prestigious misbahas and bespoke gifts, meticulously crafted to reflect distinction, elegance, and enduring luxury.',
    exploreCollection: 'Browse Full Store',
    whatsappConsultation: 'Order via WhatsApp',
    heroBadge1: 'Master Handcrafted Distinction',
    heroBadge2: 'Direct WhatsApp Concierge',
    heroBadge3: 'Express Delivery Across All Emirates',
    
    // Catalog & Badges
    catalogTitle: 'DUR Misbahas & Gift Collection',
    catalogSubtitle: 'Every piece is a masterwork designed to endure and be treasured across generations',
    bestSellersTitle: 'Best Sellers & Most Popular',
    bestSellersSubtitle: 'Our most sought-after and gifted heirloom misbahas',
    newArrivalsTitle: 'New Arrivals',
    newArrivalsSubtitle: 'The latest handcrafted creations added to the royal DUR collection',
    allCategories: 'All Pieces',
    catBestSellers: 'Best Sellers',
    catNewArrivals: 'New Arrivals',
    catPremium: 'Premium Misbahas',
    catLuxury: 'Luxury Misbahas',
    catSpecial: 'Special Collections',
    catSilver: 'Silver',
    catGifts: 'Gifts & Accessories',
    productSku: 'Item Code',
    bestSellerTag: 'Best Seller ★',
    newArrivalTag: 'New Arrival ✨',
    exportAccountingCsv: 'Export Accounting Codes (CSV)',
    searchPlaceholder: 'Search by misbaha name, stone, or SKU...',
    filterCategory: 'Category',
    sortBy: 'Sort By',
    sortFeatured: 'Featured Pieces',
    sortPriceLow: 'Price: Low to High',
    sortPriceHigh: 'Price: High to Low',
    orderNow: 'Order via WhatsApp',
    viewDetails: 'View Details',
    inStock: 'In Stock · Ready to Dispatch',
    noProductsFound: 'No pieces match your search criteria',
    clearFilter: 'Reset Filters',
    
    // Product Detail
    specifications: 'Piece Specifications',
    beadCount: 'Bead Count',
    beadShape: 'Bead Cut',
    material: 'Material & Stones',
    tassel: 'Tassel & Binding',
    origin: 'Craftsmanship',
    included: 'Included in Set',
    purpose: 'Occasion',
    dimensions: 'Dimensions',
    orderViaWhatsApp: 'Order This Piece via WhatsApp',
    sharePiece: 'Share Piece',
    copiedLink: 'Link copied to clipboard!',
    close: 'Close',
    
    // About
    aboutSectionTitle: 'The Story of DUR',
    aboutHeadline: 'Where Arabian Heritage Meets Modern Prestige',
    aboutParagraph1: 'DUR GIFTS was born from a timeless philosophy: a true gift is not measured by its cost, but by the warmth, memory, and enduring value it carries.',
    aboutParagraph2: 'The name DUR (دُر) honors the luminous pearls of the Arabian Gulf. Each misbaha and gift is hand-curated to embody supreme refinement—a personal companion for daily contemplation and an heirloom gift for esteemed recipients.',
    
    // Contact & Location
    contactSectionTitle: 'Contact & Location',
    contactHeadline: 'At Your Service for Inquiries and Custom Orders',
    contactSubtitle: 'Our gifting concierge is ready to assist you with inquiries, bespoke boxes, and rapid deliveries.',
    whatsappOrderTitle: 'Direct WhatsApp Concierge',
    whatsappOrderDesc: 'Click to start a WhatsApp chat with our gifting specialist',
    ourLocationTitle: 'United Arab Emirates',
    ourLocationDesc: 'Express white-glove dispatch available to all seven Emirates.',
    openGoogleMaps: 'Open Location on Google Maps',
    socialMediaTitle: 'Follow DUR GIFTS on Official Channels',
    
    // Product Management Tool
    managementTitle: 'DUR Product Manager & Catalog Editor',
    managementSubtitle: 'Easily update products, upload pictures, and export without coding',
    downloadJsonBtn: 'Download Updated products.json',
    copyJsonBtn: 'Copy JSON to Clipboard',
    resetDefaultBtn: 'Restore Original Products',
    addNewProduct: 'Add New Piece',
    editProduct: 'Edit Piece',
    deleteProduct: 'Delete Piece',
    visibilityShow: 'Visible in Store',
    visibilityHide: 'Hidden Temporarily',
    saveChanges: 'Save Changes',
    cancel: 'Cancel',
    
    // Floating CTA
    chatWithUs: 'Chat with DUR on WhatsApp',
    
    // Footer
    copyright: 'All Rights Reserved. DUR GIFTS UAE © 2026',
    freeDeliveryNote: 'Serving Abu Dhabi, Dubai, Sharjah, Ajman, Umm Al Quwain, Ras Al Khaimah & Fujairah.',
    freeHostingGuideLink: 'Free Static Hosting & Deployment Guide'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('dur_gifts_lang');
    if (saved === 'en' || saved === 'ar') return saved;
    return 'ar'; // Arabic as primary default
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('dur_gifts_lang', newLang);
  };

  const toggleLang = () => {
    setLang(lang === 'ar' ? 'en' : 'ar');
  };

  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const t = (key: string): string => {
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, dir, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
