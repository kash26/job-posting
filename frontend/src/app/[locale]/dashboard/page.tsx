import Link from "next/link";
import { notFound } from "next/navigation";

import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { jobOffers } from "@/lib/mock-data";

type DashboardPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function DashboardPage({ params }: DashboardPageProps) {
  const resolvedParams = await params;

  if (!isLocale(resolvedParams.locale)) {
    notFound();
  }

  const locale = resolvedParams.locale as Locale;
  const dictionary = getDictionary(locale);
  const isFr = locale === "fr";

  const stats = [
    {
      label: isFr ? "Candidatures envoyees" : "Applications sent",
      value: "28",
    },
    { label: isFr ? "Entretiens planifies" : "Interviews planned", value: "6" },
    { label: isFr ? "Profil complete" : "Profile completion", value: "92%" },
    { label: isFr ? "Messages recruteurs" : "Recruiter messages", value: "14" },
  ];

  return (
    <section className="bg-background py-10 sm:py-14">
      <div className="page-shell space-y-6">
        <header className="rounded-3xl border border-outline/40 bg-surface p-6 sm:p-8">
          <p className="text-sm font-semibold text-primary">
            {isFr ? "Tableau de bord candidat" : "Candidate dashboard"}
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            {isFr
              ? "Suivez votre progression en temps reel"
              : "Track your progress in real time"}
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-muted-foreground sm:text-base">
            {isFr
              ? "Gardez le controle sur vos candidatures, vos entretiens et votre visibilite aupres des recruteurs."
              : "Stay in control of your applications, interviews, and recruiter visibility."}
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <article
              key={stat.label}
              className="rounded-2xl border border-outline/40 bg-surface p-5 shadow-[0_8px_20px_rgba(15,23,42,0.05)]"
            >
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="mt-2 text-3xl font-extrabold text-foreground">
                {stat.value}
              </p>
            </article>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr),340px]">
          <section className="space-y-4 rounded-3xl border border-outline/40 bg-surface p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">
                {isFr ? "Candidatures recentes" : "Recent applications"}
              </h2>
              <Link
                href={`/${locale}/jobs`}
                className="text-sm font-semibold text-primary"
              >
                {isFr ? "Voir les offres" : "Browse jobs"}
              </Link>
            </div>
            <div className="space-y-3">
              {jobOffers.slice(0, 4).map((job) => (
                <article
                  key={job.slug}
                  className="rounded-2xl border border-outline/40 bg-white p-4"
                >
                  <p className="text-sm font-semibold text-foreground">
                    {job.title}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {job.company} · {job.location}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="rounded-full bg-surface-soft px-3 py-1 text-xs font-semibold text-foreground">
                      {isFr ? "Etape: Entretien" : "Stage: Interview"}
                    </span>
                    <Link
                      href={`/${locale}/jobs/${job.slug}`}
                      className="text-xs font-semibold text-primary"
                    >
                      {dictionary.home.detailsLabel}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <aside className="space-y-4">
            <section className="rounded-3xl bg-inverse-surface p-5 text-inverse-foreground">
              <h3 className="text-lg font-bold">
                {isFr ? "Objectif de la semaine" : "Weekly objective"}
              </h3>
              <p className="mt-2 text-sm text-inverse-foreground/80">
                {isFr
                  ? "Completez votre profil a 100% pour augmenter de 2x votre taux de reponse."
                  : "Reach 100% profile completion to double your response rate."}
              </p>
              <div className="mt-4 h-2 rounded-full bg-white/20">
                <div className="h-full w-[92%] rounded-full bg-white" />
              </div>
            </section>
            <section className="rounded-3xl border border-outline/40 bg-surface p-5">
              <h3 className="text-base font-bold text-foreground">
                {isFr ? "Actions rapides" : "Quick actions"}
              </h3>
              <div className="mt-3 space-y-2">
                <Link
                  href={`/${locale}/profile`}
                  className="inline-flex h-10 w-full items-center justify-center rounded-xl border border-outline/70 bg-white text-sm font-semibold text-foreground"
                >
                  {isFr ? "Modifier mon profil" : "Edit my profile"}
                </Link>
                <Link
                  href={`/${locale}/jobs`}
                  className="inline-flex h-10 w-full items-center justify-center rounded-xl bg-primary text-sm font-semibold text-white"
                >
                  {isFr ? "Trouver de nouvelles offres" : "Find new jobs"}
                </Link>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </section>
  );
}
