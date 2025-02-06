import { ErrorMessage } from "../../ui/error-message";
import { LoadingSpinner } from "../../ui/loading-spinner";
import { useEffect, useState } from "react";
import { Actor } from "@/lib/tmdb";
import Image from "next/image";
import { Loader } from "lucide-react";

export default function ActorDetailsDialog({ actorId }: { actorId: string }) {
  const [actorDetails, setActorDetails] = useState<Actor | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchActorData = async () => {
      try {
        setLoading(true); // Start loading
        setError(false); // Reset error state

        const res = await fetch(`/api/actor/${actorId}`);
        if (!res.ok) throw new Error("Failed to fetch actor data");

        const data = await res.json();
        setActorDetails(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false); // Stop loading after fetch completes (success or error)
      }
    };

    fetchActorData();
  }, [actorId]);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center p-4">
          <Loader className="w-10 h-10 animate-spin" />
        </div>
      ) : error ? (
        <div className="container mx-auto">
          <ErrorMessage
            title="Failed to load Watchlist"
            message="Please check again later"
          />
        </div>
      ) : (
        actorDetails && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-semibold">
                {actorDetails.name || ""}
              </h2>
              <div className="flex flex-col md:flex-row gap-6">
                <Image
                  className="md:w-1/3 h-[500px] object-cover rounded-lg"
                  src={`${actorDetails.profile_image}`}
                  alt={actorDetails.name}
                  width={500}
                  height={750}
                />
                <div className="flex flex-col gap-6 w-2/3">
                  <p className="text-lg">{actorDetails.biography || ""}</p>
                  <p className="text-lg">
                    <strong>Known for:</strong> {actorDetails.known_for || ""}
                  </p>
                  <p className="text-lg">
                    <strong>Birthdate:</strong> {actorDetails.birthday || ""}
                  </p>
                  <p className="text-lg">
                    <strong>Place of birth:</strong>{" "}
                    {actorDetails.place_of_birth || ""}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
