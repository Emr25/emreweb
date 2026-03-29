"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const EXRAG_URL = "https://exragpro.vercel.app/";

const featureKeys = ["f1", "f2", "f3"] as const;

/** Encode each path segment so spaces and Unicode in `/public` filenames work in URLs. */
function encodePublicPath(path: string): string {
  const trimmed = path.startsWith("/") ? path.slice(1) : path;
  return "/" + trimmed.split("/").map(encodeURIComponent).join("/");
}

const dashboardShots = [
  {
    src: "/kişisel ayarlar.png",
    captionKey: "dashboardCaptionPersonalization" as const,
    altKey: "dashboardAltPersonalization" as const,
  },
  {
    src: "/pdf yükleme yeri.png",
    captionKey: "dashboardCaptionPdf" as const,
    altKey: "dashboardAltPdf" as const,
  },
  {
    src: "/sohbet geçmişi.png",
    captionKey: "dashboardCaptionChat" as const,
    altKey: "dashboardAltChat" as const,
  },
];

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

          <div className="relative space-y-14">
            <div className="max-w-3xl">
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5 }}
              className="relative border-t border-white/10 pt-12"
            >
              <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
                {t("dashboardGalleryTitle")}
              </h3>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-400 sm:text-base">
                {t("dashboardGalleryLead")}
              </p>

              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-4 lg:gap-5">
                {dashboardShots.map((shot, i) => (
                  <motion.figure
                    key={shot.src}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.06 * i, duration: 0.45 }}
                    className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/90 shadow-lg shadow-black/40 ring-1 ring-white/5"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-900">
                      <Image
                        src={encodePublicPath(shot.src)}
                        alt={t(shot.altKey)}
                        fill
                        priority={i === 0}
                        quality={90}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 360px"
                        className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    </div>
                    <figcaption className="border-t border-white/5 px-3 py-2.5 text-xs leading-snug text-zinc-400 sm:text-sm">
                      {t(shot.captionKey)}
                    </figcaption>
                  </motion.figure>
                ))}
              </div>

              <p className="mt-8 text-center text-xs text-zinc-600">
                {t("previewNote")}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
