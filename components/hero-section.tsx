import { SearchBar } from "./search-bar";
import Image from "next/image";
import { getAuthSession } from "@/lib/auth";
import { Suspense } from "react";

const UserName = async () => {
  const session = await getAuthSession();
  return (
    <>
      {" "}
      {session ? (
        <span>{session.user?.name}</span>
      ) : (
        <span>
          to
          <br /> Movie Verse
        </span>
      )}
    </>
  );
};

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
      <div className="relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <div className="mx-auto max-w-2xl">
            <div className="flex justify-center mb-6">
              <Image
                priority
                src="/movie-verse-logo.svg"
                alt="Movie Verse"
                width={200}
                height={0}
              />
            </div>
            <div className="text-4xl font-bold tracking-tight sm:text-6xl mb-6 text-blue-800 dark:text-blue-200">
              Welcome
              <Suspense fallback={<span></span>}>
                <UserName />
              </Suspense>
            </div>
            <p className="text-lg leading-8 text-muted-foreground mb-10">
              Discover the latest trending movies, upcoming releases, and
              explore your favorite films. Your gateway to endless entertainment
              starts here.
            </p>
            <div className="flex justify-center max-w-md mx-auto">
              <SearchBar className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
