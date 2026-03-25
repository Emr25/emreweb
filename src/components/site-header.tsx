"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { LanguageSwitcher } from "./language-switcher";

export function SiteHeader() {
  const t = useTranslations("nav");
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 48);
  });

  const links = [
    { href: "#services", label: t("services") },
    { href: "#about", label: t("about") },
    { href: "#projects", label: t("projects") },
    { href: "#ai", label: t("ai") },
    { href: "#ceo", label: t("ceo") },
    { href: "#contact", label: t("contact") },
  ];

  return (
    <motion.header
      className={`fixed top-0 z-[100] w-full transition-colors duration-300 ${
        scrolled || menuOpen
          ? "border-b border-white/5 bg-[#030306]/85 backdrop-blur-xl"
          : "bg-transparent"
      }`}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a
          href="#top"
          className="font-display text-lg font-bold tracking-tight text-white"
          onClick={() => setMenuOpen(false)}
        >
          Uzun<span className="text-cyan-400">Werk</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {links.map((l) => (
            <motion.a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-zinc-400 transition-colors hover:text-cyan-300"
              whileHover={{ y: -1 }}
            >
              {l.label}
            </motion.a>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-zinc-200 md:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="sr-only">Menu</span>
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <>
                  <path strokeLinecap="round" d="M4 8h16" />
                  <path strokeLinecap="round" d="M4 12h16" />
                  <path strokeLinecap="round" d="M4 16h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
            className="overflow-hidden border-b border-white/5 bg-[#030306]/95 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-zinc-300 hover:bg-white/5 hover:text-cyan-300"
                  onClick={() => setMenuOpen(false)}
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
