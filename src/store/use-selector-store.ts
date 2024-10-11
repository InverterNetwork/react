'use client'

import type { SelectorStore } from '@/types'
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
      setIsEditing: () => {
        set((state) => {
          state.isEditing = !state.isEditing
        })
      },
      addAddress: ({ address, type }) => {
        if (!address) return
        if (!isAddress(address)) return

        const previousAddresses = get()[`${type}Addresses`]

        // if address is already in the list, set existingIndex
        const existingIndex = previousAddresses.findIndex(
          (a) => a.address === address
        )

        set((state) => {
          // remove the existing index
          if (existingIndex !== -1)
            state[
              type === 'orchestrator'
                ? 'orchestratorAddresses'
                : 'moduleAddresses'
            ].splice(existingIndex, 1)

          // Add new orchestrator
          state[
            type === 'orchestrator'
              ? 'orchestratorAddresses'
              : 'moduleAddresses'
          ].unshift({
            address,
            date: new Date(),
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
