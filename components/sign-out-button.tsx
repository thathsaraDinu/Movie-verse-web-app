"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

export default function SignOutButton() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="w-full">
          <div
            className={`w-full hidden px-3 py-2 cursor-pointer md:inline-flex space-x-2 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-white bg-red-600 hover:bg-red-600/90`}
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </div>
          <div className="flex items-center text-sm justify-center space-x-2 w-full py-4 rounded-none md:hidden cursor-pointer">
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader className="leading-none tracking-tight">
          <DialogTitle>Sign Out</DialogTitle>{" "}
          <DialogDescription className="">
            Are you sure you want to sign out?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2">
          <Button onClick={() => setOpen(false)} variant={"secondary"}>
            Cancel
          </Button>
          <Button
            variant={"destructive"}
            onClick={async () => {
              try {
                await signOut({ callbackUrl: "/" }); // Ensures redirection to homepage
                toast.success("Signed out successfully");
              } catch (error) {
                console.error("Sign out error", error);
                toast.error("Error signing out");
              }
            }}
          >
            Sign Out
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
