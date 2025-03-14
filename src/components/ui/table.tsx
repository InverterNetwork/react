import * as React from 'react'

import { cn } from '@/utils'

const Table = ({
  ref,
  className,
  ...props
}: React.HTMLAttributes<HTMLTableElement> & {
  ref?: React.RefObject<HTMLTableElement | null>
}) => (
  <div className="in--relative in--w-full in--overflow-auto">
    <table
      ref={ref}
      className={cn(' in--w-full in--caption-bottom in--text-sm', className)}
      {...props}
    />
  </div>
)
Table.displayName = 'Table'

const TableHeader = ({
  ref,
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement> & {
  ref?: React.RefObject<HTMLTableSectionElement | null>
}) => (
  <thead
    ref={ref}
    className={cn('[&_tr]:in--border-b', className)}
    {...props}
  />
)
TableHeader.displayName = 'TableHeader'

const TableBody = ({
  ref,
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement> & {
  ref?: React.RefObject<HTMLTableSectionElement | null>
}) => (
  <tbody
    ref={ref}
    className={cn('[&_tr:last-child]:in--border-0', className)}
    {...props}
  />
)
TableBody.displayName = 'TableBody'

const TableFooter = ({
  ref,
  className,
  ...props
}: React.HTMLAttributes<HTMLTableSectionElement> & {
  ref?: React.RefObject<HTMLTableSectionElement | null>
}) => (
  <tfoot
    ref={ref}
    className={cn(
      'in--border-t in--bg-muted/50 in--font-medium [&>tr]:last:in--border-b-0',
      className
    )}
    {...props}
  />
)
TableFooter.displayName = 'TableFooter'

const TableRow = ({
  ref,
  className,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement> & {
  ref?: React.RefObject<HTMLTableRowElement | null>
}) => (
  <tr
    ref={ref}
    className={cn(
      'in--border-b in--transition-colors hover:in--bg-accent data-[state=selected]:in--bg-muted',
      className
    )}
    {...props}
  />
)
TableRow.displayName = 'TableRow'

const TableHead = ({
  ref,
  className,
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement> & {
  ref?: React.RefObject<HTMLTableCellElement | null>
}) => (
  <th
    ref={ref}
    className={cn(
      'in--h-12 in--px-4 in--text-left in--align-middle in--font-medium in--text-muted [&:has([role=checkbox])]:in--pr-0',
      className
    )}
    {...props}
  />
)
TableHead.displayName = 'TableHead'

const TableCell = ({
  ref,
  className,
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement> & {
  ref?: React.RefObject<HTMLTableCellElement | null>
}) => (
  <td
    ref={ref}
    className={cn(
      'in--p-4 in--align-middle [&:has([role=checkbox])]:in--pr-0',
      className
    )}
    {...props}
  />
)
TableCell.displayName = 'TableCell'

const TableCaption = ({
  ref,
  className,
  ...props
}: React.HTMLAttributes<HTMLTableCaptionElement> & {
  ref?: React.RefObject<HTMLTableCaptionElement | null>
}) => (
  <caption
    ref={ref}
    className={cn('in--mt-4 in--text-sm in--text-muted-foreground', className)}
    {...props}
  />
)
TableCaption.displayName = 'TableCaption'

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
