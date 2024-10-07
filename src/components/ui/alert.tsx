import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utils'

const alertVariants = cva(
  'in--relative in--w-full in--rounded-lg in--border in--p-4 [&>svg~*]:in--pl-7 [&>svg+div]:in--translate-y-[-3px] [&>svg]:in--absolute [&>svg]:in--left-4 [&>svg]:in--top-4 [&>svg]:in--text-foreground',
  {
    variants: {
      variant: {
        default: 'in--bg-background in--text-foreground',
        destructive:
          'in--border-destructive/50 in--text-destructive dark:in--border-destructive [&>svg]:in--text-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = 'Alert'

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn(
      'in--mb-1 in--font-medium in--leading-none in--tracking-tight',
      className
    )}
    {...props}
  />
))
AlertTitle.displayName = 'AlertTitle'

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('in--text-sm [&_p]:in--leading-relaxed', className)}
    {...props}
  />
))
AlertDescription.displayName = 'AlertDescription'

export { Alert, AlertTitle, AlertDescription }
