import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../messages/en.json";
import bg from "../messages/bg.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    bg: { translation: bg },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
