import { isAddress } from 'viem'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

type Orchestrator = {
  address: `0x${string}`
  date: Date
}

type OrchestratorState = {
  orchestrators: Orchestrator[]
  editing: boolean
  edit: () => void
  add: (orchestratorAddress: `0x${string}` | null | undefined) => void
}

export const useOrchestratorState = create<OrchestratorState>()(
  persist(
    immer((set, get) => ({
      orchestrators: [],
      editing: false,
      add: (orchestratorAddress) => {
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
          state.editing = false
        })
      },
      edit: () =>
        set((state) => {
          state.editing = !state.editing
        }),
    })),
    {
      name: 'orchestrators-storage',
    }
  )
)
