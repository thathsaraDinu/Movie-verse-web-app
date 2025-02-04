import { fetchMovieCast, fetchMovieTrailers } from "@/lib/tmdb";
import React, { useState } from "react";
import TrailerSelect from "./trailer-select";

interface MovieCastProps {
  movieId: number;
  movieTitle: string;
}

export default async function MovieTrailers({
  movieId,
  movieTitle,
}: MovieCastProps) {
  const trailers = await fetchMovieTrailers(movieId);
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold">{movieTitle} Trailers </h2>
      <TrailerSelect trailers={trailers} />
    </div>
  );
}
