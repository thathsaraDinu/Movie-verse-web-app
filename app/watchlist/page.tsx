import { getAuthSession } from "@/lib/auth";
import React from "react";
import { ErrorMessage } from "@/components/ui/error-message";
import WatchlistsContent from "../../components/watchlists/watchlists-preview-main";

const WatchlistsPage: React.FC = async () => {
  const session = await getAuthSession();
  return (
    <section className="pagesection">
      {!session ? (
        <ErrorMessage
          title="Not signed in"
          message="Please sign in to view your watchlist."
        />
      ) : (
        <div>
          <WatchlistsContent />
        </div>
      )}
    </section>
  );
};

export default WatchlistsPage;
