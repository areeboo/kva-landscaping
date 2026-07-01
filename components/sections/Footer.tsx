import Link from "next/link";
import { content } from "@/lib/content";
import { LeafMark } from "@/components/site/LeafMark";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.461h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

const dayLabels: Record<string, string> = {
  mon: "Mon", tue: "Tue", wed: "Wed", thu: "Thu", fri: "Fri", sat: "Sat", sun: "Sun",
};

export function Footer() {
  const { business, footer, hero } = content;

  return (
    <footer className="bg-kva-forest-deep pt-16 pb-32 text-kva-cream/70 md:pb-10">
      <div className="kva-container">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-2.5 text-kva-cream">
              <LeafMark className="h-9 w-9" variant="onDark" />
              <span className="flex flex-col leading-none">
                <span className="font-display text-2xl tracking-tight">KVA</span>{" "}
                <span className="mt-0.5 text-[0.55rem] font-extrabold uppercase tracking-[0.24em] text-kva-cream/75">
                  Landscaping
                </span>
              </span>
            </Link>
            <p className="mt-4 max-w-md text-pretty text-sm leading-relaxed text-kva-cream/70">
              Lawn care, hardscape, planting, irrigation, and seasonal work for Sterling, Herndon, Leesburg, Ashburn,
              Reston, and Great Falls — nine years and counting.
            </p>
            <a
              href={business.socials.facebook}
              target="_blank"
              rel="noopener"
              aria-label="KVA Landscaping on Facebook"
              className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-kva-cream/25 text-kva-cream transition-colors hover:border-kva-gold hover:bg-kva-cream/5 hover:text-kva-gold"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-kva-cream/70">Reach us</h3>
            <ul className="mt-4 space-y-2 text-sm text-kva-cream/85">
              <li>
                <a href={`tel:${hero.secondary_cta.tel}`} className="inline-block py-1 transition-colors hover:text-kva-gold">
                  {business.phone_primary}
                </a>
              </li>
              <li>
                <a href={`mailto:${business.email}`} className="inline-block break-all py-1 transition-colors hover:text-kva-gold">
                  {business.email}
                </a>
              </li>
              <li className="pt-2 text-kva-cream/75">
                {business.city}, {business.state} {business.zip}
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-kva-cream/70">Hours</h3>
            <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-1 text-sm text-kva-cream/70">
              {Object.entries(business.hours).map(([day, hrs]) => (
                <div key={day} className="contents">
                  <dt className="text-kva-cream/85">{dayLabels[day]}</dt>
                  <dd className="text-right">{hrs}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-12 border-t border-kva-cream/12 pt-8">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-start">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-kva-cream/70">Service area</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {footer.service_area_pills.map((p) => (
                  <span
                    key={p}
                    className="rounded-full border border-kva-cream/20 px-3 py-1 text-xs font-medium text-kva-cream/75"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
            <div className="sm:text-right">
              <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-kva-cream/70">Payment</h3>
              <div className="mt-3 flex flex-wrap gap-2 sm:justify-end">
                {footer.payment_pills.map((p) => (
                  <span
                    key={p}
                    className="rounded-full border border-kva-cream/20 px-3 py-1 text-xs font-medium text-kva-cream/75"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-kva-cream/12 pt-6 text-xs text-kva-cream/70 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {footer.copyright_owner}. Family-run in Sterling, VA.</p>
          <p>
            Site by{" "}
            <span className="font-medium text-kva-cream/80">Omni Solutions</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
