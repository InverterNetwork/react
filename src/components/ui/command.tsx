'use client'

import * as React from 'react'
import type { DialogProps } from '@radix-ui/react-dialog'
import { Command as CommandPrimitive } from 'cmdk'
import { Search } from 'lucide-react'

import { cn } from '@/utils'
import { Dialog, DialogContent } from '@/components/ui/dialog'

const Command = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      'in--flex in--h-full in--w-full in--flex-col in--overflow-hidden in--rounded-md in--bg-popover in--text-popover-foreground',
      className
    )}
    {...props}
  />
))
Command.displayName = CommandPrimitive.displayName

interface CommandDialogProps extends DialogProps {}

const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="in--overflow-hidden in--p-0 in--shadow-lg">
        <Command className="[&_[cmdk-group-heading]]:in--px-2 [&_[cmdk-group-heading]]:in--font-medium [&_[cmdk-group-heading]]:in--text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:in--pt-0 [&_[cmdk-group]]:in--px-2 [&_[cmdk-input-wrapper]_svg]:in--h-5 [&_[cmdk-input-wrapper]_svg]:in--w-5 [&_[cmdk-input]]:in--h-12 [&_[cmdk-item]]:in--px-2 [&_[cmdk-item]]:in--py-3 [&_[cmdk-item]_svg]:in--h-5 [&_[cmdk-item]_svg]:in--w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

const CommandInput = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div
    className="in--flex in--items-center in--border-b in--px-3"
    cmdk-input-wrapper=""
  >
    <Search className="in--mr-2 in--h-4 in--w-4 in--shrink-0 in--opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        'in--flex in--h-11 in--w-full in--rounded-md in--bg-transparent in--py-3 in--text-sm in--outline-none placeholder:in--text-muted-foreground disabled:in--cursor-not-allowed disabled:in--opacity-50',
        className
      )}
      {...props}
    />
  </div>
))

CommandInput.displayName = CommandPrimitive.Input.displayName

const CommandList = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn(
      'in--max-h-[300px] in--overflow-y-auto in--overflow-x-hidden',
      className
    )}
    {...props}
  />
))

CommandList.displayName = CommandPrimitive.List.displayName

const CommandEmpty = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="in--py-6 in--text-center in--text-sm"
    {...props}
  />
))

CommandEmpty.displayName = CommandPrimitive.Empty.displayName

const CommandGroup = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      'in--overflow-hidden in--p-1 in--text-foreground [&_[cmdk-group-heading]]:in--px-2 [&_[cmdk-group-heading]]:in--py-1.5 [&_[cmdk-group-heading]]:in--text-xs [&_[cmdk-group-heading]]:in--font-medium [&_[cmdk-group-heading]]:in--text-muted-foreground',
      className
    )}
    {...props}
  />
))

CommandGroup.displayName = CommandPrimitive.Group.displayName

const CommandSeparator = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn('in---mx-1 in--h-px in--bg-border', className)}
    {...props}
  />
))
CommandSeparator.displayName = CommandPrimitive.Separator.displayName

const CommandItem = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      'in--relative in--flex in--cursor-default in--select-none in--items-center in--rounded-sm in--px-2 in--py-1.5 in--text-sm in--outline-none data-[disabled=true]:in--pointer-events-none data-[selected=true]:in--bg-accent data-[selected=true]:in--text-accent-foreground data-[disabled=true]:in--opacity-50',
      className
    )}
    {...props}
  />
))

CommandItem.displayName = CommandPrimitive.Item.displayName

const CommandShortcut = ({
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
CommandShortcut.displayName = 'CommandShortcut'

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
