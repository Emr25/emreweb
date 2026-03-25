"use client";

import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import type { FormEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

type ChatRole = "user" | "assistant";

type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
};

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

function inferIntent(raw: string) {
  const text = raw.toLowerCase();

  const has = (re: RegExp) => re.test(text);

  // Keep this heuristic intentionally simple: it powers the "simulation".
  if (
    has(/chat|bot|assistant|support|sss|ticket|faq|ai asistan|yapay zek[aâ]|botu/)
  ) {
    return "chatbot" as const;
  }

  if (has(/e-?ticaret|ecommerce|e commerce|shop|store|order|payment|ödeme|mağaza/)) {
    return "ecommerce" as const;
  }

  if (has(/website|web|landing|kampanya|kampany[aâ]|site|portal|uygulama|app/)) {
    return "web" as const;
  }

  return "default" as const;
}

export function AiSimulatorSection() {
  const t = useTranslations("ai");

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: uid(),
      role: "assistant",
      text: t("welcome"),
    },
  ]);

  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const [target, setTarget] = useState({ x: 0, y: 0 });
  const orbRef = useRef<HTMLDivElement | null>(null);
  const chatScrollRef = useRef<HTMLDivElement | null>(null);

  const quickPrompts = useMemo(
    () => [
      { label: t("prompt1"), value: t("prompt1_value") },
      { label: t("prompt2"), value: t("prompt2_value") },
      { label: t("prompt3"), value: t("prompt3_value") },
    ],
    [t]
  );

  useEffect(() => {
    // Auto-scroll to the latest message.
    if (!chatScrollRef.current) return;
    chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
  }, [messages.length]);

  useEffect(() => {
    const el = orbRef.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (prefersReduced) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      setTarget({ x: nx, y: ny });
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  const assistantResponseFor = (userText: string) => {
    const intent = inferIntent(userText);
    if (intent === "chatbot") return t("responses.chatbot");
    if (intent === "ecommerce") return t("responses.ecommerce");
    if (intent === "web") return t("responses.web");
    return t("responses.default");
  };

  const typeAssistant = async (assistantText: string) => {
    const id = uid();
    setMessages((prev) => [
      ...prev,
      { id, role: "assistant", text: "" },
    ]);

    setIsGenerating(true);

    // Typed effect (simulation only).
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (reduced) {
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, text: assistantText } : m))
      );
      setIsGenerating(false);
      return;
    }

    for (let i = 0; i < assistantText.length; i++) {
      // Make it feel organic with tiny random pauses.
      const chDelay = 8 + Math.random() * 22;
      await sleep(chDelay);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === id ? { ...m, text: assistantText.slice(0, i + 1) } : m
        )
      );
    }
    setIsGenerating(false);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isGenerating) return;

    const trimmed = input.trim();
    if (!trimmed) return;

    const userId = uid();
    setMessages((prev) => [...prev, { id: userId, role: "user", text: trimmed }]);
    setInput("");

    const assistantText = assistantResponseFor(trimmed);
    // Small thinking delay (simulation only).
    await sleep(650);
    void typeAssistant(assistantText);
  };

  const orbTransform = {
    translateX: target.x * 14,
    translateY: target.y * 12,
    rotate: target.x * 6,
  };

  const statusText = isGenerating ? t("thinking") : t("ready");

  return (
    <section id="ai" className="relative scroll-mt-24 px-4 py-28 sm:px-6 lg:px-8">
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

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div className="relative">
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.18),transparent_55%),radial-gradient(circle_at_70%_65%,rgba(167,139,250,0.15),transparent_50%)] blur-xl" />

            <div className="relative rounded-3xl border border-white/[0.08] bg-gradient-to-b from-zinc-900/60 to-black/40 p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="font-display text-xl font-semibold text-white">
                    {t("orbTitle")}
                  </div>
                  <div className="mt-1 text-sm text-zinc-400">{statusText}</div>
                </div>
                <div className="flex items-center gap-2">
                  <motion.div
                    className="h-2.5 w-2.5 rounded-full bg-cyan-400"
                    animate={{ opacity: isGenerating ? [0.35, 1, 0.35] : 0.75 }}
                    transition={{ duration: 1.2, repeat: isGenerating ? Infinity : 0 }}
                    aria-hidden
                  />
                  <span className="text-xs text-zinc-500">{t("orbHint")}</span>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-center">
                <motion.div
                  ref={orbRef}
                  className="relative h-[260px] w-[260px]"
                  style={{
                    transform: `translate(${orbTransform.translateX}px, ${orbTransform.translateY}px) rotate(${orbTransform.rotate}deg)`,
                  }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.35),transparent_55%),radial-gradient(circle_at_65%_70%,rgba(167,139,250,0.28),transparent_55%)]"
                    animate={{ opacity: isGenerating ? [0.7, 1, 0.7] : 0.85 }}
                    transition={{ duration: 2.2, repeat: isGenerating ? Infinity : 0, ease: "easeInOut" }}
                  />
                  <div className="absolute inset-0 rounded-full border border-cyan-400/25" />

                  <motion.div
                    className="absolute inset-[-10%] rounded-full border border-cyan-400/20"
                    animate={
                      isGenerating
                        ? { opacity: [0.2, 0.7, 0.2], scale: [0.98, 1.02, 0.98], rotate: [0, 120, 240] }
                        : { opacity: 0.35, rotate: 30 }
                    }
                    transition={{ duration: 2.4, repeat: isGenerating ? Infinity : 0, ease: "easeInOut" }}
                  />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative h-24 w-24 rounded-full bg-black/20 backdrop-blur-sm">
                      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.12),transparent_60%)]" />
                      <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-6 -translate-y-2 rounded-full bg-cyan-200/85 shadow-[0_0_25px_rgba(34,211,238,0.45)]" />
                      <div className="absolute left-1/2 top-1/2 h-3 w-3 translate-x-3 -translate-y-2 rounded-full bg-cyan-200/85 shadow-[0_0_25px_rgba(34,211,238,0.45)]" />
                      <motion.div
                        className="absolute left-1/2 top-1/2 h-2 w-10 -translate-x-1/2 translate-y-4 rounded-full bg-cyan-200/30"
                        animate={{ scaleX: isGenerating ? [0.3, 1, 0.3] : 0.65, opacity: isGenerating ? [0.4, 1, 0.4] : 0.65 }}
                        transition={{ duration: 1.3, repeat: isGenerating ? Infinity : 0, ease: "easeInOut" }}
                        aria-hidden
                      />
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs text-zinc-400">
                {quickPrompts.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-zinc-300 backdrop-blur-sm transition-colors hover:border-cyan-500/30 hover:bg-cyan-500/10 disabled:opacity-50"
                    onClick={() => {
                      if (isGenerating) return;
                      setInput(p.value);
                    }}
                    disabled={isGenerating}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-white/[0.08] bg-gradient-to-b from-zinc-900/70 to-black/40 p-4 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-display text-xl font-semibold text-white">
                    {t("chatTitle")}
                  </div>
                  <div className="mt-1 text-sm text-zinc-400">{t("chatSubtitle")}</div>
                </div>
                <div className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
                  {t("simulationBadge")}
                </div>
              </div>

              <div
                ref={chatScrollRef}
                className="mt-5 h-[360px] overflow-auto pr-2"
                role="log"
                aria-live="polite"
              >
                <div className="space-y-3">
                  <AnimatePresence initial={false}>
                    {messages.map((m) => (
                      <motion.div
                        key={m.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className={`rounded-2xl border px-4 py-3 ${
                          m.role === "user"
                            ? "border-cyan-400/20 bg-cyan-400/10 text-cyan-100"
                            : "border-white/10 bg-white/5 text-zinc-100"
                        }`}
                      >
                        <div className="whitespace-pre-wrap text-sm leading-relaxed">
                          {m.text || (m.role === "assistant" && isGenerating ? t("typing") : "")}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              <form onSubmit={onSubmit} className="mt-4">
                <label className="sr-only" htmlFor="ai-input">
                  {t("inputLabel")}
                </label>
                <div className="flex gap-2">
                  <input
                    id="ai-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={t("placeholder")}
                    disabled={isGenerating}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition-colors focus:border-cyan-400/30 disabled:opacity-60"
                    autoComplete="off"
                  />
                  <button
                    type="submit"
                    disabled={isGenerating || input.trim().length === 0}
                    className="inline-flex items-center justify-center rounded-2xl bg-cyan-500/15 px-5 py-3 text-sm font-semibold text-cyan-200 shadow-[0_0_0_1px_rgba(34,211,238,0.2)] transition-colors hover:bg-cyan-500/25 disabled:opacity-60"
                  >
                    {t("send")}
                  </button>
                </div>
                <div className="mt-2 text-xs text-zinc-500">{t("footnote")}</div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

