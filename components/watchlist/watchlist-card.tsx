"use client";
import React from "react";
import WatchlistRemoveButton from "./watchlist-remove-button";
import { getImageUrl } from "@/lib/tmdb";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";

interface WatchlistCardProps {
  watchlistItem: any;
  refetch: any;
}

export function WatchlistCard({ watchlistItem, refetch }: WatchlistCardProps) {
  return (
    <Card className="overflow-hidden transition-transform hover:scale-105 flex flex-col w-full">
      <Link href={`/movies/${watchlistItem.movieId}`} className="z-10">
        <div className="relative w-full h-80 mb-4">
          <Image
            layout="fill"
            priority={false}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 10vw"
            src={getImageUrl(watchlistItem.imageUrl, "w500")}
            alt={watchlistItem.name}
            className="object-cover"
          />
        </div>
        <CardContent className="flex flex-col justify-between gap-2">
          <h3 className="font-semibold line-clamp-1">{watchlistItem.name}</h3>
          <p className="text-xs text-muted-foreground line-clamp-1">
            Release: {new Date(watchlistItem.releaseDate).toLocaleDateString()}
          </p>
          <p className="text-xs text-muted-foreground line-clamp-1">
            Date Added: {new Date(watchlistItem.addedAt).toLocaleDateString()}
          </p>
        </CardContent>
      </Link>
      <div className="flex flex-col items-center mt-1 mx-10 mb-4">
        <WatchlistRemoveButton id={watchlistItem._id} refetch={refetch} />
      </div>
    </Card>
  );
}

export default WatchlistCard;
