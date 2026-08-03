import { notFound } from "next/navigation";
import Link from "next/link";

import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { jobOffers } from "@/lib/mock-data";

type CareersPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function CareersPage({ params }: CareersPageProps) {
  const resolvedParams = await params;

  if (!isLocale(resolvedParams.locale)) {
    notFound();
  }

  const locale = resolvedParams.locale as Locale;
  const dictionary = getDictionary(locale);
  const isFr = locale === "fr";

  const values = [
    isFr ? "Ownership et responsabilite" : "Ownership and accountability",
    isFr ? "Culture du feedback" : "Feedback culture",
    isFr ? "Exigence produit" : "Product excellence",
  ];

  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="page-shell space-y-8">
        <header className="rounded-3xl border border-outline/40 bg-surface p-6 sm:p-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            {dictionary.pages.careers.title}
          </h1>
          <p className="mt-3 max-w-3xl text-base text-muted-foreground sm:text-lg">
            {dictionary.pages.careers.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {values.map((value) => (
              <span
                key={value}
                className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
              >
                {value}
              </span>
            ))}
          </div>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            {isFr ? "Postes ouverts" : "Open positions"}
          </h2>
          <div className="grid gap-3">
            {jobOffers.slice(0, 5).map((job) => (
              <article
                key={job.slug}
                className="rounded-2xl border border-outline/40 bg-surface p-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-bold text-foreground">
                    {job.title}
                  </h3>
                  <span className="rounded-full bg-surface-soft px-3 py-1 text-xs font-semibold text-foreground">
                    {job.type}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {job.company} · {job.location}
                </p>
                <div className="mt-3">
                  <Link
                    href={`/${locale}/jobs/${job.slug}`}
                    className="text-sm font-semibold text-primary"
                  >
                    {isFr ? "Voir la fiche" : "View role"}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-inverse-surface p-6 text-inverse-foreground sm:p-8">
          <h2 className="text-2xl font-bold">
            {isFr ? "Vous ne trouvez pas votre role ?" : "Role not listed?"}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-inverse-foreground/80 sm:text-base">
            {isFr
              ? "Envoyez une candidature spontanee avec votre CV et votre portfolio. Notre equipe revient vers vous rapidement."
              : "Send us a spontaneous application with your resume and portfolio. Our team will reply quickly."}
          </p>
          <button
            type="button"
            className="mt-4 inline-flex h-11 items-center rounded-xl bg-white px-4 text-sm font-semibold text-foreground"
          >
            {isFr ? "Candidature spontanee" : "Open application"}
          </button>
        </section>
      </div>
    </section>
  );
}
