import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type {
  ModuleInteractionStore,
  ModuleInteractionMethodState,
} from '@/types'

export const useModuleInteractionStore = create<ModuleInteractionStore>()(
  immer((set) => ({
    moduleState: {}, // Initialize as an empty object
    selectedModuleType: 'orchestrator',
    selectedOptionalModuleIndex: 0,
    moduleInteractionMode: 'read',
    moduleInteractionState: {},

    setModuleInteractionMode: (mode) =>
      set((state) => {
        state.moduleInteractionMode = mode
      }),
    setSelectedModuleType: (moduleType) =>
      set((state) => {
        state.selectedModuleType = moduleType
      }),
    setSelectedOptionalModuleIndex: (index) =>
      set((state) => {
        state.selectedOptionalModuleIndex = index
      }),

    updateModuleMethodArg: (params) => {
      set((state) => {
        const { moduleName, methodName, argIndex, argValue, argsLength } =
          params
        if (!state.moduleInteractionState[moduleName]) {
          state.moduleInteractionState[moduleName] = []
        }
        const module = state.moduleInteractionState[moduleName]
        const methodIndex = module.findIndex((m) => m.methodName === methodName)

        if (methodIndex !== -1) {
          // Method exists, update its args
          if (!module[methodIndex].args) {
            module[methodIndex].args = Array(argsLength).fill(undefined)
          }
          module[methodIndex].args![argIndex] = argValue
        } else {
          // Method doesn't exist, add it
          const newMethod: ModuleInteractionMethodState = {
            methodName,
            args: Array(argsLength).fill(undefined),
          }
          newMethod.args![argIndex] = argValue
          module.push(newMethod)
        }
      })
    },

    updateModuleMethodResponse: (params) => {
      set((state) => {
        const { moduleName, methodName, response } = params
        if (!state.moduleInteractionState[moduleName]) {
          state.moduleInteractionState[moduleName] = []
        }
        const module = state.moduleInteractionState[moduleName]
        const methodIndex = module.findIndex((m) => m.methodName === methodName)

        if (methodIndex !== -1) {
          // Method exists, update its response
          module[methodIndex].response = response
        } else {
          // Method doesn't exist, add it
          module.push({ methodName, response })
        }
      })
    },

    resetModuleInteractionState: () =>
      set(() => ({ moduleInteractionState: {} })),
  }))
)
