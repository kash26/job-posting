import Link from "next/link";
import Image from "next/image";

import { LanguageSwitcher } from "@/components/language-switcher";
import type { Dictionary, Locale } from "@/lib/i18n";

type SiteFooterProps = {
  locale: Locale;
  dictionary: Dictionary;
};

const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.8c0-.9.2-1.6 1.6-1.6h1.7V3.3c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.3v2.4H7.5V13h2.7v8h3.3Z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://whatsapp.com/channel/0029VbB5ObKK5cD5dr6OMS2w",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M20 12a8 8 0 0 1-11.7 7.1L4 20l1-4.1A8 8 0 1 1 20 12Zm-8-6.4c-3.5 0-6.4 2.8-6.4 6.4 0 1.3.4 2.6 1.2 3.7l.2.2-.6 2.3 2.3-.6.2.1a6.3 6.3 0 0 0 3.1.8c3.5 0 6.4-2.8 6.4-6.4s-2.9-6.5-6.4-6.5Zm3.6 8.1c-.2-.1-1.1-.5-1.3-.5-.2-.1-.3-.1-.5.1l-.4.5c-.1.2-.3.2-.5.1-.2-.1-.9-.3-1.7-1.1-.6-.6-1.1-1.4-1.2-1.6-.1-.2 0-.4.1-.5l.3-.4.2-.3c.1-.1 0-.3 0-.4l-.5-1.2c-.1-.3-.3-.2-.5-.2h-.4c-.1 0-.4.1-.5.3-.2.2-.7.7-.7 1.8s.7 2.1.8 2.3c.1.1 1.5 2.4 3.8 3.2.5.2 1 .3 1.3.4.6.1 1.1.1 1.5.1.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1 0 0-.1-.1-.3-.2Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/talent-rdc-express/posts/?feedView=all",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M6.9 8.2a1.9 1.9 0 1 1 0-3.8 1.9 1.9 0 0 1 0 3.8ZM5.3 20V9.7h3.1V20H5.3Zm4.8 0V9.7h3v1.4h.1c.4-.8 1.5-1.7 3.1-1.7 3.3 0 3.9 2.1 3.9 4.9V20H17v-5.1c0-1.2 0-2.8-1.8-2.8s-2 1.3-2 2.7V20h-3.1Z" />
      </svg>
    ),
  },
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
            <div className="flex items-center gap-3">
              <Image
                src="/official-logo-clean.png"
                alt="Talent RDC Express"
                width={44}
                height={44}
                className="h-11 w-11 rounded-xl"
              />
              <span className="text-lg font-extrabold tracking-tight text-white">
                Talent RDC Express
              </span>
            </div>
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
                  {item.icon}
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
