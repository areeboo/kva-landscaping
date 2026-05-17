"use client";

import Link from "next/link";
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
            From a single mow to a full backyard rebuild — one crew.
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-kva-stone">
            Nine years of building outdoor spaces that hold up year after year — not just mow and run. Pick what you need; the same crew handles all of it.
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
                className="group relative flex flex-col bg-kva-cream p-7 transition-colors hover:bg-kva-cream-warm focus-within:bg-kva-cream-warm sm:p-8"
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
                <ul className="mt-5 space-y-2 text-sm text-kva-stone">
                  {svc.details.slice(0, 4).map((d) => (
                    <li key={d} className="flex items-start gap-2">
                      <span className="mt-2 inline-block h-1 w-1 flex-none rounded-full bg-kva-forest" aria-hidden />
                      {d}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/services/${svc.slug}`}
                  className="mt-6 inline-flex items-center gap-1 self-start rounded text-sm font-medium text-kva-forest underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-forest focus-visible:ring-offset-2"
                  aria-label={`Learn more about ${svc.title}`}
                >
                  Learn more about {svc.title.toLowerCase()} <span aria-hidden>→</span>
                </Link>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-14 flex flex-col items-center gap-4">
          <p className="text-sm text-kva-stone">Not sure what you need yet?</p>
          <a
            href="#estimate"
            className="group inline-flex items-center gap-2 rounded-full border-2 border-kva-forest bg-kva-cream px-6 py-3 text-base font-medium text-kva-forest transition-all hover:bg-kva-forest hover:text-kva-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-forest focus-visible:ring-offset-2"
          >
            Have a senior crew lead walk your property — free
            <span className="transition-transform group-hover:translate-x-0.5" aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
