import { getAuthSession } from "@/lib/auth";
import React from "react";
import WatchlistGrid from "@/components/watchlist/watchlist-grid";
import { ErrorMessage } from "@/components/ui/error-message";

const WatchlistPage: React.FC = async () => {
  const session = await getAuthSession();
  return (
    <section>
      {!session ? (
        <ErrorMessage
          title="Not signed in"
          message="Please sign in to view your watchlist."
        />
      ) : (
        <div>
          <WatchlistGrid />
        </div>
      )}
    </section>
  );
};

export default WatchlistPage;
