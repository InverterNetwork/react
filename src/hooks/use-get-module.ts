'use client'

import type { ModuleName } from '@inverter-network/abis'
import { ERC20_ABI } from '@inverter-network/sdk'
import type {
  GetModuleReturnType,
  ModuleData,
  PopWalletClient,
  TagConfig,
} from '@inverter-network/sdk'
import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import type { Except } from 'type-fest-4'

import { useInverter } from './use-inverter'

/**
 * @description Use the use get module hook to get a module
 * @template TModuleName - The name of the module
 * @template TModuleData - The data of the module
 * @param params - The parameters for the use get module hook
 * @returns The use get module hook
 */
export type UseGetModuleParams<
  TModuleName extends TModuleData extends ModuleData ? never : ModuleName,
  TModuleData extends ModuleData | undefined = undefined,
> = {
  name: TModuleName
  moduleData?: TModuleData
  address?: string | `0x${string}`
  tagConfig?: TagConfig
  dependencies?: any[]
  options?: Except<
    UseQueryOptions<
      | GetModuleReturnType<TModuleName, PopWalletClient, TModuleData>
      | undefined,
      Error
    >,
    'queryKey' | 'queryFn'
  >
}

/**
 * @description The return type of the use get module hook
 * @template TModuleName - The name of the module
 * @template TModuleData - The data of the module
 * @returns The use get module hook
 */
export type UseGetModuleReturnType<
  TModuleName extends TModuleData extends ModuleData ? never : ModuleName,
  TModuleData extends ModuleData | undefined = undefined,
> = UseQueryResult<
  GetModuleReturnType<TModuleName, PopWalletClient, TModuleData> | undefined,
  Error
>

/**
 * @description Use the use get module hook to get a module
 * @template TModuleName - The name of the module
 * @template TModuleData - The data of the module
 * @param params - The parameters for the use get module hook
 * @returns The use get module hook
 */
export const useGetModule = <
  TModuleName extends TModuleData extends ModuleData ? never : ModuleName,
  TModuleData extends ModuleData | undefined = undefined,
>({
  address,
  name,
  moduleData,
  tagConfig,
  options = {
    enabled: true,
  },
  dependencies = [],
}: UseGetModuleParams<TModuleName, TModuleData>): UseGetModuleReturnType<
  TModuleName,
  TModuleData
> => {
  let { decimals, walletAddress, ...restTagConfig } = tagConfig || {}
  const inverter = useInverter()
  const zeroXAddress = address as `0x${string}`

  const enabled = !!address && !!inverter.data && options.enabled

  const query = useQuery({
    queryKey: [
      'get-module',
      moduleData ? moduleData.name : name,
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

      const data = inverter.data!.getModule<TModuleName, TModuleData>({
        ...(!moduleData ? { name } : { moduleData }),
        address: zeroXAddress,
        tagConfig: {
          decimals,
          defaultToken,
          ...restTagConfig,
        },
      } as any)

      return data
    },
    ...options, // Spread the additional options
    enabled,
  })

  return query
}
