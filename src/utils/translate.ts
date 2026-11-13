/**
 * Instant Arabic-to-English translation utility for DUR GIFTS products.
 * Uses high-speed client-side translation with luxury misbaha terminology polish.
 */
export async function translateArabicToEnglish(arabicText: string): Promise<string> {
  if (!arabicText || !arabicText.trim()) return '';
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=ar&tl=en&dt=t&q=${encodeURIComponent(arabicText.trim())}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Translation failed');
    const data = await res.json();
    
    if (Array.isArray(data) && Array.isArray(data[0])) {
      const translated = data[0]
        .map((item: any) => (Array.isArray(item) ? item[0] : ''))
        .filter(Boolean)
        .join(' ');

      // Polish luxury misbaha terminology
      return translated
        .replace(/\brosary\b/gi, 'Misbaha')
        .replace(/\brosaries\b/gi, 'Misbahas')
        .replace(/\bprayer beads\b/gi, 'Misbaha')
        .replace(/\s+/g, ' ')
        .trim();
    }
    return '';
  } catch (error) {
    console.warn('Instant translation fallback triggered:', error);
    return '';
  }
}
