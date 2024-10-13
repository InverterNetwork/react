'use client'

import { useModuleInteractionStore } from '@/store'
import type { GetModuleReturn } from '@inverter-network/sdk'

export const useModuleInteraction = (
  selectedModule: GetModuleReturn<any, any> | undefined
) => {
  const {
    moduleInteractionMode,
    setModuleInteractionMode,
    moduleInteractionState,
    ...rest
  } = useModuleInteractionStore()

  // select the entries of the selectedModule, by read or write
  const selectedEntries = Object.entries(
    selectedModule?.[moduleInteractionMode] || {}
  )

  // filter the selectedEntries to exclude some internal entries
  const filterSelectedEntries = selectedEntries.filter(([name]) => {
    if (name === 'init') return false
    return true
  })

  // select the interactionModuleState by selectedModule
  const interactionModuleState = (() => {
    if (!selectedModule) return []
    return moduleInteractionState[selectedModule.name] || []
  })()

  return {
    selectedModule,
    moduleInteractionMode,
    setModuleInteractionMode,
    filterSelectedEntries,
    interactionModuleState,
    ...rest,
  }
}

export type UseModuleInteractionReturn = ReturnType<typeof useModuleInteraction>
