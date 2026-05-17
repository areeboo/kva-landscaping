"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Award, Calendar, MapPin, Users } from "lucide-react";
import { content } from "@/lib/content";

const credentialIcons = [Award, Calendar, MapPin, Users];

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 bg-paper py-24 sm:py-28 lg:py-32">
      <div className="kva-container">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="relative lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-kva-forest/10 ring-1 ring-kva-stone-light">
              <Image
                src="/images/portfolio/brick-home-shrubs.jpg"
                alt="Sculpted shrubs and mulched beds in front of a brick colonial — KVA Landscaping work in Sterling, VA"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              {/* Quote card overlay */}
              <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-kva-cream/20 bg-kva-ink/85 p-5 text-kva-cream backdrop-blur-md sm:inset-x-6 sm:bottom-6 sm:p-6">
                <p className="font-display text-base italic leading-snug sm:text-lg">
                  &ldquo;Same crew, same owner, same number for nine years.&rdquo;
                </p>
                <p className="mt-2 text-xs uppercase tracking-wider text-kva-cream/60">
                  Victor Amaya · Owner
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <span className="inline-flex rounded-full border border-kva-stone-light bg-kva-cream-warm px-3 py-1 text-xs font-medium uppercase tracking-wider text-kva-stone">
              About KVA
            </span>
            <h2 className="mt-4 font-display text-balance text-4xl font-medium leading-tight tracking-tight text-kva-ink sm:text-5xl">
              {content.about.headline}
            </h2>
            <p className="mt-6 text-pretty text-lg leading-relaxed text-kva-stone">
              {content.about.body}
            </p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4"
            >
              {content.about.credentials_callout.map((c, i) => {
                const Icon = credentialIcons[i % credentialIcons.length];
                return (
                  <div
                    key={c}
                    className="flex flex-col gap-2 rounded-2xl border border-kva-stone-light bg-kva-cream p-4"
                  >
                    <Icon className="h-4 w-4 text-kva-forest" aria-hidden />
                    <p className="text-pretty text-xs leading-snug text-kva-ink">{c}</p>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
