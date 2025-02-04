import { Actor, getActorDetails, getImageUrl } from "@/lib/tmdb";
import { useEffect, useState } from "react";

interface ActorDetailsProps {
  movieId: number;
  movieTitle: string;
}

export default function ActorDetails({
  movieId,
  movieTitle,
}: ActorDetailsProps) {
  const [actor, setActor] = useState<Actor | null>(null);
  useEffect(() => {
    getActorDetails(movieId).then((data) => setActor(data));
  }, [movieId]);

  return (
    <div className="flex flex-col gap-6">
      {actor ? (
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold">{actor.name}</h2>
          <div className="flex flex-col md:flex-row gap-6">
            <img
              className="w-64 h-96 object-cover rounded-lg"
              src={getImageUrl(actor?.profile_path ?? null, "w500")}
              alt={actor.name}
            />
            <div className="flex flex-col gap-6">
              <p className="text-lg">{actor.biography}</p>
              <p className="text-lg">
                <strong>Known for:</strong> {actor.known_for_department}
              </p>
              <p className="text-lg">
                <strong>Birthdate:</strong> {actor.birthday}
              </p>
              <p className="text-lg">
                <strong>Place of birth:</strong> {actor.place_of_birth}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
