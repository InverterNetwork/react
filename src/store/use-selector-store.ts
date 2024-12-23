'use client'

import type { SelectorStore, SelectorStoreAddressItem } from '@/types'
import { isAddress } from 'viem'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export const useSelectorStore = create<SelectorStore>()(
  persist(
    immer((set, get) => ({
      addresses: [],
      isEditing: false,
      setIsEditing: (editing) => {
        set((state) => {
          state.isEditing = editing ?? !state.isEditing
        })
      },
      addAddress: ({ address, type, title, chainId }) => {
        // check if address is provided and is a valid address
        if (!address || !isAddress(address)) return

        // get previous addresses
        const previousAddresses = get().addresses

        // if address is already in the list, set existingIndex
        const existingIndex = previousAddresses.findIndex(
          (a) => a.address === address && a.type === type
        )

        set((state) => {
          // define previous data
          let prevData: SelectorStoreAddressItem | null = null

          // remove the existing index
          if (existingIndex !== -1) {
            prevData = previousAddresses[existingIndex]
            state.addresses.splice(existingIndex, 1)
          }

          // define previous nullable data
          const nullableTitle = title ?? prevData?.title
          const nullableChainId = chainId ?? prevData?.chainId

          // Add new address
          state.addresses.unshift({
            address,
            type,
            date: prevData?.date ?? new Date(),
            ...(nullableTitle && { title: nullableTitle }),
            ...(nullableChainId && { chainId: nullableChainId }),
          })

          // reset editing state
          state.isEditing = false
        })
      },
      getAddresses: (type) => {
        return get().addresses.filter((a) => a.type === type)
      },
      removeAddress: ({ address, type }) => {
        set((state) => {
          // Using filter instead of splice for immutable update
          state.addresses = state.addresses.filter(
            (a) => !(a.address === address && a.type === type)
          )
        })
      },
    })),
    {
      name: 'selector-storage',
    }
  )
)
