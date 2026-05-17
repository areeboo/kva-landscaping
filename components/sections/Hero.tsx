"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Star } from "lucide-react";
import { content } from "@/lib/content";

export function Hero() {
  const { hero, business } = content;

  return (
    <section className="relative isolate overflow-hidden bg-kva-ink pt-24 sm:pt-28">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/portfolio/fresh-mow.jpg"
          alt=""
          fill
          fetchPriority="high"
          loading="eager"
          className="object-cover object-center"
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 100vw, 1920px"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-kva-ink/85 via-kva-ink/65 to-kva-ink/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-kva-ink/70 via-transparent to-transparent" />
      </div>

      <div className="kva-container flex min-h-[78vh] flex-col justify-end pb-16 sm:min-h-[82vh] sm:pb-20 lg:pb-28">
        {/* Top eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 flex items-center gap-3 text-sm font-medium text-kva-cream/80"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-kva-cream/20 bg-kva-cream/5 px-3 py-1 backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-kva-gold/60" />
              <span className="relative rounded-full bg-kva-gold" />
            </span>
            Sterling, VA · Booking summer projects
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-balance text-5xl font-medium leading-[0.98] tracking-tight text-kva-cream sm:text-6xl lg:text-7xl xl:text-[5.5rem]"
        >
          {hero.tagline.split(" ").slice(0, -1).join(" ")}{" "}
          <span className="italic text-kva-gold" style={{ fontVariationSettings: '"opsz" 144, "wght" 400' }}>
            {hero.tagline.split(" ").slice(-1)[0]}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-kva-cream sm:text-xl"
        >
          {hero.subhead}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col items-start gap-3"
        >
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={hero.primary_cta.anchor}
              className="group inline-flex items-center gap-2 rounded-full bg-kva-gold px-6 py-3.5 text-base font-medium text-kva-ink shadow-lg shadow-kva-gold/20 transition-all hover:bg-kva-gold-deep hover:shadow-xl hover:shadow-kva-gold/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-gold focus-visible:ring-offset-2 focus-visible:ring-offset-kva-ink"
            >
              {hero.primary_cta.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </a>
            <a
              href={`tel:${hero.secondary_cta.tel}`}
              className="inline-flex items-center gap-2 rounded-full border border-kva-cream/25 bg-kva-cream/5 px-6 py-3.5 text-base font-medium text-kva-cream backdrop-blur-sm transition-all hover:border-kva-cream/40 hover:bg-kva-cream/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-gold focus-visible:ring-offset-2 focus-visible:ring-offset-kva-ink"
            >
              <Phone className="h-4 w-4" aria-hidden />
              {business.phone_primary}
            </a>
          </div>
          {hero.primary_cta_micro && (
            <p className="ml-1 text-sm text-kva-cream/80">{hero.primary_cta_micro}</p>
          )}
        </motion.div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-kva-cream/15 pt-7 text-sm text-kva-cream/75"
        >
          <span className="inline-flex items-center gap-1.5">
            <Star className="h-4 w-4 fill-kva-gold text-kva-gold" aria-hidden />
            <span className="font-medium text-kva-cream">{content.review_aggregate.weighted_rating.toFixed(1)}</span>
            <span className="text-kva-cream/75">
              · {content.review_aggregate.total_review_count}+ reviews
            </span>
          </span>
          {hero.trust_strip.slice(0, 3).map((t, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="hidden h-1 w-1 rounded-full bg-kva-cream/30 sm:block" aria-hidden />
              {t}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
