import * as React from 'react'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

import { cn } from '@/utils'

const alertVariants = cva(
  'in--relative in--w-full in--rounded-lg in--border in--p-4 [&>svg~*]:in--pl-7 [&>svg+div]:in--translate-y-[-3px] [&>svg]:in--absolute [&>svg]:in--left-4 [&>svg]:in--top-4 [&>svg]:in--text-foreground',
  {
    variants: {
      variant: {
        default: 'in--bg-background in--text-foreground',
        destructive:
          'in--border-destructive/50 in--text-destructive dark:in--border-destructive [&>svg]:in--text-destructive',
        warning: 'in--border-warning in--text-warning [&>svg]:in--text-warning',
        success: 'in--border-success in--text-success [&>svg]:in--text-success',
        error: 'in--border-error in--text-error [&>svg]:in--text-error',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const Alert = ({
  ref,
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof alertVariants> & {
    ref?: React.RefObject<HTMLDivElement | null>
  }) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
)
Alert.displayName = 'Alert'

const AlertTitle = ({
  ref,
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & {
  ref?: React.RefObject<HTMLParagraphElement | null>
}) => (
  <h5
    ref={ref}
    className={cn(
      'in--mb-1 in--font-medium in--leading-none in--tracking-tight',
      className
    )}
    {...props}
  />
)
AlertTitle.displayName = 'AlertTitle'

const AlertDescription = ({
  ref,
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement> & {
  ref?: React.RefObject<HTMLParagraphElement | null>
}) => (
  <div
    ref={ref}
    className={cn('in--text-sm [&_p]:in--leading-relaxed', className)}
    {...props}
  />
)
AlertDescription.displayName = 'AlertDescription'

export { Alert, AlertTitle, AlertDescription }
