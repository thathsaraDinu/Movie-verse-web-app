"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import WatchlistCard from "./watchlist-card";
import { getAuthSession } from "@/lib/auth";
import { useSession } from "next-auth/react";
import { useWatchlist } from "@/hooks/use-watchlist";
import { ErrorMessage } from "../ui/error-message";
import { LoadingSpinner } from "../ui/loading-spinner";

export default function WatchlistGrid() {
  const { watchlist, loading, refetch } = useWatchlist();

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <section className="container mx-auto flex flex-col items-start gap-4 md:gap-6 ">
      <h1 className="text-3xl font-bold">Watchlist</h1>
      {watchlist.length < 1 ? (
        <p className="text-center text-muted-foreground py-8 w-full">
          No entries found.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5 mx-auto">
          {watchlist?.map((item: any) => (
            <div className="col-span-1 " key={item._id}>
              <WatchlistCard watchlistItem={item} refetch={refetch} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
