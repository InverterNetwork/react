'use client'

import type { DeployWorkflowStore } from '@/types'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export const useDeployWorkflowStore = create<DeployWorkflowStore>()(
  immer((set) => ({
    // Deploy Form State
    deployWorkflowFormUserArgs: {},
    deployWorkflowFormStep: 'orchestrator',
    setDeployWorkflowFormStep: (step) => {
      set((state) => {
        state.deployWorkflowFormStep = step
      })
    },
    setDeployWorkflowFormUserArg: (type, name, value, optName) => {
      set((state) => {
        let typeVal: any

        const prev = state.deployWorkflowFormUserArgs
        const prevTypeVal = (prev as any)?.[type] || {}
        const prevTypeValObj = (prevTypeVal as any)?.[name ?? '']

        switch (type) {
          case 'optionalModules':
            typeVal = {
              ...prevTypeVal,
              [optName!]: {
                ...(prevTypeVal?.[optName!] || {}),
                [name as string]: value,
              },
            }
            break
          case 'beneficiary':
          case 'initialPurchaseAmount':
            typeVal = value
            break
          default:
            if (typeof prevTypeValObj === 'object')
              typeVal = {
                ...prevTypeVal,
                [name as string]: {
                  ...prevTypeValObj,
                  ...value,
                },
              }
            else
              typeVal = {
                ...prevTypeVal,
                [name as string]: value,
              }
            break
        }

        state.deployWorkflowFormUserArgs = {
          ...prev,
          [type]: typeVal,
        }
      })
    },
    resetDeployWorkflowForm: () => {
      set((state) => {
        state.deployWorkflowFormUserArgs = {}
      })
    },

    // Prep State
    factoryType: 'default',
    prepDeployWorkflowStep: 'Prepare',
    requestedModules: {},
    setPrepDeployWorkflowStep: (step) => {
      set((state) => {
        state.prepDeployWorkflowStep = step
      })
    },
    addRequestedModule: (moduleType, module) => {
      set((state) => {
        state.requestedModules = {
          ...state.requestedModules,
          [moduleType]: module,
        }
      })
    },
    resetRequestedModules: () => {
      set((state) => {
        state.requestedModules = {}
      })
    },
  }))
)
