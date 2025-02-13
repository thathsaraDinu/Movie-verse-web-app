import { getAuthSession } from "@/lib/auth";
import React, { Suspense } from "react";
import { ErrorMessage } from "@/components/ui/error-message";
import WatchlistPageContent from "../../../components/watchlist/watchlist-items-main";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default async function WatchlistPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getAuthSession();
  const { id } = await params;

  return (
    <section>
      {!session ? (
        <div className="pagesection">
          <ErrorMessage
            title="Not signed in"
            message="Please sign in to view your watchlist."
          />
        </div>
      ) : (
        <Suspense fallback={<LoadingSpinner />}>
          <WatchlistPageContent watchlistId={id} />
        </Suspense>
      )}
    </section>
  );
}
