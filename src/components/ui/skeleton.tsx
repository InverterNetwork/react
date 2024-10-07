import * as React from 'react'
import { cn } from '@/utils'

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('in--animate-pulse in--rounded-md in--bg-muted', className)}
      {...props}
    />
  )
}

export { Skeleton }
