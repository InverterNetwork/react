import type { DeployStore } from '@/types'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export const useDeployStore = create<DeployStore>()(
  immer((set) => ({
    // Deploy Form State
    deployFormUserArgs: {},
    deployFormStep: 'orchestrator',
    setDeployFormStep: (step) => {
      set((state) => {
        state.deployFormStep = step
      })
    },
    setDeployFormUserArg: (type, name, value, optName) => {
      set((state) => {
        const prev = state.deployFormUserArgs
        // @ts-expect-error - conditionally setting state
        const prevTypeVal = prev?.[type] || {}
        const prevTypeValObj = prevTypeVal?.[name]
        let typeVal: any

        switch (type) {
          case 'optionalModules':
            typeVal = {
              ...prevTypeVal,
              [optName!]: {
                ...(prevTypeVal?.[optName!] || {}),
                [name]: value,
              },
            }
            break
          case 'initialPurchaseAmount':
            typeVal = value
            break
          default:
            if (typeof prevTypeValObj === 'object')
              typeVal = {
                ...prevTypeVal,
                [name]: {
                  ...prevTypeValObj,
                  ...value,
                },
              }
            else
              typeVal = {
                ...prevTypeVal,
                [name]: value,
              }
            break
        }

        state.deployFormUserArgs = {
          ...prev,
          [type]: typeVal,
        }
      })
    },
    resetDeployForm: () => {
      set((state) => {
        state.deployFormUserArgs = {}
      })
    },

    // Prep State
    factoryType: 'default',
    prepDeployStep: 'Prepare',
    requestedModules: {},
    setPrepDeployStep: (step) => {
      set((state) => {
        state.prepDeployStep = step
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
