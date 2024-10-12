// ===========STORE================
export type SelectorStoreAddressItem = {
  address: `0x${string}`
  date: Date
}

export type SelectorStoreAddressSelectorStore = 'orchestrator' | 'module'

export type SelectorStore = {
  orchestratorAddresses: SelectorStoreAddressItem[]
  moduleAddresses: SelectorStoreAddressItem[]
  isEditing: boolean
  setIsEditing: (editing?: boolean) => void
  addAddress: ({
    address,
    type,
  }: {
    address: `0x${string}` | null | undefined
    type: SelectorStoreAddressSelectorStore
  }) => void
}
