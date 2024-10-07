'use client'

import * as React from 'react'
import * as SheetPrimitive from '@radix-ui/react-dialog'
import { cva, type VariantProps } from 'class-variance-authority'
import { X } from 'lucide-react'

import { cn } from '@/utils'

const Sheet = SheetPrimitive.Root

const SheetTrigger = SheetPrimitive.Trigger

const SheetClose = SheetPrimitive.Close

const SheetPortal = SheetPrimitive.Portal

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      'in--fixed in--inset-0 in--z-50 in--bg-black/80 in-- data-[state=open]:in--animate-in data-[state=closed]:in--animate-out data-[state=closed]:in--fade-out-0 data-[state=open]:in--fade-in-0',
      className
    )}
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

const sheetVariants = cva(
  'in--fixed in--z-50 in--gap-4 in--bg-background in--p-6 in--shadow-lg in--transition in--ease-in-out data-[state=open]:in--animate-in data-[state=closed]:in--animate-out data-[state=closed]:in--duration-300 data-[state=open]:in--duration-500',
  {
    variants: {
      side: {
        top: 'in--inset-x-0 in--top-0 in--border-b data-[state=closed]:in--slide-out-to-top data-[state=open]:in--slide-in-from-top',
        bottom:
          'in--inset-x-0 in--bottom-0 in--border-t data-[state=closed]:in--slide-out-to-bottom data-[state=open]:in--slide-in-from-bottom',
        left: 'in--inset-y-0 in--left-0 in--h-full in--w-3/4 in--border-r data-[state=closed]:in--slide-out-to-left data-[state=open]:in--slide-in-from-left sm:in--max-w-sm',
        right:
          'in--inset-y-0 in--right-0 in--h-full in--w-3/4 in-- in--border-l data-[state=closed]:in--slide-out-to-right data-[state=open]:in--slide-in-from-right sm:in--max-w-sm',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  }
)

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = 'right', className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {children}
      <SheetPrimitive.Close className="in--absolute in--right-4 in--top-4 in--rounded-sm in--opacity-70 in--ring-offset-background in--transition-opacity hover:in--opacity-100 focus:in--outline-none focus:in--ring-2 focus:in--ring-ring focus:in--ring-offset-2 disabled:in--pointer-events-none data-[state=open]:in--bg-secondary">
        <X className="in--h-4 in--w-4" />
        <span className="in--sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'in--flex in--flex-col in--space-y-2 in--text-center sm:in--text-left',
      className
    )}
    {...props}
  />
)
SheetHeader.displayName = 'SheetHeader'

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'in--flex in--flex-col-reverse sm:in--flex-row sm:in--justify-end sm:in--space-x-2',
      className
    )}
    {...props}
  />
)
SheetFooter.displayName = 'SheetFooter'

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn(
      'in--text-lg in--font-semibold in--text-foreground',
      className
    )}
    {...props}
  />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn('in--text-sm in--text-muted-foreground', className)}
    {...props}
  />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
