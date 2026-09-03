import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-muted text-muted-foreground hover:text-foreground border border-background hover:border-foreground [&>svg]:stroke-muted-foreground hover:[&>svg]:stroke-foreground px-8 flex items-center justify-start gap-2",
        muted: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-foreground underline-offset-4 hover:underline",
        button1: "text-white bg-custom-secondary-700 font-normal rounded-full px-4 py-4",
        mobileFooter:
          "  flex flex-col items-center justify-center gap-1 text-[10px]",
        filledSecondary: "bg-custom-secondary-600 rounded-full h-[52px] hover:bg-custom-secondary-700 cursor-pointer text-white py-5",
        applied: "hover:scale-105 transition-transform duration-200 ease-in-out bg-background flex items-center justify-center gap-2 text-foreground border-2 border-emerald-500 font-semibold text-lg py-6 cursor-pointer",
        applyNow: "hover:scale-105 transition-transform duration-100 ease-in-out border-[#00419f] border-2 bg-[#3cc4fe] text-white font-semibold  text-lg rounded-full! py-6 cursor-pointer",
        shortlist_app: "bg-cyan-500 h-12!  flex items-center justify-start gap-4 cursor-pointer overflow-hidden transition-all duration-300 ease-in-out px-3! rounded-[3px] text-white font-semibold",
        reject_app: "bg-rose-500 h-12!  flex items-center justify-start gap-4 cursor-pointer overflow-hidden transition-all duration-300 ease-in-out px-3! rounded-[3px] text-white font-semibold",
        accept_app: "bg-emerald-500 h-12!  flex items-center justify-start gap-4 cursor-pointer overflow-hidden transition-all duration-300 ease-in-out px-3! rounded-[3px] text-white font-semibold",
        activate_acc: "bg-amber-700 h-12!  flex items-center justify-start gap-4 cursor-pointer overflow-hidden transition-all duration-300 ease-in-out px-3! rounded-[3px] text-white font-semibold",
        reset_acc: "bg-cyan-700 h-12! w-60 flex items-center justify-start gap-4 cursor-pointer overflow-hidden transition-all duration-300 ease-in-out px-3! rounded-[3px] text-white font-semibold",
        view_item: "bg-custom-secondary-400 hover:bg-custom-secondary-500 text-custom-primary-400",
        view_cancelled: "border-2 border-rose-500 bg-custom-secondary-400 hover:bg-custom-secondary-500 text-custom-primary-400",
        continue_item: "bg-custom-primary-900 hover:bg-custom-primary-700 text-custom-accent-400",

        pagination_controls: "bg-custom-secondary-500 text-custom-primary-500 hover:custom-secondary-600  dark:bg-custom-primary-500 dark:text-custom-secondary-500  dark:hover:bg-custom-primary-600"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
