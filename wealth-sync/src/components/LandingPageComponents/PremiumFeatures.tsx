"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  LineChart,
  PieChart,
  Shield,
  Smartphone,
  Zap,
} from "lucide-react";

type FeatureData = {
  title: string;
  description: string;
  icon: "line" | "pie" | "bar" | "shield" | "zap" | "mobile";
};

type PremiumFeaturesProps = {
  badge: string;
  title: string;
  description: string;
  items: FeatureData[];
};

const iconMap = {
  line: LineChart,
  pie: PieChart,
  bar: BarChart3,
  shield: Shield,
  zap: Zap,
  mobile: Smartphone,
};

export default function PremiumFeatures({
  badge,
  title,
  description,
  items,
}: PremiumFeaturesProps) {
  return (
    <section id="features" className="relative py-16 md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.10),transparent_30%)]" />

      <div className="container relative mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/20 dark:text-emerald-300">
            {badge}
          </div>
          <h2 className="mt-5 text-3xl font-semibold tracking-[-0.06em] text-slate-900 md:text-5xl dark:text-white">
            {title}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg dark:text-slate-300">
            {description}
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => {
            const Icon = iconMap[item.icon];

            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="group rounded-[28px] border border-slate-200/80 bg-white/70 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.04)] backdrop-blur-xl transition-all duration-300 hover:border-emerald-200 hover:shadow-[0_25px_60px_rgba(16,185,129,0.12)] dark:border-slate-700/80 dark:bg-slate-900/60 dark:hover:border-emerald-900/50"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-50 text-emerald-700 shadow-inner shadow-emerald-200/60 dark:from-emerald-900/40 dark:to-emerald-950/20 dark:text-emerald-300">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="mt-5 text-xl font-semibold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
