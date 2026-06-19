type Props = {
  className?: string;
  /** "default" = forest medallion for light surfaces; "onDark" = gold ring for dark surfaces. */
  variant?: "default" | "onDark";
};

/**
 * KVA leaf medallion. A rounded forest tile with a single curved leaf and a
 * vein highlight — the brand mark used in the header and footer.
 */
export function LeafMark({ className, variant = "default" }: Props) {
  const tile = variant === "onDark" ? "var(--kva-gold)" : "var(--kva-forest)";
  const leaf = variant === "onDark" ? "var(--kva-forest-deep)" : "var(--kva-cream)";

  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <rect x="1" y="1" width="38" height="38" rx="11" fill={tile} />
      <path
        d="M30 8c-9.5 1.8-15.8 6.2-18.1 12.6-1.8 4.8.6 9 5 10.4.2-4.3 2-8.3 5.5-12.1-2.5 4.5-3.8 9-3.6 13.6 6-.7 10.4-4.3 12.1-9.7C32.5 17.7 32.1 12.8 30 8Z"
        fill={leaf}
      />
      <path
        d="M11.6 30c4.3-5.2 8.6-9.5 13-13"
        stroke={tile}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  );
}
