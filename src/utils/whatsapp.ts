export const WHATSAPP_NUMBER = '971526700503';
export const WHATSAPP_DISPLAY = '+971 52 670 0503';
export const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/QFLMPV5Rg4JDX8QS8';

export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/durgifts?rpxt=aGs1aHhua3R0MDk=',
  tiktok: 'https://www.tiktok.com/@dur.gifts',
  facebook: 'https://www.facebook.com/share/1EWun9FmcA/',
  threads: 'https://www.threads.com/@durgifts',
  youtube: 'https://youtube.com/@durgifts',
  snapchat: 'https://www.snapchat.com/add/durgifts'
};

export function createProductWhatsAppUrl(
  productName: string,
  productPrice: string,
  productSku?: string,
  lang: 'ar' | 'en' = 'ar'
): string {
  let message = '';
  if (lang === 'ar') {
    message = `مرحباً دُر للهدايا،\nأود طلب المنتج التالي:\n\nالمنتج: ${productName}${productSku ? `\nكود القطعة (SKU): ${productSku}` : ''}\nالسعر: ${productPrice}\n\nيرجى تزويدي بمزيد من التفاصيل وطريقة التوصيل.`;
  } else {
    message = `Hello DUR GIFTS,\nI would like to order the following product:\n\nProduct: ${productName}${productSku ? `\nProduct Code (SKU): ${productSku}` : ''}\nPrice: ${productPrice}\n\nPlease provide me with more details.`;
  }

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function createGeneralInquiryWhatsAppUrl(lang: 'ar' | 'en' = 'ar'): string {
  const message =
    lang === 'ar'
      ? 'مرحباً دُر للهدايا،\nأود الاستفسار عن تشكيلة المسابح الفاخرة وخدمات التغليف والإهداء لديكم.'
      : 'Hello DUR GIFTS,\nI would like to inquire about your luxury misbahas, bespoke gift sets, and delivery across the UAE.';

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
