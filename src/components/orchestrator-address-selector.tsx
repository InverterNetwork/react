'use client'

import * as React from 'react'

import { useSelectorStore } from '@/store'
import { unixTimeToDisplay, compressAddress, cn } from '@/utils'
import { useId } from 'react'
import CreatableSelect from 'react-select/creatable'

export const OrchestratorAddressSelector = ({
  className,
  menuPlacement,
}: {
  className?: string
  menuPlacement?: 'auto' | 'bottom' | 'top'
}) => {
  const { orchestratorAddresses, addAddress } = useSelectorStore()
  const selectId = useId()

  const options = orchestratorAddresses.map((i) => ({
    value: i.address,
    label: `${compressAddress(i.address)}, ${unixTimeToDisplay(new Date(i.date))}`,
  }))

  return (
    <CreatableSelect
      isClearable
      menuPlacement={menuPlacement}
      className={cn('in--react-select-container', className)}
      classNamePrefix="react-select"
      options={options}
      value={options[0]}
      onCreateOption={(e) => {
        addAddress({ address: e as `0x${string}`, type: 'orchestrator' })
      }}
      onChange={(e) => {
        addAddress({ address: e?.value, type: 'orchestrator' })
      }}
      placeholder="Select or create an orchestrator"
      instanceId={selectId}
    />
  )
}
