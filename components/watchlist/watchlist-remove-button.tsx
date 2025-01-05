"use client";

import React from "react";
import { Button } from "../ui/button";

export default function WatchlistRemoveButton({ id, refetch }: any) {
  const remove = async (id: number) => {
    const response = await fetch(`/movies/api/watchlist?id=${id}`, {
      method: "DELETE",
    });
    refetch();
  };

  return (
    <div>
      <Button onClick={() => remove(id)} className="btn btn-primary font-bold text-xs">
        Remove from Watchlist
      </Button>
    </div>
  );
}
