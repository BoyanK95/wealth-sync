// src/lib/utils/getLocale.ts

export function getLocaleFromCookie() {
  if (typeof document === "undefined") return "en";

  const match = document.cookie.match(/locale=(en|bg)/);
  return match ? match[1] : "en";
}
