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

import { createSerializableQueryKey } from '@/utils/serializer'

import { useInverter } from './use-inverter'

/**
 * @description Use the use get module hook to get a module
 * @template TModuleName - The name of the module
 * @template TModuleData - The data of the module
 * @template TUseTags - Whether to use tags
 * @param params - The parameters for the use get module hook
 * @returns The use get module hook query
 */
export type UseGetModuleParams<
  TModuleName extends TModuleData extends ModuleData ? never : ModuleName,
  TModuleData extends ModuleData | undefined = undefined,
  TUseTags extends boolean = true,
> = {
  name: TModuleName
  moduleData?: TModuleData
  address?: string | `0x${string}`
  useTags?: TUseTags
  tagConfig?: TagConfig
  dependencies?: any[]
  options?: Except<
    UseQueryOptions<
      | GetModuleReturnType<TModuleName, PopWalletClient, TModuleData, TUseTags>
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
 * @template TUseTags - Whether to use tags
 * @returns The use get module hook
 */
export type UseGetModuleReturnType<
  TModuleName extends TModuleData extends ModuleData ? never : ModuleName,
  TModuleData extends ModuleData | undefined = undefined,
  TUseTags extends boolean = true,
> = UseQueryResult<
  | GetModuleReturnType<TModuleName, PopWalletClient, TModuleData, TUseTags>
  | undefined,
  Error
>

/**
 * @description Use the use get module hook to get a module
 * @template TModuleName - The name of the module
 * @template TModuleData - The data of the module
 * @template TUseTags - Whether to use tags
 * @param params - The parameters for the use get module hook
 * @returns The use get module hook
 */
export const useGetModule = <
  TModuleName extends TModuleData extends ModuleData ? never : ModuleName,
  TModuleData extends ModuleData | undefined = undefined,
  TUseTags extends boolean = true,
>({
  address,
  name,
  moduleData,
  tagConfig,
  useTags,
  options = {
    enabled: true,
  },
  dependencies = [],
}: UseGetModuleParams<
  TModuleName,
  TModuleData,
  TUseTags
>): UseGetModuleReturnType<TModuleName, TModuleData, TUseTags> => {
  let { decimals, walletAddress, ...restTagConfig } = tagConfig || {}
  const inverter = useInverter()
  const zeroXAddress = address as `0x${string}`

  const enabled = !!address && !!inverter.data && options.enabled

  const query = useQuery<
    | GetModuleReturnType<TModuleName, PopWalletClient, TModuleData, TUseTags>
    | undefined,
    Error
  >({
    queryKey: createSerializableQueryKey('get-module', {
      moduleName: moduleData ? moduleData.name : name,
      address,
      walletAddress: inverter.data?.walletClient?.account?.address,
      useTags,
      dependencies,
    }),
    queryFn: async (): Promise<
      GetModuleReturnType<TModuleName, PopWalletClient, TModuleData, TUseTags>
    > => {
      if (!inverter) throw new Error('No inverter')
      if (!address) throw new Error('No address')

      if (!useTags) {
        const data = inverter.data!.getModule<
          TModuleName,
          TModuleData,
          TUseTags
        >({
          ...(!moduleData ? { name } : { moduleData }),
          address: zeroXAddress,
          useTags,
        } as any) as GetModuleReturnType<
          TModuleName,
          PopWalletClient,
          TModuleData,
          TUseTags
        >

        return data
      }

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

      const data = inverter.data!.getModule<TModuleName, TModuleData, TUseTags>(
        {
          ...(!moduleData ? { name } : { moduleData }),
          address: zeroXAddress,
          useTags,
          tagConfig: {
            decimals,
            defaultToken,
            ...restTagConfig,
          },
        } as any
      ) as GetModuleReturnType<
        TModuleName,
        PopWalletClient,
        TModuleData,
        TUseTags
      >

      return data
    },
    ...options, // Spread the additional options
    enabled,
  })

  return query
}
