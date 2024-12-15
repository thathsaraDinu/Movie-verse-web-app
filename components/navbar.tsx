"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu"; // Adjust import path as needed
import { Genre, getGenres } from "@/lib/tmdb";
import { SiteHeader } from "./site-header";
import { ThemeToggle } from "./theme-toggle";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleClick = (genreId: string, genreName: string) => {
    router.push(`/${genreName}?id=${genreId}`);
  };

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getGenres();
        setGenres(data);
      } catch (error) {
        console.error("Failed to fetch genres:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <SiteHeader />
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex rounded-lg items-center p-2 border">
              Genres <ChevronDown className="ml-2" />
            </DropdownMenuTrigger>

            <DropdownMenuPortal>
              <DropdownMenuContent
                sideOffset={5}
                className="z-50 min-w-[8rem] flex flex-col overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
              >
                {loading ? (
                  <DropdownMenuItem disabled>...</DropdownMenuItem>
                ) : genres.length > 0 ? (
                  genres.map((genre) => (
                    <DropdownMenuItem
                      key={genre.id}
                      onClick={() => handleClick(genre.id.toString(), genre.name)}
                      className="hover:bg-accent focus:bg-accent cursor-pointer"
                    >
                      {genre.name}
                    </DropdownMenuItem>
                  ))
                ) : (
                  <DropdownMenuItem disabled>No Genres Found</DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenuPortal>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
