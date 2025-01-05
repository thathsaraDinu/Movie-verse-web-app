"use client";

export function AddWatchlist() {
  const server = process.env.NEXT_PUBLIC_SERVER_URL;
  const mockItem = {
    name: "Inception",
    releaseDate: new Date("2010-07-16"),
    imageUrl: "https://example.com/inception.jpg",
    movieId: "27205"
  };

  return (
    <div>
      <button
        onClick={async () => {
          // Add the mock item to the watchlist
          const response = await fetch(`movies/api/watchlist`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(mockItem),
          });
        }}
      >
        Add mock to Watchlist
      </button>
    </div>
  );
}
