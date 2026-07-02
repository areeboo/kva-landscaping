type Props = {
  className?: string;
  /**
   * "default" = forest medallion for light surfaces; "onDark" = gold ring for dark surfaces;
   * "onCream" = transparent tile with a dark pine leaf, to sit inside a cream tile.
   */
  variant?: "default" | "onDark" | "onCream";
};

/**
 * KVA leaf medallion. A rounded forest tile with a single curved leaf and a
 * vein highlight — the brand mark used in the header and footer.
 */
export function LeafMark({ className, variant = "default" }: Props) {
  const tile =
    variant === "onDark"
      ? "var(--kva-gold)"
      : variant === "onCream"
        ? "transparent"
        : "var(--kva-forest)";
  const leaf =
    variant === "onDark"
      ? "var(--kva-forest-deep)"
      : variant === "onCream"
        ? "var(--kva-pine)"
        : "var(--kva-cream)";
  const vein = variant === "onCream" ? "var(--kva-cream)" : tile;

  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <rect x="1" y="1" width="38" height="38" rx="11" fill={tile} />
      <path
        d="M30 8c-9.5 1.8-15.8 6.2-18.1 12.6-1.8 4.8.6 9 5 10.4.2-4.3 2-8.3 5.5-12.1-2.5 4.5-3.8 9-3.6 13.6 6-.7 10.4-4.3 12.1-9.7C32.5 17.7 32.1 12.8 30 8Z"
        fill={leaf}
      />
      <path
        d="M11.6 30c4.3-5.2 8.6-9.5 13-13"
        stroke={vein}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  );
}
