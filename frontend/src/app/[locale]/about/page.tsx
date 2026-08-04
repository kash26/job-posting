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
        ? "Nous placons la fiabilite et la transparence au coeur de notre demarche. Chaque opportunite publiee est verifiee afin de garantir un environnement sur pour les candidats et de renforcer la confiance entre talents et recruteurs. Cette approche permet de batir des relations professionnelles solides et durables."
        : "We place reliability and transparency at the core of our approach. Each published opportunity is verified to provide a safe environment for candidates and strengthen trust between talent and recruiters. This approach helps build strong and lasting professional relationships.",
    },
    {
      title: isFr ? "Performance" : "Performance",
      text: isFr
        ? "Grace a des outils intelligents de mise en relation et de suivi des candidatures, nous facilitons et accelerons le processus de recrutement. Les candidats beneficient d'une optimisation de leurs profils, tandis que les entreprises identifient plus rapidement les talents qui correspondent a leurs besoins."
        : "With intelligent matching tools and application tracking, we simplify and accelerate the recruitment process. Candidates benefit from profile optimization while companies identify talent that matches their needs more quickly.",
    },
    {
      title: isFr ? "Impact local" : "Local impact",
      text: isFr
        ? "Nous contribuons au developpement de l'emploi en connectant les talents de la RDC et de l'Afrique centrale a des opportunites locales, regionales et internationales, tout en renforcant leur employabilite."
        : "We contribute to job growth by connecting talent from the DRC and Central Africa to local, regional, and international opportunities while strengthening employability.",
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
              ? "Nous combinons la puissance d'une plateforme moderne de recrutement avec des services d'accompagnement de carriere."
              : "We combine the power of a modern recruitment platform with career support services."}
          </p>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
            <li>
              {isFr
                ? "Pour les candidats : un espace fiable pour valoriser leurs competences et acceder a des opportunites pertinentes."
                : "For candidates: a trusted space to showcase their skills and access relevant opportunities."}
            </li>
            <li>
              {isFr
                ? "Pour les entreprises : un outil efficace pour identifier et recruter les meilleurs profils."
                : "For companies: an efficient tool to identify and recruit top profiles."}
            </li>
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {isFr
              ? "Notre approche est simple, fiable et orientee resultats."
              : "Our approach is simple, reliable, and results-driven."}
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

        <section className="grid gap-4 sm:grid-cols-2">
          <article className="rounded-2xl border border-outline/40 bg-surface p-6">
            <h2 className="text-xl font-bold text-foreground">
              {isFr ? "Notre vision" : "Our vision"}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {isFr
                ? "Devenir la plateforme de reference en Afrique pour le recrutement, le developpement des talents et les opportunites professionnelles, en connectant les candidats, les entreprises et les partenaires au-dela des frontieres afin de construire un marche de l'emploi plus accessible, plus transparent et plus innovant."
                : "To become Africa's leading platform for recruitment, talent development, and professional opportunities by connecting candidates, companies, and partners beyond borders to build a more accessible, transparent, and innovative job market."}
            </p>
          </article>

          <article className="rounded-2xl border border-outline/40 bg-surface p-6">
            <h2 className="text-xl font-bold text-foreground">
              {isFr ? "Notre mission" : "Our mission"}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {isFr
                ? "Faciliter la rencontre entre talents et recruteurs grace a une plateforme innovante qui :"
                : "To facilitate the connection between talent and recruiters through an innovative platform that:"}
            </p>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
              <li>
                {isFr
                  ? "Offre des opportunites fiables et verifiees."
                  : "Offers reliable and verified opportunities."}
              </li>
              <li>
                {isFr
                  ? "Accompagne le developpement professionnel des candidats."
                  : "Supports candidates' professional development."}
              </li>
              <li>
                {isFr
                  ? "Aide les entreprises a recruter les meilleurs profils plus rapidement."
                  : "Helps companies recruit the best profiles faster."}
              </li>
            </ul>
          </article>
        </section>
      </div>
    </section>
  );
}
