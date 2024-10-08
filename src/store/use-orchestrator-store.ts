import type { OrchestratorStore } from '@/types'
import { isAddress } from 'viem'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export const useOrchestratorStore = create<OrchestratorStore>()(
  persist(
    immer((set, get) => ({
      orchestrators: [],
      editingOrchestrators: false,
      addOrchestrator: (orchestratorAddress) => {
        if (!orchestratorAddress) return
        if (!isAddress(orchestratorAddress)) return

        const previousOrchestrators = get().orchestrators

        // if address is already in the list, set existingIndex
        const existingIndex = previousOrchestrators.findIndex(
          (a) => a.address === orchestratorAddress
        )

        set((state) => {
          if (existingIndex !== -1) {
            // Update the date if the address already exists
            state.orchestrators[existingIndex].date = new Date()
          } else {
            // Add new orchestrator
            state.orchestrators.unshift({
              address: orchestratorAddress,
              date: new Date(),
            })
          }
          state.editingOrchestrators = false
        })
      },
      editOrchestrators: () =>
        set((state) => {
          state.editingOrchestrators = !state.editingOrchestrators
        }),
    })),
    {
      name: 'orchestrator-storage',
    }
  )
)
