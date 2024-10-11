'use client'

import * as React from 'react'

import { useOrchestratorStore } from '@/store'
import { unixTimeToDisplay, compressAddress, cn } from '@/utils'
import { useId } from 'react'
import CreatableSelect from 'react-select/creatable'

export const OrchestratorSelector = ({
  className,
  menuPlacement,
}: {
  className?: string
  menuPlacement?: 'auto' | 'bottom' | 'top'
}) => {
  const { orchestrators, addOrchestrator } = useOrchestratorStore()
  const selectId = useId()

  const options = orchestrators.map((i) => ({
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
        addOrchestrator(e as `0x${string}`)
      }}
      onChange={(e) => {
        addOrchestrator(e?.value)
      }}
      placeholder="Select or create an orchestrator"
      instanceId={selectId}
    />
  )
}
