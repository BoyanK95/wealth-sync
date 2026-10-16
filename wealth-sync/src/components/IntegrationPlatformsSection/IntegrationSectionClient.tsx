"use client";

import { motion } from "framer-motion";

import IntegrationPlatformsGrid from "./IntegrationPlatformsGrid";

type IntegrationSectionClientProps = {
  badge: string;
  title: string;
  description: string;
};

export default function IntegrationSectionClient({
  badge,
  title,
  description,
}: IntegrationSectionClientProps) {
  return (
    <section id="integrations" className="relative overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.08),transparent_32%)]" />

      <div className="container relative mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-slate-600 shadow-sm backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300">
            {badge}
          </div>
          <h2 className="mt-5 text-3xl font-semibold tracking-[-0.06em] text-slate-900 md:text-5xl dark:text-white">
            {title}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg dark:text-slate-300">
            {description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, delay: 0.08 }}
          className="mt-12 rounded-[32px] border border-slate-200/80 bg-white/70 p-4 shadow-[0_28px_80px_rgba(15,23,42,0.05)] backdrop-blur-xl dark:border-slate-700/80 dark:bg-slate-900/60 md:p-6"
        >
          <IntegrationPlatformsGrid />
        </motion.div>
      </div>
    </section>
  );
}
