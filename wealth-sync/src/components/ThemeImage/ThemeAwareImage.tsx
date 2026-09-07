"use client";

import { useState, useEffect } from "react";
import Image, { type ImageProps } from "next/image";
import { useTheme } from "next-themes";

interface ThemeAwareImageProps extends Omit<ImageProps, "src"> {
  lightImageSrc: string;
  darkImageSrc: string;
}

export function ThemeAwareImage({
  lightImageSrc,
  darkImageSrc,
  alt,
  ...props
}: ThemeAwareImageProps) {
  const { theme, systemTheme } = useTheme();
  const [imageSrc, setImageSrc] = useState<string>(lightImageSrc);

  // Determine which theme is active
  useEffect(() => {
    const currentTheme = theme === "system" ? systemTheme : theme;
    setImageSrc(currentTheme === "dark" ? darkImageSrc : lightImageSrc);
  }, [theme, systemTheme, lightImageSrc, darkImageSrc]);

  return <Image src={imageSrc || "/placeholder.svg"} alt={alt} {...props} />;
}
