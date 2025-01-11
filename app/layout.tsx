import "./globals.css";
import type { Metadata } from "next";
import { Inter, Raleway } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import Footer from "@/components/footer";
import AuthProvider from "@/components/auth-provider";
import { Toaster } from "sonner";

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
        {" "}
        <Toaster position="bottom-center" richColors />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {" "}
          <AuthProvider>
            <div className="min-h-screen flex flex-col justify-between bg-background">
              <div className="">
                <Navbar />
                <Suspense fallback={<LoadingSpinner />}>
                  <main className="mx-auto">{children}</main>
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
