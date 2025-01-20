import { SiteHeader } from "./site-header";
import { ThemeToggle } from "./theme-toggle";
import GenreSelection from "./genre-selection";
import NavbarLinks from "./navbar-links";
import { getAuthSession } from "@/lib/auth";
import { Genre, getGenres } from "@/lib/tmdb";

export default async function Navbar() {
  const session = await getAuthSession();
  let genres: Genre[] = [];
  try {
    genres = await getGenres();
  } catch (error) {
    console.error("Failed to fetch genres:", error);
  }
  return (
    <div className="border-b backdrop-blur supports-[backdrop-filter]:bg-background/60 relative z-50 md:sticky top-0">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex items-center justify-between px-6 py-4 gap-5 container mx-auto">
          <div className="flex justify-start gap-4">
            <SiteHeader />
            <ThemeToggle />
          </div>
          <div className="flex items-center justify-end w-auto space-x-4">
            <GenreSelection genres={genres} />
            <NavbarLinks session={session} />
          </div>
        </div>
      </div>
    </div>
  );
}
