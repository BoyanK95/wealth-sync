import { getLocaleFromCookie } from "@/lib/utils/getLocaleFromCookie";
import Link from "next/link";

export function LocalizedLink({
  href,
  children,
  ...props
}: {
  href: string;
  children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const locale = getLocaleFromCookie();
  const localizedHref = `/${locale}${href}`;

  return (
    <Link href={localizedHref} {...props}>
      {children}
    </Link>
  );
}
