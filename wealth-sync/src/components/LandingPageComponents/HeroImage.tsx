"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const HeroIllustration = () => {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 150,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      style={{ perspective: 1200 }}
      className="flex h-full w-full items-center justify-center"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative h-full w-full max-w-[520px]"
      >
        <svg
          viewBox="0 0 600 520"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
        >
          <defs>
            <radialGradient id="glow" cx="50%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="panel" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.55" />
            </linearGradient>
            <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#16a34a" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#16a34a" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="coin" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#15803d" />
            </linearGradient>
            <filter id="softShadow" x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow
                dx="0"
                dy="18"
                stdDeviation="18"
                floodColor="#0f172a"
                floodOpacity="0.18"
              />
            </filter>
          </defs>

          {/* ambient glow */}
          <rect x="0" y="0" width="600" height="520" fill="url(#glow)" />

          {/* back allocation ring, floats behind main panel */}
          <g transform="translate(430 120)" filter="url(#softShadow)">
            <circle r="70" fill="url(#panel)" stroke="#d1fae5" strokeWidth="2" />
            <circle
              r="52"
              fill="none"
              stroke="#16a34a"
              strokeWidth="14"
              strokeDasharray="180 327"
              strokeLinecap="round"
              transform="rotate(-90)"
            />
            <circle
              r="52"
              fill="none"
              stroke="#86efac"
              strokeWidth="14"
              strokeDasharray="90 327"
              strokeDashoffset="-180"
              strokeLinecap="round"
              transform="rotate(-90)"
            />
            <circle
              r="52"
              fill="none"
              stroke="#4ade80"
              strokeWidth="14"
              strokeDasharray="50 327"
              strokeDashoffset="-270"
              strokeLinecap="round"
              transform="rotate(-90)"
            />
          </g>

          {/* main dashboard panel */}
          <g transform="translate(60 150)" filter="url(#softShadow)">
            <rect
              width="360"
              height="260"
              rx="24"
              fill="url(#panel)"
              stroke="#bbf7d0"
              strokeWidth="1.5"
            />
            {/* header row */}
            <circle cx="34" cy="34" r="14" fill="#16a34a" />
            <rect x="58" y="26" width="90" height="8" rx="4" fill="#166534" opacity="0.6" />
            <rect x="58" y="40" width="60" height="6" rx="3" fill="#166534" opacity="0.3" />
            <rect x="286" y="24" width="46" height="20" rx="10" fill="#dcfce7" />
            <text x="309" y="38" textAnchor="middle" fontSize="11" fill="#166534" fontWeight="700">
              +12%
            </text>

            {/* big number */}
            <text x="34" y="100" fontSize="34" fontWeight="700" fill="#0f172a">
              $284,910
            </text>
            <text x="34" y="122" fontSize="12" fill="#64748b">
              Total portfolio value
            </text>

            {/* trend chart */}
            <path
              d="M20 220 C 60 205, 80 235, 110 210 S 170 160, 210 175 S 260 140, 300 120 L 300 240 L 20 240 Z"
              fill="url(#chartFill)"
            />
            <path
              d="M20 220 C 60 205, 80 235, 110 210 S 170 160, 210 175 S 260 140, 300 120"
              fill="none"
              stroke="#16a34a"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <circle cx="300" cy="120" r="5" fill="#16a34a" />
          </g>

          {/* floating "asset stack" coin element */}
          <g transform="translate(90 380)" filter="url(#softShadow)">
            <ellipse cx="0" cy="40" rx="60" ry="16" fill="url(#coin)" opacity="0.9" />
            <ellipse cx="0" cy="22" rx="60" ry="16" fill="url(#coin)" />
            <ellipse cx="0" cy="4" rx="60" ry="16" fill="#4ade80" />
            <text
              x="0"
              y="10"
              textAnchor="middle"
              fontSize="22"
              fontWeight="700"
              fill="#052e16"
            >
              $
            </text>
          </g>

          {/* small floating bar-chip, bottom right */}
          <g transform="translate(420 350)" filter="url(#softShadow)">
            <rect width="120" height="90" rx="16" fill="url(#panel)" stroke="#bbf7d0" />
            <rect x="20" y="55" width="14" height="20" rx="3" fill="#86efac" />
            <rect x="42" y="42" width="14" height="33" rx="3" fill="#4ade80" />
            <rect x="64" y="28" width="14" height="47" rx="3" fill="#22c55e" />
            <rect x="86" y="16" width="14" height="59" rx="3" fill="#16a34a" />
          </g>
        </svg>
      </motion.div>
    </div>
  );
};

export default HeroIllustration;