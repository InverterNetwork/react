'use client'

import { useModuleInteractionStore } from '@/store'
import type { UseWorkFlowReturnType } from './use-workflow'
import type { SelectedModuleType } from '@/types'
import type { GetModuleReturn } from '@inverter-network/sdk'

export const useWorkflowInteraction = (
  workflow: UseWorkFlowReturnType<any>
) => {
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
      })()) as GetModuleReturn<any, any> | undefined

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

export type UseWorkflowInteractionReturn = ReturnType<
  typeof useWorkflowInteraction
>
