import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function MoviesNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Not Found</h1>
      <p className="text-muted-foreground mb-8">
        The genre you&apos;re looking for doesn&apos;t exist or has been removed.
      </p>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
