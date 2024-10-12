'use-client'

import { useQuery } from '@tanstack/react-query'
import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { useInverter } from '.'
import type {
  FactoryType,
  PopWalletClient,
  RequestedModules,
  Workflow,
} from '@inverter-network/sdk'
import type { Except } from 'type-fest-4'

export type UseWorkFlowParams<
  T extends RequestedModules<FactoryType> | undefined = undefined,
> = {
  orchestratorAddress?: `0x${string}`
  requestedModules?: T
  options?: Except<
    UseQueryOptions<Workflow<PopWalletClient, T> | undefined, Error>,
    'queryKey' | 'queryFn' | 'enabled'
  >
}

export type UseWorkFlowReturnType<
  T extends RequestedModules<FactoryType> | undefined = undefined,
> = ReturnType<typeof useWorkflow<T>>

export function useWorkflow<
  T extends RequestedModules<FactoryType> | undefined = undefined,
>({
  orchestratorAddress,
  requestedModules,
  options,
}: UseWorkFlowParams<T>): UseQueryResult<Workflow<PopWalletClient, T>> {
  const inverter = useInverter()

  const enabled = !!inverter.data && !!orchestratorAddress

  const query = useQuery({
    queryKey: ['workflow', inverter.dataUpdatedAt],
    queryFn: () =>
      inverter.data!.getWorkflow({
        orchestratorAddress: orchestratorAddress!,
        requestedModules,
      }) as any,
    enabled,
    refetchOnWindowFocus: false,
    ...options,
  })

  return query as any
}
