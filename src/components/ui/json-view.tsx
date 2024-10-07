'use client'

import { cn } from '@/utils'

import * as React from 'react'
import {
  JsonView as JsonViewOrg,
  allExpanded,
  defaultStyles,
} from 'react-json-view-lite'

export const JsonView = ({
  json,
  className,
}: {
  json: any
  className?: string
}) => {
  return (
    <div className={cn(className, 'in--rounded-sm')}>
      <JsonViewOrg
        data={json}
        shouldExpandNode={allExpanded}
        style={defaultStyles}
      />
    </div>
  )
}
