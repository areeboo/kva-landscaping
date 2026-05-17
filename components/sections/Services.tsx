"use client";

import { motion } from "framer-motion";
import {
  Droplets,
  Layers,
  Scissors,
  Snowflake,
  Sprout,
  TreePine,
  type LucideIcon,
} from "lucide-react";
import { content } from "@/lib/content";

const iconMap: Record<string, LucideIcon> = {
  Scissors,
  Sprout,
  Layers,
  TreePine,
  Droplets,
  Snowflake,
};

export function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 bg-paper py-24 sm:py-28 lg:py-32">
      <div className="kva-container">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-kva-stone-light bg-kva-cream-warm px-3 py-1 text-xs font-medium uppercase tracking-wider text-kva-stone">
            What we do
          </span>
          <h2 className="mt-4 font-display text-balance text-4xl font-medium leading-tight tracking-tight text-kva-ink sm:text-5xl lg:text-6xl">
            From a single mow to a full
            <br />
            backyard rebuild —{" "}
            <span className="italic text-kva-forest" style={{ fontVariationSettings: '"opsz" 144, "wght" 400' }}>
              one crew.
            </span>
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-kva-stone">
            Class A licensed in Virginia, which means we build the kind of hardscape that holds up year after year, not just mow and run. Pick what you need — we do all of it with the same crew.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-kva-stone-light/70 ring-1 ring-kva-stone-light/70 sm:grid-cols-2 lg:grid-cols-3">
          {content.services.map((svc, idx) => {
            const Icon = iconMap[svc.icon] ?? Sprout;
            return (
              <motion.article
                key={svc.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col bg-kva-cream p-7 transition-colors hover:bg-kva-cream-warm sm:p-8"
              >
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-kva-forest/8 text-kva-forest ring-1 ring-kva-forest/15 transition-transform group-hover:scale-105">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="font-display text-2xl font-medium leading-snug tracking-tight text-kva-ink">
                  {svc.title}
                </h3>
                <p className="mt-3 text-pretty text-[15px] leading-relaxed text-kva-stone">
                  {svc.blurb}
                </p>
                <ul className="mt-5 space-y-2 text-sm text-kva-stone/90">
                  {svc.details.slice(0, 4).map((d) => (
                    <li key={d} className="flex items-start gap-2">
                      <span className="mt-2 inline-block h-1 w-1 flex-none rounded-full bg-kva-forest" aria-hidden />
                      {d}
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-kva-stone">
          <span>Not sure what you need?</span>
          <a
            href="#estimate"
            className="inline-flex items-center gap-1 font-medium text-kva-forest underline-offset-4 hover:underline"
          >
            Have us walk the property — free.
          </a>
        </div>
      </div>
    </section>
  );
}
