"use client"

import Image from "next/image"
import { getImageUrl } from "@/lib/tmdb"
import { motion } from "framer-motion"
import { Film } from "lucide-react"
import { useState } from "react"

interface MoviePosterProps {
  path: string | null
  title: string
}

export function MoviePoster({ path, title }: MoviePosterProps) {
  const [imageError, setImageError] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="aspect-[2/3] relative rounded-lg overflow-hidden bg-card">
        {path && !imageError ? (
          <Image
            src={getImageUrl(path, 'w500')}
            alt={title || "movie poster"}
            fill
            className="object-cover"
            priority
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 text-center p-4">
            <Film className="w-16 h-16 mb-2 opacity-50" />
            <span className="text-sm font-medium">No Image</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
   