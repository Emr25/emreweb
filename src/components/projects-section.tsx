"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useMemo } from "react";

const projectKeys = ["one", "two", "three", "four"] as const;

const gradients = [
  "from-cyan-500/30 to-blue-600/20",
  "from-violet-500/30 to-fuchsia-600/15",
  "from-emerald-500/25 to-cyan-600/15",
  "from-amber-500/20 to-orange-600/15",
];

export function ProjectsSection() {
  const t = useTranslations("projects");

  const projectLinks = useMemo(
    () =>
      ({
        one: "https://alyelgroupsigorta.com/",
        two: "https://polipool.com/",
        three: "https://kahtatyoresel.com/",
        four: "https://tonertr.com/",
      }) as const,
    []
  );

  return (
    <section
      id="projects"
      className="relative scroll-mt-24 px-4 py-28 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-zinc-400">{t("subtitle")}</p>
        </motion.div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {projectKeys.map((key, i) => (
            <motion.a
              key={key}
              href={projectLinks[key]}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              aria-label={`${t(`items.${key}.title`)} - ${t("visit")}`}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-zinc-900/50"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br opacity-60 transition-opacity duration-500 group-hover:opacity-90 ${gradients[i]}`}
              />
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
              <div className="relative flex min-h-[220px] flex-col justify-end p-8">
                <span className="mb-2 inline-block font-mono text-xs font-medium text-cyan-200/80">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-200/80">
                  {t(`items.${key}.desc`)}
                </p>
              </div>
              <div className="relative flex items-center justify-between gap-3 p-4">
                <span className="text-sm font-semibold text-cyan-200/80">
                  {t("visit")}
                </span>
                <span className="text-sm text-zinc-400 transition-colors group-hover:text-cyan-200/90">
                  ↗
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
