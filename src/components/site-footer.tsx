"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export function SiteFooter() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center sm:text-left"
        >
          <div className="font-display text-lg font-bold text-white">
            Uzun<span className="text-cyan-400">Werk</span>
          </div>
          <p className="mt-1 text-sm text-zinc-500">{t("tagline")}</p>
        </motion.div>
        <p className="text-sm text-zinc-600">
          © {year} UzunWerk. {t("rights")}
        </p>
      </div>
    </footer>
  );
}
