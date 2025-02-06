import "./globals.css";
import type { Metadata } from "next";
import { Inter, Raleway } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Navbar from "@/components/navbar";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import Footer from "@/components/footer";
import AuthProvider from "@/components/providers/auth-provider";
import { Toaster } from "sonner";
import ParticlesComponent from "@/components/particles";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin"],
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-raleway", // Define the custom property
});

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
      <body className={`${raleway.variable} ${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <div className="-z-50">
              <ParticlesComponent id="particles" />
            </div>
            <Toaster position="bottom-center" richColors />
            <div className="z-10 min-h-screen flex flex-col justify- bg-">
              <Navbar />
              <div>
                <Suspense fallback={<LoadingSpinner />}>
                  <main className="mx-auto min-h-screen">{children}</main>
                </Suspense>
                <div className="h-10" />
              </div>
              <Footer />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
