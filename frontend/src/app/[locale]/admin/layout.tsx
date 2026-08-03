import { notFound } from "next/navigation";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { isLocale, type Locale } from "@/lib/i18n";

type AdminLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function AdminLayout({
  children,
  params,
}: AdminLayoutProps) {
  const resolvedParams = await params;

  if (!isLocale(resolvedParams.locale)) {
    notFound();
  }

  const locale = resolvedParams.locale as Locale;
  const isFr = locale === "fr";
  const cookieStore = await cookies();
  const role = cookieStore.get("trx_role")?.value;

  if (role !== "admin" && role !== "recruiter") {
    redirect(`/${locale}/jobs?adminAccess=required`);
  }

  return (
    <section className="bg-background py-10 sm:py-14">
      <div className="page-shell grid gap-6 lg:grid-cols-[260px,minmax(0,1fr)]">
        <AdminSidebar locale={locale} isFr={isFr} />
        <div>{children}</div>
      </div>
    </section>
  );
}
