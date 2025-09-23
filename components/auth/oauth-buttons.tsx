"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Github, Chrome } from "lucide-react";
import { toast } from "sonner";


interface OAuthButtonsProps {
  disabled?: boolean;
}

export default function OAuthButtons({ disabled = false }: OAuthButtonsProps) {
  const [loading, setLoading] = useState<string | null>(null);

  const handleOAuthSignIn = async (provider: string) => {
    try {
      setLoading(provider);
      
      const result = await signIn(provider, {
        redirect: false,
        callbackUrl: "/",
      });

      if (result?.error) {
        toast.error(`Failed to sign in with ${provider}`);
      } else if (result?.url) {
        toast.success(`Signing in with ${provider}...`);
        window.location.href = result.url;
      }
    } catch (error) {
      toast.error(`An error occurred during ${provider} sign in`);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        <Button
          variant="outline"
          type="button"
          disabled={disabled || loading === "google"}
          onClick={() => handleOAuthSignIn("google")}
          className="w-full"
        >
          {loading === "google" ? (
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
          ) : (
            <Chrome className="mr-2 h-4 w-4" />
          )}
          Continue with Google
        </Button>
        
        <Button
          variant="outline"
          type="button"
          disabled={disabled || loading === "github"}
          onClick={() => handleOAuthSignIn("github")}
          className="w-full"
        >
          {loading === "github" ? (
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
          ) : (
            <Github className="mr-2 h-4 w-4" />
          )}
          Continue with GitHub
        </Button>
        
    
      </div>
    </div>
  );
}