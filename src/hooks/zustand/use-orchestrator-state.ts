import { isAddress } from 'viem'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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
    (set, get) => ({
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

        if (existingIndex !== -1) {
          // Update the date if the address already exists
          previousOrchestrators[existingIndex].date = new Date()
        } else {
          // Add new orchestrator
          previousOrchestrators.unshift({
            address: orchestratorAddress,
            date: new Date(),
          })
        }

        set({ orchestrators: previousOrchestrators })
        set({ editing: false })
      },
      edit: () => set((state) => ({ editing: !state.editing })),
    }),
    {
      name: 'orchestrators-storage',
    }
  )
)
