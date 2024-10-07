'use client'

import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DayPicker } from 'react-day-picker'

import { cn } from '@/utils'
import { buttonVariants } from '@/components/ui/button'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('in--p-3', className)}
      classNames={{
        months:
          'in--flex in--flex-col sm:in--flex-row in--space-y-4 sm:in--space-x-4 sm:in--space-y-0',
        month: 'in--space-y-4',
        caption:
          'in--flex in--justify-center in--pt-1 in--relative in--items-center',
        caption_label: 'in--text-sm in--font-medium',
        nav: 'in--space-x-1 in--flex in--items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'in--h-7 in--w-7 in--bg-transparent in--p-0 in--opacity-50 hover:in--opacity-100'
        ),
        nav_button_previous: 'in--absolute in--left-1',
        nav_button_next: 'in--absolute in--right-1',
        table: 'in--w-full in--border-collapse in--space-y-1',
        head_row: 'in--flex',
        head_cell:
          'in--text-muted-foreground in--rounded-md in--w-9 in--font-normal in--text-[0.8rem]',
        row: 'in--flex in--w-full in--mt-2',
        cell: 'in--h-9 in--w-9 in--text-center in--text-sm in--p-0 in--relative [&:has([aria-selected].day-range-end)]:in--rounded-r-md [&:has([aria-selected].day-outside)]:in--bg-accent/50 [&:has([aria-selected])]:in--bg-accent first:[&:has([aria-selected])]:in--rounded-l-md last:[&:has([aria-selected])]:in--rounded-r-md focus-within:in--relative focus-within:in--z-20',
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'in--h-9 in--w-9 in--p-0 in--font-normal aria-selected:in--opacity-100'
        ),
        day_range_end: 'in--day-range-end',
        day_selected:
          'in--bg-primary in--text-primary-foreground hover:in--bg-primary hover:in--text-primary-foreground focus:in--bg-primary focus:in--text-primary-foreground',
        day_today: 'in--bg-accent in--text-accent-foreground',
        day_outside:
          'in--day-outside in--text-muted-foreground in--opacity-50 aria-selected:in--bg-accent/50 aria-selected:in--text-muted-foreground aria-selected:in--opacity-30',
        day_disabled: 'in--text-muted-foreground in--opacity-50',
        day_range_middle:
          'aria-selected:in--bg-accent aria-selected:in--text-accent-foreground',
        day_hidden: 'in--invisible',
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="in--h-4 in--w-4" />,
        IconRight: ({ ...props }) => (
          <ChevronRight className="in--h-4 in--w-4" />
        ),
      }}
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

export { Calendar }
