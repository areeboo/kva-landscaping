import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { content } from "@/lib/content";

export function Hero() {
  const { hero } = content;

  return (
    <section id="home" className="relative isolate overflow-hidden bg-kva-forest-deep">
      <Image
        src={hero.image}
        alt="Stone patio and fire pit framed by mature landscaping on a Northern Virginia property"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[center_52%]"
      />
      {/* Forest wash — heavy on the left for copy legibility, clearing to the right */}
      <div
        className="absolute inset-0 -z-10"
        aria-hidden
        style={{
          background:
            "linear-gradient(90deg, color-mix(in oklab, var(--kva-forest-deep) 94%, transparent) 0%, color-mix(in oklab, var(--kva-forest-deep) 82%, transparent) 32%, color-mix(in oklab, var(--kva-forest-deep) 30%, transparent) 62%, transparent 100%)",
        }}
      />

      <div className="kva-container flex min-h-[34rem] items-center py-20 sm:min-h-[36rem] sm:py-24 lg:min-h-[38rem]">
        <div className="max-w-xl text-kva-cream">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-kva-cream/75">
            Landscaping · Hardscaping · Maintenance
          </p>
          <h1 className="mt-4 font-display text-balance text-5xl font-medium leading-[0.98] tracking-tight sm:text-6xl lg:text-[4.1rem]">
            {hero.tagline}
          </h1>
          <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-kva-cream/90 sm:text-lg">
            {hero.subhead}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href={hero.primary_cta.anchor}
              className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-kva-gold px-6 py-3.5 text-base font-semibold text-kva-ink shadow-lg shadow-kva-gold/25 transition-all hover:-translate-y-0.5 hover:bg-kva-gold-deep hover:text-kva-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-gold focus-visible:ring-offset-2 focus-visible:ring-offset-kva-forest-deep"
            >
              {hero.primary_cta.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
            <a
              href={`tel:${hero.secondary_cta.tel}`}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-kva-cream/55 bg-kva-forest-deep/30 px-6 py-3.5 text-base font-semibold text-kva-cream backdrop-blur transition-colors hover:border-kva-cream hover:bg-kva-forest-deep/55 focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-cream focus-visible:ring-offset-2 focus-visible:ring-offset-kva-forest-deep"
            >
              <Phone className="h-4 w-4" aria-hidden />
              {hero.secondary_cta.label}
            </a>
          </div>

          <p className="mt-4 text-sm text-kva-cream/75">{hero.primary_cta_micro}</p>

          <ul className="mt-9 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-kva-cream/85">
            {hero.trust_strip.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-kva-gold" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
