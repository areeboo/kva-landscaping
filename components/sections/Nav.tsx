"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { content } from "@/lib/content";
import { LeafMark } from "@/components/site/LeafMark";

const links = [
  { href: "/services", label: "Services" },
  { href: "/#projects", label: "Projects" },
  { href: "/locations", label: "Service Area" },
  { href: "/about", label: "About" },
  { href: "/#reviews", label: "Reviews" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
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

  return (
    <>
      {/* Utility bar — scrolls away, hidden on small screens */}
      <div className="hidden bg-kva-forest-deep text-kva-cream/85 md:block">
        <div className="kva-container flex min-h-[34px] items-center justify-between gap-6 text-xs">
          <p className="tracking-wide">Proudly serving Sterling and nearby Northern Virginia</p>
          <a
            href={`tel:${content.hero.secondary_cta.tel}`}
            className="inline-flex items-center gap-2 font-semibold transition-colors hover:text-kva-cream"
          >
            <Phone className="h-3.5 w-3.5 text-kva-gold" aria-hidden />
            {content.business.phone_primary}
          </a>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 border-b bg-kva-cream/95 backdrop-blur transition-shadow duration-200",
          scrolled
            ? "border-kva-stone-light/70 shadow-[0_9px_30px_rgba(10,35,25,0.10)]"
            : "border-kva-stone-light/50",
        )}
      >
        <div className="kva-container flex h-[68px] items-center justify-between gap-6 sm:h-[76px]">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="group flex items-center gap-2.5 text-kva-forest-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-forest focus-visible:ring-offset-2 focus-visible:ring-offset-kva-cream"
          >
            <LeafMark className="h-9 w-9 transition-transform group-hover:scale-105" />
            <span className="flex flex-col leading-none">
              <span className="font-display text-[1.7rem] tracking-tight">KVA</span>{" "}
              <span className="mt-0.5 text-[0.56rem] font-extrabold uppercase tracking-[0.24em] text-kva-stone">
                Landscaping
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group relative rounded text-sm font-semibold text-kva-ink/90 transition-colors hover:text-kva-forest focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-forest focus-visible:ring-offset-2 focus-visible:ring-offset-kva-cream"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-kva-forest transition-all duration-200 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/#estimate"
              onClick={() => setOpen(false)}
              className="hidden items-center justify-center rounded-full bg-kva-gold px-5 py-2.5 text-sm font-semibold text-kva-ink shadow-sm shadow-kva-gold/30 transition-all hover:-translate-y-0.5 hover:bg-kva-gold-deep hover:text-kva-cream hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-gold focus-visible:ring-offset-2 focus-visible:ring-offset-kva-cream sm:inline-flex"
            >
              Get Free Estimate
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="kva-mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-kva-stone-light bg-kva-cream text-kva-ink transition-colors hover:bg-kva-cream-warm focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-forest focus-visible:ring-offset-2 focus-visible:ring-offset-kva-cream lg:hidden"
            >
              {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
            </button>
          </div>
        </div>

        {/* Mobile slide-down menu */}
        <div
          id="kva-mobile-menu"
          className={cn(
            "overflow-hidden border-t transition-[max-height,opacity] duration-300 lg:hidden",
            open
              ? "max-h-[85vh] border-kva-stone-light/70 opacity-100"
              : "pointer-events-none max-h-0 border-transparent opacity-0",
          )}
        >
          <nav className="kva-container flex flex-col gap-1 py-4" aria-label="Mobile">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-base font-semibold text-kva-ink transition-colors hover:bg-kva-cream-warm hover:text-kva-forest focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-forest"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-3 border-t border-kva-stone-light pt-4 sm:flex-row">
              <a
                href={`tel:${content.hero.secondary_cta.tel}`}
                onClick={() => setOpen(false)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-kva-forest px-5 py-3 text-base font-semibold text-kva-forest transition-colors hover:bg-kva-forest hover:text-kva-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-forest focus-visible:ring-offset-2"
              >
                <Phone className="h-4 w-4" aria-hidden />
                {content.business.phone_primary}
              </a>
              <Link
                href="/#estimate"
                onClick={() => setOpen(false)}
                className="inline-flex flex-1 items-center justify-center rounded-full bg-kva-gold px-5 py-3 text-base font-semibold text-kva-ink shadow-sm transition-colors hover:bg-kva-gold-deep hover:text-kva-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-gold focus-visible:ring-offset-2"
              >
                Get Free Estimate
              </Link>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
