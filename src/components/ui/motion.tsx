"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

type MotionDivProps = HTMLMotionProps<"div"> & { delay?: number };

// ── FadeIn ───────────────────────────────────────────────────────────────────

export function FadeIn({ delay = 0, children, ...props }: MotionDivProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, ease: "easeOut", delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ── SlideUp ──────────────────────────────────────────────────────────────────

export function SlideUp({ delay = 0, children, ...props }: MotionDivProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ── SlideInRight ─────────────────────────────────────────────────────────────

export function SlideInRight({ delay = 0, children, ...props }: MotionDivProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, ease: "easeOut", delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ── ScaleIn ──────────────────────────────────────────────────────────────────

export function ScaleIn({ delay = 0, children, ...props }: MotionDivProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.3, ease: "easeOut", delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ── StaggerContainer ─────────────────────────────────────────────────────────

export function StaggerContainer({ children, ...props }: MotionDivProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ── StaggerItem — direct child of StaggerContainer ───────────────────────────

export function StaggerItem({ children, ...props }: MotionDivProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ── FloatingElement ───────────────────────────────────────────────────────────

export function FloatingElement({ children, ...props }: MotionDivProps) {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
