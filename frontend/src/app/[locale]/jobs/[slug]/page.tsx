import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { fetchOfferBySlug } from "@/lib/job-offers-api";
import { jobOffers } from "@/lib/mock-data";
import { getOfferVideoUrls, getPrimaryOfferImage } from "@/lib/offer-media";

type JobDetailPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const resolvedParams = await params;

  if (!isLocale(resolvedParams.locale)) {
    notFound();
  }

  const locale = resolvedParams.locale as Locale;
  const dictionary = getDictionary(locale);
  const job = await fetchOfferBySlug(resolvedParams.slug, "recruiter");

  if (!job) {
    notFound();
  }

  const isFr = locale === "fr";
  const primaryImage = getPrimaryOfferImage(job);
  const videos = getOfferVideoUrls(job);
  const responsibilities = job.responsibilities ?? [];
  const requirements = job.requirements ?? [];
  const benefits = job.benefits ?? [];

  return (
    <section className="bg-background py-10 sm:py-14">
      <div className="page-shell space-y-6">
        <div className="rounded-3xl bg-gradient-to-r from-primary to-primary-strong px-6 py-8 text-white sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/80">
            {job.company}
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {job.title}
          </h1>
          <p className="mt-2 text-sm text-white/85 sm:text-base">
            {job.location} · {job.type} · {job.level}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
              {job.category}
            </span>
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
              {job.salary}
            </span>
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
              {isFr ? "Publie" : "Posted"} {job.postedAt}
            </span>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-white/20 bg-white/10">
            <Image
              src={primaryImage}
              alt={isFr ? `Image de ${job.title}` : `${job.title} image`}
              width={1600}
              height={900}
              className="h-56 w-full object-cover sm:h-72"
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr),320px]">
          <article className="space-y-5 rounded-3xl border border-outline/40 bg-surface p-6">
            <section className="space-y-2">
              <h2 className="text-xl font-bold text-foreground">
                {isFr ? "A propos du poste" : "About this role"}
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {job.description}
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-lg font-bold text-foreground">
                {isFr ? "Responsabilites" : "Responsibilities"}
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {responsibilities.map((item) => (
                  <li
                    key={item}
                    className="rounded-xl bg-surface-soft px-3 py-2"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-2">
              <h3 className="text-lg font-bold text-foreground">
                {isFr ? "Profil recherche" : "Requirements"}
              </h3>
              <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                {requirements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="space-y-2">
              <h3 className="text-lg font-bold text-foreground">
                {isFr ? "Avantages" : "Benefits"}
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {benefits.map((item) => (
                  <li
                    key={item}
                    className="rounded-xl border border-outline/50 px-3 py-2"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </article>

          <aside className="space-y-4">
            <section className="rounded-3xl border border-outline/40 bg-surface p-5">
              <h3 className="text-lg font-bold text-foreground">
                {isFr ? "Postuler rapidement" : "Quick apply"}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {isFr
                  ? "Enregistrez votre profil et envoyez votre candidature en un clic."
                  : "Save your profile and submit your application in one click."}
              </p>
              <button
                type="button"
                className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-white"
              >
                {isFr ? "Postuler maintenant" : "Apply now"}
              </button>
              <button
                type="button"
                className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-xl border border-outline/70 bg-white px-4 text-sm font-semibold text-foreground"
              >
                {isFr ? "Sauvegarder l'offre" : "Save job"}
              </button>
            </section>

            {videos.length > 0 ? (
              <section className="rounded-3xl border border-outline/40 bg-surface p-5">
                <h3 className="text-base font-bold text-foreground">
                  {isFr ? "Video de l'offre" : "Offer video"}
                </h3>
                <video
                  className="mt-3 w-full rounded-xl border border-outline/50"
                  controls
                  preload="metadata"
                  src={videos[0]}
                />
              </section>
            ) : null}

            <section className="rounded-3xl bg-surface-soft p-5">
              <h3 className="text-base font-bold text-foreground">
                {isFr ? "Offres similaires" : "Similar jobs"}
              </h3>
              <div className="mt-3 space-y-3">
                {jobOffers
                  .filter((item) => item.slug !== job.slug)
                  .slice(0, 3)
                  .map((item) => (
                    <Link
                      key={item.slug}
                      href={`/${locale}/jobs/${item.slug}`}
                      className="block rounded-xl border border-outline/40 bg-white p-3 transition-colors hover:border-primary/30"
                    >
                      <p className="text-sm font-semibold text-foreground">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {item.company} · {item.location}
                      </p>
                    </Link>
                  ))}
              </div>
            </section>

            <Link
              href={`/${locale}/jobs`}
              className="inline-flex h-10 items-center rounded-xl px-2 text-sm font-semibold text-primary"
            >
              ← {dictionary.pages.jobs.title}
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
