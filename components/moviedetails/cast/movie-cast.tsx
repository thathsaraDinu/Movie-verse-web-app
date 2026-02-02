import { fetchMovieCast } from "@/lib/tmdb";
import React from "react";
import ActorCards from "./actor-cards";

interface MovieCastProps {
  movieId: number;
}

export default async function MovieCast({ movieId }: MovieCastProps) {
  try {
    const cast = await fetchMovieCast(movieId);
    return (
      <div className="flex flex-col gap-6">
        <ActorCards cast={cast} />
      </div>
    );
  } catch (error) {
    console.error("MovieCast error", error);
    return (
      <p className="text-center text-muted-foreground py-8">
        Error fetching cast.
      </p>
    );
  }
}
