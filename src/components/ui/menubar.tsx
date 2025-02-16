'use client'

import * as React from 'react'
import * as MenubarPrimitive from '@radix-ui/react-menubar'
import { Check, ChevronRight, Circle } from 'lucide-react'

import { cn } from '@/utils'

const MenubarMenu = MenubarPrimitive.Menu

const MenubarGroup = MenubarPrimitive.Group

const MenubarPortal = MenubarPrimitive.Portal

const MenubarSub = MenubarPrimitive.Sub

const MenubarRadioGroup = MenubarPrimitive.RadioGroup

const Menubar = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(
      'in--flex in--h-10 in--items-center in--space-x-1 in--rounded-md in--border in--bg-background in--p-1',
      className
    )}
    {...props}
  />
))
Menubar.displayName = MenubarPrimitive.Root.displayName

const MenubarTrigger = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      'in--flex in--cursor-default in--select-none in--items-center in--rounded-sm in--px-3 in--py-1.5 in--text-sm in--font-medium in--outline-none focus:in--bg-accent focus:in--text-accent-foreground data-[state=open]:in--bg-accent data-[state=open]:in--text-accent-foreground',
      className
    )}
    {...props}
  />
))
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName

const MenubarSubTrigger = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    className={cn(
      'in--flex in--cursor-default in--select-none in--items-center in--rounded-sm in--px-2 in--py-1.5 in--text-sm in--outline-none focus:in--bg-accent focus:in--text-accent-foreground data-[state=open]:in--bg-accent data-[state=open]:in--text-accent-foreground',
      inset && 'in--pl-8',
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="in--ml-auto in--h-4 in--w-4" />
  </MenubarPrimitive.SubTrigger>
))
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName

const MenubarSubContent = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
      'in--z-50 in--min-w-[8rem] in--overflow-hidden in--rounded-md in--border in--bg-popover in--p-1 in--text-popover-foreground data-[state=open]:in--animate-in data-[state=closed]:in--animate-out data-[state=closed]:in--fade-out-0 data-[state=open]:in--fade-in-0 data-[state=closed]:in--zoom-out-95 data-[state=open]:in--zoom-in-95 data-[side=bottom]:in--slide-in-from-top-2 data-[side=left]:in--slide-in-from-right-2 data-[side=right]:in--slide-in-from-left-2 data-[side=top]:in--slide-in-from-bottom-2',
      className
    )}
    {...props}
  />
))
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName

const MenubarContent = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(
  (
    { className, align = 'start', alignOffset = -4, sideOffset = 8, ...props },
    ref
  ) => (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          'in--z-50 in--min-w-[12rem] in--overflow-hidden in--rounded-md in--border in--bg-popover in--p-1 in--text-popover-foreground in--shadow-md data-[state=open]:in--animate-in data-[state=closed]:in--fade-out-0 data-[state=open]:in--fade-in-0 data-[state=closed]:in--zoom-out-95 data-[state=open]:in--zoom-in-95 data-[side=bottom]:in--slide-in-from-top-2 data-[side=left]:in--slide-in-from-right-2 data-[side=right]:in--slide-in-from-left-2 data-[side=top]:in--slide-in-from-bottom-2',
          className
        )}
        {...props}
      />
    </MenubarPrimitive.Portal>
  )
)
MenubarContent.displayName = MenubarPrimitive.Content.displayName

const MenubarItem = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn(
      'in--relative in--flex in--cursor-default in--select-none in--items-center in--rounded-sm in--px-2 in--py-1.5 in--text-sm in--outline-none focus:in--bg-accent focus:in--text-accent-foreground data-[disabled]:in--pointer-events-none data-[disabled]:in--opacity-50',
      inset && 'in--pl-8',
      className
    )}
    {...props}
  />
))
MenubarItem.displayName = MenubarPrimitive.Item.displayName

const MenubarCheckboxItem = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      'in--relative in--flex in--cursor-default in--select-none in--items-center in--rounded-sm in--py-1.5 in--pl-8 in--pr-2 in--text-sm in--outline-none focus:in--bg-accent focus:in--text-accent-foreground data-[disabled]:in--pointer-events-none data-[disabled]:in--opacity-50',
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="in--absolute in--left-2 in--flex in--h-3.5 in--w-3.5 in--items-center in--justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Check className="in--h-4 in--w-4" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
))
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName

const MenubarRadioItem = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(
      'in--relative in--flex in--cursor-default in--select-none in--items-center in--rounded-sm in--py-1.5 in--pl-8 in--pr-2 in--text-sm in--outline-none focus:in--bg-accent focus:in--text-accent-foreground data-[disabled]:in--pointer-events-none data-[disabled]:in--opacity-50',
      className
    )}
    {...props}
  >
    <span className="in--absolute in--left-2 in--flex in--h-3.5 in--w-3.5 in--items-center in--justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Circle className="in--h-2 in--w-2 in--fill-current" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
))
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName

const MenubarLabel = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn(
      'in--px-2 in--py-1.5 in--text-sm in--font-semibold',
      inset && 'in--pl-8',
      className
    )}
    {...props}
  />
))
MenubarLabel.displayName = MenubarPrimitive.Label.displayName

const MenubarSeparator = React.forwardRef<
  React.ComponentRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn('in---mx-1 in--my-1 in--h-px in--bg-muted', className)}
    {...props}
  />
))
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName

const MenubarShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        'in--ml-auto in--text-xs in--tracking-widest in--text-muted-foreground',
        className
      )}
      {...props}
    />
  )
}
MenubarShortcut.displayname = 'MenubarShortcut'

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
}
