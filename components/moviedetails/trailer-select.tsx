"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function TrailerSelect({
  trailers,
  movieTitle,
}: {
  trailers: any[];
  movieTitle: string;
}) {
  const [selectedTrailer, setSelectedTrailer] = useState(trailers[0]);
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold">{movieTitle} Trailers </h2>
      </motion.div>
      {trailers && trailers.length > 0 ? (
        <div className="flex flex-col xl:flex-row justify-between gap-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="xl:h-[500px] aspect-video relative rounded-lg overflow-hidden bg-card xl:w-2/3"
          >
            <iframe
              className="w-full h-full rounded-lg"
              src={`https://www.youtube.com/embed/${selectedTrailer.key}?autoplay=0`}
              allowFullScreen
            ></iframe>
          </motion.div>

          <div className="grid grid-cols-2  md:grid-cols-4 sm:grid-cols-3  xl:grid-cols-1 gap-2 md:gap-4 xl:w-1/3 w-full h-full">
            {trailers.map((trailer, index) => (
              <motion.div
                key={trailer.key}
                initial={{ opacity: 0, x: 50 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="group w-full"
              >
                <button
                  onClick={() => setSelectedTrailer(trailer)}
                  className=" flex flex-col xl:flex-row gap-2  w-full"
                >
                  <div className="relative overflow-clip rounded-md w-full xl:w-1/2 ">
                    <div
                      className={`${
                        selectedTrailer == trailer ? "block" : "hidden"
                      } bg-background opacity-70 z-10 inset-0 absolute flex justify-center items-center text-center`}
                    >
                      Now Playing
                    </div>
                    <img
                      src={`https://img.youtube.com/vi/${trailer.key}/hqdefault.jpg`}
                      alt={trailer.name}     
                      className={`group-hover:scale-110 transition-transform duration-300 `}
                    />
                  </div>
                  <div className="flex flex-col items-start p-1 xl:w-1/2  ">
                    {" "}
                    <div className="text-base font-medium text-start">
                      {trailer.name}
                    </div>
                    <p className="text-sm text-gray-600">{trailer.type}</p>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-8">
          No Trailers found.
        </p>
      )}
    </>
  );
}
