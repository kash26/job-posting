import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { filterJobs } from "@/lib/mock-data";
import { getPrimaryOfferImage } from "@/lib/offer-media";

type JobsPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    q?: string;
    location?: string;
    category?: string;
    type?: string;
    adminAccess?: string;
  }>;
};

export default async function JobsPage({
  params,
  searchParams,
}: JobsPageProps) {
  const resolvedParams = await params;

  if (!isLocale(resolvedParams.locale)) {
    notFound();
  }

  const locale = resolvedParams.locale as Locale;
  const dictionary = getDictionary(locale);
  const filters = await searchParams;
  const jobs = filterJobs({
    q: filters.q,
    location: filters.location,
    category: filters.category,
    type: filters.type,
  });
  const isFr = locale === "fr";
  const resultsLabel = isFr ? "offres trouvees" : "jobs found";
  const filterTitle = isFr ? "Filtres rapides" : "Quick filters";
  const contractLabel = isFr ? "Type de contrat" : "Contract type";
  const categoryLabel = isFr ? "Categorie" : "Category";
  const searchLabel = isFr ? "Recherche" : "Search";
  const locationLabel = isFr ? "Localisation" : "Location";
  const resetLabel = isFr ? "Reinitialiser" : "Reset";
  const emptyBody =
    jobs.length === 0
      ? isFr
        ? "Aucun resultat pour ces filtres. Essayez une autre combinaison."
        : "No matches for these filters. Try another combination."
      : null;
  const accessNotice =
    filters.adminAccess === "required"
      ? isFr
        ? "Acces admin restreint. Utilisez le bouton Espace recruteur pour ouvrir une session admin/recruteur."
        : "Admin access is restricted. Use the Recruiter space button to open an admin/recruiter session."
      : null;

  return (
    <section className="bg-background py-10 sm:py-14">
      <div className="page-shell space-y-8">
        {accessNotice ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">
            {accessNotice}
          </div>
        ) : null}
        <header className="rounded-3xl bg-gradient-to-r from-primary to-primary-strong px-6 py-10 text-white sm:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-white/80">
            Talent RDC Express
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
            {dictionary.pages.jobs.title}
          </h1>
          <p className="mt-3 max-w-3xl text-base text-white/90 sm:text-lg">
            {dictionary.pages.jobs.subtitle}
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr),340px]">
          <div className="space-y-5">
            <form className="rounded-3xl border border-outline/40 bg-surface p-4 shadow-[0_10px_30px_rgba(15,23,42,0.06)] sm:p-5">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <label className="space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                    {searchLabel}
                  </span>
                  <input
                    name="q"
                    defaultValue={filters.q}
                    placeholder={dictionary.pages.jobs.queryLabel}
                    className="h-11 w-full rounded-xl border border-outline/50 bg-white px-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
                  />
                </label>
                <label className="space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                    {locationLabel}
                  </span>
                  <input
                    name="location"
                    defaultValue={filters.location}
                    placeholder={dictionary.pages.jobs.locationLabel}
                    className="h-11 w-full rounded-xl border border-outline/50 bg-white px-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
                  />
                </label>
                <label className="space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                    {categoryLabel}
                  </span>
                  <select
                    name="category"
                    defaultValue={filters.category ?? ""}
                    className="h-11 w-full rounded-xl border border-outline/50 bg-white px-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
                  >
                    <option value="">{isFr ? "Toutes" : "All"}</option>
                    <option value="technology">Technology</option>
                    <option value="design">Design</option>
                    <option value="marketing">Marketing</option>
                    <option value="finance">Finance</option>
                    <option value="health">Health</option>
                  </select>
                </label>
                <label className="space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                    {contractLabel}
                  </span>
                  <select
                    name="type"
                    defaultValue={filters.type ?? ""}
                    className="h-11 w-full rounded-xl border border-outline/50 bg-white px-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
                  >
                    <option value="">{isFr ? "Tous" : "Any"}</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </select>
                </label>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-medium text-muted-foreground">
                  <span className="font-bold text-foreground">
                    {jobs.length}
                  </span>{" "}
                  {resultsLabel}
                </p>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/${locale}/jobs`}
                    className="inline-flex h-10 items-center rounded-xl border border-outline/70 px-4 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    {resetLabel}
                  </Link>
                  <button
                    type="submit"
                    className="force-white-on-primary inline-flex h-10 items-center rounded-xl bg-primary px-4 text-sm font-semibold text-white transition-colors hover:bg-primary-strong"
                  >
                    {dictionary.pages.jobs.queryLabel}
                  </button>
                </div>
              </div>
            </form>

            {emptyBody ? (
              <div className="rounded-3xl border border-dashed border-outline/70 bg-surface-soft p-10 text-center">
                <h2 className="text-2xl font-bold text-foreground">
                  {dictionary.pages.jobs.emptyTitle}
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                  {emptyBody}
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {jobs.map((job) => (
                  <article
                    key={job.slug}
                    className="flex h-full flex-col rounded-3xl border border-outline/40 bg-surface p-5 shadow-[0_8px_24px_rgba(15,23,42,0.05)]"
                  >
                    <div className="overflow-hidden rounded-2xl border border-outline/40 bg-surface-soft">
                      <Image
                        src={getPrimaryOfferImage(job)}
                        alt={`${job.title} hero`}
                        width={1200}
                        height={675}
                        className="h-44 w-full object-cover"
                      />
                    </div>
                    <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
                      <div className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">
                          {job.company}
                        </p>
                        <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                          {job.title}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          {job.location} · {job.type} · {job.level}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                          {job.category}
                        </span>
                        <span className="rounded-full bg-surface-muted px-3 py-1 text-xs font-semibold text-foreground">
                          {job.postedAt}
                        </span>
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {job.description}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-2">
                      <div className="flex flex-wrap gap-2">
                        {job.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-outline/60 bg-white px-3 py-1 text-xs font-semibold text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-foreground">
                          {job.salary}
                        </span>
                        <Link
                          href={`/${locale}/jobs/${job.slug}`}
                          className="force-white-on-primary inline-flex h-10 items-center rounded-xl bg-primary px-4 text-sm font-semibold text-white transition-colors hover:bg-primary-strong"
                        >
                          {dictionary.home.detailsLabel}
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          <aside className="space-y-4">
            <section className="rounded-3xl border border-outline/40 bg-surface p-5">
              <h3 className="text-lg font-bold text-foreground">
                {filterTitle}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {isFr
                  ? "Affinez vos recherches par categorie, type de contrat et localisation pour trouver des opportunites adaptees."
                  : "Refine your search by category, contract type, and location to find your best opportunities."}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>
                  •{" "}
                  {isFr
                    ? "Mise a jour toutes les 4 heures"
                    : "Refreshed every 4 hours"}
                </li>
                <li>
                  •{" "}
                  {isFr
                    ? "Offres verifiees manuellement"
                    : "Manually verified listings"}
                </li>
                <li>
                  • {isFr ? "Alertes personnalisees" : "Personalized alerts"}
                </li>
              </ul>
            </section>
            <section className="rounded-3xl bg-inverse-surface p-5 text-inverse-foreground">
              <h3 className="text-lg font-bold">
                {isFr ? "Espace recruteur" : "Recruiter space"}
              </h3>
              <p className="mt-2 text-sm text-inverse-foreground/80">
                {isFr
                  ? "Publiez une offre, suivez vos candidatures et pilotez vos campagnes dans l'espace administration."
                  : "Post jobs, track applicants, and manage campaigns from the administration area."}
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <Link
                  href={`/api/admin-session?role=recruiter&locale=${locale}&next=/admin`}
                  className="force-white-on-primary inline-flex h-10 items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-white transition-colors hover:bg-primary-strong"
                >
                  {isFr ? "Ouvrir l'administration" : "Open administration"}
                </Link>
                <Link
                  href={`/api/admin-session?role=recruiter&locale=${locale}&next=/admin/jobs/new`}
                  className="inline-flex h-10 items-center justify-center rounded-xl border border-white/30 bg-white/10 px-4 text-sm font-semibold text-white transition-colors hover:bg-white/20"
                >
                  {isFr ? "Creer une offre" : "Create a job offer"}
                </Link>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </section>
  );
}
