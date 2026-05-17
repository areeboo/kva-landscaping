"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { content } from "@/lib/content";

const links = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#reviews", label: "Reviews" },
  { href: "#about", label: "About" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/85 backdrop-blur-xl supports-[backdrop-filter]:bg-background/70"
          : "border-b border-transparent bg-gradient-to-b from-kva-ink/35 to-transparent",
      )}
    >
      <div className="kva-container flex h-16 items-center justify-between gap-6 sm:h-20">
        <Link
          href="/"
          className={cn(
            "group flex items-center gap-2 text-base font-medium tracking-tight transition-colors",
            scrolled ? "text-kva-ink" : "text-kva-cream",
          )}
        >
          <Logo
            className={cn(
              "h-8 w-8 transition-transform group-hover:scale-105",
              scrolled ? "text-kva-forest" : "text-kva-cream",
            )}
            inverted={!scrolled}
          />
          <span className="font-display text-xl">
            <span className={scrolled ? "text-kva-forest" : "text-kva-gold"}>KVA</span>{" "}
            Landscaping
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={cn(
                "rounded text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-gold focus-visible:ring-offset-2",
                scrolled
                  ? "text-kva-stone hover:text-kva-ink focus-visible:ring-offset-background"
                  : "text-kva-cream/85 hover:text-kva-cream focus-visible:ring-offset-kva-ink",
              )}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${content.hero.secondary_cta.tel}`}
            className={cn(
              "hidden items-center gap-2 rounded text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-gold focus-visible:ring-offset-2 sm:flex",
              scrolled
                ? "text-kva-ink hover:text-kva-forest focus-visible:ring-offset-background"
                : "text-kva-cream hover:text-kva-gold focus-visible:ring-offset-kva-ink",
            )}
            aria-label={`Call KVA Landscaping at ${content.business.phone_primary}`}
          >
            <Phone
              className={cn("h-4 w-4 transition-colors", scrolled ? "text-kva-forest" : "text-kva-gold")}
              aria-hidden
            />
            {content.business.phone_primary}
          </a>
          <a
            href="#estimate"
            className={cn(
              "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
              scrolled
                ? "bg-kva-forest text-kva-cream hover:bg-kva-forest-deep hover:shadow-md focus-visible:ring-kva-forest"
                : "bg-kva-gold text-kva-ink hover:bg-kva-gold-deep hover:text-kva-cream focus-visible:ring-kva-gold",
            )}
          >
            Free Estimate
          </a>
        </div>
      </div>
    </header>
  );
}

function Logo({ className, inverted }: { className?: string; inverted?: boolean }) {
  // Inline mark: rounded square + abstract leaf
  // When inverted (over dark hero), use forest fill + cream strokes
  const fill = inverted ? "oklch(0.30 0.07 145)" : "currentColor";
  const stroke = inverted ? "oklch(0.97 0.013 90)" : "oklch(0.97 0.013 90)";
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <rect x="1" y="1" width="30" height="30" rx="8" fill={fill} />
      <path
        d="M9 22c0-5.5 4-9 14-9-0.5 8-5.5 11.5-11 11.5-1 0-2.5-0.2-3-0.5"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 24c1-3 3-5 7-7"
        stroke={stroke}
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}
