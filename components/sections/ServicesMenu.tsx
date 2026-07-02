"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Droplets,
  Flower2,
  LayoutGrid,
  Leaf,
  MoveRight,
  Snowflake,
  Sprout,
  Star,
  Trees,
  type LucideIcon,
} from "lucide-react";
import { content } from "@/lib/content";
import { serviceCategoryOrder } from "@/lib/service-icons";
import { LeafMark } from "@/components/site/LeafMark";

const grouped = serviceCategoryOrder
  .map((category) => ({
    category,
    items: content.services.filter((service) => service.category === category),
  }))
  .filter((group) => group.items.length > 0);

// Per-category lead icon + a soft fade-to-light landscape photo anchoring each card.
const categoryMeta: Record<string, { icon: LucideIcon; photo: string; alt: string }> = {
  "Lawn Care": { icon: Sprout, photo: "/images/menu/lawn.webp", alt: "Manicured, striped lawn at golden hour" },
  "Planting & Beds": { icon: Flower2, photo: "/images/menu/beds.webp", alt: "White hydrangea beds in bloom" },
  Hardscape: { icon: LayoutGrid, photo: "/images/menu/hardscape.webp", alt: "Flagstone patio and stone steps" },
  "Tree & Shrub": { icon: Trees, photo: "/images/menu/tree-shrub.webp", alt: "Sculpted topiary and shaped shrubs" },
  "Irrigation & Water": { icon: Droplets, photo: "/images/menu/water.webp", alt: "Stone water feature spilling into a pool" },
  Seasonal: { icon: Snowflake, photo: "/images/menu/seasonal.webp", alt: "Snow-covered evergreens in winter" },
};

const fallbackMeta = { icon: Leaf, photo: "/images/menu/lawn.webp", alt: "KVA landscaping work" };

