"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { content } from "@/lib/content";
import { BeforeAfterSlider } from "@/components/portfolio/BeforeAfterSlider";

// content.json order: 0=fresh-mow, 1=lawn-after, 2=lawn-before, 3=brick-home-shrubs
const BEFORE_INDEX = 2;
const AFTER_INDEX = 1;
const SECONDARY_INDICES = [0, 3]; // fresh-mow + brick-home-shrubs

export function Portfolio() {
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const items = content.portfolio;

  useEffect(() => {
    if (active === null) return;

    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      const activeElement = document.activeElement;
      restoreFocusRef.current = activeElement instanceof HTMLElement ? activeElement : null;
      dialog.showModal();
      closeButtonRef.current?.focus({ preventScroll: true });
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setActive(null);
      }
      if (e.key === "ArrowRight") setActive((i) => (i === null ? 0 : (i + 1) % items.length));
      if (e.key === "ArrowLeft") setActive((i) => (i === null ? 0 : (i - 1 + items.length) % items.length));
    };
    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousBodyOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [active, items.length]);

  return (
    <section id="work" className="relative scroll-mt-24 bg-paper py-24 sm:py-28 lg:py-32">
      <div className="kva-container">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full border border-kva-stone-light bg-kva-cream-warm px-3 py-1 text-xs font-medium uppercase tracking-wider text-kva-stone">
              Recent work
            </span>
            <h2 className="mt-4 font-display text-balance text-4xl font-medium leading-tight tracking-tight text-kva-ink sm:text-5xl">
              Real Sterling and Loudoun yards.
              <br />
              Real before and after.
            </h2>
          </div>
          <p className="max-w-md text-pretty text-base leading-relaxed text-kva-stone">
            A small sample from the last few seasons. Mow lines, fresh sod, sculpted shrubs, paver walkways — all done by our crew, on properties you can drive past.
          </p>
        </div>

        {/* Before/After interactive comparison */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12"
        >
          <BeforeAfterSlider
            before={{ src: items[BEFORE_INDEX].src, alt: items[BEFORE_INDEX].alt }}
            after={{ src: items[AFTER_INDEX].src, alt: items[AFTER_INDEX].alt }}
            eyebrow="Sterling front-yard sod install"
            caption="Patchy spring lawn → fresh-laid, edged sod in a single weekend."
          />
        </motion.div>

        {/* Secondary 2-up */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4">
          {SECONDARY_INDICES.map((idx, position) => {
            const item = items[idx];
            return (
              <motion.button
                key={item.src}
                type="button"
                onClick={() => setActive(idx)}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: position * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-kva-stone-light/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label={`View ${item.caption}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-kva-ink/80 via-kva-ink/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100 sm:p-5">
                  <p className="font-display text-base leading-tight text-kva-cream sm:text-lg">
                    {item.caption}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="mt-10 text-center text-sm text-kva-stone">
          More on{" "}
          <a
            href={content.business.socials.facebook}
            target="_blank"
            rel="noopener"
            className="rounded font-medium text-kva-forest underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-forest focus-visible:ring-offset-2"
          >
            Facebook
          </a>
          ,{" "}
          <a
            href={content.business.socials.thumbtack}
            target="_blank"
            rel="noopener"
            className="rounded font-medium text-kva-forest underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-forest focus-visible:ring-offset-2"
          >
            Thumbtack
          </a>
          , and{" "}
          <a
            href={content.business.socials.yelp}
            target="_blank"
            rel="noopener"
            className="rounded font-medium text-kva-forest underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-forest focus-visible:ring-offset-2"
          >
            Yelp
          </a>
          .
        </div>
      </div>

      <AnimatePresence
        onExitComplete={() => {
          restoreFocusRef.current?.focus({ preventScroll: true });
          restoreFocusRef.current = null;
        }}
      >
        {active !== null && (
          <motion.dialog
            ref={dialogRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] m-0 hidden h-dvh max-h-none w-dvw max-w-none items-center justify-center border-0 bg-kva-ink/95 p-4 text-inherit backdrop:bg-transparent backdrop-blur focus:outline-none [&[open]]:flex"
            onCancel={(e) => {
              e.preventDefault();
              setActive(null);
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setActive(null);
            }}
            aria-label={items[active].caption}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setActive(null)}
              className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-kva-cream/10 text-kva-cream backdrop-blur transition-colors hover:bg-kva-cream/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-gold focus-visible:ring-offset-2 focus-visible:ring-offset-kva-ink sm:right-6 sm:top-6"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-h-[88vh] w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={items[active].src}
                alt={items[active].alt}
                width={1600}
                height={1200}
                className="h-auto max-h-[80vh] w-full rounded-2xl object-contain"
              />
              <p className="mt-4 text-center font-display text-lg text-kva-cream">
                {items[active].caption}
              </p>
            </motion.div>
          </motion.dialog>
        )}
      </AnimatePresence>
    </section>
  );
}

