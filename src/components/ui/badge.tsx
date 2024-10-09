import * as React from 'react'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

import { cn } from '@/utils'

const badgeVariants = cva(
  'in--inline-flex in--items-center in--rounded-full in--border in--px-2.5 in--py-0.5 in--text-xs in--font-semibold in--transition-colors focus:in--outline-none focus:in--ring-2 focus:in--ring-ring focus:in--ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'in--border-transparent in--bg-primary in--text-primary-foreground hover:in--bg-primary/80',
        secondary:
          'in--border-transparent in--bg-secondary in--text-secondary-foreground hover:in--bg-secondary/80',
        destructive:
          'in--border-transparent in--bg-destructive in--text-destructive-foreground hover:in--bg-destructive/80',
        outline: 'in--text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
