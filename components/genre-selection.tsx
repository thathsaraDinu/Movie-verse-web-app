import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu"; // Adjust import path as needed
import { ChevronDown } from "lucide-react";
import { Genre, getGenres } from "@/lib/tmdb";
import Link from "next/link";

export default async function GenreSelection() {
  try {
    const genres: Genre[] = await getGenres(); // Fetch genres directly

    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="inline-flex rounded-lg items-center p-2 border">
          Genres <ChevronDown className="ml-2" />
        </DropdownMenuTrigger>

        <DropdownMenuPortal>
          <DropdownMenuContent
            sideOffset={5}
            className="z-50 min-w-[8rem] flex flex-col overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
          >
            {genres.length > 0 ? (
              genres.map((genre) => (
                <Link
                  key={genre.id}
                  href={`/genres/${genre.name}?id=${genre.id}`}
                  className="hover:bg-accent focus:bg-accent w-full p-1 rounded-md"
                >
                  <DropdownMenuItem className="cursor-pointer p-0">
                    {genre.name}
                  </DropdownMenuItem>{" "}
                </Link>
              ))
            ) : (
              <DropdownMenuItem disabled>No Genres Found</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    );
  } catch (error) {
    console.error("Failed to fetch genres:", error);
    return (
      <DropdownMenu>
        <DropdownMenuTrigger className="inline-flex rounded-lg items-center p-2 border">
          Genres <ChevronDown className="ml-2" />
        </DropdownMenuTrigger>

        <DropdownMenuPortal>
          <DropdownMenuContent
            sideOffset={5}
            className="z-50 min-w-[8rem] flex flex-col overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
          >
            <DropdownMenuItem disabled>Failed to load genres</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    );
  }
}
