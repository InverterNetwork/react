'use client'

import * as React from 'react'
import { Drawer as DrawerPrimitive } from 'vaul'

import { cn } from '@/utils'

const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
)
Drawer.displayName = 'Drawer'

const DrawerTrigger = DrawerPrimitive.Trigger

const DrawerPortal = DrawerPrimitive.Portal

const DrawerClose = DrawerPrimitive.Close

const DrawerOverlay = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay> & {
  ref?: React.RefObject<React.ElementRef<typeof DrawerPrimitive.Overlay> | null>
}) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn('in--fixed in--inset-0 in--z-50 in--bg-black/80', className)}
    {...props}
  />
)
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName

const DrawerContent = ({
  ref,
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content> & {
  ref?: React.RefObject<React.ElementRef<typeof DrawerPrimitive.Content> | null>
}) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        'in--fixed in--inset-x-0 in--bottom-0 in--z-50 in--mt-24 in--flex in--h-auto in--flex-col in--rounded-t-[10px] in--border in--bg-background',
        className
      )}
      {...props}
    >
      <div className="in--mx-auto in--mt-4 in--h-2 in--w-[100px] in--rounded-full in--bg-muted" />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
)
DrawerContent.displayName = 'DrawerContent'

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'in--grid in--gap-1.5 in--p-4 in--text-center sm:in--text-left',
      className
    )}
    {...props}
  />
)
DrawerHeader.displayName = 'DrawerHeader'

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'in--mt-auto in--flex in--flex-col in--gap-2 in--p-4',
      className
    )}
    {...props}
  />
)
DrawerFooter.displayName = 'DrawerFooter'

const DrawerTitle = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title> & {
  ref?: React.RefObject<React.ElementRef<typeof DrawerPrimitive.Title> | null>
}) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      'in--text-lg in--font-semibold in--leading-none in--tracking-tight',
      className
    )}
    {...props}
  />
)
DrawerTitle.displayName = DrawerPrimitive.Title.displayName

const DrawerDescription = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description> & {
  ref?: React.RefObject<React.ElementRef<
    typeof DrawerPrimitive.Description
  > | null>
}) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn('in--text-sm in--text-muted-foreground', className)}
    {...props}
  />
)
DrawerDescription.displayName = DrawerPrimitive.Description.displayName

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
