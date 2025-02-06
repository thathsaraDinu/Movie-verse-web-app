"use client"

import Image from "next/image"
import { getImageUrl } from "@/lib/tmdb"
import { motion } from "framer-motion"

interface MoviePosterProps {
  path: string | null
  title: string
}

export function MoviePoster({ path, title }: MoviePosterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="aspect-[2/3] relative rounded-lg overflow-hidden bg-card">
        {path ? (
          <Image
            src={getImageUrl(path, "w500")}
            alt={title || "movie poster"}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 text-center">
            No Image Available
          </div>
        )}
      </div>
    </motion.div>
  );
}
   