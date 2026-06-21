import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { content } from "@/lib/content";

export function FinalCta() {
  const { hero } = content;

  return (
    <section className="relative isolate overflow-hidden bg-kva-forest-deep">
      <Image
        src="/images/cta-lawn.webp"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover object-[center_65%]"
      />
      <div
        className="absolute inset-0 -z-10"
        aria-hidden
        style={{
          background:
            "linear-gradient(90deg, color-mix(in oklab, var(--kva-forest-deep) 92%, transparent), color-mix(in oklab, var(--kva-forest) 70%, transparent))",
        }}
      />
      <div className="kva-container flex flex-col items-start justify-between gap-8 py-10 sm:py-12 lg:flex-row lg:items-center">
        <div className="max-w-xl text-kva-cream">
          <h2 className="font-display text-balance text-3xl font-medium leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]">
            Ready to love your outdoor space?
          </h2>
          <p className="mt-3 text-pretty text-base leading-relaxed text-kva-cream/85">
            Tell us what you need and a senior crew lead will walk the property — then give you a real number, no
            pressure. Usually a reply within one business day.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
          <Link
            href="/estimate"
            className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-kva-green px-6 py-3.5 text-base font-semibold text-kva-cream shadow-sm transition-all hover:-translate-y-0.5 hover:bg-kva-green-deep hover:text-kva-cream hover:shadow-md active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-green focus-visible:ring-offset-2 focus-visible:ring-offset-kva-forest-deep"
          >
            {hero.primary_cta.label}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </Link>
          <a
            href={`tel:${hero.secondary_cta.tel}`}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-kva-cream/55 px-6 py-3.5 text-base font-semibold text-kva-cream transition-colors hover:bg-kva-cream hover:text-kva-forest-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-cream focus-visible:ring-offset-2 focus-visible:ring-offset-kva-forest-deep"
          >
            <Phone className="h-4 w-4" aria-hidden />
            {hero.secondary_cta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
