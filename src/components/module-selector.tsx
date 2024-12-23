'use client'

import * as React from 'react'

import { useIsHydrated } from '@/hooks'
import ReactSelect from 'react-select'
import { data } from '@inverter-network/abis'
import { getPrettyModuleName } from '@inverter-network/sdk'

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
    label: getPrettyModuleName(i.name),
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
              label: getPrettyModuleName(name),
            }
      }
      onChange={(e) => {
        if (e?.value) setName(e.value)
      }}
      placeholder="Select a module..."
    />
  )
}
