import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function useWatchlist() {
  const [watchlists, setWatchlists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const { data: session, status } = useSession();

  const fetchWatchlist = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/watchlist");
      if (response.ok) {
        const data = await response.json();
        setWatchlists(data);
      }
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
    return { watchlists: [], loading: true, refetch: fetchWatchlist }; // During loading, return empty state
  }

  if (status === "unauthenticated") {
    return { watchlists: [], loading: false, refetch: fetchWatchlist }; // Handle unauthenticated state
  }

  return { watchlists: watchlists, loading, error, refetch: fetchWatchlist };
}
