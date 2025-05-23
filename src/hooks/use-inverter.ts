'use client'

import { Inverter } from '@inverter-network/sdk'
import type { PopWalletClient } from '@inverter-network/sdk'
import { useQuery } from '@tanstack/react-query'
import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { usePublicClient, useWalletClient } from 'wagmi'

/**
 * @description The parameters for the use inverter hook
 * @param options - The options for the use inverter hook
 * @param dependencies - The dependencies for the use inverter hook
 * @returns The use inverter hook
 */
export type UseInverterParams = {
  options?: Omit<
    UseQueryOptions<Inverter<PopWalletClient>>,
    'queryKey' | 'queryFn'
  >
  dependencies?: any[]
}

/**
 * @description The return type of the use inverter hook
 * @returns The use inverter hook query
 */
export type UseInverterReturnType = UseQueryResult<Inverter<PopWalletClient>>

/**
 * @description The use inverter hook
 * @param options - The options for the use inverter hook
 * @param dependencies - The dependencies for the use inverter hook
 * @returns The use inverter hook
 */
export const useInverter = ({
  options = {
    enabled: true,
    refetchOnWindowFocus: false,
  },
  dependencies = [],
}: UseInverterParams = {}): UseInverterReturnType => {
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
