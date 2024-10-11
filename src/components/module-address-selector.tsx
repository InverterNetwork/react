'use client'

import * as React from 'react'

import { useIsHydrated } from '@/hooks'
import { useSelectorStore } from '@/store'
import { compressAddress, unixTimeToDisplay } from '@/utils'
import CreatableSelect from 'react-select/creatable'

export const ModuleAddressSelector = () => {
  const isHydrated = useIsHydrated()
  const { addAddress, moduleAddresses } = useSelectorStore()

  const options = moduleAddresses.map((i) => ({
    value: i.address,
    label: `${compressAddress(i.address)}, ${unixTimeToDisplay(new Date(i.date))}`,
  }))

  return (
    <CreatableSelect
      isClearable
      className="in--react-select-container"
      classNamePrefix="react-select"
      options={options}
      value={!isHydrated ? undefined : options[0]}
      onCreateOption={(e) => {
        addAddress({ address: e as `0x${string}`, type: 'module' })
      }}
      onChange={(e) => {
        addAddress({ address: e?.value, type: 'module' })
      }}
      placeholder="Select or create token address"
    />
  )
}
