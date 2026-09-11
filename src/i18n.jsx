import { createContext, useContext } from "react";
export const LanguageContext = createContext({
  lang: "zh",
  setLang: () => {},
  t: (key) => key,
});
export const useLanguage = () => useContext(LanguageContext);
export const localized = (value, lang) => value?.[lang] ?? value?.zh ?? "";
export const languageNames = { zh: "中文", en: "English" };
export function getInitialLanguage(searchParams, storage) {
  const fromUrl = searchParams.get("lang");
  if (fromUrl === "en" || fromUrl === "zh") return fromUrl;
  try {
    const stored = storage.getItem("layout-language");
    if (stored === "en" || stored === "zh") return stored;
  } catch {}
  return "zh";
}
