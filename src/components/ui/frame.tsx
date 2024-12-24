import * as React from 'react'
import { cn } from '@/utils'

export function Frame({
  className,
  children,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  return (
    <div
      className={cn(
        'in--space-y-2 in--p-6 in--border in--rounded-lg in--shadow-sm in--bg-card',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
