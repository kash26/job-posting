import Link from "next/link";

import { FeaturedJobCard } from "@/components/home/featured-job-card";
import { SectionHeading } from "@/components/home/section-heading";
import type { Dictionary, Locale } from "@/lib/i18n";

type FeaturedJobsSectionProps = {
  locale: Locale;
  content: Dictionary["home"];
};

export function FeaturedJobsSection({
  locale,
  content,
}: FeaturedJobsSectionProps) {
  return (
    <section
      id="featured-opportunities"
      className="border-t border-outline/20 bg-background py-20 sm:py-24"
    >
      <div className="page-shell space-y-14">
        <SectionHeading
          align="center"
          title={content.featuredTitle}
          description={content.featuredDescription}
          action={
            <Link
              href={`/${locale}/jobs`}
              className="text-sm font-semibold text-primary hover:underline"
            >
              {content.featuredAction}
            </Link>
          }
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {content.featuredJobs.map((job) => (
            <FeaturedJobCard
              key={job.id}
              locale={locale}
              job={job}
              detailsLabel={content.detailsLabel}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
