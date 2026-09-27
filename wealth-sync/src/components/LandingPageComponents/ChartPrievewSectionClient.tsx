"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ChartArea,
  ChartNoAxesCombined,
  ChartPie,
  ChartScatter,
} from "lucide-react";

type ChartPrievewSectionClientProps = {
  title: string;
  description: string;
};

export default function ChartPrievewSectionClient({
  title,
  description,
}: ChartPrievewSectionClientProps) {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,_rgba(16,185,129,0.10),transparent_28%)]" />

      <div className="container relative mx-auto px-4 md:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-center"
          >
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/20 dark:text-emerald-300">
              analytics
            </div>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.06em] text-slate-900 md:text-5xl dark:text-white">
              {title}
            </h2>
            <p className="mt-4 max-w-[620px] text-base leading-7 text-slate-600 md:text-lg dark:text-slate-300">
              {description}
            </p>

            <div className="mt-6 flex items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-200">
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 shadow-sm dark:border-slate-700 dark:bg-slate-900/70">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Real-time tracking
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 shadow-sm dark:border-slate-700 dark:bg-slate-900/70">
                <ArrowUpRight className="h-3.5 w-3.5 text-emerald-600" />
                Better decisions
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, delay: 0.08 }}
            className="flex items-center justify-center"
          >
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div className="flex flex-col gap-4">
                <div className="rounded-[28px] border border-slate-200 bg-white/80 p-3 shadow-[0_22px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/70">
                  <ChartArea className="h-[180px] w-full text-emerald-600" />
                </div>
                <div className="rounded-[28px] border border-slate-200 bg-white/80 p-3 shadow-[0_22px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/70">
                  <ChartPie className="h-[180px] w-full text-sky-600" />
                </div>
              </div>

              <div className="flex flex-col gap-4 pt-8 md:pt-12">
                <div className="rounded-[28px] border border-slate-200 bg-white/80 p-3 shadow-[0_22px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/70">
                  <ChartNoAxesCombined className="h-[180px] w-full text-violet-600" />
                </div>
                <div className="rounded-[28px] border border-slate-200 bg-white/80 p-3 shadow-[0_22px_60px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/70">
                  <ChartScatter className="h-[180px] w-full text-amber-600" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
