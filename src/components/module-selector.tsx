'use client'

import * as React from 'react'

import { useIsHydrated } from '@/hooks'
import ReactSelect from 'react-select'
import { data } from '@inverter-network/abis'
import { prettyName } from '@/utils'

export const ModuleSelector = ({
  setName,
  name,
}: {
  setName: (name: any) => void
  name: string
}) => {
  const isHydrated = useIsHydrated()

  const options = data.map((i) => ({
    value: i.name,
    label: prettyName(i.name),
  }))

  return (
    <ReactSelect
      className="in--react-select-container"
      classNamePrefix="react-select"
      options={options}
      value={
        !isHydrated
          ? undefined
          : {
              value: name,
              label: prettyName(name),
            }
      }
      onChange={(e) => {
        if (e?.value) setName(e.value)
      }}
      placeholder="Select a module..."
    />
  )
}
