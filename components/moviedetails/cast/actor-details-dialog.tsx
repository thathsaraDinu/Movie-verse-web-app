"use client";

import { ErrorMessage } from "../../ui/error-message";
import { useState } from "react";
import { Actor } from "@/lib/tmdb";
import { getImageUrl } from "@/lib/tmdb";
import Image from "next/image";
import { Loader, Film } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

export default function ActorDetailsDialog({
  actorId,
}: {
  actorId: string;
}) {
  const [imageError, setImageError] = useState(false);

  const {
    data: actorDetails,
    isLoading,
    isError,
  } = useQuery<Actor>({
    queryKey: ["actor", actorId],
    queryFn: async () => {
      const res = await fetch(`/api/actor/${actorId}`);

      if (!res.ok) {
        throw new Error("Failed to fetch actor data");
      }

      return res.json();
    },
    enabled: !!actorId,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    gcTime: 1000 * 60 * 60 * 24 * 7, // keep cache for 7 days
  });

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center h-[500px]">
          <Loader className="w-10 h-10 animate-spin" />
        </div>
      ) : isError ? (
        <div className="container mx-auto">
          <ErrorMessage
            title="Failed to load Actor Info"
            message="Please check again later"
          />
        </div>
      ) : (
        actorDetails && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-semibold">
                  {actorDetails.name || ""}
                </h2>
              </motion.div>

              <div className="flex flex-col md:flex-row gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="md:w-1/3 object-cover rounded-lg"
                >
                  {actorDetails.profile_path && !imageError ? (
                    <Image
                      src={getImageUrl(actorDetails.profile_path, "w500")}
                      alt={actorDetails.name}
                      width={500}
                      height={750}
                      className="rounded-lg"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[500px] text-gray-500 text-center p-4 rounded-lg bg-card">
                      <Film className="w-16 h-16 mb-2 opacity-50" />
                      <span className="text-sm font-medium">No Image</span>
                    </div>
                  )}
                </motion.div>

                <div className="flex flex-col gap-6 md:w-2/3">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    viewport={{ once: true }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <p className="text-lg">
                      {actorDetails.biography || ""}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    viewport={{ once: true }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <p className="text-lg">
                      <strong>Known for:</strong>{" "}
                      {actorDetails.known_for_department || ""}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    viewport={{ once: true }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <p className="text-lg">
                      <strong>Birthdate:</strong>{" "}
                      {actorDetails.birthday || ""}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    viewport={{ once: true }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <p className="text-lg">
                      <strong>Place of birth:</strong>{" "}
                      {actorDetails.place_of_birth || ""}
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}