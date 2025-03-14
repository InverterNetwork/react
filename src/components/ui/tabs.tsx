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

const TabsList = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
  ref?: React.RefObject<React.ComponentRef<typeof TabsPrimitive.List> | null>
}) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'in--inline-flex in--items-center in--justify-center in--rounded-lg in--bg-background in--p-1 in--text-muted-foreground in--border-input in--border',
      className
    )}
    {...props}
  />
)
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
  ref?: React.RefObject<React.ComponentRef<typeof TabsPrimitive.Trigger> | null>
}) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'in--inline-flex in--items-center in--justify-center in--whitespace-nowrap in--rounded-sm in--px-3 in--py-1.5 in--text-sm in--font-medium in--ring-offset-background in--transition-all focus-visible:in--outline-none focus-visible:in--ring-2 focus-visible:in--ring-ring focus-visible:in--ring-offset-2 disabled:in--pointer-events-none disabled:in--opacity-50',
      'data-[state=active]:in--bg-secondary hover:data-[state=active]:in--bg-secondary-hover active:data-[state=active]:in--bg-secondary-active',
      'data-[state=active]:in--text-secondary-foreground data-[state=active]:in--shadow-sm',
      'in--text-muted hover:data-[state=inactive]:in--text-foreground',
      className
    )}
    {...props}
  />
)
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> & {
  ref?: React.RefObject<React.ComponentRef<typeof TabsPrimitive.Content> | null>
}) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'in--mt-2 in--ring-offset-background focus-visible:in--outline-none focus-visible:in--ring-2 focus-visible:in--ring-ring focus-visible:in--ring-offset-2',
      className
    )}
    {...props}
  />
)
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
