"use client";

import { useEffect, useState } from "react";
import { Phone, ArrowRight } from "lucide-react";
import { content } from "@/lib/content";

export function MobileStickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show after user scrolls past one viewport height (past the hero)
      setVisible(window.scrollY > window.innerHeight * 0.85);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-kva-stone-light/80 bg-background/95 px-3 py-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] backdrop-blur-md transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      role="region"
      aria-label="Quick actions"
      aria-hidden={!visible}
      inert={!visible ? true : undefined}
    >
      <div className="mx-auto flex max-w-md items-center gap-2">
        <a
          href={`tel:${content.hero.secondary_cta.tel}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-full border border-kva-forest bg-kva-cream px-3 py-3 text-sm font-semibold text-kva-forest transition-colors hover:bg-kva-forest hover:text-kva-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-forest focus-visible:ring-offset-2"
          aria-label={`Call KVA at ${content.business.phone_primary}`}
        >
          <Phone className="h-4 w-4 flex-none" aria-hidden />
          {content.business.phone_primary}
        </a>
        <a
          href="/estimate"
          className="flex flex-[1.4] items-center justify-center gap-2 rounded-full bg-kva-green px-4 py-3 text-sm font-semibold text-kva-cream shadow-sm transition-colors hover:bg-kva-green-deep hover:text-kva-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-green focus-visible:ring-offset-2"
        >
          Free Walk-Through
          <ArrowRight className="h-4 w-4 flex-none" aria-hidden />
        </a>
      </div>
    </div>
  );
}
