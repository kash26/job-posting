type BrandMarkProps = {
  compact?: boolean;
  inverted?: boolean;
  subtitle?: string;
};

export function BrandMark({
  compact = false,
  inverted = false,
  subtitle,
}: BrandMarkProps) {
  const textClassName = inverted
    ? "text-inverse-foreground"
    : "text-foreground";
  const badgeClassName = inverted
    ? "border-primary/30 bg-white/10 text-primary"
    : "border-primary/20 bg-primary/10 text-primary";

  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl border ${badgeClassName}`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 32 32" className="h-5 w-5" fill="none">
          <path
            d="M8 24V10.5A2.5 2.5 0 0 1 10.5 8H16v3h-4.5a.5.5 0 0 0-.5.5V24"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17 20l7-7m0 0h-4m4 0v4"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="10" cy="24" r="2" fill="currentColor" />
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span
          className={`text-lg font-extrabold tracking-tight ${textClassName}`}
        >
          Talent RDC {compact ? "" : "Express"}
        </span>
        {!compact && subtitle ? (
          <span className="text-xs font-medium text-muted-foreground">
            {subtitle}
          </span>
        ) : null}
      </div>
    </div>
  );
}
