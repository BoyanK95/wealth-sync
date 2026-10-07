"use client";

import { motion } from "framer-motion";
import { ArrowRight, Shield, Smartphone, Sparkles, Zap } from "lucide-react";
import Link from "next/link";

import { Routes } from "@/lib/constants/routes";
import { Button } from "@/components/ui/button";
import DynamicHeader from "../Common/DynamicHeader";
import HeroImage from "./HeroImage";
import { useTranslations } from "next-intl";
import { usePortfolioSummary } from "@/lib/hooks/usePortfolioSummary";
import { usePlatformConnection } from "@/lib/contexts/PlatformConnectionContext";
import LoadingCard from "../Common/LoadingCard";
import ShowStatsButton from "../Common/ShowStatsButton";
import { useState } from "react";

type PremiumHeroProps = {
  heading: string;
  title: string;
  description: string;
  getStarted: string;
  goToDashboard: string;
  exploreFeatures: string;
  secure: string;
  realtime: string;
  mobile: string;
  welcomeBack?: string;
  userName?: string | null;
  isLoggedIn: boolean;
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function PremiumHero({
  heading,
  title,
  description,
  getStarted,
  goToDashboard,
  exploreFeatures,
  secure,
  realtime,
  mobile,
  welcomeBack,
  userName,
  isLoggedIn,
}: PremiumHeroProps) {
  const t = useTranslations("IntroductionSection.PremiumHero");
  const [showStats, setShowStats] = useState(false);
  const { loading, error, data } = usePortfolioSummary(showStats);
  const { connectionsCount } = usePlatformConnection();

  const quickStats = [
    {
      label: t("portfolioValue"),
      value: showStats
        ? data.totalValue
          ? `$${data.totalValue.toLocaleString()}`
          : "$0"
        : "****",
      accent: "text-emerald-600",
    },
    {
      label: t("returnYTD"),
      value: showStats
        ? data.totalChangePercent
          ? `${data.totalChangePercent.toFixed(2)}%`
          : "+N/A%"
        : "****",
      accent: "text-emerald-600",
    },
    {
      label: t("platforms"),
      value: showStats
        ? connectionsCount
          ? `${connectionsCount} connected`
          : "0 connected"
        : "****",
      accent: "text-slate-700",
    },
  ];

  return (
    <section className="relative overflow-hidden py-12 md:py-20 lg:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(15,118,110,0.08),transparent_30%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/80 to-transparent" />

      <div className="relative container mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="mb-8 flex items-center justify-center gap-3 text-sm text-slate-600"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/70 bg-white/70 px-3 py-1.5 shadow-[0_12px_32px_rgba(16,185,129,0.08)] backdrop-blur-xl dark:border-emerald-900/50 dark:bg-slate-900/50 dark:text-slate-200">
            <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
            WealthSync
          </span>
        </motion.div>

        <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_1fr] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
            className="relative z-10"
          >
            <DynamicHeader
              text={heading}
              className="mb-4 text-sm font-medium tracking-[0.28em] text-emerald-700 uppercase"
            />

            {welcomeBack && userName ? (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mb-4 text-base font-medium text-slate-600 dark:text-slate-300"
              >
                {welcomeBack}{" "}
                <span className="font-semibold text-emerald-700">
                  {userName}
                </span>
              </motion.p>
            ) : null}

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.75, ease: "easeOut" }}
              className="max-w-xl text-4xl font-semibold tracking-[-0.06em] text-slate-900 md:text-6xl lg:text-[4.2rem] dark:text-white"
            >
              {title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.75, ease: "easeOut" }}
              className="mt-6 max-w-xl text-base leading-7 text-slate-600 md:text-lg dark:text-slate-300"
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.7, ease: "easeOut" }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full bg-slate-950 px-6 text-sm font-medium text-white shadow-[0_18px_40px_rgba(15,23,42,0.24)] transition-transform hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
              >
                <Link href={isLoggedIn ? Routes.DASHBOARD : Routes.LOGIN}>
                  <span>{isLoggedIn ? goToDashboard : getStarted}</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 rounded-full border-slate-200 bg-white/70 px-6 text-sm font-medium text-slate-800 shadow-[0_10px_28px_rgba(148,163,184,0.12)] backdrop-blur-xl hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-100"
              >
                <Link href={Routes.FEATURES}>{exploreFeatures}</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.7 }}
              className="mt-8 flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-300"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
                  <Shield className="h-4 w-4" />
                </span>
                <span>{secure}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
                  <Zap className="h-4 w-4" />
                </span>
                <span>{realtime}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
                  <Smartphone className="h-4 w-4" />
                </span>
                <span>{mobile}</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              delay: 0.14,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1] as const,
            }}
            className="relative mx-auto w-full max-w-[620px]"
          >
            <div className="absolute -inset-8 rounded-[40px] bg-gradient-to-tr from-emerald-200/30 via-transparent to-sky-200/25 blur-2xl" />

            <div className="relative overflow-hidden rounded-[32px] border border-white/70 bg-white/70 p-3 shadow-[0_30px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-slate-700/80 dark:bg-slate-900/70">
              <div className="absolute top-3 right-6 left-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </div>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-medium tracking-[0.16em] text-slate-500 uppercase dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  {t("liveOverview")}
                </span>
              </div>

              <div className="mt-7 overflow-hidden rounded-[26px] border border-slate-200 bg-[linear-gradient(135deg,#f8fafc_0%,#f5fff9_36%,#eef8f3_100%)] dark:border-slate-700 dark:bg-[linear-gradient(135deg,#0f172a_0%,#0b1220_30%,#101827_100%)]">
                <HeroImage />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, ease: "easeOut" }}
              className="absolute top-14 -left-4 rounded-2xl border border-emerald-200 bg-white/90 p-3 shadow-[0_16px_38px_rgba(16,185,129,0.10)] backdrop-blur-xl dark:border-emerald-900/60 dark:bg-slate-900/85"
            >
              <p className="text-[10px] font-medium tracking-[0.18em] text-slate-500 uppercase dark:text-slate-400">
                {t("portfolio")}
              </p>
              {/* TODO: Add a dynamic value here for the portfolio value instead of hardcoding it. */}
              <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                $284.9K
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.48, ease: "easeOut" }}
              className="absolute right-4 -bottom-3 rounded-2xl border border-slate-200 bg-white/90 p-3 shadow-[0_20px_42px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/85"
            >
              <div className="flex items-center gap-2 text-sm">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <span className="font-medium text-slate-900 dark:text-white">
                  +18.4% YTD
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34, duration: 0.7, ease: "easeOut" }}
        >
          {/* //TODO add error state and showState for the quick stats cards */}
          <ShowStatsButton showStats={showStats} setShowStats={setShowStats} />
          <div className="grid gap-3 sm:grid-cols-3">
            {loading ? (
              <LoadingCard />
            ) : (
              quickStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-slate-200/80 bg-white/60 px-4 py-3 text-center shadow-[0_10px_24px_rgba(15,23,42,0.04)] backdrop-blur-xl dark:border-slate-700/80 dark:bg-slate-900/60"
                >
                  <div className="text-xs font-medium tracking-[0.2em] text-slate-500 uppercase dark:text-slate-400">
                    {stat.label}
                  </div>
                  <div
                    className={`mt-2 text-xl font-semibold ${stat.accent} dark:text-emerald-300`}
                  >
                    {stat.value}
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
