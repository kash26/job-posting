import Link from "next/link";

import { IconBadge } from "@/components/home/icon-badge";
import type { Category, Locale } from "@/lib/i18n";

type CategoryCardProps = {
  locale: Locale;
  category: Category;
};

export function CategoryCard({ locale, category }: CategoryCardProps) {
  const href = `/${locale}${category.href}`;

  if (category.featured) {
    return (
      <Link
        href={href}
        className="card-shadow relative overflow-hidden rounded-[2rem] bg-[linear-gradient(180deg,#3b6af0_0%,#2563eb_100%)] p-8 text-primary-contrast transition-transform hover:-translate-y-1 md:col-span-2 md:row-span-2"
      >
        <div className="absolute right-6 top-6 opacity-20">
          <IconBadge icon={category.icon} inverted />
        </div>
        <div className="flex h-full flex-col justify-end">
          <h3 className="text-2xl font-bold tracking-tight">
            {category.title}
          </h3>
          <p className="mt-3 max-w-sm text-sm leading-6 text-white/82">
            {category.description}
          </p>
          <div className="mt-6">
            <span className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary">
              {category.jobsLabel}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="card-shadow rounded-[2rem] border border-outline/50 bg-surface-muted p-6 transition-all hover:-translate-y-1 hover:bg-surface hover:shadow-xl"
    >
      <IconBadge icon={category.icon} />
      <div className="mt-5 space-y-2">
        <h3 className="text-lg font-bold tracking-tight text-foreground">
          {category.title}
        </h3>
        <p className="text-sm leading-6 text-muted-foreground">
          {category.description}
        </p>
      </div>
    </Link>
  );
}
