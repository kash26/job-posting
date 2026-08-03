import Link from "next/link";

import type { Dictionary, Locale } from "@/lib/i18n";

type CtaSectionProps = {
  locale: Locale;
  content: Dictionary["home"];
};

export function CtaSection({ locale, content }: CtaSectionProps) {
  return (
    <section id="home-ecosystem" className="bg-background py-20 sm:py-24">
      <div className="page-shell">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-inverse-surface text-inverse-foreground card-shadow">
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative z-10 p-8 sm:p-12 lg:p-16">
              <h2 className="max-w-lg text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                {content.ctaTitle}
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-white/72">
                {content.ctaDescription}
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href={`/${locale}/jobs`}
                  className="force-white-on-primary rounded-xl bg-primary px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-primary-strong"
                >
                  {content.ctaPrimary}
                </Link>
                <Link
                  href={`/${locale}/about`}
                  className="rounded-xl border border-white/15 bg-white/8 px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/14"
                >
                  {content.ctaSecondary}
                </Link>
              </div>

              <div className="mt-10 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[
                    "from-sky-300 to-blue-500",
                    "from-amber-200 to-orange-400",
                    "from-emerald-200 to-teal-500",
                  ].map((gradient) => (
                    <span
                      key={gradient}
                      className={`inline-flex h-11 w-11 rounded-full border-4 border-inverse-surface bg-gradient-to-br ${gradient}`}
                    />
                  ))}
                </div>
                <p className="text-sm font-medium text-white/72">
                  {content.ctaCommunity}
                </p>
              </div>
            </div>

            <div className="min-h-[320px] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.7),transparent_30%),linear-gradient(135deg,rgba(37,99,235,0.16),rgba(255,255,255,0.04)),linear-gradient(180deg,#dce9ff,#f8f9ff)] p-6 sm:p-8">
              <div className="flex h-full min-h-[320px] items-end justify-center rounded-[2rem] border border-white/35 bg-[linear-gradient(180deg,rgba(255,255,255,0.7),rgba(255,255,255,0.96))] p-6">
                <div className="grid w-full gap-4 sm:grid-cols-[0.9fr_1.1fr]">
                  <div className="rounded-[1.5rem] bg-[linear-gradient(180deg,#7aa6ff,#2563eb)] p-5 text-white">
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/80">
                      {content.ctaStatTitle}
                    </p>
                    <p className="mt-5 text-4xl font-extrabold">92%</p>
                    <p className="mt-2 text-sm text-white/80">
                      Recruiter-ready profile with verified skills and clear
                      availability.
                    </p>
                  </div>
                  <div className="space-y-4 rounded-[1.5rem] border border-outline/40 bg-white p-5 text-foreground">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-primary">
                        {content.ctaStatTitle}
                      </span>
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        {content.ctaStatGain}
                      </span>
                    </div>
                    <div className="space-y-3">
                      {content.ctaStats.map((item) => (
                        <StatRow
                          key={item.label}
                          label={item.label}
                          value={item.value}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-surface-soft px-4 py-3">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-lg font-bold text-foreground">{value}</span>
    </div>
  );
}
