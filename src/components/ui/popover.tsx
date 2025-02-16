'use client'

import * as React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'

import { cn } from '@/utils'

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = React.forwardRef<
  React.ComponentRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'in--z-50 in--w-72 in--rounded-md in--border in--bg-popover in--p-4 in--text-popover-foreground in--shadow-md in--outline-none data-[state=open]:in--animate-in data-[state=closed]:in--animate-out data-[state=closed]:in--fade-out-0 data-[state=open]:in--fade-in-0 data-[state=closed]:in--zoom-out-95 data-[state=open]:in--zoom-in-95 data-[side=bottom]:in--slide-in-from-top-2 data-[side=left]:in--slide-in-from-right-2 data-[side=right]:in--slide-in-from-left-2 data-[side=top]:in--slide-in-from-bottom-2',
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent }
