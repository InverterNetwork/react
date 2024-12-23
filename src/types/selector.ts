// ===========STORE================
export type SelectorStoreAddressItemType = 'orchestrator' | 'contract'

export type SelectorStoreAddressItem = {
  type: SelectorStoreAddressItemType
  address: `0x${string}`
  date: Date
  title?: string
  chainId?: number
}

export type SelectorStore = {
  addresses: SelectorStoreAddressItem[]
  isEditing: boolean
  setIsEditing: (editing?: boolean) => void
  addAddress: ({
    address,
    type,
    title,
    chainId,
  }: {
    address: `0x${string}` | null | undefined
    type: SelectorStoreAddressItemType
    title?: string
    chainId?: number
  }) => void
  getAddresses: (
    type: SelectorStoreAddressItemType
  ) => SelectorStoreAddressItem[]
  removeAddress: ({
    address,
    type,
  }: {
    address: `0x${string}`
    type: SelectorStoreAddressItemType
  }) => void
}
