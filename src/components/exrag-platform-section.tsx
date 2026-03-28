"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const EXRAG_URL = "https://exragpro.vercel.app/";

const featureKeys = ["f1", "f2", "f3"] as const;

export function ExragPlatformSection() {
  const t = useTranslations("exrag");

  return (
    <section
      id="exrag"
      className="relative scroll-mt-24 px-4 py-24 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-zinc-900/95 via-zinc-950/98 to-[#050508] p-8 sm:p-10 lg:p-12"
        >
          <div className="pointer-events-none absolute -right-32 top-0 h-80 w-80 rounded-full bg-cyan-500/12 blur-[100px]" />
          <div className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-violet-600/10 blur-[90px]" />

          <div className="relative grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-200/95">
                <motion.span
                  className="h-1.5 w-1.5 rounded-full bg-cyan-400"
                  animate={{ opacity: [1, 0.45, 1], scale: [1, 1.15, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  aria-hidden
                />
                {t("eyebrow")}
              </span>
              <h2 className="mt-5 font-display text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
                {t("title")}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-400 sm:text-lg">
                {t("lead")}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-500 sm:text-base">
                {t("demoHint")}
              </p>

              <ul className="mt-8 space-y-3">
                {featureKeys.map((key, i) => (
                  <motion.li
                    key={key}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.08 * i, duration: 0.45 }}
                    className="flex gap-3 text-sm text-zinc-300 sm:text-base"
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400/90"
                      aria-hidden
                    />
                    {t(key)}
                  </motion.li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <motion.a
                  href={EXRAG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-7 py-3.5 text-sm font-semibold text-zinc-950 shadow-[0_0_40px_-8px_rgba(34,211,238,0.55)] transition-shadow hover:shadow-[0_0_52px_-8px_rgba(34,211,238,0.75)]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t("ctaPlatform")}
                  <span className="ml-2" aria-hidden>
                    ↗
                  </span>
                </motion.a>
                <motion.a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-zinc-100 backdrop-blur-sm transition-colors hover:border-cyan-500/35 hover:bg-cyan-500/10"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t("ctaDemo")}
                </motion.a>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none"
            >
              <div className="rounded-2xl border border-white/10 bg-black/40 p-1 shadow-2xl shadow-black/50 backdrop-blur-md">
                <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="ml-2 truncate text-xs text-zinc-500">
                    exragpro.vercel.app
                  </span>
                </div>
                <div className="p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <motion.div
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/25 to-violet-600/20 font-display text-2xl font-bold text-white ring-1 ring-cyan-500/30"
                      animate={{
                        boxShadow: [
                          "0 0 0 0 rgba(34,211,238,0.25)",
                          "0 0 28px 2px rgba(34,211,238,0.2)",
                          "0 0 0 0 rgba(34,211,238,0.25)",
                        ],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      E
                    </motion.div>
                    <div>
                      <div className="font-display text-lg font-semibold text-white">
                        {t("brandLine")}
                      </div>
                      <p className="mt-1 text-sm text-zinc-500">PDF · RAG · Widget</p>
                    </div>
                  </div>
                  <div className="mt-6 space-y-3 rounded-xl border border-white/5 bg-zinc-900/50 p-4">
                    <div className="h-2 w-3/4 rounded bg-zinc-700/80" />
                    <div className="h-2 w-full rounded bg-zinc-800/80" />
                    <div className="h-2 w-5/6 rounded bg-zinc-800/80" />
                  </div>
                  <p className="mt-4 text-center text-xs text-zinc-600">
                    {t("previewNote")}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
