import { SiteHeader } from "./site-header";
import { ThemeToggle } from "./theme-toggle";
import GenreSelection from "./genre-selection";
import NavbarLinks from "./navbar-links";
import { getAuthSession } from "@/lib/auth";
import { getGenres } from "@/lib/tmdb";

export default async function Navbar() {
  const session = await getAuthSession();
  const genres = await getGenres();
  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60  z-50 relative">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex items-center justify-between px-6 py-4 gap-5 container mx-auto">
          <SiteHeader />
          <div className="flex items-center justify-end w-auto space-x-4">
            <ThemeToggle />
            <GenreSelection genres={genres} />
            <NavbarLinks session={session} />
          </div>
        </div>
      </div>
    </div>
  );
}
