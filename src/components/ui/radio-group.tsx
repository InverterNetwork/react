'use client'

import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { Circle } from 'lucide-react'

import { cn } from '@/utils'

const RadioGroup = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> & {
  ref?: React.RefObject<React.ElementRef<
    typeof RadioGroupPrimitive.Root
  > | null>
}) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn('in--grid in--gap-2', className)}
      {...props}
      ref={ref}
    />
  )
}
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
  ref?: React.RefObject<React.ElementRef<
    typeof RadioGroupPrimitive.Item
  > | null>
}) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'in--aspect-square in--h-4 in--w-4 in--rounded-full in--border in--border-primary in--text-primary in--ring-offset-background focus:in--outline-none focus-visible:in--ring-2 focus-visible:in--ring-ring focus-visible:in--ring-offset-2 disabled:in--cursor-not-allowed disabled:in--opacity-50',
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="in--flex in--items-center in--justify-center">
        <Circle className="in--h-2.5 in--w-2.5 in--fill-current in--text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
