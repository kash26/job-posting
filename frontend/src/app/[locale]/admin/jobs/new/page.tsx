import { notFound } from "next/navigation";
import { cookies } from "next/headers";

import { OfferForm } from "@/components/admin/offer-form";
import { isLocale, type Locale } from "@/lib/i18n";
import type { UserRole } from "@/lib/job-offers-api";

type NewAdminJobPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function NewAdminJobPage({
  params,
}: NewAdminJobPageProps) {
  const resolvedParams = await params;

  if (!isLocale(resolvedParams.locale)) {
    notFound();
  }

  const locale = resolvedParams.locale as Locale;
  const isFr = locale === "fr";
  const cookieStore = await cookies();
  const roleCookie = cookieStore.get("trx_role")?.value;
  const role: UserRole = roleCookie === "admin" ? "admin" : "recruiter";

  return (
    <div className="space-y-5">
      <header className="rounded-3xl border border-outline/40 bg-surface p-6">
        <h1 className="text-2xl font-extrabold text-foreground sm:text-3xl">
          {isFr ? "Creation d'une offre" : "Create a new offer"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {isFr
            ? "Renseignez les informations essentielles pour publier une offre professionnelle et complete."
            : "Fill in the core information to publish a complete professional listing."}
        </p>
      </header>

      <OfferForm locale={locale} isFr={isFr} role={role} mode="create" />
    </div>
  );
}
