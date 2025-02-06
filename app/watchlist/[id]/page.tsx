import { getAuthSession } from "@/lib/auth";
import React from "react";
import { ErrorMessage } from "@/components/ui/error-message";
import WatchlistPageContent from "../../../components/watchlist/watchlist-items-main";

async function WatchlistPage({ params }: { params: { id: string } }) {
  const session = await getAuthSession();
  return (
    <section>
      {!session ? (
        <div className="pagesection">
        <ErrorMessage 
          title="Not signed in"
          message="Please sign in to view your watchlist."
        /></div>
      ) : (
        <div>
          <WatchlistPageContent watchlistId={params.id} />
        </div>
      )}
    </section>
  );
}

export default WatchlistPage;
