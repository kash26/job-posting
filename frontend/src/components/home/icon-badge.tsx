type IconName = "code" | "spark" | "trend" | "finance" | "health";

type IconBadgeProps = {
  icon: IconName;
  inverted?: boolean;
};

export function IconBadge({ icon, inverted = false }: IconBadgeProps) {
  const className = inverted ? "text-white" : "text-primary";

  return (
    <div
      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
        inverted ? "bg-white/10" : "bg-primary/10"
      } ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
        {icon === "code" ? (
          <path
            d="M8 8l-4 4 4 4M16 8l4 4-4 4M13 5l-2 14"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : null}
        {icon === "spark" ? (
          <path
            d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3zm6 12l.9 2.1L21 18l-2.1.9L18 21l-.9-2.1L15 18l2.1-.9L18 15z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : null}
        {icon === "trend" ? (
          <path
            d="M5 16l4-4 3 3 7-7M15 8h4v4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : null}
        {icon === "finance" ? (
          <path
            d="M12 3v18M16 7.5A3.5 3.5 0 0 0 12.5 4H11a3 3 0 0 0 0 6h2a3 3 0 0 1 0 6H11.5A3.5 3.5 0 0 1 8 12.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : null}
        {icon === "health" ? (
          <>
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <rect
              x="4.5"
              y="4.5"
              width="15"
              height="15"
              rx="3"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </>
        ) : null}
      </svg>
    </div>
  );
}
