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
        let typeVal: any

        const prev = state.deployFormUserArgs
        const prevTypeVal = (prev as any)?.[type] || {}
        const prevTypeValObj = (prevTypeVal as any)?.[name ?? '']

        const setState = () => {
          state.deployFormUserArgs = {
            ...prev,
            [type]: typeVal,
          }
        }

        if (name === null) {
          typeVal = value
          return setState()
        }

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
                [name]: value,
              }
            break
        }

        setState()
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
