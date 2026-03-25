"use client";

import { motion } from "framer-motion";

export function AnimatedBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,211,238,0.15),transparent)]" />
      <motion.div
        className="absolute -left-[20%] top-[10%] h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[120px] animate-float"
        animate={{ opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-[15%] top-[40%] h-[420px] w-[420px] rounded-full bg-violet-500/15 blur-[100px] animate-float-delayed"
        animate={{ opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[5%] left-[30%] h-[380px] w-[380px] rounded-full bg-fuchsia-600/10 blur-[90px]"
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,#030306_85%,#030306_100%)]" />
    </div>
  );
}
