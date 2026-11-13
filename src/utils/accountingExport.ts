import { Product } from '../types/product';

/**
 * Generates and triggers download of a standardized CSV database file
 * ready for direct import into accounting software (QuickBooks, Zoho Books, Odoo, Excel, etc.)
 */
export function exportAccountingCodesCSV(products: Product[]): void {
  const headers = [
    'كود المنتج (SKU)',
    'اسم القطعة (بالعربية)',
    'Product Name (English)',
    'التصنيف (Category)',
    'السعر بالدرهم (Price AED)',
    'حالة التوفر (Stock)',
    'الأكثر طلباً (Best Seller)',
    'وصلنا حديثاً (New Arrival)',
    'عدد الحبات (Bead Count)',
    'الخامة (Material AR)',
    'معرف النظام (System ID)'
  ];

  const rows = products.map((p) => {
    // Extract numerical price for accounting math
    const numPrice = p.price.en.match(/\d+/g)?.join('') || '0';
    return [
      `"${p.sku || p.id}"`,
      `"${(p.name.ar || '').replace(/"/g, '""')}"`,
      `"${(p.name.en || '').replace(/"/g, '""')}"`,
      `"${p.category}"`,
      numPrice,
      p.inStock ? '"متوفر / In Stock"' : '"غير متوفر / Out of Stock"',
      p.isBestSeller ? '"نعم / Yes"' : '"لا / No"',
      p.isNewArrival ? '"نعم / Yes"' : '"لا / No"',
      `"${p.specs?.ar?.beadCount || p.specs?.en?.beadCount || ''}"`,
      `"${(p.specs?.ar?.material || '').replace(/"/g, '""')}"`,
      `"${p.id}"`
    ].join(',');
  });

  // Prepend UTF-8 BOM (\uFEFF) so Excel opens Arabic text cleanly without garbled characters
  const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `DUR_GIFTS_Accounting_Codes_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
