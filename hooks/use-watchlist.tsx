import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const { data: session, status } = useSession();

  const fetchWatchlist = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/watchlist", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch watchlist");
      }

      const data = await response.json();
      setWatchlist(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchWatchlist();
    }
  }, [status]); // Triggered when session status changes

  if (status === "loading") {
    return { watchlist: [], loading: true, refetch: fetchWatchlist }; // During loading, return empty state
  }

  if (status === "unauthenticated") {
    return { watchlist: [], loading: false, refetch: fetchWatchlist }; // Handle unauthenticated state
  }

  return { watchlist, loading, error, refetch: fetchWatchlist };
}
