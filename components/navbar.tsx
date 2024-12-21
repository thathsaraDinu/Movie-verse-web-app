import { SiteHeader } from "./site-header";
import { ThemeToggle } from "./theme-toggle";
import GenreSelection from "./genre-selection";
import NavbarLinks from "./navbar-links";

export default function Navbar() {
  return (
    <div className="border-b bg-background/95 backdrop-blur  supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex items-center justify-between px-6 py-4 gap-5 container mx-auto">
          <SiteHeader />
          <div className="flex items-center justify-end w-auto space-x-4">
            <ThemeToggle />
            <GenreSelection />
            <NavbarLinks />
          </div>
        </div>
      </div>
    </div>
  );
}
