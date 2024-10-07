// ===========STORE================
export type OrchestratorStoreItem = {
  address: `0x${string}`
  date: Date
}

export type OrchestratorStore = {
  orchestrators: OrchestratorStoreItem[]
  editingOrchestrators: boolean
  editOrchestrators: () => void
  addOrchestrator: (
    orchestratorAddress: `0x${string}` | null | undefined
  ) => void
}
