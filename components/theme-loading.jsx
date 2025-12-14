"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeLoading({ children, fallback }) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return fallback || (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return children;
}

export function ThemeAwareComponent({ children, lightContent, darkContent }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return children;
  }

  if (resolvedTheme === 'dark' && darkContent) {
    return darkContent;
  }

  if (resolvedTheme === 'light' && lightContent) {
    return lightContent;
  }

  return children;
}