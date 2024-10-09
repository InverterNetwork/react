import * as React from 'react'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import { cn } from '@/utils'

// Define the style variants for the Description component
const descriptionVariants = cva(
  'in--text-sm in--text-muted-foreground in--leading-tight peer-disabled:in--cursor-not-allowed peer-disabled:in--opacity-70',
  {
    variants: {
      size: {
        default: 'in--text-sm',
        lg: 'in--text-base',
        sm: 'in--text-xs',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
)

// Forward ref and type-safe props for the Description component
const Description = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> &
    VariantProps<typeof descriptionVariants>
>(({ className, size, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(descriptionVariants({ size }), className)}
    {...props}
  />
))

Description.displayName = 'Description'

export { Description }
