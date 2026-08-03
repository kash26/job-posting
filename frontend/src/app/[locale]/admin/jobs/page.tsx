import Link from "next/link";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

import { isLocale, type Locale } from "@/lib/i18n";
import { fetchAdminOffers, type UserRole } from "@/lib/job-offers-api";

type AdminJobsPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    status?: string;
    q?: string;
    offerStatus?: string;
    sortBy?: "created_at" | "updated_at" | "title" | "company" | "status";
    sortDir?: "asc" | "desc";
    page?: string;
  }>;
};

export default async function AdminJobsPage({
  params,
  searchParams,
}: AdminJobsPageProps) {
  const resolvedParams = await params;

  if (!isLocale(resolvedParams.locale)) {
    notFound();
  }

  const locale = resolvedParams.locale as Locale;
  const isFr = locale === "fr";
  const filters = await searchParams;
  const cookieStore = await cookies();
  const roleCookie = cookieStore.get("trx_role")?.value;
  const role: UserRole = roleCookie === "admin" ? "admin" : "recruiter";

  const currentPage = Math.max(1, Number(filters.page ?? "1") || 1);
  const sortBy = filters.sortBy ?? "created_at";
  const sortDir = filters.sortDir ?? "desc";
  const offerStatus = filters.offerStatus ?? "";

  const offersResponse = await fetchAdminOffers(
    {
      q: filters.q,
      status: offerStatus || undefined,
      sortBy,
      sortDir,
      page: currentPage,
      perPage: 8,
    },
    role,
  );
  const offers = offersResponse.data;
  const pagination = offersResponse.meta;

  const bannerText =
    filters.status === "created"
      ? isFr
        ? "Offre creee avec succes."
        : "Offer created successfully."
      : filters.status === "updated"
        ? isFr
          ? "Offre mise a jour avec succes."
          : "Offer updated successfully."
        : null;

  const sourceLabel =
    offersResponse.source === "api"
      ? isFr
        ? "Source: API backend"
        : "Source: backend API"
      : isFr
        ? "Source: donnees de demonstration"
        : "Source: demo data";

  const previousPage = Math.max(1, pagination.currentPage - 1);
  const nextPage = Math.min(pagination.lastPage, pagination.currentPage + 1);

  function buildHref(page: number) {
    const params = new URLSearchParams();
    if (filters.q) params.set("q", filters.q);
    if (offerStatus) params.set("offerStatus", offerStatus);
    if (sortBy) params.set("sortBy", sortBy);
    if (sortDir) params.set("sortDir", sortDir);
    params.set("page", String(page));
    return `/${locale}/admin/jobs?${params.toString()}`;
  }

  return (
    <div className="space-y-5">
      {bannerText ? (
        <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-800">
          {bannerText}
        </div>
      ) : null}
      <header className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-outline/40 bg-surface p-6">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground sm:text-3xl">
            {isFr ? "Gestion des offres" : "Manage offers"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {isFr
              ? "Suivez le statut de chaque offre et ajustez les details en temps reel."
              : "Track every listing status and update details in real time."}
          </p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.08em] text-primary">
            {sourceLabel}
          </p>
        </div>
        <Link
          href={`/${locale}/admin/jobs/new`}
          className="inline-flex h-11 items-center rounded-xl bg-primary px-4 text-sm font-semibold text-white"
        >
          {isFr ? "Creer une offre" : "Create offer"}
        </Link>
      </header>

      <form className="grid gap-3 rounded-3xl border border-outline/40 bg-surface p-4 sm:grid-cols-2 lg:grid-cols-5">
        <input
          name="q"
          defaultValue={filters.q}
          placeholder={
            isFr
              ? "Rechercher par poste ou entreprise"
              : "Search by role or company"
          }
          className="h-10 rounded-xl border border-outline/50 bg-white px-3 text-sm text-foreground outline-none transition-colors focus:border-primary sm:col-span-2"
        />
        <select
          name="offerStatus"
          defaultValue={offerStatus}
          className="h-10 rounded-xl border border-outline/50 bg-white px-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
        >
          <option value="">{isFr ? "Tous les statuts" : "All statuses"}</option>
          <option value="draft">{isFr ? "Brouillon" : "Draft"}</option>
          <option value="published">{isFr ? "Publiee" : "Published"}</option>
          <option value="archived">{isFr ? "Archivee" : "Archived"}</option>
        </select>
        <select
          name="sortBy"
          defaultValue={sortBy}
          className="h-10 rounded-xl border border-outline/50 bg-white px-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
        >
          <option value="created_at">
            {isFr ? "Date de creation" : "Created date"}
          </option>
          <option value="updated_at">
            {isFr ? "Date de mise a jour" : "Updated date"}
          </option>
          <option value="title">{isFr ? "Titre" : "Title"}</option>
          <option value="company">{isFr ? "Entreprise" : "Company"}</option>
          <option value="status">{isFr ? "Statut" : "Status"}</option>
        </select>
        <div className="flex items-center gap-2">
          <select
            name="sortDir"
            defaultValue={sortDir}
            className="h-10 flex-1 rounded-xl border border-outline/50 bg-white px-3 text-sm text-foreground outline-none transition-colors focus:border-primary"
          >
            <option value="desc">{isFr ? "Decroissant" : "Descending"}</option>
            <option value="asc">{isFr ? "Croissant" : "Ascending"}</option>
          </select>
          <button
            type="submit"
            className="inline-flex h-10 items-center rounded-xl bg-primary px-4 text-sm font-semibold text-white"
          >
            {isFr ? "Appliquer" : "Apply"}
          </button>
        </div>
      </form>

      <div className="overflow-hidden rounded-3xl border border-outline/40 bg-surface">
        <table className="w-full min-w-[740px] border-collapse text-left">
          <thead className="bg-surface-soft text-xs uppercase tracking-[0.08em] text-muted-foreground">
            <tr>
              <th className="px-4 py-3">{isFr ? "Poste" : "Role"}</th>
              <th className="px-4 py-3">{isFr ? "Entreprise" : "Company"}</th>
              <th className="px-4 py-3">{isFr ? "Categorie" : "Category"}</th>
              <th className="px-4 py-3">{isFr ? "Statut" : "Status"}</th>
              <th className="px-4 py-3">{isFr ? "Actions" : "Actions"}</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((job, index) => (
              <tr
                key={job.slug}
                className={index % 2 === 0 ? "bg-white" : "bg-surface-soft/40"}
              >
                <td className="px-4 py-4 text-sm font-semibold text-foreground">
                  {job.title}
                </td>
                <td className="px-4 py-4 text-sm text-muted-foreground">
                  {job.company}
                </td>
                <td className="px-4 py-4 text-sm text-muted-foreground">
                  {job.category}
                </td>
                <td className="px-4 py-4">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {job.status === "published"
                      ? isFr
                        ? "Publiee"
                        : "Published"
                      : job.status === "archived"
                        ? isFr
                          ? "Archivee"
                          : "Archived"
                        : isFr
                          ? "Brouillon"
                          : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/${locale}/jobs/${job.slug}`}
                      className="text-xs font-semibold text-primary"
                    >
                      {isFr ? "Voir" : "View"}
                    </Link>
                    <Link
                      href={`/${locale}/admin/jobs/${job.slug}/edit`}
                      className="text-xs font-semibold text-foreground"
                    >
                      {isFr ? "Modifier" : "Edit"}
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-outline/40 bg-surface p-4">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">
            {pagination.total}
          </span>{" "}
          {isFr ? "offres au total" : "offers total"}
        </p>
        <div className="flex items-center gap-2">
          <Link
            href={buildHref(previousPage)}
            aria-disabled={pagination.currentPage <= 1}
            className="inline-flex h-9 items-center rounded-lg border border-outline/70 bg-white px-3 text-sm font-semibold text-foreground aria-disabled:pointer-events-none aria-disabled:opacity-50"
          >
            {isFr ? "Precedent" : "Previous"}
          </Link>
          <span className="text-sm font-semibold text-foreground">
            {pagination.currentPage} / {pagination.lastPage}
          </span>
          <Link
            href={buildHref(nextPage)}
            aria-disabled={pagination.currentPage >= pagination.lastPage}
            className="inline-flex h-9 items-center rounded-lg border border-outline/70 bg-white px-3 text-sm font-semibold text-foreground aria-disabled:pointer-events-none aria-disabled:opacity-50"
          >
            {isFr ? "Suivant" : "Next"}
          </Link>
        </div>
      </div>
    </div>
  );
}
