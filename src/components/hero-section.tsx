"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function HeroSection() {
  const t = useTranslations("hero");

  return (
    <section
      id="top"
      className="relative flex min-h-[92vh] flex-col justify-center px-4 pt-24 pb-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center"
        >
          <motion.span
            variants={item}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/25 bg-cyan-500/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-300/90"
          >
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-cyan-400"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {t("badge")}
          </motion.span>
          <motion.h1
            variants={item}
            className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {t("title")}
          </motion.h1>
          <motion.p
            variants={item}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl"
          >
            {t("subtitle")}
          </motion.p>
          <motion.div
            variants={item}
            className="mt-12 flex flex-wrap items-center justify-center gap-4"
          >
            <motion.a
              href="#projects"
              className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-8 py-3.5 text-sm font-semibold text-zinc-950 shadow-[0_0_40px_-8px_rgba(34,211,238,0.65)] transition-shadow hover:shadow-[0_0_56px_-8px_rgba(34,211,238,0.85)]"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {t("ctaPrimary")}
            </motion.a>
            <motion.a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-3.5 text-sm font-semibold text-zinc-100 backdrop-blur-sm transition-colors hover:border-cyan-500/40 hover:bg-cyan-500/10"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {t("ctaSecondary")}
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      >
        <div className="h-10 w-6 rounded-full border-2 border-white/20 p-1">
          <motion.div
            className="mx-auto h-2 w-1 rounded-full bg-cyan-400/80"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
