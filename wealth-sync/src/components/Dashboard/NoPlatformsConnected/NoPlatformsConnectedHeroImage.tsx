"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Banknote,
  Bitcoin,
  CreditCard,
  Gem,
  Home,
  Landmark,
  Layers,
  TrendingUp,
} from "lucide-react";

/**
 * "Aggregated platforms" illustration — the counterpart to
 * NoPlatformsIllustration. Multiple platform types (assets in
 * green, liabilities in amber) feed into a central hub that
 * represents the unified dashboard, with small pulses traveling
 * along each connector to suggest live, continuous syncing.
 */

type Group = "asset" | "liability";

const nodes: {
  Icon: typeof Landmark;
  label: string;
  group: Group;
  top: string;
  left: string;
  x: number;
  y: number;
}[] = [
  {
    Icon: Landmark,
    label: "Bank",
    group: "asset",
    top: "12.5%",
    left: "50%",
    x: 200,
    y: 50,
  },
  {
    Icon: TrendingUp,
    label: "Investments",
    group: "asset",
    top: "26.63%",
    left: "79.33%",
    x: 317.3,
    y: 106.5,
  },
  {
    Icon: Bitcoin,
    label: "Crypto",
    group: "asset",
    top: "58.35%",
    left: "86.55%",
    x: 346.2,
    y: 233.4,
  },
  {
    Icon: Home,
    label: "Real Estate",
    group: "asset",
    top: "83.78%",
    left: "66.28%",
    x: 265.1,
    y: 335.1,
  },
  {
    Icon: Gem,
    label: "Precious Metals",
    group: "asset",
    top: "83.78%",
    left: "33.73%",
    x: 134.9,
    y: 335.1,
  },
  {
    Icon: CreditCard,
    label: "Credit Card",
    group: "liability",
    top: "58.35%",
    left: "13.45%",
    x: 53.8,
    y: 233.4,
  },
  {
    Icon: Banknote,
    label: "Loans",
    group: "liability",
    top: "26.63%",
    left: "20.68%",
    x: 82.7,
    y: 106.5,
  },
];

const HUB = { x: 200, y: 200 };

const colors: Record<Group, { line: string; border: string; text: string }> = {
  asset: {
    line: "#16a34a",
    border: "border-green-300",
    text: "text-green-600",
  },
  liability: {
    line: "#d97706",
    border: "border-amber-300",
    text: "text-amber-600",
  },
};

const nodeVariants = {
  hidden: { opacity: 0, scale: 0.6 },
  show: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: 0.3 + i * 0.1,
      ease: [0.22, 1, 0.36, 1],
    } as const,
  }),
};

const NoPlatformsCOnnectedHeroImage = () => {
  return (
    <div className="mx-auto flex w-full max-w-[440px] flex-col items-center gap-4">
      <style>{`
        @keyframes hub-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
        @keyframes hub-ring {
          0% { opacity: 0.6; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.5); }
        }
        .hub-core { animation: hub-breathe 3s ease-in-out infinite; }
        .hub-ring-anim { animation: hub-ring 2.4s ease-out infinite; }
      `}</style>

      <div className="relative aspect-square w-full">
        <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
          <defs>
            <radialGradient id="agg-glow" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
            </radialGradient>
            <filter
              id="agg-shadow"
              x="-60%"
              y="-60%"
              width="220%"
              height="220%"
            >
              <feDropShadow
                dx="0"
                dy="8"
                stdDeviation="10"
                floodColor="#0f172a"
                floodOpacity="0.12"
              />
            </filter>
          </defs>

          <rect x="0" y="0" width="400" height="400" fill="url(#agg-glow)" />

          {/* connector lines, solid — these platforms ARE connected */}
          {nodes.map((n, i) => (
            <motion.line
              key={`line-${n.label}`}
              x1={n.x}
              y1={n.y}
              x2={HUB.x}
              y2={HUB.y}
              stroke={colors[n.group].line}
              strokeWidth="2"
              strokeLinecap="round"
              strokeOpacity={0.35}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.1 }}
            />
          ))}

          {/* traveling pulses, flowing from each platform INTO the hub */}
          {nodes.map((n, i) => (
            <motion.circle
              key={`pulse-${n.label}`}
              r={4}
              fill={colors[n.group].line}
              initial={{ cx: n.x, cy: n.y, opacity: 0 }}
              animate={{
                cx: [n.x, HUB.x],
                cy: [n.y, HUB.y],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.6 + i * 0.2,
              }}
            />
          ))}
        </svg>

        {/* hub — the unified dashboard */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ filter: "url(#agg-shadow)", top: "50%", left: "50%" }}
          className="absolute flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
        >
          <span className="hub-ring-anim absolute inset-0 rounded-full border-2 border-green-400" />
          <span className="hub-core flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-700 shadow-lg">
            <Layers className="h-8 w-8 text-white" />
          </span>
        </motion.div>

        {/* platform nodes */}
        {nodes.map((n, i) => (
          <motion.div
            key={n.label}
            custom={i}
            variants={nodeVariants}
            initial="hidden"
            animate="show"
            style={{ top: n.top, left: n.left }}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
          >
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-full border-2 bg-white/90 shadow-sm ${colors[n.group].border}`}
            >
              <n.Icon className={`h-6 w-6 ${colors[n.group].text}`} />
            </div>
            <span className="text-muted-foreground text-[11px] font-medium">
              {n.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* caption + legend */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        className="flex flex-col items-center gap-2"
      >
        <span className="text-sm font-semibold text-slate-700">
          All your platforms, one dashboard
        </span>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5 text-green-700">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Assets
          </span>
          <span className="flex items-center gap-1.5 text-amber-700">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            Liabilities
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default NoPlatformsCOnnectedHeroImage;
