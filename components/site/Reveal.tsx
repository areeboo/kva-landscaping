"use client";

import { motion } from "framer-motion";

// Subtle fade-in-up on section enter (brand brief: 0.6s ease-out, once).
// Motion is globally gated by <MotionConfig reducedMotion="user"> in MotionProvider,
// so prefers-reduced-motion users get the static end state with no animation.
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
