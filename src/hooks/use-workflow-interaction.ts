'use client'

import { useModuleInteractionStore } from '@/store'
import type { ModuleInteractionMode, SelectedModuleType } from '@/types'
import type { GetModuleReturnType } from '@inverter-network/sdk'

import type { UseWorkFlowReturnType } from '@/hooks/use-workflow'

/**
 * @description The return type of the use workflow interaction hook
 * @returns The use workflow interaction hook
 */
export type UseWorkflowInteractionReturnType = {
  selectedModule: GetModuleReturnType<never, any, any> | undefined
  moduleInteractionMode: ModuleInteractionMode
  selectedModuleType: SelectedModuleType
  selectedOptionalModuleIndex: number
  selectedOptionalModule: GetModuleReturnType<never, any, any> | undefined
  optionalModulekeys: string[] | undefined
  setOptionalModule: (index: number) => void
}

/**
 * @description The use workflow interaction hook
 * @param workflow - The workflow
 * @returns The use workflow interaction hook
 */
export const useWorkflowInteraction = (
  workflow: UseWorkFlowReturnType
): UseWorkflowInteractionReturnType => {
  const {
    selectedModuleType,
    moduleInteractionMode,
    selectedOptionalModuleIndex,
    setSelectedOptionalModuleIndex,
  } = useModuleInteractionStore()

  const { selectedOptionalModule, optionalModulekeys } = (() => {
    if (selectedModuleType !== 'optionalModule')
      return {
        selectedOptionalModule: undefined,
        optionalModulekeys: undefined,
      }

    const optionalModule = workflow.data?.optionalModule

    const optionalModulekeys = Object.keys(
      optionalModule || {}
    ) as (keyof NonNullable<typeof optionalModule>)[]

    const selectedOptionalModule =
      optionalModule?.[optionalModulekeys[selectedOptionalModuleIndex]]

    if (!selectedOptionalModule) {
      setSelectedOptionalModuleIndex(0)

      return {
        selectedOptionalModule: optionalModule?.[optionalModulekeys[0]],
        optionalModulekeys,
      }
    }

    return { selectedOptionalModule, optionalModulekeys }
  })()

  const selectedModule =
    // if selectedModuleType is optionalModule, then return selectedOptionalModule
    (selectedOptionalModule ??
      // if selectedModuleType is not optionalModule, then return selectedModuleType
      workflow.data?.[
        selectedModuleType as Exclude<
          SelectedModuleType,
          'optionalModule' | 'fundingToken.module' | 'issuanceToken.module'
        >
      ] ??
      // if selectedModuleType is fundingToken.module or issuanceToken.module, run the switch case
      (() => {
        const [key, value] = selectedModuleType.split('.') as [
          'fundingToken' | 'issuanceToken',
          'module',
        ]

        return workflow.data?.[key]?.[value]
      })()) as GetModuleReturnType<any, any> | undefined

  // set the selectedOptionalModuleIndex
  const setOptionalModule = (index: number) => {
    setSelectedOptionalModuleIndex(index)
  }

  return {
    selectedModule,
    moduleInteractionMode,
    selectedModuleType,
    selectedOptionalModuleIndex,
    selectedOptionalModule,
    optionalModulekeys,
    setOptionalModule,
  }
}
