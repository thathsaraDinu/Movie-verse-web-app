"use client";
import React, { useEffect, useState } from "react";
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

const GenreSelection: React.FC = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch("/api/genres"); // Assuming the handler is at /api/genres
        if (!response.ok) {
          throw new Error("Failed to fetch genres");
        }
        console.log(response);
        const genres = await response.json(); // Assumes data is wrapped under `data`
        setGenres(genres); // Store the fetched genres
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    fetchGenres();
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex outline-none rounded-lg items-center p-2">
        Explore by Genre
        <ChevronDown className="ml-2" />
      </DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuContent
          sideOffset={5}
          className="z-50 min-w-[8rem] flex flex-col overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
        >
          {error ? (
            <DropdownMenuItem disabled>{error}</DropdownMenuItem>
          ) : loading ? (
            <DropdownMenuItem disabled>Loading...</DropdownMenuItem> // Show loading state if genres are being fetched
          ) : genres?.length > 0 ? (
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
