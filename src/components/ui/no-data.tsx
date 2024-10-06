import { Database } from 'lucide-react'
import * as React from 'react'

export function NoData({
  inline = false,
  text = 'No Data',
}: {
  inline?: boolean
  text?: string
}) {
  if (inline)
    return (
      <div className="flex justify-center items-center gap-3 m-auto">
        <Database size={20} />
        <p>{text}</p>
      </div>
    )

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-3 p-5 m-auto">
      <Database size={50} className="min-w-max" />
      <h3 className="text-center md:text-right">{text}</h3>
    </div>
  )
}
