"use client";
import { SearchBar } from "./search-bar";
import Image from "next/image";
import { getAuthSession } from "@/lib/auth";
import { Suspense } from "react";
import { motion } from "framer-motion";

const UserName = ({ userName }: { userName: string | null }) => {
  return (
    <>
      {" "}
      {userName ? (
        <span>{userName.split(" ")[0]}</span>
      ) : (
        <span>
          to
          <br /> Movie Verse
        </span>
      )}
    </>
  );
};

export function HeroSection({ userName }: { userName: string | null }) {
  return (
    <div className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
      <div className="relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <div className="mx-auto max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-center mb-6">
                <Image
                  priority
                  src="/movie-verse-logo.svg"
                  alt="Movie Verse"
                  width={200}
                  height={0}
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="text-4xl font-bold tracking-tight sm:text-6xl mb-6 text-gray-800 dark:text-white font-raleway">
                Welcome
                <Suspense fallback={<span></span>}>
                  <UserName userName={userName} />
                </Suspense>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-lg leading-8 text-muted-foreground mb-10">
                Discover the latest trending movies, upcoming releases, and
                explore your favorite films. Your gateway to endless
                entertainment starts here.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex justify-center max-w-md mx-auto">
                <SearchBar className="w-full" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
