'use client'

import { useModuleInteractionStore } from '@/store'
import type { GetModuleReturnType } from '@inverter-network/sdk'

/**
 * @description The return type of the use module interaction hook
 * @returns The use module interaction hook
 */
export type UseModuleInteractionReturnType = ReturnType<
  typeof useModuleInteraction
>

/**
 * @description The use module interaction hook
 * @param selectedModule - The selected module
 * @returns The use module interaction hook
 */
export const useModuleInteraction = (
  selectedModule: GetModuleReturnType<any, any> | undefined
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
