"use client";
import { Button } from "./ui/button";
import { Heart, Home, Menu, Shield, User, X } from "lucide-react";
import Link from "next/link";
import { AuthSession } from "@/lib/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SignOutButton from "./sign-out-button";

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
              <X className="h-6 w-6 text-black dark:text-white" />
            ) : (
              // Hamburger Icon
              <Menu className="h-6 w-6 text-black dark:text-white" />
            )}
          </button>
        </div>
        {/* Links */}
        {isOpen && (
          <div className="absolute top-[72px] left-0 w-full bg-background shadow-md md:hidden">
            <div className="flex flex-col items-center space-">
              {session ? (
                <>
                  <hr
                    className="border p-0 m-0 border-black border-1 
                  dark:border-white w-full"
                  />
                  <Link href="/" className="w-full">
                    <button
                      className="flex items-center text-sm justify-center space-x-2 w-full py-4 rounded-none md:hidden"
                      onClick={() => {
                        setIsOpen(!isOpen);
                      }}
                    >
                      <Home className="h-4 w-4" />
                      <span>Homepage</span>
                    </button>
                  </Link>
                  <hr
                    className="border p-0 m-0 border-black border-1 
                  dark:border-white w-full"
                  />
                  <Link href="/watchlist" className="w-full">
                    <button
                      className="flex items-center text-sm justify-center space-x-2 w-full py-4 rounded-none md:hidden"
                      onClick={() => {
                        setIsOpen(!isOpen);
                      }}
                    >
                      <Heart className="h-4 w-4" />
                      <span>Watchlist</span>
                    </button>
                  </Link>
                  <hr
                    className="border p-0 m-0 border-black border-1 
                  dark:border-white w-full"
                  />
                  <SignOutButton />
                  <hr
                    className="border p-0 m-0 border-black  
                  dark:border-white w-full h-0"
                  />
                </>
              ) : (
                <>
                  {" "}
                  <hr
                    className="border p-0 m-0 border-black border-1 
                  dark:border-white w-full"
                  />
                  <Link href="/" className="w-full">
                    <button
                      className="flex items-center text-sm justify-center space-x-2 w-full py-4 rounded-none md:hidden"
                      onClick={() => {
                        setIsOpen(!isOpen);
                      }}
                    >
                      <Home className="h-4 w-4" />
                      <span>Homepage</span>
                    </button>
                  </Link>
                  <hr
                    className="border p-0 m-0 border-black border-1 
                  dark:border-white w-full"
                  />
                  <Link href="/auth/signin" className="w-full">
                    <button
                      className="flex items-center text-sm justify-center space-x-2 w-full py-4  rounded-none md:hidden"
                      onClick={() => {
                        setIsOpen(!isOpen);
                      }}
                    >
                      <User className="h-4 w-4" />
                      <span>Sign In</span>
                    </button>
                  </Link>
                  <hr
                    className="border p-0 m-0 border-black border-1 
                  dark:border-white w-full"
                  />
                  <Link href="/auth/signup" className="w-full">
                    <button
                      className="flex items-center text-sm justify-center space-x-2 w-full py-4  rounded-none md:hidden"
                      onClick={() => {
                        setIsOpen(!isOpen);
                      }}
                    >
                      <Shield className="h-4 w-4" />
                      <span>Sign Up</span>
                    </button>
                  </Link>{" "}
                  <hr
                    className="border p-0 m-0 border-black border-1 
                  dark:border-white w-full"
                  />
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
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Button>
            </Link>
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
            <SignOutButton />
          </>
        ) : (
          <>
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Button>
            </Link>
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
