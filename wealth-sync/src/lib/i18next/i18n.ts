import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "../messages/en.json";
import bg from "../messages/bg.json";

if (!i18n.isInitialized) {
  void i18n.use(LanguageDetector).init({
    resources: {
      en: { translation: en },
      bg: { translation: bg },
    },
    fallbackLng: "en",
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "i18nextLng",
    },
    interpolation: {
      escapeValue: false,
    },
    load: "languageOnly",
    debug: false,
  });
}

export default i18n;
