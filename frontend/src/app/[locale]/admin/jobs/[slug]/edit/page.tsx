import Link from "next/link";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

import { OfferForm } from "@/components/admin/offer-form";
import { isLocale, type Locale } from "@/lib/i18n";
import { fetchOfferBySlug, type UserRole } from "@/lib/job-offers-api";

type EditAdminJobPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function EditAdminJobPage({
  params,
}: EditAdminJobPageProps) {
  const resolvedParams = await params;

  if (!isLocale(resolvedParams.locale)) {
    notFound();
  }

  const locale = resolvedParams.locale as Locale;
  const isFr = locale === "fr";
  const cookieStore = await cookies();
  const roleCookie = cookieStore.get("trx_role")?.value;
  const role: UserRole = roleCookie === "admin" ? "admin" : "recruiter";
  const job = await fetchOfferBySlug(resolvedParams.slug, role);

  if (!job) {
    notFound();
  }

  return (
    <div className="space-y-5">
      <header className="rounded-3xl border border-outline/40 bg-surface p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">
          {job.company}
        </p>
        <h1 className="mt-2 text-2xl font-extrabold text-foreground sm:text-3xl">
          {job.title}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {isFr ? "Modification de l'offre" : "Edit offer"}
        </p>
      </header>

      <Link
        href={`/${locale}/admin/jobs`}
        className="inline-flex h-11 items-center rounded-xl border border-outline/70 bg-white px-4 text-sm font-semibold text-foreground"
      >
        {isFr ? "Retour" : "Back"}
      </Link>
      <OfferForm
        locale={locale}
        isFr={isFr}
        role={role}
        mode="edit"
        slug={job.slug}
        initialData={{
          title: job.title,
          company: job.company,
          location: job.location,
          salary: job.salary ?? "",
          category: job.category,
          type: job.type,
          heroImageUrl: job.heroImageUrl ?? "",
          mediaUrls: (job.mediaUrls ?? []).join("\n"),
          description: job.description,
          responsibilities: (job.responsibilities ?? []).join("\n"),
          requirements: (job.requirements ?? []).join("\n"),
        }}
      />
    </div>
  );
}
