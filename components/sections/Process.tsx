"use client";

import { motion } from "framer-motion";
import { content } from "@/lib/content";

export function Process() {
  return (
    <section id="process" className="relative scroll-mt-24 bg-kva-forest py-24 text-kva-cream sm:py-28 lg:py-32">
      <div className="kva-container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full border border-kva-cream/20 bg-kva-cream/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-kva-cream/80">
            How it goes
          </span>
          <h2 className="mt-4 font-display text-balance text-4xl font-medium leading-tight tracking-tight text-kva-cream sm:text-5xl">
            How a KVA job goes.
          </h2>
        </div>

        <ol className="mt-16 grid gap-px overflow-hidden rounded-3xl bg-kva-cream/10 ring-1 ring-kva-cream/10 sm:grid-cols-3">
          {content.process.map((step, i) => (
            <motion.li
              key={step.step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col bg-kva-forest p-7 sm:p-9"
            >
              <span
                className="font-display text-7xl font-medium leading-none text-kva-gold/40 sm:text-8xl"
                style={{ fontVariationSettings: '"opsz" 144, "wght" 400' }}
                aria-hidden
              >
                {String(step.step).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-2xl font-medium tracking-tight text-kva-cream">
                {step.title}
              </h3>
              <p className="mt-3 text-pretty text-[15px] leading-relaxed text-kva-cream/80">
                {step.description}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
