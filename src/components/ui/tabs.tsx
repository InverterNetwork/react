'use client'

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'

import { cn } from '@/utils'

const Tabs = ({
  responsive,
  ...props
}: TabsPrimitive.TabsProps & { responsive?: boolean }) => {
  return (
    <TabsPrimitive.Root
      className={cn(
        responsive
          ? '[&_[role="tablist"]]:in--w-full [&_[role="tablist"]]:in--flex-wrap [&_[role="tablist"]]:in--h-max'
          : '[&_[role="tablist"]]:in--h-10',
        responsive && '[&_[role="tab"]]:in--flex-1',
        props?.className
      )}
      {...props}
    />
  )
}
Tabs.displayName = TabsPrimitive.Root.displayName

const TabsList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'in--inline-flex in--items-center in--justify-center in--rounded-md in--bg-muted in--p-1 in--text-muted-foreground',
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'in--inline-flex in--items-center in--justify-center in--whitespace-nowrap in--rounded-sm in--px-3 in--py-1.5 in--text-sm in--font-medium in--ring-offset-background in--transition-all focus-visible:in--outline-none focus-visible:in--ring-2 focus-visible:in--ring-ring focus-visible:in--ring-offset-2 disabled:in--pointer-events-none disabled:in--opacity-50 data-[state=active]:in--bg-background data-[state=active]:in--text-foreground data-[state=active]:in--shadow-sm',
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'in--mt-2 in--ring-offset-background focus-visible:in--outline-none focus-visible:in--ring-2 focus-visible:in--ring-ring focus-visible:in--ring-offset-2',
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
