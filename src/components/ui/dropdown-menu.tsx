'use client'

import * as React from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { Check, ChevronRight, Circle } from 'lucide-react'

import { cn } from '@/utils'

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      'in--flex in--cursor-default in--select-none in--items-center in--rounded-sm in--px-2 in--py-1.5 in--text-sm in--outline-none focus:in--bg-accent data-[state=open]:in--bg-accent',
      inset && 'in--pl-8',
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="in--ml-auto in--h-4 in--w-4" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      'in--z-50 in--min-w-[8rem] in--overflow-hidden in--rounded-md in--border in--bg-popover in--p-1 in--text-popover-foreground in--shadow-lg data-[state=open]:in--animate-in data-[state=closed]:in--animate-out data-[state=closed]:in--fade-out-0 data-[state=open]:in--fade-in-0 data-[state=closed]:in--zoom-out-95 data-[state=open]:in--zoom-in-95 data-[side=bottom]:in--slide-in-from-top-2 data-[side=left]:in--slide-in-from-right-2 data-[side=right]:in--slide-in-from-left-2 data-[side=top]:in--slide-in-from-bottom-2',
      className
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'in--z-50 in--min-w-[8rem] in--overflow-hidden in--rounded-md in--border in--bg-popover in--p-1 in--text-popover-foreground in--shadow-md data-[state=open]:in--animate-in data-[state=closed]:in--animate-out data-[state=closed]:in--fade-out-0 data-[state=open]:in--fade-in-0 data-[state=closed]:in--zoom-out-95 data-[state=open]:in--zoom-in-95 data-[side=bottom]:in--slide-in-from-top-2 data-[side=left]:in--slide-in-from-right-2 data-[side=right]:in--slide-in-from-left-2 data-[side=top]:in--slide-in-from-bottom-2',
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      'in--relative in--flex in--cursor-default in--select-none in--items-center in--rounded-sm in--px-2 in--py-1.5 in--text-sm in--outline-none in--transition-colors focus:in--bg-accent focus:in--text-accent-foreground data-[disabled]:in--pointer-events-none data-[disabled]:in--opacity-50',
      inset && 'in--pl-8',
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      'in--relative in--flex in--cursor-default in--select-none in--items-center in--rounded-sm in--py-1.5 in--pl-8 in--pr-2 in--text-sm in--outline-none in--transition-colors focus:in--bg-accent focus:in--text-accent-foreground data-[disabled]:in--pointer-events-none data-[disabled]:in--opacity-50',
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="in--absolute in--left-2 in--flex in--h-3.5 in--w-3.5 in--items-center in--justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="in--h-4 in--w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      'in--relative in--flex in--cursor-default in--select-none in--items-center in--rounded-sm in--py-1.5 in--pl-8 in--pr-2 in--text-sm in--outline-none in--transition-colors focus:in--bg-accent focus:in--text-accent-foreground data-[disabled]:in--pointer-events-none data-[disabled]:in--opacity-50',
      className
    )}
    {...props}
  >
    <span className="in--absolute in--left-2 in--flex in--h-3.5 in--w-3.5 in--items-center in--justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="in--h-2 in--w-2 in--fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      'in--px-2 in--py-1.5 in--text-sm in--font-semibold',
      inset && 'in--pl-8',
      className
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn('in---mx-1 in--my-1 in--h-px in--bg-muted', className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        'in--ml-auto in--text-xs in--tracking-widest in--opacity-60',
        className
      )}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut'

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}
