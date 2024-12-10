'use client'

import type { GetDeployStore } from '@/types'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export const useGetDeployStore = create<GetDeployStore>()(
  immer((set) => ({
    // Deploy Form State
    getDeployFormUserArgs: {},
    getDeployFormStep: 'orchestrator',
    setGetDeployFormStep: (step) => {
      set((state) => {
        state.getDeployFormStep = step
      })
    },
    setGetDeployFormUserArg: (type, name, value, optName) => {
      set((state) => {
        let typeVal: any

        const prev = state.getDeployFormUserArgs
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

        state.getDeployFormUserArgs = {
          ...prev,
          [type]: typeVal,
        }
      })
    },
    resetGetDeployForm: () => {
      set((state) => {
        state.getDeployFormUserArgs = {}
      })
    },

    // Prep State
    factoryType: 'default',
    prepGetDeployStep: 'Prepare',
    requestedModules: {},
    setPrepGetDeployStep: (step) => {
      set((state) => {
        state.prepGetDeployStep = step
      })
    },
    setFactoryType: (factoryType) => {
      set((state) => {
        state.factoryType = factoryType
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
