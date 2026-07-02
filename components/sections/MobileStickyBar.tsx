"use client";

import { useEffect, useState } from "react";
import { Phone, MoveRight } from "lucide-react";
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
          className="flex min-w-0 flex-[0.72] items-center justify-center gap-2 rounded-[6px] border border-kva-forest/45 bg-transparent px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-kva-forest transition-colors hover:border-kva-forest hover:bg-kva-forest/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-forest focus-visible:ring-offset-2"
          aria-label={`Call KVA at ${content.business.phone_primary}`}
        >
          <Phone className="h-4 w-4 flex-none" aria-hidden />
          <span className="truncate">Call</span>
        </a>
        <a
          href="/estimate"
          className="flex min-w-0 flex-[1.35] items-center justify-center gap-2 rounded-[6px] border border-kva-sage-soft/40 bg-kva-sage px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-kva-cream transition-colors hover:bg-kva-sage-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-sage focus-visible:ring-offset-2"
        >
          <span className="truncate">Free Walk-Through</span>
          <MoveRight className="h-4 w-4 flex-none" aria-hidden />
        </a>
      </div>
    </div>
  );
}
