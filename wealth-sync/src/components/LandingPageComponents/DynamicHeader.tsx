"use client";

import React from "react";
import { motion } from "framer-motion";

type DynamicHeaderProps = {
  text: string;
  className?: string;
};

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const word = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Animated header that reveals its text one word at a time.
 * Pass any string via `text` — words split on spaces.
 */
const DynamicHeader = ({ text, className }: DynamicHeaderProps) => {
  const words = text.split(" ");

  return (
    <motion.h2
      variants={container}
      initial="hidden"
      animate="show"
      className={className}
    >
      {words.map((w, i) => (
        <motion.span key={`${w}-${i}`} variants={word} className="inline-block">
          {w}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </motion.h2>
  );
};

export default DynamicHeader;
