import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { BeforeAfterSlider } from "@/components/portfolio/BeforeAfterSlider";
import { Reveal } from "@/components/site/Reveal";

const reasons = [
  "We show up when we say we will",
  "A senior crew lead walks the whole property before we price it",
  "Same family-run crew, same number — nine years in NoVA",
  "We leave it clean and level, and come back if anything's off",
];

const tiles = [
  { src: "/images/projects/kva-firepit-patio.jpg", label: "Fire pit patios", href: "/services/paver-patios", alt: "Circular paver patio with a natural-stone fire pit, built by KVA in NoVA" },
  { src: "/images/projects/kva-flagstone-walkway.jpg", label: "Flagstone walkways", href: "/services/landscape-design", alt: "Dry-laid flagstone walkway across a back lawn by KVA Landscaping" },
  { src: "/images/projects/kva-mulch-arborvitae-colonial.jpg", label: "Mulch & planting", href: "/services/mulching", alt: "Arborvitae planting and fresh mulch beds along a brick colonial" },
  { src: "/images/portfolio/fresh-mow.jpg", label: "Lawn care", href: "/services/lawn-mowing", alt: "Freshly mowed striped lawn with mature trees in Sterling, VA" },
];

export function WhyProjects() {
  return (
    <section id="projects" className="scroll-mt-24 bg-kva-cream-warm py-12 sm:py-16">
      <Reveal className="kva-container grid gap-12 lg:grid-cols-12 lg:gap-14">
        {/* Why KVA */}
        <div className="lg:col-span-4">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-kva-forest">
            Why homeowners choose KVA
          </p>
          <h2 className="mt-3 font-display text-balance text-3xl font-medium leading-tight tracking-tight text-kva-ink sm:text-4xl">
            More than landscaping. It&apos;s peace of mind.
          </h2>
          <ul className="mt-7 space-y-4">
            {reasons.map((reason) => (
              <li key={reason} className="flex items-start gap-3 text-[15px] leading-snug text-kva-ink/85">
                <span className="mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-kva-forest/10 text-kva-forest">
                  <Check className="h-3.5 w-3.5" aria-hidden />
                </span>
                {reason}
              </li>
            ))}
          </ul>
        </div>

        {/* Projects */}
        <div className="lg:col-span-8">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-kva-forest">Featured projects</p>
              <h2 className="mt-2 font-display text-3xl font-medium leading-tight tracking-tight text-kva-ink sm:text-4xl">
                Real projects. Real results.
              </h2>
            </div>
            <Link
              href="/services"
              className="group inline-flex flex-none items-center gap-2 rounded-full text-sm font-bold text-kva-forest transition-colors hover:text-kva-forest-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-forest focus-visible:ring-offset-2"
            >
              Explore the work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>

          <div className="mt-6">
            <BeforeAfterSlider
              before={{
                src: "/images/portfolio/lawn-before.jpg",
                alt: "Patchy, weedy front yard before KVA installed fresh sod — Sterling, VA",
              }}
              after={{
                src: "/images/portfolio/lawn-after.jpg",
                alt: "Fresh sod and a clean, healthy lawn installed by KVA — Sterling, VA",
              }}
              caption="New sod install — Sterling front yard"
              eyebrow="Before / After"
            />
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {tiles.map((tile) => (
              <Link
                key={tile.label}
                href={tile.href}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-kva-forest-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-forest focus-visible:ring-offset-2"
              >
                <Image
                  src={tile.src}
                  alt={tile.alt}
                  fill
                  sizes="(min-width: 1024px) 22vw, 45vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-kva-forest-deep/85 via-transparent to-transparent" aria-hidden />
                <span className="absolute bottom-3 left-3 text-sm font-bold text-kva-cream drop-shadow">
                  {tile.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
