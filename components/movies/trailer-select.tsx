"use client";
import { useState } from "react";

export default function TrailerSelect({ trailers }: { trailers: any[] }) {
  const [selectedTrailer, setSelectedTrailer] = useState(trailers[0]);
  return (
    <div>
      {trailers && trailers.length > 0 ? (
        <div className="flex flex-col xl:flex-row justify-between gap-5">
          <div className="xl:h-[500px] aspect-video relative rounded-lg overflow-hidden bg-card xl:w-2/3">
            <iframe
              className="w-full h-full rounded-lg"
              src={`https://www.youtube.com/embed/${selectedTrailer.key}?autoplay=0`}
              allowFullScreen
            ></iframe>
          </div>
          <div className="grid grid-cols-2  md:grid-cols-4 sm:grid-cols-3  xl:grid-cols-1 gap-2 md:gap-4 xl:w-1/3 w-full h-full">
            {trailers.map((trailer, index) => (
              <button
                key={index}
                onClick={() => setSelectedTrailer(trailer)}
                className=" flex flex-col xl:flex-row gap-2 group w-full"
              >
                <div className="relative overflow-clip rounded-md w-full xl:w-1/2 ">
                  <div
                    className={`${
                      selectedTrailer == trailer ? "block" : "hidden"
                    } bg-background opacity-60 z-10 inset-0 absolute flex justify-center items-center text-center`}
                  >
                    Now Playing
                  </div>
                  <img
                    src={`https://img.youtube.com/vi/${trailer.key}/hqdefault.jpg`}
                    alt={trailer.name}
                    className={`xl:h-28 h-32 w-full object-cover group-hover:scale-110 transition-transform duration-300 `}
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
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-8">
          No Trailers found.
        </p>
      )}
    </div>
  );
}
