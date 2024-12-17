'use client'

import type { SelectorStore, SelectorStoreAddressItem } from '@/types'
import { isAddress } from 'viem'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export const useSelectorStore = create<SelectorStore>()(
  persist(
    immer((set, get) => ({
      orchestratorAddresses: [],
      moduleAddresses: [],
      isEditing: false,
      setIsEditing: (editing) => {
        set((state) => {
          state.isEditing = editing ?? !state.isEditing
        })
      },
      addAddress: ({ address, type, title }) => {
        if (!address) return
        if (!isAddress(address)) return

        const previousAddresses = get()[`${type}Addresses`]

        // if address is already in the list, set existingIndex
        const existingIndex = previousAddresses.findIndex(
          (a) => a.address === address
        )

        set((state) => {
          // define previous date
          let prevData: SelectorStoreAddressItem | null = null

          // remove the existing index
          if (existingIndex !== -1) {
            prevData = previousAddresses[existingIndex]
            state[`${type}Addresses`].splice(existingIndex, 1)
          }

          const nullableTitle = prevData?.title ?? title

          // Add new orchestrator
          state[`${type}Addresses`].unshift({
            address,
            date: prevData?.date ?? new Date(),
            ...(nullableTitle && { title: nullableTitle }),
          })

          state.isEditing = false
        })
      },
    })),
    {
      name: 'selector-storage',
    }
  )
)
