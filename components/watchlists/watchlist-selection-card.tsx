import { Loader } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { getImageUrl } from "@/lib/tmdb";
import Image from "next/image";

export default function WatchlistSelectionCard({
  watchlist,
  handleAddItem,
}: {
  watchlist: any;
  handleAddItem: any;
}) {
  const [addLoading, setAddLoading] = useState(false);
  return (
    <div>
      <Card
        key={watchlist._id}
        className="p-4 relative bg-transparent overflow-clip"
      >
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
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {watchlist.name}
          </CardTitle>
          <Button
            variant="default"
            className="py-2 h-8"
            onClick={async () => {
              try {
                setAddLoading(true);
                await handleAddItem(watchlist._id);
                setAddLoading(false);
              } catch (error) {}
            }}
          >
            {addLoading ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              <span>Select</span>
            )}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {watchlist.items.length} movies
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
