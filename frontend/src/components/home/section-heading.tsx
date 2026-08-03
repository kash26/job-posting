type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description: string;
  align?: "left" | "center";
  action?: React.ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  action,
}: SectionHeadingProps) {
  const alignmentClassName =
    align === "center" ? "text-center items-center" : "text-left";

  return (
    <div
      className={`flex flex-col gap-3 ${alignmentClassName} ${
        action ? "lg:flex-row lg:items-end lg:justify-between lg:text-left" : ""
      }`}
    >
      <div className="space-y-3">
        {eyebrow ? (
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>
        <p className="max-w-2xl text-base leading-7 text-muted-foreground">
          {description}
        </p>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
