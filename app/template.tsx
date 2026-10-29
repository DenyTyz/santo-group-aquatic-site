"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Template({ children }: Readonly<{ children: React.ReactNode }>) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reducedMotion ? 0.01 : 0.45, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
