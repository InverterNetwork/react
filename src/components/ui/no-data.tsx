import { cn } from '@/utils'
import { Database } from 'lucide-react'
import * as React from 'react'

export function NoData({
  inline = false,
  text = 'No Data',
  className,
}: {
  inline?: boolean
  text?: string
  className?: string
}) {
  if (inline)
    return (
      <div
        className={cn(
          'in--flex in--justify-center in--items-center in--gap-3 in--m-auto',
          className
        )}
      >
        <Database size={20} />
        <p>{text}</p>
      </div>
    )

  return (
    <div
      className={cn(
        'in--flex in--flex-col md:in--flex-row in--justify-center in--items-center in--gap-3 in--p-5 in--m-auto',
        className
      )}
    >
      <Database size={50} className="in--min-w-max" />
      <h3 className="in--text-center md:in--text-right">{text}</h3>
    </div>
  )
}
