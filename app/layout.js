import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import HeaderClient from "@/components/header-client";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkThemeProvider } from "@/components/clerk-theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sensai - The AI Career Coach",
  description: "A comprehensive career development platform powered by AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.png" sizes="any" />
      </head>
      <body className={`${inter.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          storageKey="sensai-theme"
          themes={["light", "dark", "system"]}
        >
          <ClerkThemeProvider>
            <HeaderClient />
            <main className="min-h-screen">{children}</main>
            <Toaster richColors />

            <footer className="bg-muted/50 py-12">
              <div className="container mx-auto px-4 text-center text-muted-foreground">
                <p>FutureForge</p>
                <p className="mt-2">Made with 💗 by Abhi_S</p>
              </div>
            </footer>
          </ClerkThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
