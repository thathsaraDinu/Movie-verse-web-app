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
      <DropdownMenuTrigger className="inline-flex outline-none rounded-lg items-center p-2">
        Genres
        <ChevronDown className="ml-2" />
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
