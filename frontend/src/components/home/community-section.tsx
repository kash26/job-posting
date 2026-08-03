import type { Dictionary } from "@/lib/i18n";

type CommunitySectionProps = {
  content: Dictionary["home"];
};

export function CommunitySection({ content }: CommunitySectionProps) {
  return (
    <section className="bg-background pb-6 pt-2 sm:pb-10">
      <div className="page-shell grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="card-shadow rounded-[2rem] border border-outline/50 bg-surface p-6 sm:p-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            {content.communityTitle}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
            {content.communityDescription}
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            {content.highlights.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-outline/40 bg-surface-soft px-4 py-4"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  {item.subtitle}
                </p>
                <p className="mt-2 text-lg font-bold text-foreground">
                  {item.title}
                </p>
                <p className="mt-3 text-2xl font-extrabold text-primary">
                  {item.stat}
                </p>
              </div>
            ))}
          </div>
        </article>

        <aside className="card-shadow rounded-[2rem] border border-outline/50 bg-surface p-6 sm:p-8">
          <h3 className="text-xl font-bold text-foreground">
            {content.activityTitle}
          </h3>
          <ul className="mt-5 space-y-4">
            {content.activityItems.map((item) => (
              <li
                key={`${item.name}-${item.time}`}
                className="rounded-2xl bg-surface-soft px-4 py-4"
              >
                <p className="text-sm font-semibold text-foreground">
                  {item.name}{" "}
                  <span className="font-medium text-muted-foreground">
                    · {item.role}
                  </span>
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.action}
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                  {item.time}
                </p>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
