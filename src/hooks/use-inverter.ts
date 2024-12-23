'use client'

import { Inverter } from '@inverter-network/sdk'
import { useQuery } from '@tanstack/react-query'
import type { UseQueryOptions } from '@tanstack/react-query'
import { usePublicClient, useWalletClient } from 'wagmi'
import type { PopWalletClient } from '@inverter-network/sdk'

export type UseInverterParams = {
  options?: Omit<
    UseQueryOptions<Inverter<PopWalletClient>>,
    'queryKey' | 'queryFn'
  >
  dependencies?: any[]
}

export type UseInverterReturnType = ReturnType<typeof useInverter>

export const useInverter = ({
  options = {
    enabled: true,
    refetchOnWindowFocus: false,
  },
  dependencies = [],
}: UseInverterParams = {}) => {
  const publicClient = usePublicClient()
  const walletClient = useWalletClient()

  const enabled = options.enabled

  const queryHash = `inverter-${walletClient.isSuccess}-${publicClient?.chain.id}-${walletClient.data?.account.address}`

  const inverter = useQuery({
    queryKey: [queryHash, ...dependencies],
    queryFn: () => {
      if (!publicClient) throw new Error('Public client is not available')

      const instance = Inverter.getInstance({
        publicClient,
        walletClient: walletClient.data,
      })

      return instance
    },
    ...options,
    enabled,
  })

  return inverter
}
