"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, MoveRight, Phone, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { content } from "@/lib/content";
import { LeafMark } from "@/components/site/LeafMark";
import { ServicesMenu } from "@/components/sections/ServicesMenu";

const links = [
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Our Work" },
  { href: "/locations", label: "Service Area" },
  { href: "/about", label: "About" },
  { href: "/#reviews", label: "Reviews" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesExpanded, setServicesExpanded] = useState(false);
  // Header CTAs (button + phone) reveal only after the hero's own CTAs scroll
  // above the header. On pages without a hero CTA they show immediately.
  const [revealCtas, setRevealCtas] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const heroCta = document.querySelector<HTMLElement>("[data-hero-cta]");
    if (!heroCta) {
      setRevealCtas(true);
      return;
    }
    setRevealCtas(false);
    // Header is 68–74px tall; flip once the hero CTAs pass above it.
    const observer = new IntersectionObserver(
      ([entry]) => setRevealCtas(entry.boundingClientRect.bottom <= 88),
      { rootMargin: "-88px 0px 0px 0px", threshold: 0 },
    );
    observer.observe(heroCta);
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-kva-pine transition-shadow duration-200",
        scrolled ? "shadow-[0_9px_30px_rgba(10,22,11,0.35)]" : "shadow-none",
      )}
    >
      <div className="kva-container flex h-[68px] items-center justify-between gap-6 sm:h-[74px]">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-cream focus-visible:ring-offset-2 focus-visible:ring-offset-kva-pine"
        >
          <span className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-[14px] bg-kva-cream transition-transform group-hover:scale-105">
            <LeafMark variant="onCream" className="h-7 w-7" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-[1.7rem] tracking-tight text-kva-cream">KVA</span>{" "}
            <span className="mt-0.5 text-[0.68rem] font-extrabold uppercase tracking-[0.18em] text-kva-cream/70">
              Landscaping
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {links.map((l) =>
            l.href === "/services" ? (
              <ServicesMenu key={l.href} />
            ) : (
              <Link
                key={l.href}
                href={l.href}
                className="group relative rounded text-sm font-semibold text-kva-cream/85 transition-colors hover:text-kva-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-cream focus-visible:ring-offset-2 focus-visible:ring-offset-kva-pine"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-kva-cream transition-all duration-200 group-hover:w-full" />
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-5">
          <div
            aria-hidden={!revealCtas}
            className={cn(
              "hidden items-center gap-5 transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none sm:flex",
              revealCtas
                ? "translate-y-0 opacity-100"
                : "pointer-events-none -translate-y-1 opacity-0",
            )}
          >
            <Link
              href="/estimate"
              onClick={() => setOpen(false)}
              tabIndex={revealCtas ? undefined : -1}
              className="inline-flex items-center gap-2 rounded-[6px] bg-kva-cream px-5 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-kva-pine transition-colors hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-cream focus-visible:ring-offset-2 focus-visible:ring-offset-kva-pine"
            >
              Free Walk-Through
              <MoveRight className="h-4 w-4" aria-hidden />
            </Link>
            <a
              href={`tel:${content.hero.secondary_cta.tel}`}
              tabIndex={revealCtas ? undefined : -1}
              className="inline-flex items-center gap-2 text-sm font-semibold text-kva-cream transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-cream focus-visible:ring-offset-2 focus-visible:ring-offset-kva-pine"
            >
              <Phone className="h-4 w-4" aria-hidden />
              {content.business.phone_primary}
            </a>
          </div>
          <button
            ref={hamburgerRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="kva-mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-kva-cream/30 text-kva-cream transition-colors hover:bg-kva-cream/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-cream focus-visible:ring-offset-2 focus-visible:ring-offset-kva-pine lg:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </div>

      {/* Mobile slide-down menu */}
      <div
        id="kva-mobile-menu"
        className={cn(
          "transition-[max-height,opacity] duration-300 lg:hidden",
          open
            ? "max-h-[calc(100dvh-68px)] overflow-y-auto overscroll-contain opacity-100 sm:max-h-[calc(100dvh-74px)]"
            : "pointer-events-none max-h-0 overflow-hidden opacity-0",
        )}
      >
        <nav className="kva-container flex flex-col gap-1 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))]" aria-label="Mobile">
          {links.map((l) =>
            l.href === "/services" ? (
              <div key={l.href}>
                <button
                  type="button"
                  onClick={() => setServicesExpanded((v) => !v)}
                  aria-expanded={servicesExpanded}
                  aria-controls="kva-mobile-services"
                  className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-semibold text-kva-cream transition-colors hover:bg-kva-cream/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-cream focus-visible:ring-offset-2 focus-visible:ring-offset-kva-pine"
                >
                  Services
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${servicesExpanded ? "rotate-180" : ""}`}
                    aria-hidden
                  />
                </button>
                {servicesExpanded && (
                  <div
                    id="kva-mobile-services"
                    className="ml-4 mt-0.5 flex flex-col gap-0.5 border-l border-kva-cream/25 pl-3"
                  >
                    {content.services.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        onClick={() => setOpen(false)}
                        className="rounded-lg px-3 py-2 text-sm font-medium text-kva-cream/75 transition-colors hover:bg-kva-cream/10 hover:text-kva-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-cream focus-visible:ring-offset-2 focus-visible:ring-offset-kva-pine"
                      >
                        {service.title}
                      </Link>
                    ))}
                    <Link
                      href="/services"
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-3 py-2 text-sm font-bold text-kva-cream transition-colors hover:bg-kva-cream/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-cream focus-visible:ring-offset-2 focus-visible:ring-offset-kva-pine"
                    >
                      View all services →
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-base font-semibold text-kva-cream transition-colors hover:bg-kva-cream/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-cream focus-visible:ring-offset-2 focus-visible:ring-offset-kva-pine"
              >
                {l.label}
              </Link>
            ),
          )}
          <div className="mt-2 flex flex-col gap-3 border-t border-kva-cream/25 pt-4 sm:flex-row">
            <Link
              href="/estimate"
              onClick={() => setOpen(false)}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-[6px] bg-kva-sage px-5 py-3 text-sm font-bold uppercase tracking-[0.12em] text-kva-cream transition-colors hover:bg-kva-sage-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-cream focus-visible:ring-offset-2 focus-visible:ring-offset-kva-pine"
            >
              Free Walk-Through
              <MoveRight className="h-4 w-4" aria-hidden />
            </Link>
            <a
              href={`tel:${content.hero.secondary_cta.tel}`}
              onClick={() => setOpen(false)}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-[6px] border border-kva-cream/55 px-5 py-3 text-sm font-semibold text-kva-cream transition-colors hover:bg-kva-cream/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-cream focus-visible:ring-offset-2 focus-visible:ring-offset-kva-pine"
            >
              <Phone className="h-4 w-4" aria-hidden />
              {content.business.phone_primary}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
