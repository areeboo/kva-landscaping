import { content } from "@/lib/content";

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
    <footer className="relative bg-kva-cream-warm pt-20 pb-12">
      <div className="kva-container">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl text-kva-ink">
                <span className="text-kva-forest">KVA</span> Landscaping
              </span>
            </div>
            <p className="mt-4 max-w-md text-pretty text-base leading-relaxed text-kva-stone">
              {footer.tagline}. Lawn care, hardscape, irrigation, and seasonal work for Sterling, Herndon, Leesburg, Ashburn, and Reston — nine years and counting.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={business.socials.facebook}
                target="_blank"
                rel="noopener"
                aria-label="KVA Landscaping on Facebook"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-kva-stone-light bg-kva-cream text-kva-forest transition-colors hover:bg-kva-forest hover:text-kva-cream"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-xs font-medium uppercase tracking-wider text-kva-stone">
              Reach us
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-kva-ink">
              <li>
                <a href={`tel:${hero.secondary_cta.tel}`} className="hover:text-kva-forest">
                  {business.phone_primary}
                </a>
              </li>
              <li>
                <a href={`mailto:${business.email}`} className="break-all hover:text-kva-forest">
                  {business.email}
                </a>
              </li>
              <li className="pt-2 text-kva-stone">
                {business.city}, {business.state} {business.zip}
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="text-xs font-medium uppercase tracking-wider text-kva-stone">Hours</h4>
            <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-1 text-sm text-kva-stone">
              {Object.entries(business.hours).map(([day, hrs]) => (
                <div key={day} className="contents">
                  <dt className="text-kva-ink">{dayLabels[day]}</dt>
                  <dd className="text-right">{hrs}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Service area pills */}
        <div className="mt-12 border-t border-kva-stone-light pt-8">
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <h4 className="text-xs font-medium uppercase tracking-wider text-kva-stone">
                Service area
              </h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {footer.service_area_pills.map((p) => (
                  <span
                    key={p}
                    className="rounded-full border border-kva-stone-light bg-kva-cream px-3 py-1 text-xs font-medium text-kva-stone"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
            <div className="sm:text-right">
              <h4 className="text-xs font-medium uppercase tracking-wider text-kva-stone">
                Payment
              </h4>
              <div className="mt-3 flex flex-wrap gap-2 sm:justify-end">
                {footer.payment_pills.map((p) => (
                  <span
                    key={p}
                    className="rounded-full border border-kva-stone-light bg-kva-cream px-3 py-1 text-xs font-medium text-kva-stone"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-kva-stone-light pt-6 text-xs text-kva-stone sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {footer.copyright_owner}. Class A Licensed in Virginia.</p>
          <p>
            Site by{" "}
            <a href="https://omnisolutions.example.com" className="text-kva-forest hover:underline">
              Omni Solutions
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
