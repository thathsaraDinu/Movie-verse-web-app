"use client";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { Heart, LogOut, Menu, Shield, User, X } from "lucide-react";
import Link from "next/link";
import { AuthSession } from "@/lib/auth";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface NavbarLinksProps {
  session: AuthSession | null;
}

export default function NavbarLinks({ session }: NavbarLinksProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      {/* Mobile menu */}
      <div id="mobile-menu" className="md:hidden">
        <div className="flex items-center justify-between">
          {/* Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-800 focus:outline-none p-1"
          >
            {isOpen ? (
              // Close Icon
              <X className="h-6 w-6" />
            ) : (
              // Hamburger Icon
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
        {/* Links */}
        {isOpen && (
          <div className="absolute top-[72px] left-0 w-full bg-slate-100 dark:bg-gray-900 shadow-md md:hidden">
            <div className="flex flex-col items-center space-y-4 p-4">
              {session ? (
                <>
                  <Link href="/watchlist">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center space-x-2"
                      onClick={() => {
                        setIsOpen(!isOpen);
                      }}
                    >
                      <Heart className="h-4 w-4" />
                      <span>Watchlist</span>
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={async () => {
                      await signOut({ callbackUrl: "/" }); // Ensures redirection to homepage
                      toast.success("Signed out successfully");
                      router.refresh(); // Refreshes the page if needed
                    }}
                    className="flex items-center space-x-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth/signin">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center space-x-2"
                      onClick={() => {
                        setIsOpen(!isOpen);
                      }}
                    >
                      <User className="h-4 w-4" />
                      <span>Sign In</span>
                    </Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button
                      size="sm"
                      onClick={() => {
                        setIsOpen(!isOpen);
                      }}
                      className="flex items-center space-x-2"
                    >
                      <Shield className="h-4 w-4" />
                      <span>Sign Up</span>
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Desktop Links */}
      <div id="desktop-menu" className="hidden md:flex items-center space-x-4">
        {session ? (
          <>
            <Link href="/watchlist">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              >
                <Heart className="h-4 w-4" />
                <span>Watchlist</span>
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={async () => {
                await signOut({ callbackUrl: "/" }); // Ensures redirection to homepage
                toast.success("Signed out successfully");
                router.refresh(); // Refreshes the page if needed
              }}
              className="flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </Button>
          </>
        ) : (
          <>
            <Link href="/auth/signin">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2"
              >
                <User className="h-4 w-4" />
                <span>Sign In</span>
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="sm" className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Sign Up</span>
              </Button>
            </Link>
          </>
        )}
      </div>
    </>
  );
}
