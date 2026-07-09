import { getMovieTrailers } from "@/lib/tmdb";
import TrailerSelect from "./trailer-select";

interface MovieCastProps {
  movieId: number;
  movieTitle: string;
}

export default async function MovieTrailers({
  movieId,
  movieTitle,
}: MovieCastProps) {
  const trailers = await getMovieTrailers(movieId);
  return (
    <div className="flex flex-col gap-6">
      <TrailerSelect trailers={trailers} movieTitle={movieTitle} />
    </div>
  );
}
