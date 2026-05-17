"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { content } from "@/lib/content";

export function ServiceArea() {
  return (
    <section id="service-area" className="relative scroll-mt-24 bg-paper py-24 sm:py-28">
      <div className="kva-container">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <span className="inline-flex rounded-full border border-kva-stone-light bg-kva-cream-warm px-3 py-1 text-xs font-medium uppercase tracking-wider text-kva-stone">
              Where we work
            </span>
            <h2 className="mt-4 font-display text-balance text-4xl font-medium leading-tight tracking-tight text-kva-ink sm:text-5xl">
              About ten miles around Sterling.
            </h2>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-kva-stone">
              The crew lives nearby — we are not driving in from Manassas. That is why we can be at your house in a day for an estimate and on the schedule the next week.
            </p>
            <div className="mt-8 flex items-center gap-3 rounded-2xl border border-kva-stone-light bg-kva-cream p-4 text-sm text-kva-stone">
              <MapPin className="h-4 w-4 flex-none text-kva-forest" aria-hidden />
              Outside this radius? Call us anyway — for large hardscape projects we do travel.
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              {content.business.service_area_zips.map((city, i) => (
                <motion.div
                  key={city.city}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-2xl border border-kva-stone-light bg-kva-cream p-5 transition-shadow hover:shadow-md hover:shadow-kva-forest/5"
                >
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-display text-xl font-medium tracking-tight text-kva-ink">
                      {city.city}, VA
                    </h3>
                    <span className="text-xs text-kva-stone">{city.zips.length} ZIPs</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {city.zips.map((z) => (
                      <span
                        key={z}
                        className="rounded-md bg-kva-forest/8 px-2 py-0.5 font-mono text-xs text-kva-forest"
                      >
                        {z}
                      </span>
                    ))}
                  </div>
                  {"note" in city && city.note && (
                    <p className="mt-4 border-t border-kva-stone-light pt-3 text-sm leading-relaxed text-kva-stone">
                      {city.note}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
