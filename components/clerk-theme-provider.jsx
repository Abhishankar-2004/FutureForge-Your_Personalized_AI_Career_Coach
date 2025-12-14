"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { dark, light } from "@clerk/themes";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ClerkThemeProvider({ children }) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use resolvedTheme to get the actual theme (handles 'system' preference)
  const clerkTheme = mounted && resolvedTheme === 'dark' ? dark : light;

  return (
    <ClerkProvider
      appearance={{
        baseTheme: clerkTheme,
        variables: {
          colorPrimary: resolvedTheme === 'dark' ? '#ffffff' : '#000000',
          colorBackground: resolvedTheme === 'dark' ? '#0a0a0a' : '#ffffff',
          colorInputBackground: resolvedTheme === 'dark' ? '#1a1a1a' : '#ffffff',
          colorInputText: resolvedTheme === 'dark' ? '#ffffff' : '#000000',
        },
        elements: {
          formButtonPrimary: 
            'bg-primary text-primary-foreground hover:bg-primary/90',
          card: 'bg-card border-border',
          headerTitle: 'text-foreground',
          headerSubtitle: 'text-muted-foreground',
          socialButtonsBlockButton: 
            'bg-background border-border text-foreground hover:bg-accent',
          formFieldLabel: 'text-foreground',
          formFieldInput: 
            'bg-background border-border text-foreground focus:ring-ring',
          footerActionLink: 'text-primary hover:text-primary/80',
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}