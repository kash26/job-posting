import { notFound } from "next/navigation";

import { isLocale, type Locale } from "@/lib/i18n";

type ProfilePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ProfilePage({ params }: ProfilePageProps) {
  const resolvedParams = await params;

  if (!isLocale(resolvedParams.locale)) {
    notFound();
  }

  const locale = resolvedParams.locale as Locale;
  const isFr = locale === "fr";

  const experiences = [
    {
      role: "Product Designer",
      company: "NovaFlow",
      period: "2022 - Present",
      summary:
        "Led UX redesign for candidate funnel and improved conversion by 28%.",
    },
    {
      role: "UI Designer",
      company: "Delta Creative",
      period: "2019 - 2022",
      summary:
        "Built component libraries and ran user tests across mobile experiences.",
    },
  ];

  const skills = [
    "Figma",
    "Research",
    "Prototyping",
    "Design System",
    "HTML/CSS",
  ];

  return (
    <section className="bg-background py-10 sm:py-14">
      <div className="page-shell grid gap-6 lg:grid-cols-[320px,minmax(0,1fr)]">
        <aside className="space-y-4 rounded-3xl border border-outline/40 bg-surface p-6">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary text-3xl font-bold text-white">
            MK
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-extrabold text-foreground">
              Merveille Kalume
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Product Designer
            </p>
          </div>
          <div className="rounded-2xl bg-surface-soft p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              {isFr ? "Completeness" : "Completeness"}
            </p>
            <p className="mt-2 text-2xl font-extrabold text-foreground">92%</p>
            <div className="mt-3 h-2 rounded-full bg-white">
              <div className="h-full w-[92%] rounded-full bg-primary" />
            </div>
          </div>
          <div className="space-y-2">
            <button
              type="button"
              className="inline-flex h-10 w-full items-center justify-center rounded-xl bg-primary text-sm font-semibold text-white"
            >
              {isFr ? "Mettre a jour" : "Update profile"}
            </button>
            <button
              type="button"
              className="inline-flex h-10 w-full items-center justify-center rounded-xl border border-outline/70 bg-white text-sm font-semibold text-foreground"
            >
              {isFr ? "Telecharger CV" : "Download CV"}
            </button>
          </div>
        </aside>

        <div className="space-y-6">
          <section className="rounded-3xl border border-outline/40 bg-surface p-6">
            <h2 className="text-xl font-bold text-foreground">
              {isFr ? "A propos" : "About"}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {isFr
                ? "Designer produit passionnee par les interfaces a fort impact, la recherche utilisateur et la collaboration transversale."
                : "Product designer focused on high-impact interfaces, user research, and cross-functional collaboration."}
            </p>
          </section>

          <section className="rounded-3xl border border-outline/40 bg-surface p-6">
            <h2 className="text-xl font-bold text-foreground">
              {isFr ? "Experience" : "Experience"}
            </h2>
            <div className="mt-4 space-y-3">
              {experiences.map((item) => (
                <article
                  key={item.role}
                  className="rounded-2xl bg-surface-soft p-4"
                >
                  <p className="text-sm font-bold text-foreground">
                    {item.role}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.company} · {item.period}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.summary}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-outline/40 bg-surface p-6">
            <h2 className="text-xl font-bold text-foreground">Skills</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-outline/60 bg-white px-3 py-1 text-xs font-semibold text-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
