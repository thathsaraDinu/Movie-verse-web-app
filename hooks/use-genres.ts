import { useState, useEffect } from "react";
import { Genre, getGenres } from "@/lib/tmdb";

const useGenres = () => {
  const [data, setData] = useState<Genre[]>([]); // Assuming genres are in an array, you can change the type if needed
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const fetchedGenres = await getGenres();
        setData(fetchedGenres); // Set the fetched genres
      } catch (err) {
        console.error("Failed to fetch genres:", err);
        setError("Failed to load genres");
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };

    fetchGenres();
  }, []); // Empty dependency array means it runs once when the component mounts
  return { data, loading, error }; // Return the data, loading, and error states
};

export default useGenres;
