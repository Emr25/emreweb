"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export function CeoSection() {
  const t = useTranslations("ceo");

  return (
    <section
      id="ceo"
      className="relative scroll-mt-24 px-4 py-28 sm:px-6 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-cyan-400/90">
            {t("eyebrow")}
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-zinc-400">{t("subtitle")}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="relative mt-16 overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-zinc-900/90 via-zinc-950/95 to-black/90 p-8 sm:p-10 lg:p-12"
        >
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-violet-600/10 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[auto_1fr] lg:items-start lg:gap-14">
            <div className="mx-auto flex flex-col items-center lg:mx-0">
              <motion.div
                className="flex h-28 w-28 items-center justify-center rounded-2xl border border-cyan-500/25 bg-gradient-to-br from-cyan-500/15 to-violet-600/10 font-display text-3xl font-bold tracking-tight text-white shadow-[0_0_60px_-12px_rgba(34,211,238,0.35)] sm:h-32 sm:w-32 sm:text-4xl"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {t("initials")}
              </motion.div>
              <div className="mt-5 text-center lg:text-left">
                <div className="font-display text-xl font-bold text-white sm:text-2xl">
                  {t("name")}
                </div>
                <div className="mt-1 text-sm font-medium text-cyan-300/90">
                  {t("role")}
                </div>
              </div>
            </div>

            <div className="space-y-5 text-left">
              <p className="leading-relaxed text-zinc-300">{t("p1")}</p>
              <p className="leading-relaxed text-zinc-300">{t("p2")}</p>
              <p className="leading-relaxed text-zinc-300">{t("p3")}</p>

              <div className="grid gap-3 pt-4 sm:grid-cols-3">
                {(["edu", "experience", "focus"] as const).map((key) => (
                  <div
                    key={key}
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
                  >
                    <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                      {t(`cards.${key}.label`)}
                    </div>
                    <div className="mt-1.5 text-sm font-medium leading-snug text-zinc-200">
                      {t(`cards.${key}.value`)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
