"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { content } from "@/lib/content";

const sourceColors: Record<string, string> = {
  Google: "text-[#4285F4]",
  Yelp: "text-[#D32323]",
  Thumbtack: "text-kva-forest",
};

export function Reviews() {
  return (
    <section id="reviews" className="relative scroll-mt-24 bg-kva-cream py-24 sm:py-28 lg:py-32">
      <div className="kva-container">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-kva-stone-light bg-kva-cream-warm px-3 py-1 text-xs font-medium uppercase tracking-wider text-kva-stone">
            What people say
          </span>
          <h2 className="mt-4 font-display text-balance text-4xl font-medium leading-tight tracking-tight text-kva-ink sm:text-5xl lg:text-6xl">
            {content.review_aggregate.total_review_count}+ five-star reviews.
            <br />
            <span className="italic text-kva-forest" style={{ fontVariationSettings: '"opsz" 144, "wght" 400' }}>
              Nine years of them.
            </span>
          </h2>
        </div>

        {/* Aggregate row */}
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          <RatingTile
            source="Google"
            rating={content.review_aggregate.google.rating}
            count={content.review_aggregate.google.count}
          />
          <RatingTile
            source="Thumbtack"
            rating={content.review_aggregate.thumbtack.rating}
            count={content.review_aggregate.thumbtack.count}
            badge="Top Pro 2025"
          />
          <RatingTile
            source="Yelp"
            rating={content.review_aggregate.yelp.rating}
            count={content.review_aggregate.yelp.count}
          />
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {content.reviews_featured.map((r, i) => (
            <motion.figure
              key={`${r.source}-${r.author}-${i}`}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col rounded-2xl border border-kva-stone-light bg-kva-cream-warm/40 p-6 transition-shadow hover:shadow-md hover:shadow-kva-forest/5"
            >
              <Quote className="h-5 w-5 text-kva-gold" aria-hidden />
              <blockquote className="mt-4 flex-1 text-pretty text-[15px] leading-relaxed text-kva-ink/85">
                {r.text}
              </blockquote>
              <figcaption className="mt-5 flex items-center justify-between border-t border-kva-stone-light/70 pt-4 text-sm">
                <div>
                  <div className="font-medium text-kva-ink">{r.author}</div>
                  <div className="text-xs text-kva-stone/80">{r.date}</div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        className={`h-3.5 w-3.5 ${j < r.rating ? "fill-kva-gold text-kva-gold" : "text-kva-stone-light"}`}
                        aria-hidden
                      />
                    ))}
                  </span>
                  <span className={`text-xs font-medium ${sourceColors[r.source] ?? "text-kva-stone"}`}>
                    {r.source}
                  </span>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function RatingTile({
  source,
  rating,
  count,
  badge,
}: {
  source: string;
  rating: number;
  count: number;
  badge?: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-kva-stone-light bg-kva-cream-warm/60 px-5 py-4">
      <div>
        <div className="text-xs uppercase tracking-wider text-kva-stone">{source}</div>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="font-display text-3xl font-medium text-kva-ink">{rating.toFixed(1)}</span>
          <span className="text-sm text-kva-stone">/ 5 · {count} reviews</span>
        </div>
      </div>
      <div className="text-right">
        <div className="flex items-center justify-end gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-kva-gold text-kva-gold" aria-hidden />
          ))}
        </div>
        {badge && (
          <div className="mt-2 inline-flex items-center rounded-full bg-kva-forest/12 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-kva-forest">
            {badge}
          </div>
        )}
      </div>
    </div>
  );
}
