"use client";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { LogOut, Shield, User } from "lucide-react";
import Link from "next/link";
import { Session } from "next-auth";
import { AuthSession } from "@/lib/auth";

interface NavbarLinksProps {
  session: AuthSession | null;
}

export default function NavbarLinks({ session }: NavbarLinksProps) {
  return (
    <div className="hidden md:flex items-center space-x-4">
      {session ? (
        <>
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
  );
}
