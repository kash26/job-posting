"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { Locale } from "@/lib/i18n";

type AdminSidebarProps = {
  locale: Locale;
  isFr: boolean;
};

export function AdminSidebar({ locale, isFr }: AdminSidebarProps) {
  const pathname = usePathname();

  const links = [
    { href: `/${locale}/admin`, label: isFr ? "Vue generale" : "Overview" },
    {
      href: `/${locale}/admin/jobs`,
      label: isFr ? "Gestion des offres" : "Manage jobs",
    },
    {
      href: `/${locale}/admin/jobs/new`,
      label: isFr ? "Creer une offre" : "Create offer",
    },
  ];

  return (
    <aside className="h-fit rounded-3xl border border-outline/40 bg-surface p-4">
      <h2 className="px-2 text-sm font-semibold uppercase tracking-[0.12em] text-primary">
        {isFr ? "Administration" : "Administration"}
      </h2>
      <nav className="mt-3 space-y-1">
        {links.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== `/${locale}/admin` &&
              pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={
                isActive
                  ? "block rounded-xl bg-primary px-3 py-2 text-sm font-semibold text-white"
                  : "block rounded-xl px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
              }
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
