import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";
import { LanguageSwitcher } from "@/components/language-switcher";
import type { Dictionary, Locale } from "@/lib/i18n";

type SiteFooterProps = {
  locale: Locale;
  dictionary: Dictionary;
};

const socials = [
  { label: "LinkedIn", short: "in", href: "https://www.linkedin.com" },
  { label: "Facebook", short: "fb", href: "https://www.facebook.com" },
  { label: "X", short: "x", href: "https://x.com" },
];

export function SiteFooter({ locale, dictionary }: SiteFooterProps) {
  const footerGroups = [
    {
      title: dictionary.footer.productTitle,
      links: dictionary.footer.productLinks,
      href: `/${locale}/jobs`,
    },
    {
      title: dictionary.footer.companyTitle,
      links: dictionary.footer.companyLinks,
      href: `/${locale}/about`,
    },
  ];

  return (
    <footer
      id="site-footer"
      className="bg-inverse-surface py-16 text-inverse-foreground"
    >
      <div className="page-shell">
        <div className="grid gap-12 border-b border-white/10 pb-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="space-y-6">
            <BrandMark compact inverted subtitle={undefined} />
            <p className="max-w-sm text-sm leading-7 text-white/70">
              {dictionary.footer.description}
            </p>
            <div className="flex gap-3">
              {socials.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-semibold uppercase text-inverse-foreground transition-colors hover:border-primary hover:bg-primary"
                  aria-label={item.label}
                >
                  {item.short}
                </Link>
              ))}
            </div>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title} className="space-y-5">
              <h2 className="text-sm font-semibold text-white">
                {group.title}
              </h2>
              <ul className="space-y-3 text-sm text-white/70">
                {group.links.map((link) => (
                  <li key={link}>
                    <Link
                      href={group.href}
                      className="transition-colors hover:text-white"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="space-y-5">
            <h2 className="text-sm font-semibold text-white">
              {dictionary.footer.newsletterTitle}
            </h2>
            <p className="text-sm leading-7 text-white/70">
              {dictionary.footer.newsletterDescription}
            </p>
            <form className="flex flex-col gap-3 sm:flex-row" action="#">
              <label className="sr-only" htmlFor="newsletter-email">
                {dictionary.footer.newsletterPlaceholder}
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder={dictionary.footer.newsletterPlaceholder}
                className="min-h-12 flex-1 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none placeholder:text-white/40 transition-colors focus:border-primary"
              />
              <button
                type="submit"
                className="force-white-on-primary inline-flex min-h-12 items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-white transition-colors hover:bg-primary-strong"
              >
                {dictionary.footer.newsletterButton}
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-8 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Talent RDC Express. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-5">
            {dictionary.footer.bottomLinks.map((linkText) => (
              <Link
                key={linkText}
                href={`/${locale}/about`}
                className="hover:text-white"
              >
                {linkText}
              </Link>
            ))}
            <LanguageSwitcher
              locale={locale}
              dictionary={dictionary}
              className="flex items-center gap-1"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
