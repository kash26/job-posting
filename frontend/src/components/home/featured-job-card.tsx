import Link from "next/link";

import type { FeaturedJob, Locale } from "@/lib/i18n";

type FeaturedJobCardProps = {
  locale: Locale;
  job: FeaturedJob;
  detailsLabel: string;
};

export function FeaturedJobCard({
  locale,
  job,
  detailsLabel,
}: FeaturedJobCardProps) {
  return (
    <article className="card-shadow group rounded-[2rem] border border-outline/50 bg-surface p-8 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-soft text-sm font-bold text-primary">
          {job.initials}
        </div>
        <span className="rounded-full bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
          {job.badge}
        </span>
      </div>

      <div className="mt-6 space-y-3">
        <h3 className="text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
          {job.title}
        </h3>
        <p className="text-sm text-muted-foreground">
          {job.company} <span className="mx-2 text-outline">•</span>{" "}
          {job.location}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {job.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-lg bg-surface-muted px-3 py-1 text-xs font-medium text-muted-foreground"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-outline/30 pt-6">
        <span className="text-sm font-semibold text-foreground">
          {job.salary}
        </span>
        <Link
          href={`/${locale}/jobs?q=${encodeURIComponent(job.title)}`}
          className="text-sm font-semibold text-primary transition-transform group-hover:translate-x-1"
        >
          {detailsLabel}
        </Link>
      </div>
    </article>
  );
}
