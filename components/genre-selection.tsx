"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu"; // Adjust import path as needed
import { ChevronDown } from "lucide-react";
import { Genre } from "@/lib/tmdb"; // Assuming Genre is already defined
import Link from "next/link";

const GenreSelection = ({ genres }: { genres: Genre[] }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="">
        <div
          className={`w-full h-10 px-4 py-2 cursor-pointer inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-secondary hover:bg-primary/90`}
        >
          Genres
          <ChevronDown className="ml-2 w-4 h-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent
          sideOffset={5}
          className="z-50 bg-slate-50 dark:bg-slate-950 min-w-[8rem] flex flex-col overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
        >
          {genres?.length > 0 ? (
            genres.map((genre) => (
              <Link
                key={genre.id}
                href={`/genres/${genre.name}?id=${genre.id}`}
                passHref
              >
                <DropdownMenuItem className="cursor-pointer  hover:bg-accent focus:bg-accent w-full p-1 rounded-md">
                  {genre.name}
                </DropdownMenuItem>
              </Link>
            ))
          ) : (
            <DropdownMenuItem disabled>No Genres Found</DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};

export default GenreSelection;
