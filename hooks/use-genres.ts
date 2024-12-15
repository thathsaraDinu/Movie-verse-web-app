import { getGenres } from "@/lib/tmdb";

const useGenres = async () => {
  const data = await getGenres();

  return { data };
};

export default useGenres;
