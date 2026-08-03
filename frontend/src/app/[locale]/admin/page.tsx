import Link from "next/link";
import { notFound } from "next/navigation";

import { isLocale, type Locale } from "@/lib/i18n";
import { adminKpis, adminPipeline } from "@/lib/mock-data";

type AdminPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminPage({ params }: AdminPageProps) {
  const resolvedParams = await params;

  if (!isLocale(resolvedParams.locale)) {
    notFound();
  }

  const locale = resolvedParams.locale as Locale;
  const isFr = locale === "fr";

  return (
    <div className="space-y-6">
      <header className="rounded-3xl bg-gradient-to-r from-primary to-primary-strong px-6 py-8 text-white sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-white/75">
          Talent RDC Express
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
          {isFr ? "Tableau de bord administration" : "Administration dashboard"}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-white/85 sm:text-base">
          {isFr
            ? "Pilotez vos offres, votre pipeline de recrutement et la performance des campagnes."
            : "Manage offers, recruitment pipeline, and campaign performance in one place."}
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {adminKpis.map((kpi) => (
          <article
            key={kpi.label}
            className="rounded-2xl border border-outline/40 bg-surface p-5"
          >
            <p className="text-sm text-muted-foreground">{kpi.label}</p>
            <p className="mt-2 text-3xl font-extrabold text-foreground">
              {kpi.value}
            </p>
            <p className="mt-1 text-xs font-semibold text-primary">
              {kpi.delta}
            </p>
          </article>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr),320px]">
        <section className="rounded-3xl border border-outline/40 bg-surface p-6">
          <h2 className="text-xl font-bold text-foreground">
            {isFr ? "Pipeline des offres" : "Offer pipeline"}
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {adminPipeline.map((stage) => (
              <article
                key={stage.stage}
                className="rounded-2xl bg-surface-soft p-4"
              >
                <p className="text-sm font-semibold text-muted-foreground">
                  {stage.stage}
                </p>
                <p className="mt-2 text-3xl font-extrabold text-foreground">
                  {stage.count}
                </p>
              </article>
            ))}
          </div>
        </section>

        <aside className="space-y-4">
          <section className="rounded-3xl border border-outline/40 bg-surface p-5">
            <h3 className="text-base font-bold text-foreground">
              {isFr ? "Actions" : "Actions"}
            </h3>
            <div className="mt-3 space-y-2">
              <Link
                href={`/api/admin-session?role=admin&locale=${locale}&next=/admin/jobs/new`}
                className="inline-flex h-10 w-full items-center justify-center rounded-xl bg-primary text-sm font-semibold text-white"
              >
                {isFr ? "Nouvelle offre" : "New offer"}
              </Link>
              <Link
                href={`/${locale}/admin/jobs`}
                className="inline-flex h-10 w-full items-center justify-center rounded-xl border border-outline/70 bg-white text-sm font-semibold text-foreground"
              >
                {isFr ? "Gerer les offres" : "Manage offers"}
              </Link>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
