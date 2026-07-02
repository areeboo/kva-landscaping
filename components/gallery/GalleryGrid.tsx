"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { content, type GalleryItem } from "@/lib/content";

const ALL = "All";

function categoryList(items: GalleryItem[]) {
  const seen: string[] = [];
  for (const item of items) {
    if (!seen.includes(item.category)) seen.push(item.category);
  }
  return [ALL, ...seen];
}

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function GalleryGrid({ items = content.gallery }: { items?: GalleryItem[] }) {
  const categories = useMemo(() => categoryList(items), [items]);
  const [activeCategory, setActiveCategory] = useState<string>(ALL);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const titleId = useId();
  const captionId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  const visibleItems = useMemo(
    () =>
      activeCategory === ALL
        ? items
        : items.filter((item) => item.category === activeCategory),
    [items, activeCategory],
  );

  const isOpen = lightboxIndex !== null;
  const activeItem = isOpen ? visibleItems[lightboxIndex] : undefined;

  const handleFilter = useCallback((category: string) => {
    setActiveCategory(category);
    setLightboxIndex(null);
  }, []);

  const handleOpen = useCallback(
    (index: number, trigger: HTMLButtonElement | null) => {
      lastTriggerRef.current = trigger;
      setLightboxIndex(index);
    },
    [],
  );

  const handleClose = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const handlePrev = useCallback(() => {
    setLightboxIndex((current) => {
      if (current === null) return current;
      return (current - 1 + visibleItems.length) % visibleItems.length;
    });
  }, [visibleItems.length]);

  const handleNext = useCallback(() => {
    setLightboxIndex((current) => {
      if (current === null) return current;
      return (current + 1) % visibleItems.length;
    });
  }, [visibleItems.length]);

  // Body scroll lock + focus management while the lightbox is open.
  useEffect(() => {
    if (!isOpen) return;
    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    return () => {
      body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  // Return focus to the triggering thumbnail after the lightbox closes.
  useEffect(() => {
    if (isOpen) return;
    const trigger = lastTriggerRef.current;
    if (!trigger) return;
    trigger.focus();
    lastTriggerRef.current = null;
  }, [isOpen]);

  // Keyboard handling: Escape closes, arrows navigate, Tab is trapped.
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleClose();
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        handlePrev();
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        handleNext();
        return;
      }
      if (event.key !== "Tab") return;

      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey) {
        if (active === first || !dialog.contains(active)) {
          event.preventDefault();
          last.focus();
        }
        return;
      }
      if (active === last || !dialog.contains(active)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose, handlePrev, handleNext]);

  if (visibleItems.length === 0) {
    return (
      <p className="text-pretty text-base leading-relaxed text-kva-stone">
        No projects in this category yet.
      </p>
    );
  }

  return (
    <div>
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter projects by category"
      >
        {categories.map((category) => {
          const isActive = category === activeCategory;
          return (
            <button
              key={category}
              type="button"
              tabIndex={0}
              aria-pressed={isActive}
              aria-label={`Show ${category === ALL ? "all projects" : category} projects`}
              onClick={() => handleFilter(category)}
              className={
                isActive
                  ? "min-h-10 rounded-[6px] border border-kva-sage-soft/40 bg-kva-sage px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-kva-cream transition-colors hover:bg-kva-sage-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-sage focus-visible:ring-offset-2"
                  : "min-h-10 rounded-[6px] border border-kva-forest/45 bg-transparent px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-kva-forest transition-colors hover:border-kva-forest hover:bg-kva-forest/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-forest focus-visible:ring-offset-2"
              }
            >
              {category}
            </button>
          );
        })}
      </div>

      <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibleItems.map((item, index) => (
          <li key={item.src} className="group">
            <button
              type="button"
              ref={(node) => {
                triggerRefs.current[index] = node;
              }}
              onClick={(event) => handleOpen(index, event.currentTarget)}
              aria-label={`View larger: ${item.caption}`}
              aria-haspopup="dialog"
              className="relative block aspect-[4/3] w-full overflow-hidden rounded-2xl bg-kva-forest-deep text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-forest focus-visible:ring-offset-2"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                className="object-cover transition-transform duration-500 ease-out motion-reduce:transition-none group-hover:scale-105 group-focus-visible:scale-105"
              />
              <span
                className="absolute inset-0 bg-gradient-to-t from-kva-forest-deep/85 via-kva-forest-deep/10 to-transparent opacity-0 transition-opacity duration-300 ease-out motion-reduce:transition-none group-hover:opacity-100 group-focus-visible:opacity-100"
                aria-hidden
              />
              <span className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-300 ease-out motion-reduce:translate-y-0 motion-reduce:transition-none group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-kva-cream/80">
                  {item.category}
                </span>
                <span className="mt-1 block text-pretty text-sm font-medium leading-snug text-kva-cream drop-shadow">
                  {item.caption}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {isOpen && activeItem ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-kva-ink/92 p-4 backdrop-blur-sm sm:p-6"
          onClick={handleClose}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={captionId}
            className="relative flex w-full max-w-5xl flex-col"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id={titleId} className="sr-only">
              {activeItem.caption}
            </h2>

            <div className="flex items-center justify-between gap-4 pb-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-kva-cream/70">
                {activeItem.category}
                <span className="ml-2 font-normal normal-case tracking-normal text-kva-cream/50">
                  {lightboxIndex! + 1} / {visibleItems.length}
                </span>
              </p>
              <button
                type="button"
                ref={closeButtonRef}
                onClick={handleClose}
                aria-label="Close"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-kva-cream/30 bg-kva-cream/10 text-kva-cream transition-colors hover:bg-kva-cream hover:text-kva-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-cream focus-visible:ring-offset-2 focus-visible:ring-offset-kva-ink"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>

            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl bg-kva-forest-deep">
              <Image
                src={activeItem.src}
                alt={activeItem.alt}
                fill
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-contain"
                priority
              />
            </div>

            <div className="mt-4 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous project"
                className="inline-flex h-12 w-12 flex-none items-center justify-center rounded-full border border-kva-cream/30 bg-kva-cream/10 text-kva-cream transition-colors hover:bg-kva-cream hover:text-kva-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-cream focus-visible:ring-offset-2 focus-visible:ring-offset-kva-ink"
              >
                <ChevronLeft className="h-6 w-6" aria-hidden />
              </button>
              <p
                id={captionId}
                className="flex-1 text-pretty text-center text-base font-medium leading-relaxed text-kva-cream"
              >
                {activeItem.caption}
              </p>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next project"
                className="inline-flex h-12 w-12 flex-none items-center justify-center rounded-full border border-kva-cream/30 bg-kva-cream/10 text-kva-cream transition-colors hover:bg-kva-cream hover:text-kva-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-cream focus-visible:ring-offset-2 focus-visible:ring-offset-kva-ink"
              >
                <ChevronRight className="h-6 w-6" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
