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
    'queryKey' | 'queryFn'
  >
  dependencies?: any[]
}

export type UseWorkFlowReturnType<
  T extends RequestedModules<FactoryType> | undefined = undefined,
> = ReturnType<typeof useWorkflow<T>>

export function useWorkflow<
  T extends RequestedModules<FactoryType> | undefined = undefined,
>({
  orchestratorAddress,
  requestedModules,
  options = {
    enabled: true,
    refetchOnWindowFocus: false,
  },
  dependencies = [],
}: UseWorkFlowParams<T>): UseQueryResult<Workflow<PopWalletClient, T>> {
  const inverter = useInverter()

  const enabled = !!inverter.data && !!orchestratorAddress && options.enabled

  const query = useQuery({
    queryKey: ['workflow', inverter.dataUpdatedAt, ...dependencies],
    queryFn: () =>
      inverter.data!.getWorkflow({
        orchestratorAddress: orchestratorAddress!,
        requestedModules,
      }) as any,
    ...options,
    enabled,
  })

  return query as any
}
