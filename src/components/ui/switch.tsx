'use client'

import * as React from 'react'
import * as SwitchPrimitives from '@radix-ui/react-switch'

import { cn } from '@/utils'

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      'in--peer in--inline-flex in--h-6 in--w-11 in--shrink-0 in--cursor-pointer in--items-center in--rounded-full in--border-2 in--border-transparent in--transition-colors focus-visible:in--outline-none focus-visible:in--ring-2 focus-visible:in--ring-ring focus-visible:in--ring-offset-2 focus-visible:in--ring-offset-background disabled:in--cursor-not-allowed disabled:in--opacity-50 data-[state=checked]:in--bg-primary data-[state=unchecked]:in--bg-input',
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        'in--pointer-events-none in--block in--h-5 in--w-5 in--rounded-full in--bg-background in--shadow-lg in--ring-0 in--transition-transform data-[state=checked]:in--translate-x-5 data-[state=unchecked]:in--translate-x-0'
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
