"use client";

import React from "react";
import { ErrorMessage } from "@/components/ui/error-message";
import { useWatchlist } from "@/hooks/use-watchlist";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { AddNewWatchlist } from "@/components/watchlists/add-new-watchlist";
import WatchlistDeleteButton from "@/components/watchlists/watchlist-delete-button";
import { getImageUrl } from "@/lib/tmdb";
import Image from "next/image";
import { Loader } from "lucide-react";
import { AddWatchlistByLink } from "./add-watchlist-by-link";
import WatchlistShareUrl from "./watchlist-share-url";

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
          <AddWatchlistByLink refetch={refetch} />
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-[500px]">
            <Loader className="w-10 h-10 animate-spin" />
          </div>
        ) : error ? (
          <div className="container mx-auto">
            <ErrorMessage
              title="Failed to load Watchlist"
              message="Please check again later"
            />
          </div>
        ) : watchlists.length < 1 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
           
            <>
              <AddNewWatchlist
                refetch={refetch}
                numberOfItems={watchlists?.length}
              />
            </>
          </div>
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
                <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl bg-white dark:bg-gray-800">
                  {watchlist.imageUrl != "" ? (
                    <div className="absolute inset-0">
                      <Image
                        src={getImageUrl(watchlist.imageUrl, "w500")}
                        alt={watchlist.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        priority
                      />
                      <div className="absolute inset-0 bg-black/30 " />
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/50 " />
                  )}
                  <Link
                    href={`/watchlist/${watchlist._id}`}
                    className="relative h-full flex flex-col justify-between px-6 py-10 gap-5"
                  >
                    <div className="space-y-2">
                      <CardHeader className="p-0">
                        <div className="flex flex-col items-center gap-2 ">
                          <CardTitle className="text-xl font-bold text-white">
                            {watchlist.name}
                          </CardTitle>
                        </div>
                      </CardHeader>
                    </div>

                    <CardContent className="p-0 space-y-4">
                      <div className="flex items-stretch gap-4 justify-between">
                        <div className="flex flex-col justify-between">
                          <p className="text-sm text-gray-200">Movies</p>
                          <p className="text-2xl font-bold text-white">
                            {watchlist.items.length}
                          </p>
                        </div>
                        <div className="flex flex-col items-end">
                          <p className="text-sm text-gray-200">Created Date</p>
                          <p className="text-sm text-white">
                            {new Date(watchlist.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex -space-x-3 justify-between">
                        <div className="flex -space-x-3 justify-between">
                          {[...Array(4)].map((_, i) => (
                            <div
                              key={i}
                              className="h-8 w-8 rounded-full border-2 border-foreground bg-background"
                            />
                          ))}
                          {watchlist.items.length > 4 && (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-foreground text-xs font-medium text-background">
                              +{watchlist.items.length - 4}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Link>
                  <WatchlistShareUrl watchlistId={watchlist._id} />
                  <div className="absolute bottom-10 right-6">
                    <WatchlistDeleteButton
                      id={watchlist._id}
                      name={watchlist.name}
                      refetch={refetch}
                    />
                  </div>
                </Card>
              </motion.div>
            ))}
            <>
              <AddNewWatchlist
                refetch={refetch}
                numberOfItems={watchlists?.length}
              />
            </>
          </div>
        )}
      </div>
    </section>
  );
};

export default WatchlistsContent;
