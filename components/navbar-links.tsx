"use client";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { LogOut, Shield, User } from "lucide-react";
import Link from "next/link";
import { AuthSession } from "@/lib/auth";
import { useState } from "react";

interface NavbarLinksProps {
  session: AuthSession | null;
}

export default function NavbarLinks({ session }: NavbarLinksProps) {
  const [isOpen, setIsOpen] = useState(false);

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
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                className="fill-black dark:fill-white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              // Hamburger Icon
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                className="fill-black dark:fill-white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
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
                      <Shield className="h-4 w-4" />
                      <span>Watchlist</span>
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      signOut();
                      setIsOpen(!isOpen);
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
                <Shield className="h-4 w-4" />
                <span>Watchlist</span>
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => signOut()}
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
