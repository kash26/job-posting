import Link from "next/link";

import { CategoryCard } from "@/components/home/category-card";
import { SectionHeading } from "@/components/home/section-heading";
import type { Dictionary, Locale } from "@/lib/i18n";

type JobCategoriesSectionProps = {
  locale: Locale;
  content: Dictionary["home"];
};

export function JobCategoriesSection({
  locale,
  content,
}: JobCategoriesSectionProps) {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="page-shell space-y-12">
        <SectionHeading
          title={content.categoriesTitle}
          description={content.categoriesDescription}
          action={
            <Link
              href={`/${locale}/jobs`}
              className="text-sm font-semibold text-primary hover:underline"
            >
              {content.categoriesAction}
            </Link>
          }
        />

        <div className="grid gap-6 md:grid-cols-4 md:grid-rows-2">
          {content.categories.map((category) => (
            <CategoryCard
              key={category.title}
              locale={locale}
              category={category}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
