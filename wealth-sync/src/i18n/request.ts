import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";

export const locales = ["en", "bg"];
export const defaultLocale = "en";

export default getRequestConfig(async () => {
  const store = await cookies();
  const locale = store.get("locale")?.value ?? defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
