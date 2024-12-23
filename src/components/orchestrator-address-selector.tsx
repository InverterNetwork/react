'use client'

import * as React from 'react'

import { useIsHydrated } from '@/hooks'
import { useSelectorStore } from '@/store'
import { cn } from '@/utils'
import CreatableSelect from 'react-select/creatable'
import { compressAddress, dateToDisplay } from '@inverter-network/sdk'

export const OrchestratorAddressSelector = ({
  className,
  menuPlacement,
}: {
  className?: string
  menuPlacement?: 'auto' | 'bottom' | 'top'
}) => {
  const isHydrated = useIsHydrated()
  const { addAddress, getAddresses } = useSelectorStore()
  const selectId = React.useId()

  const options = getAddresses('orchestrator').map((i) => ({
    value: `${i.chainId}-${i.address}`,
    data: i,
  }))

  return (
    <CreatableSelect
      instanceId={selectId}
      isClearable
      menuPlacement={menuPlacement}
      className={cn('in--react-select-container', className)}
      classNamePrefix="react-select"
      options={options}
      value={!isHydrated ? undefined : options[0]}
      onCreateOption={(e) => {
        addAddress({ address: e as `0x${string}`, type: 'orchestrator' })
      }}
      onChange={(e) => {
        addAddress({ address: e?.data.address, type: 'orchestrator' })
      }}
      placeholder="Select or create orchestrator address"
      formatOptionLabel={(i, { context }) => {
        if (!i.data) return `Create "${i.value}"`

        if (context === 'value') return compressAddress(i.data.address)

        return (
          <ul className="in--list-disc">
            {i.data?.title && (
              <li>
                <b>Title:</b> {i.data.title}
              </li>
            )}
            <li>
              <b>Address:</b> {compressAddress(i.data.address)}
            </li>
            <li>
              <b>Date:</b> {dateToDisplay(new Date(i.data.date))}
            </li>
            {i.data?.chainId && (
              <li>
                <b>Chain Id:</b> {i.data.chainId}
              </li>
            )}
          </ul>
        )
      }}
    />
  )
}
