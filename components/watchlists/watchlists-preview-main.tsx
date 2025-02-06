"use client";

import React from "react";
import { ErrorMessage } from "@/components/ui/error-message";
import { useWatchlist } from "@/hooks/use-watchlist";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { AddNewWatchlist } from "@/components/watchlists/add-new-watchlist";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import WatchlistDeleteButton from "@/components/watchlists/watchlist-delete-button";
import { getImageUrl } from "@/lib/tmdb";
import Image from "next/image";

const WatchlistsContent: React.FC = () => {
  const { watchlists, loading, error, refetch } = useWatchlist();

  return (
    <section>
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center flex-wrap gap-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight">
              Your Watchlists
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AddNewWatchlist refetch={refetch} />
          </motion.div>
        </div>
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="container mx-auto">
            <ErrorMessage
              title="Failed to load Watchlist"
              message="Please check again later"
            />
          </div>
        ) : watchlists.length < 1 ? (
          <p className="text-center text-muted-foreground py-32 w-full">
            No entries found.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {watchlists.map((watchlist, index) => (
              <motion.div
                key={watchlist._id}
                initial={{ opacity: 0, y: 20 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card className="p-4 relative shadow-md bg-transparent overflow-clip">
                  <Image
                    src={getImageUrl(watchlist.imageUrl, "w500")}
                    alt="movie poster"
                    layout="fill"
                    objectFit="cover"
                    className="absolute top-0 left-0 -z-20"
                  />
                  <div
                    className={`absolute object-cover top-0 left-0 h-full w-full ${
                      !watchlist.imageUrl || watchlist.imageUrl == ""
                        ? "bg-background"
                        : " bg-gradient-to-l from-background/20 to-background"
                    }  -z-10`}
                  />
                  <CardHeader className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-semibold">
                        {watchlist.name}
                      </CardTitle>
                      <WatchlistDeleteButton
                        id={watchlist._id}
                        name={watchlist.name}
                        refetch={refetch}
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-5">
                    <div className="text-xl font-bold">
                      {watchlist.items.length > 1 ? (
                        <span>{watchlist.items.length} movies</span>
                      ) : watchlist.items.length == 1 ? (
                        <span>1 movie</span>
                      ) : (
                        <span>No movies</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <Link
                        href={`/watchlist/${watchlist._id}`}
                        className="flex text-sm font-semibold items-center gap-2 text-secondary bg-primary hover:bg-secondary hover:text-primary px-4 py-2 rounded-md"
                      >
                        <span>View</span>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default WatchlistsContent;
