"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { content } from "@/lib/content";

export function Portfolio() {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((i) => (i === null ? 0 : (i + 1) % content.portfolio.length));
      if (e.key === "ArrowLeft") setActive((i) => (i === null ? 0 : (i - 1 + content.portfolio.length) % content.portfolio.length));
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <section id="work" className="relative scroll-mt-24 bg-kva-cream-warm py-24 sm:py-28 lg:py-32">
      <div className="kva-container">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full border border-kva-stone-light bg-kva-cream px-3 py-1 text-xs font-medium uppercase tracking-wider text-kva-stone">
              Recent work
            </span>
            <h2 className="mt-4 font-display text-balance text-4xl font-medium leading-tight tracking-tight text-kva-ink sm:text-5xl">
              Real Sterling and Loudoun yards.
              <br />
              Real{" "}
              <span className="italic text-kva-forest" style={{ fontVariationSettings: '"opsz" 144, "wght" 400' }}>
                before and after.
              </span>
            </h2>
          </div>
          <p className="max-w-md text-pretty text-base leading-relaxed text-kva-stone">
            A small sample from the last few seasons. Mow lines, fresh sod, sculpted shrubs, paver walkways — all done by our crew, on properties you can drive past.
          </p>
        </div>

        {/* Editorial mosaic — first item is large, rest fill */}
        <div className="mt-12 grid grid-cols-12 gap-3 sm:gap-4">
          {content.portfolio.map((item, idx) => {
            const layoutClass =
              idx === 0
                ? "col-span-12 sm:col-span-8 sm:row-span-2 aspect-[4/3] sm:aspect-auto"
                : idx === 1
                ? "col-span-6 sm:col-span-4 aspect-square"
                : idx === 2
                ? "col-span-6 sm:col-span-4 aspect-square"
                : "col-span-12 sm:col-span-4 aspect-[4/3]";
            return (
              <motion.button
                key={item.src}
                type="button"
                onClick={() => setActive(idx)}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative overflow-hidden rounded-2xl ring-1 ring-kva-stone-light/70 ${layoutClass}`}
                aria-label={`View ${item.caption}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
            className="font-medium text-kva-forest underline-offset-4 hover:underline"
          >
            Facebook
          </a>
          ,{" "}
          <a
            href={content.business.socials.thumbtack}
            target="_blank"
            rel="noopener"
            className="font-medium text-kva-forest underline-offset-4 hover:underline"
          >
            Thumbtack
          </a>
          , and{" "}
          <a
            href={content.business.socials.yelp}
            target="_blank"
            rel="noopener"
            className="font-medium text-kva-forest underline-offset-4 hover:underline"
          >
            Yelp
          </a>
          .
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-kva-ink/95 p-4 backdrop-blur"
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label={content.portfolio[active].caption}
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-kva-cream/10 text-kva-cream backdrop-blur transition-colors hover:bg-kva-cream/20"
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
                src={content.portfolio[active].src}
                alt={content.portfolio[active].alt}
                width={1600}
                height={1200}
                className="h-auto max-h-[80vh] w-full rounded-2xl object-contain"
              />
              <p className="mt-4 text-center font-display text-lg text-kva-cream">
                {content.portfolio[active].caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
