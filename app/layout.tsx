import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movie Verse - Discover Amazing Movies",
  description: "Explore trending and upcoming movies with MovieVerse",
  icons: {
    icon: "/monogram-hq.png", // SVG favicon link
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
    
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-background">
            <Navbar />
            <Suspense fallback={<LoadingSpinner />}>
              <main className="mx-auto">{children}</main>
            </Suspense>
            <div className="h-10" />
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
