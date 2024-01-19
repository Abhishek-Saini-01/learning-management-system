"use client"

import * as ProgressPrimitive from "@radix-ui/react-progress"
import { VariantProps, cva } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const progressVarient = cva(
  "h-full w-full flex-1 bg-primary transition-all",
  {
    variants: {
      varient: {
        default: "bg-sky-600",
        success: "bg-emerald-700"
      }
    },
    defaultVariants: {
      varient: "default"
    }
  }
)

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof progressVarient>{}

type CombinedProgressProps = ProgressProps & React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  CombinedProgressProps
>(({ className, value,varient, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(
        progressVarient({varient})
      )}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
