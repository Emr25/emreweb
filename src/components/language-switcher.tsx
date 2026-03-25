"use client";

import { useId } from "react";
import { useLocale } from "next-intl";
import { routing, usePathname, useRouter } from "@/i18n/routing";
import { motion } from "framer-motion";

const labels: Record<string, string> = { tr: "TR", de: "DE", en: "EN" };

const flagClass = "block h-4 w-6 shrink-0 overflow-hidden rounded-sm ring-1 ring-white/15";

/** Türkiye — inline SVG (ağ isteği yok) */
function FlagTR() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 900 600"
      className={flagClass}
      aria-hidden
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="900" height="600" fill="#E30A17" />
      <g fill="#FFFFFF">
        <circle cx="337.5" cy="300" r="122.5" />
        <circle cx="393.75" cy="300" r="102.5" fill="#E30A17" />
      </g>
      <g fill="#FFFFFF" transform="translate(455 300) rotate(-16.5)">
        <path d="M0,-40 L9.51,-12.36 L38.04,-12.36 L15.27,4.72 L24.49,36.36 L0,22 L-24.49,36.36 L-15.27,4.72 L-38.04,-12.36 L-9.51,-12.36 Z" />
      </g>
    </svg>
  );
}

/** Almanya — federal üç renk */
function FlagDE() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 5 3"
      className={flagClass}
      aria-hidden
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="5" height="1" y="0" fill="#000000" />
      <rect width="5" height="1" y="1" fill="#DD0000" />
      <rect width="5" height="1" y="2" fill="#FFCE00" />
    </svg>
  );
}

/** Birleşik Krallık (Union Jack) — İngilizce için; clipPath id’leri useId ile benzersiz */
function FlagGB() {
  const raw = useId().replace(/:/g, "");
  const uid = `fj-${raw}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 60 30"
      className={flagClass}
      aria-hidden
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <clipPath id={`${uid}-s`}>
          <path d="M0,0 v30 h60 v-30 z" />
        </clipPath>
        <clipPath id={`${uid}-t`}>
          <path d="M30,15 h30 v15 z v-15 h-30 z" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${uid}-s)`}>
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path
          d="M0,0 L60,30 M60,0 L0,30"
          stroke="#FFFFFF"
          strokeWidth="6"
        />
        <path
          d="M0,0 L60,30 M60,0 L0,30"
          clipPath={`url(#${uid}-t)`}
          stroke="#C8102E"
          strokeWidth="4"
        />
        <path d="M30,0 v30 M0,15 h60" stroke="#FFFFFF" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}

function LocaleFlag({ locale }: { locale: string }) {
  if (locale === "tr") return <FlagTR />;
  if (locale === "de") return <FlagDE />;
  return <FlagGB />;
}

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      className="flex items-center gap-0.5 rounded-full border border-white/10 bg-zinc-900/50 p-1 backdrop-blur-md"
      role="navigation"
      aria-label="Language"
    >
      {routing.locales.map((loc) => {
        const active = loc === locale;
        return (
          <motion.button
            key={loc}
            type="button"
            onClick={() => router.replace(pathname, { locale: loc })}
            className={`relative inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${
              active ? "text-zinc-950" : "text-zinc-400 hover:text-zinc-200"
            }`}
            whileTap={{ scale: 0.95 }}
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 rounded-full bg-cyan-400"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <LocaleFlag locale={loc} />
              {labels[loc]}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
