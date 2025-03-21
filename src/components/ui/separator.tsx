'use client'

import * as React from 'react'
import * as SeparatorPrimitive from '@radix-ui/react-separator'

import { cn } from '@/utils'

const Separator = ({
  ref,
  className,
  orientation = 'horizontal',
  decorative = true,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> & {
  ref?: React.RefObject<React.ElementRef<typeof SeparatorPrimitive.Root> | null>
}) => {
  const baseClassName = cn(
    'in--shrink-0 in--bg-border',
    orientation === 'horizontal'
      ? 'in--h-[1px] in--w-full'
      : 'in--h-full in--w-[1px]'
  )

  const baseProps = {
    ref,
    decorative,
    orientation,
    ...props,
  }

  if (children) {
    return (
      <div
        className={cn(
          'in--flex in--items-center in--gap-4 in--my-3',
          className
        )}
      >
        <SeparatorPrimitive.Root
          className={cn(baseClassName, children && 'in--flex-1')}
          {...baseProps}
        />
        {children}
        <SeparatorPrimitive.Root
          className={cn(baseClassName, children && 'in--flex-1')}
          {...baseProps}
        />
      </div>
    )
  }

  return (
    <SeparatorPrimitive.Root
      className={cn(baseClassName, className)}
      {...baseProps}
    />
  )
}
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
