"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

export function ContactSection() {
  const t = useTranslations("contact");
  const email = t("email");

  type BriefKey = "chatbot" | "ecommerce" | "web";
  const [brief, setBrief] = useState<BriefKey>("web");
  const [copied, setCopied] = useState(false);

  const mailto = useMemo(() => {
    const typeLabel = t(`types.${brief}`);
    const subject = encodeURIComponent(t("emailSubject", { type: typeLabel }));
    const body = encodeURIComponent(
      `${t("emailBodyIntro")}\n\n${typeLabel}\n\n${t("emailBodyClosing")}`
    );
    return `mailto:${email}?subject=${subject}&body=${body}`;
  }, [brief, email, t]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // Fallback: ignore clipboard errors.
    }
  };

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 px-4 py-28 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-b from-zinc-900/90 to-black/90 px-8 py-16 sm:px-14 sm:py-20"
            >
              <motion.div
                className="pointer-events-none absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-cyan-500/25 blur-[80px]"
                animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.65, 0.4] }}
                transition={{ duration: 6, repeat: Infinity }}
              />
              <motion.div
                className="pointer-events-none absolute -right-16 bottom-0 h-48 w-48 rounded-full bg-violet-600/20 blur-[70px]"
                animate={{ scale: [1, 1.1, 1], opacity: [0.35, 0.55, 0.35] }}
                transition={{ duration: 7, repeat: Infinity }}
              />
              <h2 className="relative font-display text-3xl font-bold text-white sm:text-4xl">
                {t("title")}
              </h2>
              <p className="relative mt-4 text-lg text-zinc-400">{t("subtitle")}</p>

              <div className="relative mt-10 flex flex-col items-center gap-3 lg:items-start">
                <motion.a
                  href={mailto}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-base font-semibold text-cyan-300 backdrop-blur-sm transition-colors hover:border-cyan-500/40 hover:bg-cyan-500/10 lg:w-auto"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {email}
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    aria-hidden
                  >
                    →
                  </motion.span>
                </motion.a>

                <motion.button
                  type="button"
                  onClick={copyEmail}
                  disabled={copied}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-base font-semibold text-zinc-200 backdrop-blur-sm transition-colors hover:border-cyan-500/30 hover:bg-cyan-500/10 disabled:opacity-60"
                  whileHover={{ scale: copied ? 1 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {copied ? t("copied") : t("copy")}
                </motion.button>
              </div>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="relative h-full overflow-hidden rounded-3xl border border-white/[0.08] bg-zinc-900/45 p-6 sm:p-8"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.18),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(167,139,250,0.15),transparent_50%)] opacity-80" />

              <div className="relative">
                <h3 className="font-display text-xl font-semibold text-white">
                  {t("briefTitle")}
                </h3>
                <p className="mt-2 text-sm text-zinc-400">{t("briefSubtitle")}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {(["web", "ecommerce", "chatbot"] as const).map((k) => {
                    const active = k === brief;
                    return (
                      <motion.button
                        key={k}
                        type="button"
                        onClick={() => setBrief(k)}
                        whileTap={{ scale: 0.98 }}
                        className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                          active
                            ? "border-cyan-400/40 bg-cyan-500/15 text-cyan-200"
                            : "border-white/10 bg-white/5 text-zinc-300 hover:border-cyan-500/30"
                        }`}
                      >
                        {t(`types.${k}`)}
                      </motion.button>
                    );
                  })}
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-xs font-semibold uppercase tracking-widest text-cyan-300/80">
                        {t("compose")}
                      </div>
                      <div className="mt-1 truncate text-sm text-zinc-200">
                        {t(`types.${brief}`)}
                      </div>
                    </div>
                    <motion.div
                      className="h-2.5 w-2.5 rounded-full bg-cyan-400"
                      animate={{ opacity: [0.35, 1, 0.35] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                      aria-hidden
                    />
                  </div>
                  <div className="mt-3 text-sm text-zinc-400">
                    {t("preview")}
                  </div>
                </div>

                <motion.a
                  href={mailto}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-500/15 px-5 py-3.5 text-sm font-semibold text-cyan-200 shadow-[0_0_0_1px_rgba(34,211,238,0.2)] transition-colors hover:bg-cyan-500/25"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t("mailCta")}
                  <span aria-hidden>→</span>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
