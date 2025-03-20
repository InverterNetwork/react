'use client'

import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'

import { cn } from '@/utils'

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = ({
  ref,
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
  ref?: React.RefObject<React.ElementRef<typeof SelectPrimitive.Trigger> | null>
}) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'in--flex in--h-10 in--w-full in--items-center in--justify-between in--rounded-md in--border in--border-input in--bg-background in--px-3 in--py-2 in--text-sm in--ring-offset-background placeholder:in--text-muted-foreground focus:in--outline-none focus:in--ring-2 focus:in--ring-ring focus:in--ring-offset-2 disabled:in--cursor-not-allowed disabled:in--opacity-50 [&>span]:in--line-clamp-1',
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="in--h-4 in--w-4 in--opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
)
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton> & {
  ref?: React.RefObject<React.ElementRef<
    typeof SelectPrimitive.ScrollUpButton
  > | null>
}) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      'in--flex in--cursor-default in--items-center in--justify-center in--py-1',
      className
    )}
    {...props}
  >
    <ChevronUp className="in--h-4 in--w-4" />
  </SelectPrimitive.ScrollUpButton>
)
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton> & {
  ref?: React.RefObject<React.ElementRef<
    typeof SelectPrimitive.ScrollDownButton
  > | null>
}) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      'in--flex in--cursor-default in--items-center in--justify-center in--py-1',
      className
    )}
    {...props}
  >
    <ChevronDown className="in--h-4 in--w-4" />
  </SelectPrimitive.ScrollDownButton>
)
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = ({
  ref,
  className,
  children,
  position = 'popper',
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & {
  ref?: React.RefObject<React.ElementRef<typeof SelectPrimitive.Content> | null>
}) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        'in--relative in--z-50 in--max-h-96 in--min-w-[8rem] in--overflow-hidden in--rounded-md in--border in--bg-popover in--text-popover-foreground in--shadow-md data-[state=open]:in--animate-in data-[state=closed]:in--animate-out data-[state=closed]:in--fade-out-0 data-[state=open]:in--fade-in-0 data-[state=closed]:in--zoom-out-95 data-[state=open]:in--zoom-in-95 data-[side=bottom]:in--slide-in-from-top-2 data-[side=left]:in--slide-in-from-right-2 data-[side=right]:in--slide-in-from-left-2 data-[side=top]:in--slide-in-from-bottom-2',
        position === 'popper' &&
          'data-[side=bottom]:in--translate-y-1 data-[side=left]:in---translate-x-1 data-[side=right]:in--translate-x-1 data-[side=top]:in---translate-y-1',
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          'in--p-1',
          position === 'popper' &&
            'in--h-[var(--radix-select-trigger-height)] in--w-full in--min-w-[var(--radix-select-trigger-width)]'
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
)
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label> & {
  ref?: React.RefObject<React.ElementRef<typeof SelectPrimitive.Label> | null>
}) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(
      'in--py-1.5 in--pl-8 in--pr-2 in--text-sm in--font-semibold',
      className
    )}
    {...props}
  />
)
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = ({
  ref,
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & {
  ref?: React.RefObject<React.ElementRef<typeof SelectPrimitive.Item> | null>
}) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'in--relative in--flex in--w-full in--cursor-default in--select-none in--items-center in--rounded-sm in--py-1.5 in--pl-8 in--pr-2 in--text-sm in--outline-none focus:in--bg-accent focus:in--text-accent-foreground data-[disabled]:in--pointer-events-none data-[disabled]:in--opacity-50',
      className
    )}
    {...props}
  >
    <span className="in--absolute in--left-2 in--flex in--h-3.5 in--w-3.5 in--items-center in--justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="in--h-4 in--w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
)
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator> & {
  ref?: React.RefObject<React.ElementRef<
    typeof SelectPrimitive.Separator
  > | null>
}) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('in---mx-1 in--my-1 in--h-px in--bg-muted', className)}
    {...props}
  />
)
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
