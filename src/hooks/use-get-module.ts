'use client'

import type { ModuleName } from '@inverter-network/abis'
import type { UseQueryOptions } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import { ERC20_ABI } from '@inverter-network/sdk'
import type {
  Extras,
  GetModuleReturn,
  PopWalletClient,
} from '@inverter-network/sdk'
import type { Except } from 'type-fest-4'
import { useInverter } from './use-inverter'

export type UseGetModuleParams<T extends ModuleName> = {
  address?: string | `0x${string}`
  name: T
  extras?: Extras
  dependencies?: any[]
  options?: Except<
    UseQueryOptions<GetModuleReturn<T, PopWalletClient> | undefined, Error>,
    'queryKey' | 'queryFn'
  >
}

export type UseGetModuleReturnType = ReturnType<typeof useGetModule>

export const useGetModule = <T extends ModuleName>({
  address,
  name,
  extras,
  options = {
    enabled: true,
  },
  dependencies = [],
}: UseGetModuleParams<T>) => {
  let { decimals, walletAddress, ...restExtras } = extras || {}
  const inverter = useInverter()
  const zeroXAddress = address as `0x${string}`

  const enabled = !!address && !!inverter.data && options.enabled

  const query = useQuery({
    queryKey: [
      'get-module',
      name,
      address,
      inverter.data?.walletClient?.account?.address,
      ...dependencies,
    ],
    queryFn: async () => {
      if (!inverter) throw new Error('No inverter')
      if (!address) throw new Error('No address')

      let defaultToken: `0x${string}` | undefined

      // Decimals
      const getDecimals = (address: `0x${string}`) =>
        <Promise<number>>inverter.data!.publicClient.readContract({
          address: address,
          abi: ERC20_ABI,
          functionName: 'decimals',
        })

      try {
        if (!decimals) {
          const triedDecimals = await getDecimals(zeroXAddress)
          decimals = triedDecimals
          defaultToken = zeroXAddress
        }
      } catch (error) {
        try {
          const defaultModule = inverter.data!.getModule({
            address: zeroXAddress,
            name: 'Module_v1',
          })

          const orchestratorAddress =
            await defaultModule.read.orchestrator.run()

          const orchestrator = inverter.data!.getModule({
            address: orchestratorAddress,
            name: 'Orchestrator_v1',
          })

          const fundingManagerAddress =
            await orchestrator.read.fundingManager.run()

          const fundingManager = inverter.data!.getModule({
            address: fundingManagerAddress,
            name: 'FM_DepositVault_v1',
          })

          const defaultTokenAddress = await fundingManager.read.token.run()

          defaultToken = defaultTokenAddress

          decimals = await getDecimals(defaultTokenAddress)
        } catch (error) {
          console.error(error)
        }
      }

      if (!walletAddress && !!inverter.data?.walletClient?.account?.address) {
        walletAddress = inverter.data.walletClient.account.address
      }

      const data = inverter.data!.getModule({
        name,
        address: zeroXAddress,
        extras: {
          decimals,
          defaultToken,
          ...restExtras,
        },
      })

      return data
    },
    ...options, // Spread the additional options
    enabled,
  })

  return query
}
