"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { content } from "@/lib/content";
import { Reveal } from "@/components/site/Reveal";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative scroll-mt-24 bg-kva-cream-warm py-16 sm:py-28">
      <Reveal className="kva-container">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <span className="inline-flex rounded-full border border-kva-stone-light bg-kva-cream-warm px-3 py-1 text-xs font-medium uppercase tracking-wider text-kva-stone">
              Common questions
            </span>
            <h2 className="mt-4 font-display text-balance text-4xl font-medium leading-tight tracking-tight text-kva-ink sm:text-5xl">
              Quick answers before you call.
            </h2>
            <p className="mt-5 text-pretty text-base leading-relaxed text-kva-stone">
              Not seeing yours?{" "}
              <a
                href="/estimate"
                className="rounded font-medium text-kva-forest underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-forest focus-visible:ring-offset-2"
              >
                Ask in the estimate form
              </a>{" "}
              and we&apos;ll cover it in the reply.
            </p>
          </div>

          <div className="lg:col-span-8">
            <ul className="divide-y divide-kva-stone-light rounded-2xl border border-kva-stone-light bg-kva-cream">
              {content.faqs.map((faq, idx) => {
                const isOpen = open === idx;
                return (
                  <li key={faq.q}>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${idx}`}
                      id={`faq-trigger-${idx}`}
                      className="flex w-full items-start justify-between gap-4 rounded-2xl px-5 py-5 text-left transition-colors hover:bg-kva-cream-warm focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-forest focus-visible:ring-offset-2 sm:px-6"
                    >
                      <span className="font-display text-lg font-medium leading-snug text-kva-ink sm:text-xl">
                        {faq.q}
                      </span>
                      <span
                        className={`mt-1 inline-flex h-7 w-7 flex-none items-center justify-center rounded-full bg-kva-forest/10 text-kva-forest transition-transform ${
                          isOpen ? "rotate-45" : ""
                        }`}
                        aria-hidden
                      >
                        <Plus className="h-4 w-4" />
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-panel-${idx}`}
                          role="region"
                          aria-labelledby={`faq-trigger-${idx}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 pb-5 text-pretty text-[15px] leading-relaxed text-kva-stone sm:px-6">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
