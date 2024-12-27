import * as React from 'react'
import { cn } from '@/utils'
import { Database } from 'lucide-react'

export function NoData({
  inline = false,
  text,
  className,
  orientation = 'vertical',
}: {
  inline?: boolean
  text?: string
  className?: string
  orientation?: 'vertical' | 'horizontal'
}) {
  return (
    <div
      className={cn(
        'in--justify-center in--items-center in--gap-3',
        inline ? 'in--inline-flex' : 'in--flex in--flex-col ',
        orientation === undefined && 'md:in--flex-row',
        orientation === 'horizontal' && 'in--flex-row',
        orientation === 'vertical' && 'in--flex-col',
        className
      )}
    >
      <Database size={inline ? 20 : 50} className="in--min-w-max" />
      {!!text && (
        <p className={cn(inline ? '' : 'in--font-semibold')}>{text}</p>
      )}
    </div>
  )
}
