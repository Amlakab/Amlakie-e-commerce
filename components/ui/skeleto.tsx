"use client"

import * as React from "react"
import * as SkeletonPrimitive from "@radix-ui/react-skeleton"

import { cn } from "@/lib/utils"

const Skeleton = React.forwardRef<
  React.ElementRef<typeof SkeletonPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SkeletonPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SkeletonPrimitive.Root
    ref={ref}
    className={cn(
      "animate-pulse rounded-md bg-muted",
      className
    )}
    {...props}
  />
))
Skeleton.displayName = SkeletonPrimitive.Root.displayName

export { Skeleton }