export function ServicesMenu() {
  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number; width: number; maxHeight: number } | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleOpen = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setHasOpened(true);
    setOpen(true);
  };
  const handleScheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  };

  // Measure the nav container so the panel spans its full width, just below the header.
  const measure = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const header = wrap.closest("header");
    const container = header?.querySelector(".kva-container") as HTMLElement | null;
    if (!header || !container) return;
    const cr = container.getBoundingClientRect();
    const cs = getComputedStyle(container);
    const padL = parseFloat(cs.paddingLeft) || 0;
    const padR = parseFloat(cs.paddingRight) || 0;
    // Anchor everything to the nav row's own rect so top + maxHeight always agree.
    const top = cr.bottom + 8;
    setPos({
      top,
      left: cr.left + padL,
      width: cr.width - padL - padR,
      maxHeight: window.innerHeight - top - 16,
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    measure();
    const onReflow = () => measure();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointer = (e: MouseEvent) => {
      const target = e.target as Node;
      if (wrapRef.current?.contains(target)) return;
      if (panelRef.current?.contains(target)) return;
      setOpen(false);
    };
    window.addEventListener("scroll", onReflow, { passive: true });
    window.addEventListener("resize", onReflow);
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      window.removeEventListener("scroll", onReflow);
      window.removeEventListener("resize", onReflow);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [open, measure]);

  return (
    <div ref={wrapRef} className="relative" onMouseEnter={handleOpen} onMouseLeave={handleScheduleClose}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="kva-services-flyout"
        onClick={() => {
          setHasOpened(true);
          setOpen((v) => !v);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setHasOpened(true);
            setOpen(true);
          }
        }}
        className="group relative inline-flex items-center gap-1 rounded text-sm font-semibold text-kva-cream/85 transition-colors hover:text-kva-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-cream focus-visible:ring-offset-2 focus-visible:ring-offset-kva-pine"
      >
        Services
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
        <span className="absolute -bottom-1 left-0 h-px w-0 bg-kva-cream transition-all duration-200 group-hover:w-[calc(100%-1.1rem)]" />
      </button>

      {hasOpened &&
        createPortal(
          <div
            id="kva-services-flyout"
            ref={panelRef}
            role="region"
            aria-label="Services"
            onMouseEnter={handleOpen}
            onMouseLeave={handleScheduleClose}
            style={pos ? { top: pos.top, left: pos.left, width: pos.width } : undefined}
            className={`fixed z-[60] transition-[opacity,transform] duration-200 ${
              open && pos ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-1.5 opacity-0"
            }`}
          >
          <div
            style={pos ? { maxHeight: pos.maxHeight } : undefined}
            className="flex flex-col overflow-hidden rounded-2xl border border-kva-stone-light bg-kva-cream shadow-[0_30px_80px_-20px_rgba(10,35,25,0.40)] ring-1 ring-kva-ink/5"
          >
            <div className="flex min-h-0 flex-1">
              {/* Branded rail */}
              <div className="flex w-[15.5rem] flex-none flex-col bg-gradient-to-b from-kva-forest-deep to-kva-forest p-6 text-kva-cream">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-kva-cream/10 ring-1 ring-kva-cream/15">
                  <LeafMark className="h-6 w-6" />
                </span>
                <p className="mt-5 font-display text-2xl leading-[1.15] tracking-tight">
                  Full-service care for beautiful outdoor spaces.
                </p>
                <p className="mt-3 text-xs leading-relaxed text-kva-cream/70">
                  17 expert services across lawns, beds, hardscape, trees, and water — every scope, on-site.
                </p>
                <Link
                  href="/estimate"
                  onClick={() => setOpen(false)}
                  className="group/cta mt-5 inline-flex items-center justify-center gap-2 rounded-[6px] bg-kva-sage px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-kva-cream transition-colors hover:bg-kva-sage-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-cream focus-visible:ring-offset-2 focus-visible:ring-offset-kva-forest-deep"
                >
                  Free Walk-Through
                  <MoveRight className="h-4 w-4" aria-hidden />
                </Link>
                <p className="mt-3 flex items-center gap-1.5 text-[11px] text-kva-cream/75">
                  <span className="flex items-center gap-0.5" aria-hidden>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-kva-gold text-kva-gold" />
                    ))}
                  </span>
                  {content.review_aggregate.weighted_rating.toFixed(1)} · Thumbtack Top Pro 2025
                </p>
                <div className="mt-auto flex items-start gap-2.5 rounded-xl bg-kva-cream/[0.07] p-3.5 ring-1 ring-kva-cream/10">
                  <Leaf className="mt-0.5 h-4 w-4 flex-none text-kva-gold" aria-hidden />
                  <div>
                    <p className="text-[13px] font-semibold text-kva-cream">One team. Every season.</p>
                    <p className="mt-1 text-[11px] leading-relaxed text-kva-cream/70">
                      Reliable care and craftsmanship from spring cleanup to snow management.
                    </p>
                  </div>
                </div>
              </div>

              {/* Category cards */}
              <div className="min-w-0 flex-1 overflow-y-auto p-4">
                <div className="grid grid-cols-2 gap-3 xl:grid-cols-3">
                  {grouped.map((group) => {
                    const meta = categoryMeta[group.category] ?? fallbackMeta;
                    const Icon = meta.icon;
                    return (
                      <div
                        key={group.category}
                        className="flex flex-col overflow-hidden rounded-xl border border-kva-stone-light bg-kva-cream"
                      >
                        <div className="p-3.5 pb-2.5">
                          <div className="flex items-center gap-2 border-b border-kva-stone-light pb-2">
                            <Icon className="h-4 w-4 flex-none text-kva-forest" aria-hidden />
                            <span className="font-display text-base font-medium tracking-tight text-kva-ink">
                              {group.category}
                            </span>
                          </div>
                          <ul className="mt-1.5">
                            {group.items.map((service) => (
                              <li key={service.slug}>
                                <Link
                                  href={`/services/${service.slug}`}
                                  onClick={() => setOpen(false)}
                                  className="group/item flex items-center justify-between gap-2 rounded-md px-2 py-1 text-[13px] font-medium text-kva-stone transition-colors hover:bg-kva-cream-warm hover:text-kva-forest-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-forest"
                                >
                                  <span className="min-w-0 truncate">{service.title}</span>
                                  <ChevronRight
                                    className="h-3.5 w-3.5 flex-none text-kva-stone-light transition-all group-hover/item:translate-x-0.5 group-hover/item:text-kva-forest"
                                    aria-hidden
                                  />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="relative mt-auto min-h-[4.5rem] flex-1">
                          <Image
                            src={meta.photo}
                            alt={meta.alt}
                            fill
                            sizes="(min-width: 1280px) 320px, (min-width: 1024px) 30vw, 45vw"
                            className="object-cover object-bottom"
                          />
                          {/* Fixed-height blend so the photo sits the same short distance below the
                              last service on every card, regardless of how tall the image grows. */}
                          <span
                            className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-kva-cream via-kva-cream/70 to-transparent"
                            aria-hidden
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer bar */}
            <Link
              href="/services"
              onClick={() => setOpen(false)}
              className="group/foot flex flex-none items-center justify-between gap-4 border-t border-kva-stone-light bg-kva-cream-warm/50 px-6 py-3 transition-colors hover:bg-kva-cream-warm focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-kva-forest"
            >
              <span className="flex items-center gap-3">
                <Leaf className="h-5 w-5 flex-none text-kva-forest" aria-hidden />
                <span className="min-w-0">
                  <span className="block text-sm font-bold text-kva-ink">Custom care. Beautiful results.</span>
                  <span className="block text-xs text-kva-stone">
                    Let&apos;s create an outdoor space you&apos;ll love, year after year.
                  </span>
                </span>
              </span>
              <span className="flex flex-none items-center gap-2 text-sm font-bold text-kva-forest">
                View all 17 services
                <ArrowRight className="h-4 w-4 transition-transform group-hover/foot:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
