"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image, { type ImageProps } from "next/image";

type ThemeImageProps = Omit<ImageProps, "src"> & {
  lightSrc: string;
  darkSrc: string;
};

export function ThemeImage({
  lightSrc,
  darkSrc,
  alt = "image.png",
  ...props
}: ThemeImageProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <Image src={lightSrc || "/placeholder.svg"} alt={alt} {...props} />;
  }

  return (
    <Image
      src={resolvedTheme === "dark" ? darkSrc : lightSrc}
      alt={alt}
      {...props}
    />
  );
}
