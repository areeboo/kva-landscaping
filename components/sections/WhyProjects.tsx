import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { BeforeAfterSlider } from "@/components/portfolio/BeforeAfterSlider";

const reasons = [
  "Clear communication and dependable scheduling",
  "Quality workmanship with lasting results",
  "Customized solutions for your property",
  "Respect for your home and your time",
];

const tiles = [
  { src: "/images/projects/project-patio.webp", label: "Patios", href: "/services/hardscape-patios", alt: "Covered paver patio and entertaining area" },
  { src: "/images/projects/project-landscape.webp", label: "Landscapes", href: "/services/mulch-beds-planting", alt: "Complete landscape installation on a NoVA property" },
  { src: "/images/projects/project-firepit.webp", label: "Outdoor living", href: "/services/hardscape-patios", alt: "Stone fire pit with outdoor seating" },
  { src: "/images/projects/project-beds.webp", label: "Garden beds", href: "/services/mulch-beds-planting", alt: "Freshly mulched and maintained plant beds" },
];

export function WhyProjects() {
  return (
    <section id="projects" className="scroll-mt-24 bg-kva-cream-warm py-20 sm:py-24">
      <div className="kva-container grid gap-12 lg:grid-cols-12 lg:gap-14">
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
                src: "/images/projects/project-before.webp",
                alt: "Backyard before KVA Landscaping's work",
              }}
              after={{
                src: "/images/projects/project-after.webp",
                alt: "Finished landscaped backyard by KVA Landscaping",
              }}
              caption="Full backyard transformation — Sterling, VA"
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
      </div>
    </section>
  );
}
