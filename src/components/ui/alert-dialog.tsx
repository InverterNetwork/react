'use client'

import * as React from 'react'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'

import { cn } from '@/utils'
import { buttonVariants } from '@/components/ui/button'

const AlertDialog = AlertDialogPrimitive.Root

const AlertDialogTrigger = AlertDialogPrimitive.Trigger

const AlertDialogPortal = AlertDialogPrimitive.Portal

const AlertDialogOverlay = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay> & {
  ref?: React.RefObject<React.ElementRef<
    typeof AlertDialogPrimitive.Overlay
  > | null>
}) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      'in--fixed in--inset-0 in--z-50 in--bg-black/80 data-[state=open]:in--animate-in data-[state=closed]:in--animate-out data-[state=closed]:in--fade-out-0 data-[state=open]:in--fade-in-0',
      className
    )}
    {...props}
    ref={ref}
  />
)
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName

const AlertDialogContent = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content> & {
  ref?: React.RefObject<React.ElementRef<
    typeof AlertDialogPrimitive.Content
  > | null>
}) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        'in--fixed in--left-[50%] in--top-[50%] in--z-50 in--grid in--w-full in--max-w-lg in--translate-x-[-50%] in--translate-y-[-50%] in--gap-4 in--border in--bg-background in--p-6 in--shadow-lg in--duration-200 data-[state=open]:in--animate-in data-[state=closed]:in--animate-out data-[state=closed]:in--fade-out-0 data-[state=open]:in--fade-in-0 data-[state=closed]:in--zoom-out-95 data-[state=open]:in--zoom-in-95 data-[state=closed]:in--slide-out-to-left-1/2 data-[state=closed]:in--slide-out-to-top-[48%] data-[state=open]:in--slide-in-from-left-1/2 data-[state=open]:in--slide-in-from-top-[48%] sm:in--rounded-lg',
        className
      )}
      {...props}
    />
  </AlertDialogPortal>
)
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName

const AlertDialogHeader = ({
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
AlertDialogHeader.displayName = 'AlertDialogHeader'

const AlertDialogFooter = ({
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
AlertDialogFooter.displayName = 'AlertDialogFooter'

const AlertDialogTitle = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title> & {
  ref?: React.RefObject<React.ElementRef<
    typeof AlertDialogPrimitive.Title
  > | null>
}) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn('in--text-lg in--font-semibold', className)}
    {...props}
  />
)
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName

const AlertDialogDescription = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description> & {
  ref?: React.RefObject<React.ElementRef<
    typeof AlertDialogPrimitive.Description
  > | null>
}) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn('in--text-sm in--text-muted-foreground', className)}
    {...props}
  />
)
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName

const AlertDialogAction = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action> & {
  ref?: React.RefObject<React.ElementRef<
    typeof AlertDialogPrimitive.Action
  > | null>
}) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(buttonVariants(), className)}
    {...props}
  />
)
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName

const AlertDialogCancel = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel> & {
  ref?: React.RefObject<React.ElementRef<
    typeof AlertDialogPrimitive.Cancel
  > | null>
}) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(
      buttonVariants({ variant: 'outline' }),
      'in--mt-2 sm:in--mt-0',
      className
    )}
    {...props}
  />
)
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
