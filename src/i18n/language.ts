import { translations, type Lang } from "./translations";

export function isLang(value: unknown): value is Lang {
  return value === "en" || value === "ko" || value === "uz";
}

export function resolveLanguage(linkLanguage: unknown, savedLanguage: unknown): Lang {
  if (isLang(linkLanguage)) return linkLanguage;
  return isLang(savedLanguage) ? savedLanguage : "en";
}

export function englishProjectType(value: string): string {
  return translations.en.contact.form.typeOptions.find((option) => option === value)
    ?? translations.en.contact.form.typeOptions[0];
}

export function fillText(text: string, values: Record<string, string>): string {
  return text.replace(/\{(name|email|caption)\}/g, (placeholder, key: string) => values[key] ?? placeholder);
}