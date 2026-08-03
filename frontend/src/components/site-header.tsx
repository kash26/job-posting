"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { LanguageSwitcher } from "@/components/language-switcher";
import type { Dictionary, Locale } from "@/lib/i18n";

type SiteHeaderProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function SiteHeader({ locale, dictionary }: SiteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const localizedNav = useMemo(
    () =>
      dictionary.header.nav.map((item) => ({
        ...item,
        href: localizeHref(locale, item.href),
      })),
    [dictionary.header.nav, locale],
  );

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-outline/50 bg-background/95 backdrop-blur-xl">
      <div className="page-shell py-3">
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-outline/50 bg-white/90 px-3 py-2 shadow-[0_14px_34px_rgba(15,23,42,0.08)] md:px-4 md:py-2.5 lg:gap-6">
          <Link
            href={`/${locale}`}
            aria-label="Talent RDC Express home"
            onClick={closeMenu}
            className="inline-flex items-center p-0.5 transition-transform hover:scale-[1.03]"
          >
            <Image
              src="/official-logo-v3.png"
              alt="Talent RDC Express"
              width={88}
              height={88}
              priority
              className="h-16 w-16 object-contain md:h-20 md:w-20"
            />
          </Link>

          <nav
            className="hidden flex-1 items-center justify-center lg:flex"
            aria-label="Primary navigation"
          >
            <div className="inline-flex items-center gap-1 rounded-full border border-primary/15 bg-gradient-to-r from-primary/6 via-white to-primary/6 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
              {localizedNav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={closeMenu}
                  className={
                    isLinkActive(pathname, item.href)
                      ? "rounded-full bg-primary px-5 py-2 text-sm font-semibold !text-white shadow-[0_8px_20px_rgba(37,99,235,0.35)]"
                      : "rounded-full px-5 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-white hover:text-primary"
                  }
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <LanguageSwitcher
              locale={locale}
              dictionary={dictionary}
              className="hidden items-center gap-1 md:flex"
            />
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-outline/70 bg-white text-foreground transition-colors hover:border-primary hover:text-primary lg:hidden"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={
                isMenuOpen
                  ? dictionary.header.closeMenu
                  : dictionary.header.openMenu
              }
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
            <Link
              href={`/${locale}/about`}
              className="hidden rounded-full border border-outline/70 bg-white px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary/30 hover:text-primary xl:inline-flex"
              onClick={closeMenu}
            >
              {dictionary.header.authCta}
            </Link>
            <Link
              href={`/${locale}/jobs`}
              className="force-white-on-primary hidden min-h-10 items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-transform transition-colors hover:-translate-y-0.5 hover:bg-primary-strong lg:inline-flex"
              onClick={closeMenu}
            >
              {dictionary.header.postJobCta}
            </Link>
          </div>
        </div>
      </div>

      {isMenuOpen ? (
        <div className="border-t border-outline/50 bg-background lg:hidden">
          <div
            id="mobile-navigation"
            className="page-shell flex flex-col gap-6 py-6"
          >
            <LanguageSwitcher
              locale={locale}
              dictionary={dictionary}
              className="flex items-center gap-1"
            />
            <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
              {localizedNav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={closeMenu}
                  className={
                    isLinkActive(pathname, item.href)
                      ? "force-white-on-primary rounded-xl bg-primary-strong px-4 py-3 text-sm font-semibold text-white"
                      : "force-white-on-primary rounded-xl border border-primary/30 bg-primary px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-strong"
                  }
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex flex-col gap-3 border-t border-outline/40 pt-5">
              <Link
                href={`/${locale}/about`}
                onClick={closeMenu}
                className="force-white-on-primary inline-flex min-h-11 items-center justify-center rounded-full border border-primary/30 bg-primary px-4 text-sm font-semibold text-white transition-colors hover:bg-primary-strong"
              >
                {dictionary.header.authCta}
              </Link>
              <Link
                href={`/${locale}/jobs`}
                onClick={closeMenu}
                className="force-white-on-primary inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-4 text-sm font-semibold text-white"
              >
                {dictionary.header.postJobCta}
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function localizeHref(locale: Locale, href: string) {
  if (href === "/") {
    return `/${locale}`;
  }

  if (href.startsWith("/")) {
    return `/${locale}${href}`;
  }

  return href;
}

function isLinkActive(pathname: string, href: string) {
  const normalizedPath = normalizePath(pathname);
  const normalizedHref = normalizePath(href);
  const hrefDepth = normalizedHref.split("/").filter(Boolean).length;

  // Locale roots (for example /fr or /en) should only match exactly.
  if (hrefDepth <= 1) {
    return normalizedPath === normalizedHref;
  }

  return (
    normalizedPath === normalizedHref ||
    normalizedPath.startsWith(`${normalizedHref}/`)
  );
}

function normalizePath(path: string) {
  if (path === "/") {
    return "/";
  }

  return path.endsWith("/") ? path.slice(0, -1) : path;
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
