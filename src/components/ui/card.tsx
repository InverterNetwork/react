import * as React from 'react'

import { cn } from '@/utils'

const Card = ({
  ref,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  ref?: React.RefObject<HTMLDivElement | null>
}) => (
  <div
    ref={ref}
    className={cn(
      'in--rounded-lg in--border in--bg-card in--text-card-foreground in--shadow-sm',
      className
    )}
    {...props}
  />
)
Card.displayName = 'Card'

const CardHeader = ({
  ref,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  ref?: React.RefObject<HTMLDivElement | null>
}) => (
  <div
    ref={ref}
    className={cn('in--flex in--flex-col in--space-y-1.5 in--p-6', className)}
    {...props}
  />
)
CardHeader.displayName = 'CardHeader'

const CardTitle = ({
  ref,
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & {
  ref?: React.RefObject<HTMLParagraphElement | null>
}) => (
  <h3
    ref={ref}
    className={cn(
      'in--text-2xl in--font-semibold in--leading-none in--tracking-tight',
      className
    )}
    {...props}
  />
)
CardTitle.displayName = 'CardTitle'

const CardDescription = ({
  ref,
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement> & {
  ref?: React.RefObject<HTMLParagraphElement | null>
}) => (
  <p
    ref={ref}
    className={cn('in--text-sm in--text-muted', className)}
    {...props}
  />
)
CardDescription.displayName = 'CardDescription'

const CardContent = ({
  ref,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  ref?: React.RefObject<HTMLDivElement | null>
}) => <div ref={ref} className={cn('in--p-6 in--pt-0', className)} {...props} />
CardContent.displayName = 'CardContent'

const CardFooter = ({
  ref,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  ref?: React.RefObject<HTMLDivElement | null>
}) => (
  <div
    ref={ref}
    className={cn('in--flex in--items-center in--p-6 in--pt-0', className)}
    {...props}
  />
)
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
