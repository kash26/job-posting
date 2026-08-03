"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { locales, type Dictionary, type Locale } from "@/lib/i18n";

type LanguageSwitcherProps = {
  locale: Locale;
  dictionary: Dictionary;
  className?: string;
};

export function LanguageSwitcher({
  locale,
  dictionary,
  className,
}: LanguageSwitcherProps) {
  const pathname = usePathname();

  return (
    <div className={className} aria-label={dictionary.switchLocaleLabel}>
      {locales.map((item) => {
        const href = localizePath(pathname, item);
        const isActive = item === locale;

        return (
          <Link
            key={item}
            href={href}
            className={`inline-flex min-h-9 min-w-12 items-center justify-center rounded-lg px-3 text-xs font-semibold transition-colors ${
              isActive
                ? "bg-primary !text-white"
                : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
            }`}
            hrefLang={item}
          >
            {item.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}

function localizePath(pathname: string, locale: Locale) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return `/${locale}`;
  }

  if (locales.includes(segments[0] as Locale)) {
    segments[0] = locale;
    return `/${segments.join("/")}`;
  }

  return `/${locale}/${segments.join("/")}`;
}
