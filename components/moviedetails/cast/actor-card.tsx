"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";

import Image from "next/image";
import ActorDetailsDialog from "./actor-details-dialog";
import { motion } from "framer-motion";

interface ActorDetailsProps {
  cast: any;
}

export default function ActorCard({ cast }: ActorDetailsProps) {
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
                  transition={{ duration: 0.5, delay: 0.05 * index }}
                >
                  <div className="bg-card rounded-lg overflow-hidden border h-full">
                    <div className="text-center overflow-clip rounded-t-lg ">
                      <Image
                        src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                        alt={actor.name}
                        width={185}
                        height={280}
                        className="w-full h-56 object-cover mb-2 hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-2">
                      <p className="text-sm text-gray-600">{actor.character}</p>
                      <h3 className="font-semibold">{actor.name || ""}</h3>
                    </div>
                  </div>
                </motion.div>
              </DialogTrigger>

              <DialogContent className="md:max-w-[80vw] h-[90vh] overflow-y-auto">
                <DialogHeader className="leading-none tracking-tight">
                  <DialogTitle>Actor Details</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                  {selectedActorId && (
                    <ActorDetailsDialog actorId={selectedActorId} />
                  )}
                </DialogDescription>
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
