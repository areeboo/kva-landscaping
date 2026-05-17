"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { content } from "@/lib/content";

const links = [
  { href: "/services", label: "Services" },
  { href: "/#work", label: "Work" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/about", label: "About" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  // When the panel is open, force the solid-paper variant of the header so
  // contrast against the panel content stays consistent.
  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solid
          ? "border-b border-border/60 bg-background shadow-sm"
          : "border-b border-transparent bg-gradient-to-b from-kva-ink/45 to-transparent",
      )}
    >
      <div className="kva-container flex h-16 items-center justify-between gap-6 sm:h-20">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className={cn(
            "group flex items-center gap-2 text-base font-medium tracking-tight transition-colors",
            solid ? "text-kva-ink" : "text-kva-cream",
          )}
        >
          <Logo
            className={cn(
              "h-8 w-8 transition-transform group-hover:scale-105",
              solid ? "text-kva-forest" : "text-kva-cream",
            )}
            inverted={!solid}
          />
          <span className="font-display text-xl">
            <span className={solid ? "text-kva-forest" : "text-kva-gold"}>KVA</span>{" "}
            Landscaping
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-gold focus-visible:ring-offset-2",
                solid
                  ? "text-kva-ink hover:text-kva-forest focus-visible:ring-offset-background"
                  : "text-kva-cream hover:text-kva-gold focus-visible:ring-offset-kva-ink",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${content.hero.secondary_cta.tel}`}
            className={cn(
              "hidden items-center gap-2 rounded text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-gold focus-visible:ring-offset-2 sm:flex",
              solid
                ? "text-kva-ink hover:text-kva-forest focus-visible:ring-offset-background"
                : "text-kva-cream hover:text-kva-gold focus-visible:ring-offset-kva-ink",
            )}
            aria-label={`Call KVA Landscaping at ${content.business.phone_primary}`}
          >
            <Phone
              className={cn("h-4 w-4 transition-colors", solid ? "text-kva-forest" : "text-kva-gold")}
              aria-hidden
            />
            {content.business.phone_primary}
          </a>
          <Link
            href="/#estimate"
            onClick={() => setOpen(false)}
            className={cn(
              "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
              solid
                ? "bg-kva-forest text-kva-cream hover:bg-kva-forest-deep hover:shadow-md focus-visible:ring-kva-forest"
                : "bg-kva-gold text-kva-ink hover:bg-kva-gold-deep hover:text-kva-cream focus-visible:ring-kva-gold",
            )}
          >
            Free Estimate
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="kva-mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 md:hidden",
              solid
                ? "border border-kva-stone-light bg-kva-cream text-kva-ink hover:bg-kva-cream-warm focus-visible:ring-kva-forest focus-visible:ring-offset-background"
                : "border border-kva-cream/30 bg-kva-ink/30 text-kva-cream hover:bg-kva-ink/50 focus-visible:ring-kva-gold focus-visible:ring-offset-kva-ink",
            )}
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </div>

      {/* Mobile slide-down menu */}
      <div
        id="kva-mobile-menu"
        className={cn(
          "overflow-hidden border-t transition-[max-height,opacity] duration-300 md:hidden",
          open
            ? "max-h-[80vh] opacity-100 border-kva-stone-light bg-background"
            : "pointer-events-none max-h-0 opacity-0 border-transparent",
        )}
      >
        <nav className="kva-container flex flex-col gap-1 py-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-base font-medium text-kva-ink transition-colors hover:bg-kva-cream-warm hover:text-kva-forest focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-forest"
            >
              {l.label}
            </Link>
          ))}
          <div className="mt-2 flex flex-col gap-3 border-t border-kva-stone-light pt-4 sm:flex-row">
            <a
              href={`tel:${content.hero.secondary_cta.tel}`}
              onClick={() => setOpen(false)}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-kva-forest px-5 py-3 text-base font-medium text-kva-forest transition-colors hover:bg-kva-forest hover:text-kva-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-forest focus-visible:ring-offset-2"
            >
              <Phone className="h-4 w-4" aria-hidden />
              {content.business.phone_primary}
            </a>
            <Link
              href="/#estimate"
              onClick={() => setOpen(false)}
              className="inline-flex flex-1 items-center justify-center rounded-full bg-kva-forest px-5 py-3 text-base font-medium text-kva-cream shadow-sm transition-colors hover:bg-kva-forest-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-forest focus-visible:ring-offset-2"
            >
              Free Estimate
            </Link>
          </div>
        </nav>
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
