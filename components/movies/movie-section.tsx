import { Movie } from "@/lib/tmdb";
import { MovieGrid } from "@/components/movies/movie-grid";

interface MovieSectionProps {
  title: string;
  movies: Movie[];
}

export function MovieSection({ title, movies }: MovieSectionProps) {
  // const [currentPage, setCurrentPage] = useState(1);
  // const moviesPerPage = 10;

  // const indexOfLastMovie = currentPage * moviesPerPage;
  // const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  // const currentMovies = movies?.slice(indexOfFirstMovie, indexOfLastMovie);

  // const totalPages = Math.ceil(movies?.length / moviesPerPage);

  // const handleNextPage = () => {
  //   if (currentPage < totalPages) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };

  // const handlePreviousPage = () => {
  //   if (currentPage > 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // };

  return (
    <div className="">
      <MovieGrid movies={movies} title={title} />
    </div>
  );
}
