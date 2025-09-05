import { EXTENSION_TO_LANGUAGE, LANGUAGE_COLORS } from '@/constants/languages';

export interface LanguageInfo {
  name: string;
  color: string;
}

export const extractLanguages = (extensions: string[]): LanguageInfo[] => {
  if (!extensions || !extensions.length) return [];

  const uniqueLanguages = new Map<string, LanguageInfo>();

  extensions?.forEach(ext => {
    const languageName = EXTENSION_TO_LANGUAGE[ext?.toLowerCase()];
    if (!languageName) return;

    if (!uniqueLanguages?.has(languageName)) {
      uniqueLanguages?.set(languageName, {
        name: languageName,
        color: LANGUAGE_COLORS[languageName] || '#cccccc',
      });
    }
  });

  return Array.from(uniqueLanguages?.values() || [])?.sort((a, b) => a?.name?.localeCompare(b?.name));
};

export const getLanguageColor = (language: string): string => {
  return LANGUAGE_COLORS[language] || '#6f42c1';
};
