# دليل إدارة وتحديث منتجات دُر للهدايا (DUR GIFTS)
## Product Management & Catalog Guide

هذا الدليل يشرح بكل سهولة كيف يمكنك إضافة وتعديل منتجات المتجر بدون الحاجة لأي خبرة برمجية مسبقة.

---

### الطريقة الأولى: من خلال الموقع مباشرة (أسهل وأسرع طريقة)

1. افتح الموقع واضغط على زر **«إدارة المنتجات» (Catalog Manager)** الموجود في القائمة العلوية أو أسفل الموقع في الفوتر.
2. ستفتح لك لوحة تحكم تفاعلية:
   - **تعديل قطعة:** اضغط على أيقونة القلم بجانب أي مسبحة لتعديل اسمها (بالعربية والإنجليزية)، سعرها، وصفها، ومواصفاتها.
   - **إضافة قطعة جديدة:** اضغط زر **«إضافة قطعة جديدة»** واملأ البيانات.
   - **إخفاء/إظهار قطعة:** اضغط أيقونة العين لإخفاء أي قطعة مؤقتاً عند نفاد الكمية وإعادتها لاحقاً بنقرة واحدة.
   - **حفظ التغييرات في المتجر بشكل دائم:**
     - اضغط زر **«تحميل ملف products.json المحدث»**.
     - استبدل الملف في مسار `src/data/products.json` و `public/data/products.json`.

---

### الطريقة الثانية: تعديل ملف `products.json` مباشرة

يحتوي ملف `src/data/products.json` على جميع المنتجات بتنسيق بسيط ومباشر. كل منتج منظم بهذا الشكل:

```json
{
  "id": "dur-82-honey-barrel",
  "name": {
    "en": "Honey Barrel Amber Misbaha",
    "ar": "مسبحة كهرمان برميل العسل"
  },
  "category": "premium-misbahas",
  "price": {
    "en": "AED 650",
    "ar": "٦٥٠ درهم"
  },
  "image": "/assets/aistudio/82_Honey_Barrel_cleaned_1940x2576_07e30b70.jpg",
  "description": {
    "en": "Hand-carved premium honey-amber barrel beads...",
    "ar": "حبات برميلية منحوتة يدوياً من الكهرمان العسلي الفاخر..."
  },
  "specs": {
    "en": {
      "beadCount": "33 Beads",
      "beadShape": "Barrel Cut",
      "material": "Warm Translucent Honey Amber",
      "tassel": "Hand-braided silk & gold bullion thread",
      "origin": "Handcrafted in the UAE"
    },
    "ar": {
      "beadCount": "٣٣ حبة",
      "beadShape": "قصة برميلية ملساء",
      "material": "كهرمان عسلي فاخر شفاف",
      "tassel": "كركوشة حريرية مجدولة مع خيوط القصب الذهبية",
      "origin": "صياغة متقنة في دولة الإمارات"
    }
  },
  "inStock": true,
  "featured": true,
  "visible": true
}
```

#### التصنيفات المعتمدة في المتجر:
- `premium-misbahas` : مسابح فاخرة
- `luxury-misbahas` : مسابح ملكية
- `special-collections` : مجموعات خاصة
- `gifts-accessories` : هدايا وإكسسوارات وفضة (Gifts, Accessories & Silver)

#### لإضافة صور جديدة:
ضع صور المنتجات داخل مجلد `public/assets/` واستدعها في حقل `"image"` مثل:
`"/assets/my_new_misbaha.jpg"`

---

### نظام الطلب عبر واتساب:
عندما يضغط العميل على **«اطلب عبر واتساب»**، يقوم النظام تلقائياً بإنشاء رسالة واتساب جاهزة تحتوي على اسم المنتج وسعره وتفتح محادثة فورية مع الرقم الرسمي لعلامة دُر:
**`+971526700503`**
رابط المراسلة التلقائي: `https://wa.me/971526700503`
