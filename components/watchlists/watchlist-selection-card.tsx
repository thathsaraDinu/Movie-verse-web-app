"use client";

import { Loader } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";
import { getImageUrl } from "@/lib/tmdb";

export default function WatchlistSelectionCard({
  watchlist,
  handleAddItem,
}: {
  watchlist: any;
  handleAddItem?: (id: string) => Promise<void>;
}) {
  const [addLoading, setAddLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAdd = async () => {
    if (!handleAddItem) return;
    try {
      setAddLoading(true);
      await handleAddItem(watchlist._id);
    } catch (error) {
      console.error("Error adding item:", error);
    } finally {
      setAddLoading(false);
    }
  };

  return (
    <Card className="group relative  overflow-hidden transition-all duration-300 hover:shadow-xl">
      {watchlist.imageUrl != "" ? (
        <div className="absolute inset-0">
          <Image
            src={getImageUrl(watchlist.imageUrl, "w500")}
            alt={watchlist.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10 " />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/50 " />
      )}

      <div className="relative h-full flex flex-col justify-between p-6 gap-4">
        <div className="space-y-2">
          <CardHeader className="p-0">
            <div className="flex flex-col items-center gap-2 ">
              <CardTitle className="text-xl font-bold text-white">
                {watchlist.name}
              </CardTitle>
              <Button
                size="sm"
                className="transition-all duration-300 bg-white text-black hover:bg-white hover:text-black"
                onClick={handleAdd}
                disabled={addLoading}
              >
                {addLoading ? (
                  <Loader className="h-4 w-4 animate-spin" />
                ) : (
                  "Add to List"
                )}
              </Button>
            </div>
          </CardHeader>
        </div>

        <CardContent className="p-0 space-y-4">
          <div className="flex items-stretch gap-4 justify-between">
            <div className="flex flex-col justify-between">
              <p className="text-sm text-gray-400">Movies</p>
              <p className="text-2xl font-bold text-white">
                {watchlist.items.length}
              </p>
            </div>
            <div className="flex flex-col justify-between items-end">
              <p className="text-sm text-gray-400">Created</p>
              <p className="text-sm text-white">
                {new Date(watchlist.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex -space-x-3">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-8 w-8 rounded-full border-2 border-white bg-gray-800"
              />
            ))}
            {watchlist.items.length > 4 && (
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-primary text-xs font-medium text-primary-foreground">
                +{watchlist.items.length - 4}
              </div>
            )}
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
