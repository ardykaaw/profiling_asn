import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-2xl border px-4 py-3.5 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*5)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-1 items-start shadow-xs transition-all [&>svg]:size-5 [&>svg]:translate-y-0.5 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground border-border",
        destructive:
          "bg-rose-50/90 dark:bg-rose-950/30 text-rose-950 dark:text-rose-200 border-rose-200/80 dark:border-rose-900/50 [&>svg]:text-rose-600 dark:[&>svg]:text-rose-400 *:data-[slot=alert-description]:text-rose-800 dark:*:data-[slot=alert-description]:text-rose-300",
        warning:
          "bg-amber-50/90 dark:bg-amber-950/30 text-amber-950 dark:text-amber-200 border-amber-200/80 dark:border-amber-900/50 [&>svg]:text-amber-600 dark:[&>svg]:text-amber-400 *:data-[slot=alert-description]:text-amber-800 dark:*:data-[slot=alert-description]:text-amber-300",
        success:
          "bg-emerald-50/90 dark:bg-emerald-950/30 text-emerald-950 dark:text-emerald-200 border-emerald-200/80 dark:border-emerald-900/50 [&>svg]:text-emerald-600 dark:[&>svg]:text-emerald-400 *:data-[slot=alert-description]:text-emerald-800 dark:*:data-[slot=alert-description]:text-emerald-300",
        info:
          "bg-sky-50/90 dark:bg-sky-950/30 text-sky-950 dark:text-sky-200 border-sky-200/80 dark:border-sky-900/50 [&>svg]:text-sky-600 dark:[&>svg]:text-sky-400 *:data-[slot=alert-description]:text-sky-800 dark:*:data-[slot=alert-description]:text-sky-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-bold tracking-tight text-sm",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-xs sm:text-sm [&_p]:leading-relaxed font-normal",
        className
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }
