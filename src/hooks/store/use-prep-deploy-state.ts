import type { FactoryType, RequestedModules } from '@inverter-network/sdk'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type Step = 'Prepare' | 'Deploy'

type PrepState = {
  factoryType: FactoryType
  requestedModules: RequestedModules<FactoryType> | {}
  step: Step
  setStep: (step: Step) => void
  setFactoryType: (factoryType: FactoryType) => void
  addRequestedModule: (
    moduleType: keyof RequestedModules<FactoryType>,
    module: RequestedModules<FactoryType>[keyof RequestedModules<FactoryType>]
  ) => void
  resetRequestedModules: () => void
}

export const usePrepDeployState = create<PrepState>()(
  immer((set) => ({
    factoryType: 'default',
    step: 'Prepare',
    requestedModules: {},
    setStep: (step) => {
      set((state) => {
        state.step = step
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
