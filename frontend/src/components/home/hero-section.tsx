import Image from "next/image";
import Link from "next/link";

import type { Dictionary, Locale } from "@/lib/i18n";

type HeroSectionProps = {
  locale: Locale;
  content: Dictionary["home"];
};

export function HeroSection({ locale, content }: HeroSectionProps) {
  const isFr = locale === "fr";

  return (
    <section className="hero-pattern mesh-pattern relative overflow-hidden pb-24 pt-16 sm:pb-28 sm:pt-20">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(37,99,235,0.08),transparent_45%,rgba(255,255,255,0.65))]" />
      <div className="page-shell relative z-10 text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
          <span className="inline-block h-2 w-2 rounded-full bg-primary" />
          {content.heroPill}
        </div>

        <div className="mx-auto mt-8 max-w-5xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-7xl lg:leading-[1.05]">
            {content.heroTitleStart}{" "}
            <span className="italic text-primary">
              {content.heroTitleAccent}
            </span>{" "}
            {content.heroTitleEnd}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
            {content.heroDescription}
          </p>
        </div>

        <form
          action={`/${locale}/jobs`}
          method="get"
          className="card-shadow mx-auto mt-12 grid max-w-5xl gap-3 rounded-[1.75rem] border border-outline/40 bg-surface p-4 text-left md:grid-cols-[1.6fr_0.8fr_auto]"
        >
          <label className="flex min-h-16 items-center gap-3 rounded-2xl bg-surface-soft px-5 focus-within:ring-2 focus-within:ring-primary/20">
            <span className="text-muted-foreground" aria-hidden="true">
              <SearchIcon />
            </span>
            <input
              name="q"
              type="text"
              aria-label={content.searchKeywordPlaceholder}
              placeholder={content.searchKeywordPlaceholder}
              className="w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground/80"
            />
          </label>

          <label className="flex min-h-16 items-center gap-3 rounded-2xl bg-surface-soft px-5 focus-within:ring-2 focus-within:ring-primary/20">
            <span className="text-muted-foreground" aria-hidden="true">
              <LocationIcon />
            </span>
            <input
              name="location"
              type="text"
              aria-label={content.searchLocationPlaceholder}
              placeholder={content.searchLocationPlaceholder}
              className="w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground/80"
            />
          </label>

          <button
            type="submit"
            className="force-white-on-primary glow-shadow inline-flex min-h-16 items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-base font-semibold text-white transition-transform transition-colors hover:-translate-y-0.5 hover:bg-primary-strong"
          >
            {content.searchButton}
            <ArrowRightIcon />
          </button>
        </form>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">
            {content.popularLabel}:
          </span>
          {content.popularSearches.map((search) => (
            <Link
              key={search}
              href={`/${locale}/jobs?q=${encodeURIComponent(search)}`}
              className="rounded-full border border-outline/45 bg-white/65 px-3 py-1.5 transition-colors hover:border-primary hover:text-primary"
            >
              {search}
            </Link>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">
            {content.trustedByLabel}
          </span>
          {content.trustedCompanies.map((company) => (
            <span
              key={company}
              className="rounded-full border border-outline/50 bg-white/70 px-4 py-2"
            >
              {company}
            </span>
          ))}
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              src: "https://picsum.photos/id/1068/1200/800",
              label: isFr ? "OFFRE D'EMPLOI" : "JOB OFFER",
            },
            {
              src: "https://picsum.photos/id/1043/1200/800",
              label: isFr ? "OPPORTUNITE CARRIERE" : "CAREER OPPORTUNITY",
            },
            {
              src: "https://picsum.photos/id/1039/1200/800",
              label: isFr ? "RECRUTEMENT ACTIF" : "ACTIVE HIRING",
            },
          ].map((item) => (
            <article
              key={item.src}
              className="group relative overflow-hidden rounded-3xl border border-white/65 bg-white/75"
            >
              <Image
                src={item.src}
                alt={item.label}
                width={1200}
                height={800}
                className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 via-black/35 to-transparent p-4 text-left">
                <span className="inline-flex rounded-full bg-primary px-3 py-1 text-xs font-bold tracking-wider text-white">
                  {item.label}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M20 20l-4.2-4.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <path
        d="M12 21s6-5.4 6-11a6 6 0 1 0-12 0c0 5.6 6 11 6 11Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="10" r="2.2" fill="currentColor" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
