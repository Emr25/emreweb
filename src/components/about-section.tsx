"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function AnimatedNumber({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const end = value;
    const dur = 1400;
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min((t - t0) / dur, 1);
      const eased = 1 - (1 - p) ** 3;
      setN(Math.floor(eased * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export function AboutSection() {
  const t = useTranslations("about");

  return (
    <section
      id="about"
      className="relative scroll-mt-24 overflow-hidden px-4 py-28 sm:px-6 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-violet-600/5 to-transparent" />
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65 }}
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-cyan-400/90">
              UzunWerk
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-6 text-lg font-medium leading-relaxed text-zinc-300">
              {t("lead")}
            </p>
            <p className="mt-4 leading-relaxed text-zinc-400">{t("p1")}</p>
            <p className="mt-4 leading-relaxed text-zinc-400">{t("p2")}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-cyan-500/20 via-transparent to-violet-600/20 blur-2xl" />
            <div className="relative grid grid-cols-2 gap-4 rounded-2xl border border-white/10 bg-zinc-900/40 p-6 backdrop-blur-md sm:p-8">
              {[
                { value: 8, suffix: "+", label: t("stat1") },
                { value: 40, suffix: "+", label: t("stat2") },
                { value: 100, suffix: "%", label: t("stat3") },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.08 }}
                  className={`rounded-xl border border-white/5 bg-black/30 p-5 ${i === 2 ? "col-span-2" : ""}`}
                  whileHover={{ scale: 1.02, borderColor: "rgba(34,211,238,0.25)" }}
                >
                  <div className="font-display text-3xl font-bold text-white sm:text-4xl">
                    <AnimatedNumber value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-1 text-sm text-zinc-400">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
