'use client'

import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'

import { cn } from '@/utils'

const Checkbox = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
  ref?: React.RefObject<React.ElementRef<typeof CheckboxPrimitive.Root> | null>
}) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'in--peer in--h-4 in--w-4 in--shrink-0 in--rounded-sm in--border in--border-input hover:in--border-input-hover focus:in--outline-ring focus:in--ring-ring focus:in--ring-offset-2 in--ring-offset-background focus-visible:in--outline-none focus-visible:in--ring-2 focus-visible:in--ring-ring focus-visible:in--ring-offset-2 disabled:in--cursor-not-allowed disabled:in--opacity-50 data-[state=checked]:in--bg-primary data-[state=checked]:in--text-primary-foreground',
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn(
        'in--flex in--items-center in--justify-center in--text-current'
      )}
    >
      <Check className="in--h-4 in--w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
)
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
