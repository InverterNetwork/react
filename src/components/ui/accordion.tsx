'use client'

import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'

import { cn } from '@/utils'

const Accordion = AccordionPrimitive.Root

const AccordionItem = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> & {
  ref?: React.RefObject<React.ElementRef<typeof AccordionPrimitive.Item> | null>
}) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn('in--border-b', className)}
    {...props}
  />
)
AccordionItem.displayName = 'AccordionItem'

const AccordionTrigger = ({
  ref,
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
  ref?: React.RefObject<React.ElementRef<
    typeof AccordionPrimitive.Trigger
  > | null>
}) => (
  <AccordionPrimitive.Header className="in--flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'in--flex in--flex-1 in--items-center in--justify-between in--py-4 in--font-medium in--transition-all hover:in--underline [&[data-state=open]>svg]:in--rotate-180',
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="in--h-4 in--w-4 in--shrink-0 in--transition-transform in--duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
)
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = ({
  ref,
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> & {
  ref?: React.RefObject<React.ElementRef<
    typeof AccordionPrimitive.Content
  > | null>
}) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="in--overflow-hidden in--text-sm in--transition-all data-[state=closed]:in--animate-accordion-up data-[state=open]:in--animate-accordion-down"
    {...props}
  >
    <div className={cn('in--pb-4 in--pt-0', className)}>{children}</div>
  </AccordionPrimitive.Content>
)

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
