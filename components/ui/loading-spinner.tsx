import { Loader, Loader2 } from "lucide-react";

export function LoadingSpinner() {
  return (
    <div className="flex justify-center min-h-[100vh] items-center p-8">
      <Loader className="w-10 h-10 animate-spin" />
    </div>
  );
}