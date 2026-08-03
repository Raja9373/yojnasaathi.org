export interface LanguageInfo {
  code: string;
  nameEn: string;
  nameNative: string;
  dir: 'ltr' | 'rtl';
  region?: string;
  flagEmoji?: string;
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: 'hi', nameEn: 'Hindi', nameNative: 'हिन्दी', dir: 'ltr', region: 'India', flagEmoji: '🇮🇳' },
  { code: 'en', nameEn: 'English', nameNative: 'English', dir: 'ltr', region: 'India', flagEmoji: '🇮🇳' },
  { code: 'as', nameEn: 'Assamese', nameNative: 'অসমীয়া', dir: 'ltr', region: 'Assam' },
  { code: 'bn', nameEn: 'Bengali', nameNative: 'বাংলা', dir: 'ltr', region: 'West Bengal / Tripura' },
  { code: 'brx', nameEn: 'Bodo', nameNative: 'बड़ो', dir: 'ltr', region: 'Bodoland' },
  { code: 'doi', nameEn: 'Dogri', nameNative: 'डोगरी', dir: 'ltr', region: 'Jammu & Kashmir' },
  { code: 'gu', nameEn: 'Gujarati', nameNative: 'ગુજરાતી', dir: 'ltr', region: 'Gujarat' },
  { code: 'kn', nameEn: 'Kannada', nameNative: 'ಕನ್ನಡ', dir: 'ltr', region: 'Karnataka' },
  { code: 'ks', nameEn: 'Kashmiri', nameNative: 'कॉशुर', dir: 'ltr', region: 'Jammu & Kashmir' },
  { code: 'kok', nameEn: 'Konkani', nameNative: 'कोंकणी', dir: 'ltr', region: 'Goa' },
  { code: 'mai', nameEn: 'Maithili', nameNative: 'मैथिली', dir: 'ltr', region: 'Bihar' },
  { code: 'ml', nameEn: 'Malayalam', nameNative: 'മലയാളം', dir: 'ltr', region: 'Kerala' },
  { code: 'mni', nameEn: 'Manipuri', nameNative: 'মৈতৈলোন্', dir: 'ltr', region: 'Manipur' },
  { code: 'mr', nameEn: 'Marathi', nameNative: 'मराठी', dir: 'ltr', region: 'Maharashtra' },
  { code: 'ne', nameEn: 'Nepali', nameNative: 'नेपाली', dir: 'ltr', region: 'Sikkim / WB' },
  { code: 'or', nameEn: 'Odia', nameNative: 'ଓଡ଼ିଆ', dir: 'ltr', region: 'Odisha' },
  { code: 'pa', nameEn: 'Punjabi', nameNative: 'ਪੰਜਾਬੀ', dir: 'ltr', region: 'Punjab' },
  { code: 'sa', nameEn: 'Sanskrit', nameNative: 'संस्कृतम्', dir: 'ltr', region: 'India' },
  { code: 'sat', nameEn: 'Santali', nameNative: 'ᱥᱟᱱᱛᱟᱲᱤ', dir: 'ltr', region: 'Jharkhand' },
  { code: 'sd', nameEn: 'Sindhi', nameNative: 'सिन्धी', dir: 'ltr', region: 'India' },
  { code: 'ta', nameEn: 'Tamil', nameNative: 'தமிழ்', dir: 'ltr', region: 'Tamil Nadu' },
  { code: 'te', nameEn: 'Telugu', nameNative: 'తెలుగు', dir: 'ltr', region: 'Andhra Pradesh / Telangana' },
  { code: 'ur', nameEn: 'Urdu', nameNative: 'اردو', dir: 'rtl', region: 'India' },
];

export const DEFAULT_LANGUAGE = 'hi';
