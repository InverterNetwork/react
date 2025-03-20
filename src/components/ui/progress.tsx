'use client'

import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cn } from '@/utils'

const Progress = ({
  ref,
  className,
  value,
  ...props
}: React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
  ref?: React.RefObject<React.ElementRef<typeof ProgressPrimitive.Root> | null>
}) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      'in--relative in--h-4 in--w-full in--overflow-hidden in--rounded-full in--bg-secondary',
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="in--h-full in--w-full in--flex-1 in--bg-primary in--transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
)
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
