"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { GripVertical } from "lucide-react";

type Side = {
  src: string;
  alt: string;
};

type Props = {
  before: Side;
  after: Side;
  caption: string;
  /** Where the divider starts, 0..100. Defaults to 50. */
  initial?: number;
  /** Optional eyebrow label above the caption. */
  eyebrow?: string;
};

const STEP_KEY = 4;
const STEP_KEY_LARGE = 12;

export function BeforeAfterSlider({
  before,
  after,
  caption,
  initial = 50,
  eyebrow = "Same yard",
}: Props) {
  const [position, setPosition] = useState(initial);
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLButtonElement>(null);
  const draggingRef = useRef(false);
  const reduceMotion = useReducedMotion();

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, next)));
  }, []);

  // Pointer drag
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      e.preventDefault();
      setFromClientX(e.clientX);
    };
    const onUp = () => {
      draggingRef.current = false;
    };
    window.addEventListener("pointermove", onMove, { passive: false });
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [setFromClientX]);

  const startDrag = (e: React.PointerEvent) => {
    draggingRef.current = true;
    setHasInteracted(true);
    setFromClientX(e.clientX);
    handleRef.current?.focus({ preventScroll: true });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const big = e.shiftKey;
    const step = big ? STEP_KEY_LARGE : STEP_KEY;
    let next = position;
    switch (e.key) {
      case "ArrowLeft":
      case "ArrowDown":
        next = Math.max(0, position - step);
        break;
      case "ArrowRight":
      case "ArrowUp":
        next = Math.min(100, position + step);
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = 100;
        break;
      case "PageUp":
        next = Math.min(100, position + STEP_KEY_LARGE);
        break;
      case "PageDown":
        next = Math.max(0, position - STEP_KEY_LARGE);
        break;
      default:
        return;
    }
    e.preventDefault();
    setHasInteracted(true);
    setPosition(next);
  };

  // Gentle nudge animation on mount to advertise interactivity (skipped if user prefers reduced motion)
  useEffect(() => {
    if (reduceMotion || hasInteracted) return;
    let raf = 0;
    const start = performance.now();
    const tween = (t: number) => {
      const elapsed = t - start;
      const duration = 2400;
      if (elapsed > duration) return;
      // Soft sinusoidal sweep between 42 and 58 once, then settle to initial
      const phase = elapsed / duration;
      const offset = Math.sin(phase * Math.PI * 2) * 8;
      setPosition(initial + offset);
      raf = requestAnimationFrame(tween);
    };
    const delay = setTimeout(() => {
      raf = requestAnimationFrame(tween);
    }, 900);
    return () => {
      clearTimeout(delay);
      cancelAnimationFrame(raf);
      setPosition(initial);
    };
  }, [reduceMotion, hasInteracted, initial]);

  return (
    <figure className="overflow-hidden rounded-3xl bg-kva-ink ring-1 ring-kva-stone-light/70">
      <div
        ref={containerRef}
        onPointerDown={startDrag}
        className="relative aspect-[16/10] w-full cursor-ew-resize select-none touch-none sm:aspect-[16/9]"
      >
        {/* Base image (after) */}
        <Image
          src={after.src}
          alt={after.alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1200px"
          className="object-cover"
          draggable={false}
        />

        {/* Top image (before) clipped by position */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          aria-hidden
        >
          <Image
            src={before.src}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1200px"
            className="object-cover"
            draggable={false}
          />
        </div>

        {/* Top-left "Before" badge — fades out as the slider passes */}
        <BadgeChip
          side="left"
          label="Before"
          tone="cream"
          opacity={badgeOpacity(position, "left")}
        />
        {/* Top-right "After" badge — fades in as the slider sweeps */}
        <BadgeChip
          side="right"
          label="After"
          tone="gold"
          opacity={badgeOpacity(position, "right")}
        />

        {/* Divider + handle */}
        <div
          className="pointer-events-none absolute inset-y-0"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        >
          <div className="relative h-full">
            <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-kva-cream/85 shadow-[0_0_24px_rgba(0,0,0,0.35)]" />
            <motion.button
              ref={handleRef}
              type="button"
              role="slider"
              aria-label="Before-after comparison slider"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(position)}
              aria-valuetext={`${Math.round(position)}% revealing the before photo`}
              tabIndex={0}
              onKeyDown={onKeyDown}
              onPointerDown={(e) => {
                e.stopPropagation();
                startDrag(e);
              }}
              animate={reduceMotion || hasInteracted ? undefined : { scale: [1, 1.04, 1] }}
              transition={{ duration: 1.6, repeat: 1, ease: "easeInOut" }}
              className="pointer-events-auto absolute left-1/2 top-1/2 inline-flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-grab items-center justify-center rounded-full border border-kva-cream/70 bg-kva-cream text-kva-ink shadow-xl shadow-black/30 transition-transform hover:scale-105 active:cursor-grabbing focus:outline-none focus-visible:ring-4 focus-visible:ring-kva-gold focus-visible:ring-offset-2 focus-visible:ring-offset-kva-ink"
            >
              <GripVertical className="h-5 w-5" aria-hidden />
              <span className="sr-only">Drag to compare before and after</span>
            </motion.button>
          </div>
        </div>

        {/* Subtle bottom gradient for caption legibility on hover/touch */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-kva-ink/40 to-transparent" />

        {/* Hint label on first paint */}
        {!hasInteracted && (
          <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-kva-cream/95 px-3 py-1 text-xs font-medium uppercase tracking-wider text-kva-ink shadow-md">
            Drag to compare
          </div>
        )}
      </div>

      <figcaption className="flex flex-col gap-1 bg-kva-cream-warm px-5 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 sm:px-8">
        <div>
          <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-kva-stone">
            {eyebrow}
          </span>
          <p className="mt-0.5 font-display text-base leading-tight text-kva-ink sm:text-lg">
            {caption}
          </p>
        </div>
        <p className="text-xs leading-relaxed text-kva-stone sm:max-w-xs sm:text-right">
          Drag the gold handle — or use arrow keys — to reveal the before photo.
        </p>
      </figcaption>
    </figure>
  );
}

function BadgeChip({
  side,
  label,
  tone,
  opacity,
}: {
  side: "left" | "right";
  label: string;
  tone: "cream" | "gold";
  opacity: number;
}) {
  const position =
    side === "left"
      ? "left-4 sm:left-5"
      : "right-4 sm:right-5";
  const palette =
    tone === "gold"
      ? "bg-kva-gold text-kva-ink"
      : "bg-kva-cream/95 text-kva-ink";
  return (
    <span
      className={`absolute top-4 sm:top-5 ${position} inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] shadow-sm transition-opacity duration-200 ${palette}`}
      style={{ opacity }}
      aria-hidden
    >
      {label}
    </span>
  );
}

function badgeOpacity(position: number, side: "left" | "right") {
  // Fade each badge out when the slider crosses near it
  if (side === "left") {
    if (position <= 18) return 0;
    if (position >= 26) return 1;
    return (position - 18) / 8;
  }
  if (position >= 82) return 0;
  if (position <= 74) return 1;
  return (82 - position) / 8;
}
