import * as React from "react";
import { cn } from "@/lib/utils"; // if you don't have this, see Option 2 below

export function Separator({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("w-full h-px bg-zinc-800/70 my-4", className)}
      {...props}
    />
  );
}
