import { SiteHeader } from "./site-header";
import { ThemeToggle } from "./theme-toggle";
import GenreSelection from "./genre-selection";

export default function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between px-6 py-4 max-w-screen-xl container mx-auto flex-wrap gap-5">
        <SiteHeader />
        <div className="flex items-center justify-end w-full sm:w-auto space-x-4">
          <ThemeToggle />
          <GenreSelection />
        </div>
      </div>
    </nav>
  );
}
