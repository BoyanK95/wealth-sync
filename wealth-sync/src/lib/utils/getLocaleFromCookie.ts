// src/lib/utils/getLocale.ts

export function getLocaleFromCookie() {
  if (typeof document === "undefined") return "en";

  const match = /locale=(en|bg)/.exec(document.cookie);
  return match ? match[1] : "en";
}
