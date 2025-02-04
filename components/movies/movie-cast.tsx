import { Actor, fetchMovieCast } from "@/lib/tmdb";
import React from "react";

interface MovieCastProps {
  movieId: number;
}

export default async function MovieCast({ movieId }: MovieCastProps) {
  const cast = await fetchMovieCast(movieId);
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold">Cast</h2>
      {cast && cast.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5  xl:gap-10">
          {cast?.map((actor: Actor, index: number) => (
            <div key={index} className="bg-card rounded-lg overflow-hidden">
              <div className="text-center overflow-clip rounded-t-lg">
                <img
                  src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                  alt={actor.name}
                  className="w-full h-56 object-cover  mb-2 hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-2">
              <p className="text-sm text-gray-600">{actor.character}</p>
              <h3 className="font-semibold">{actor.name}</h3></div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-8">
          No Cast found.
        </p>
      )}
    </div>
  );
}
