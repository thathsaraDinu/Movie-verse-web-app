"use client";

import { useWatchlist } from "@/hooks/use-watchlist";
import { AddNewWatchlist } from "./add-new-watchlist";
import { ErrorMessage } from "../ui/error-message";
import { Loader } from "lucide-react";
import WatchlistSelectionCard from "./watchlist-selection-card";
import { motion } from "framer-motion";

export default function WatchlistsSelect({
  addItemToWatchlist,
}: {
  addItemToWatchlist: (id: string) => Promise<void>;
}) {
  const { watchlists, loading, error, refetch } = useWatchlist();

  const handleAddItem = async (watchlistId: string) => {
    try {
      await addItemToWatchlist(watchlistId);
      await refetch();
    } catch (error) {
    } finally {
    }
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-[500px]">
          <Loader className="w-10 h-10 animate-spin" />
        </div>
      ) : error ? (
        <>
          <ErrorMessage title="Error" message="Please try again later" />
        </>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {watchlists &&
            watchlists.map((watchlist: any, index: number) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
                key={watchlist._id}
                transition={{
                  duration: 0.5,
                  delay: 0.1 * index,
                }}
              >
                <WatchlistSelectionCard
                  watchlist={watchlist}
                  handleAddItem={handleAddItem}
                />
              </motion.div>
            ))}
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.1 * watchlists?.length,
              }}
            >
              <AddNewWatchlist refetch={refetch} />
            </motion.div>
          </>
        </div>
      )}
    </div>
  );
}
