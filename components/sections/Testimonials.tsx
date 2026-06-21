"use client";

import { useRef } from "react";
import { BadgeCheck, ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { content } from "@/lib/content";

export function Testimonials() {
  const trackRef = useRef<HTMLUListElement>(null);
  const { reviews_featured, review_aggregate } = content;

  function scrollByCard(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("li");
    const amount = card ? card.offsetWidth + 20 : track.clientWidth * 0.8;
    track.scrollBy({ left: amount * direction, behavior: "smooth" });
  }

  return (
    <section id="reviews" className="scroll-mt-24 border-y border-kva-stone-light bg-kva-cream py-12 sm:py-16">
      <div className="kva-container">
        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-kva-forest">What our clients say</p>
            <h2 className="mt-3 font-display text-balance text-4xl font-medium leading-tight tracking-tight text-kva-ink sm:text-5xl">
              Trusted across the neighborhood.
            </h2>
            <div className="mt-4 flex items-center gap-2 text-sm text-kva-stone">
              <span className="flex items-center gap-0.5" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-kva-gold text-kva-gold" />
                ))}
              </span>
              <span className="font-semibold text-kva-ink">{review_aggregate.weighted_rating.toFixed(1)}</span>
              <span>· {review_aggregate.total_review_count}+ reviews across Google, Thumbtack & Yelp</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Previous testimonials"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-kva-stone-light bg-kva-cream text-kva-forest transition-colors hover:bg-kva-cream-warm focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-forest focus-visible:ring-offset-2"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Next testimonials"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-kva-stone-light bg-kva-cream text-kva-forest transition-colors hover:bg-kva-cream-warm focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-forest focus-visible:ring-offset-2"
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>

        <ul
          ref={trackRef}
          tabIndex={0}
          aria-label="Customer testimonials — scroll, swipe, or use the arrow buttons"
          className="kva-scroll-track mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto rounded-2xl pb-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-forest focus-visible:ring-offset-2"
        >
          {reviews_featured.map((review) => (
            <li
              key={`${review.source}-${review.author}-${review.date}`}
              className="flex w-[85%] flex-none snap-start flex-col rounded-2xl border border-kva-stone-light bg-kva-cream-warm/40 p-6 sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
            >
              <div className="flex items-center justify-between">
                <Quote className="h-6 w-6 text-kva-gold" aria-hidden />
                <span className="flex items-center gap-0.5" role="img" aria-label={`${review.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${i < review.rating ? "fill-kva-gold text-kva-gold" : "text-kva-stone-light"}`}
                      aria-hidden
                    />
                  ))}
                </span>
              </div>
              <blockquote className="mt-4 flex-1 text-pretty font-display text-[15px] leading-relaxed text-kva-ink/85">
                {review.text}
              </blockquote>
              <figcaption className="mt-5 border-t border-kva-stone-light pt-4 text-sm">
                <span className="block font-semibold text-kva-ink">{review.author}</span>
                <span className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-kva-stone">
                  <span>
                    {review.source} · {review.date}
                  </span>
                  {"verified" in review && review.verified && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-kva-forest/10 px-2 py-0.5 font-semibold text-kva-forest">
                      <BadgeCheck className="h-3 w-3" aria-hidden /> Verified
                    </span>
                  )}
                  {"service" in review && review.service && (
                    <span className="rounded-full bg-kva-green/15 px-2 py-0.5 font-medium text-kva-green-deep">
                      {review.service}
                    </span>
                  )}
                </span>
              </figcaption>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
