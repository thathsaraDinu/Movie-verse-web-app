"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";

import Image from "next/image";
import ActorDetailsDialog from "./actor-details-dialog";
import { motion } from "framer-motion";
import { getImageUrl } from "@/lib/tmdb";
import { Film } from "lucide-react";

interface ActorDetailsProps {
  cast: any;
}

  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
export default function ActorCards({ cast }: ActorDetailsProps) {
  const [selectedActorId, setSelectedActorId] = useState<string | null>(null);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold">Cast</h2>
      </motion.div>

      {cast && cast.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 xl:gap-10">
          {cast.map((actor: any, index: number) => (
            <Dialog
              key={actor.id}
              open={selectedActorId === actor.id}
              onOpenChange={(isOpen) =>
                setSelectedActorId(isOpen ? actor.id : null)
              }
            >
              <DialogTrigger className="cursor-pointer" asChild>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-card rounded-lg overflow-hidden border h-full group">
                    <div className="text-center overflow-clip rounded-t-lg relative h-56">
                      {actor.profile_path && !imageErrors.has(actor.id) ? (
                        <Image
                          src={getImageUrl(actor.profile_path, "w185")}
                          alt={actor.name}
                          fill
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                          onError={() => {
                            setImageErrors(prev => new Set(prev).add(actor.id));
                          }}
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500 text-center p-4">
                          <Film className="w-12 h-12 mb-2 opacity-50" />
                          <span className="text-xs font-medium">No Image</span>
                        </div>
                      )}
                    </div>
                    <div className="p-2">
                      <p className="text-sm text-gray-600">{actor.character}</p>
                      <h3 className="font-semibold">{actor.name || ""}</h3>
                    </div>
                  </div>
                </motion.div>
              </DialogTrigger>
              <DialogContent className="md:max-w-[80vw] h-[90vh] flex flex-start flex-col overflow-y-auto">
                <DialogHeader className="leading-none tracking-tight mb-0">
                  <DialogTitle>Actor Details</DialogTitle>
                </DialogHeader>
                  {selectedActorId && (
                    <ActorDetailsDialog actorId={selectedActorId} />
                  )}
                <DialogFooter className="flex justify-end gap-2"></DialogFooter>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-8">No Cast found.</p>
      )}
    </>
  );
}
