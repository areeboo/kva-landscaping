"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { content } from "@/lib/content";
import { getServiceIcon, serviceCategoryOrder } from "@/lib/service-icons";

const grouped = serviceCategoryOrder
  .map((category) => ({
    category,
    items: content.services.filter((service) => service.category === category),
  }))
  .filter((group) => group.items.length > 0);

export function ServicesMenu() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleOpen = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const handleScheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointer = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className="relative" onMouseEnter={handleOpen} onMouseLeave={handleScheduleClose}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="kva-services-flyout"
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        className="group relative inline-flex items-center gap-1 rounded text-sm font-semibold text-kva-ink/90 transition-colors hover:text-kva-forest focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-forest focus-visible:ring-offset-2 focus-visible:ring-offset-kva-cream"
      >
        Services
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
        <span className="absolute -bottom-1 left-0 h-px w-0 bg-kva-forest transition-all duration-200 group-hover:w-[calc(100%-1.1rem)]" />
      </button>

      <div
        id="kva-services-flyout"
        aria-label="Services"
        className={`absolute left-0 top-full z-50 mt-3 w-[44rem] max-w-[calc(100vw-2rem)] transition-all duration-150 ${
          open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        <div className="overflow-hidden rounded-2xl border border-kva-stone-light bg-kva-cream shadow-[0_18px_50px_rgba(10,35,25,0.16)]">
          <div className="gap-x-5 p-4 [column-count:3]">
            {grouped.map((group) => (
              <div key={group.category} className="mb-4 break-inside-avoid">
                <p className="px-3 pb-1 text-[0.65rem] font-extrabold uppercase tracking-[0.14em] text-kva-forest">
                  {group.category}
                </p>
                <ul>
                  {group.items.map((service) => {
                    const Icon = getServiceIcon(service.icon);
                    return (
                      <li key={service.slug}>
                        <Link
                          href={`/services/${service.slug}`}
                          onClick={() => setOpen(false)}
                          className="group/item flex items-center gap-2.5 rounded-lg px-3 py-1.5 transition-colors hover:bg-kva-cream-warm focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-forest"
                        >
                          <span className="inline-flex h-7 w-7 flex-none items-center justify-center rounded-md bg-kva-forest/10 text-kva-forest transition-colors group-hover/item:bg-kva-green/15 group-hover/item:text-kva-green-deep">
                            <Icon className="h-4 w-4" aria-hidden />
                          </span>
                          <span className="text-[13px] font-semibold leading-tight text-kva-ink">{service.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
          <Link
            href="/services"
            onClick={() => setOpen(false)}
            className="flex items-center justify-between gap-2 border-t border-kva-stone-light bg-kva-cream-warm/60 px-5 py-3 text-sm font-bold text-kva-forest transition-colors hover:bg-kva-cream-warm focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-forest"
          >
            View all 17 services
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}
