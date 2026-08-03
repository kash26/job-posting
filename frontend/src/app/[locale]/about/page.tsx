import { notFound } from "next/navigation";
import Link from "next/link";

import { getDictionary, isLocale, type Locale } from "@/lib/i18n";

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AboutPage({ params }: AboutPageProps) {
  const resolvedParams = await params;

  if (!isLocale(resolvedParams.locale)) {
    notFound();
  }

  const locale = resolvedParams.locale as Locale;
  const dictionary = getDictionary(locale);
  const isFr = locale === "fr";

  const pillars = [
    {
      title: isFr ? "Confiance" : "Trust",
      text: isFr
        ? "Chaque offre est verifiee pour limiter les fraudes et accelerer les decisions de candidature."
        : "Every listing is verified to reduce fraud and accelerate candidate decisions.",
    },
    {
      title: isFr ? "Performance" : "Performance",
      text: isFr
        ? "Nous reduisons le temps de recrutement grace a des outils de matching et de suivi en temps reel."
        : "We reduce hiring time with matching tools and real-time tracking.",
    },
    {
      title: isFr ? "Impact local" : "Local impact",
      text: isFr
        ? "Notre mission est de connecter les talents d'Afrique centrale a des opportunites ambitieuses."
        : "Our mission is to connect Central African talent with ambitious opportunities.",
    },
  ];

  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="page-shell space-y-8">
        <header className="rounded-3xl bg-gradient-to-r from-primary to-primary-strong px-6 py-10 text-white sm:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            {dictionary.pages.about.title}
          </h1>
          <p className="mt-3 max-w-3xl text-base text-white/85 sm:text-lg">
            {dictionary.pages.about.description}
          </p>
        </header>

        <section className="grid gap-4 sm:grid-cols-3">
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="rounded-2xl border border-outline/40 bg-surface p-5"
            >
              <h2 className="text-lg font-bold text-foreground">
                {pillar.title}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {pillar.text}
              </p>
            </article>
          ))}
        </section>

        <section className="rounded-3xl border border-outline/40 bg-surface p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-foreground">
            {isFr ? "Pourquoi Talent RDC Express ?" : "Why Talent RDC Express?"}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {isFr
              ? "La plateforme combine la puissance d'un job board moderne et les standards de confiance attendus par les entreprises. Nous aidons les candidats a progresser plus vite avec une experience claire, mobile-first et orientee resultats."
              : "The platform combines modern job board capabilities with enterprise-level trust standards. We help candidates move faster through a clear, mobile-first, outcome-driven experience."}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              href={`/${locale}/jobs`}
              className="inline-flex h-11 items-center rounded-xl bg-primary px-4 text-sm font-semibold text-white"
            >
              {isFr ? "Explorer les offres" : "Browse jobs"}
            </Link>
            <Link
              href={`/${locale}/admin`}
              className="inline-flex h-11 items-center rounded-xl border border-outline/70 bg-white px-4 text-sm font-semibold text-foreground"
            >
              {isFr ? "Espace entreprise" : "Employer space"}
            </Link>
          </div>
        </section>
      </div>
    </section>
  );
}
